import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import PropertyCards from '../PropertyCards';
import { useNavigate } from 'react-router-dom';
import ReservationCard from './reservationCard';
import OwnedProp from '../UploadProperty/OwnedProp';

const ProfilePage = (props) => {
    const [isHost, setIsHost] = useState(false); //dynamic
    const [ownList, setOwnList] = useState([]);

    const [favourites, setFavourites] = useState([])
    const [favList, setFavList] = useState([])

    const [filteredFavourites, setFilteredFavourites] = useState([])

    const [reservations, setReservations] = useState([])
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        let userId = sessionStorage.getItem("userId");
        let userName = sessionStorage.getItem("userName");
        let user = sessionStorage.getItem("user");
        if (user) {
            user = JSON.parse(sessionStorage.getItem("user"))
        } else {
            return navigate("/")
        }

        setUserDetails({ userId: userId, userName: userName, user: user })
        // fetch("http://localhost:3000/api/users?userId=" + userId)
        //     .then(response => response.json())
        //     .then(data => {
        //         setIsHost(data[0].is_host);
        //         setOwnList(data[0].own_prop_list);
        //     })
        //     .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/users/favourites?userId=' + sessionStorage.getItem("userId"))
            .then(function (response) {
                // handle success
                if (response.status == 200) {
                    const { data } = response
                    if (data) {
                        setFavourites(data)
                        setFilteredFavourites(data)
                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3000/api/users/hostProperties?userId=' + sessionStorage.getItem("userId"))
            .then(function (response) {
                // handle success

                if (response.status == 200) {
                    const { data } = response
                    if (data) {
                        setOwnList(data)
                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, []);

    const handleClick = async () => {
        let requestBody = {
            isHost: true, userId: sessionStorage.getItem("userId")
        }
        await axios.post(`http://localhost:3000/api/users/enableHost`, requestBody)
            .then(async function (response) {
                // handle success
                if (response.status == 200) {
                    alert("You are a host now.")

                    let user = JSON.parse(sessionStorage.getItem("user"))
                    user = { ...user, isHost: true }
                   await sessionStorage.setItem("user",JSON.stringify(user))
                    window.location.reload()
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        //callApi
    }


    const updateProperties = (selectedCard) => {
        return favourites.filter(card => {

            if (card.propId === selectedCard.title) {
                if (card.isFavourite) {
                    return card
                }
            }
            return card
        })

    }
    const setIsFavourite = (selectedCard) => {

        let requestBody = {
            userId: parseInt(sessionStorage.getItem("userId")), propId: selectedCard.propId
        }
        if (selectedCard.isFavourite) {

            axios.post('http://localhost:3000/api/users/addfavourites', requestBody)
                .then(function (response) {
                    // handle success
                    if (response.status == 200) {
                        setFilteredFavourites(updateProperties(selectedCard))
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        } else {
            axios.post('http://localhost:3000/api/users/removefavourites', requestBody)
                .then(function (response) {
                    // handle success
                    if (response.status == 200) {
                        setFilteredFavourites(updateProperties(selectedCard))
                    }
                    navigate("/profile");
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }




    }


    return (
        <div className='app-body'>
            <h2 className='m-3 mt-md-5'> Hello {userDetails?.user?.firstName} </h2>
            {!userDetails?.user?.isHost && <button type="button" className="btn btn-primary m-3" onClick={handleClick}>Register as Host</button>}

            {filteredFavourites && filteredFavourites.length > 0 && <div className='m-3'>Favourites List:
                <PropertyCards properties={filteredFavourites} setIsFavourite={setIsFavourite} source="fav" />
            </div>
            }
            <div className='m-3'> Upcoming Reservations:
                <ReservationCard />
            </div>

            {userDetails?.user?.isHost && <div className='m-3'> Owned Properties:
                <div>{userDetails?.user?.isHost && <button type="button" className="btn btn-primary m-3" onClick={() => navigate("/uploadProperty")}>Add Property</button>}</div>
                <OwnedProp properties={ownList} fromHostProfile="true" />
            </div>
            }
        </div>
    );
}
export default ProfilePage