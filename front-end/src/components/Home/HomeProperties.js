import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import PropertyCards from '../PropertyCards';
const HomeProperties = () => {

    const [properties, setProperties] = useState([])
    const [filterProperties, setFilterProperties] = useState([])

    const navigate = useNavigate()

    // const { query } = useParams();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        axios.get('http://localhost:3000/api/properties/')
            .then(function (response) {
                // handle success
                if (response.status == 200) {
                    const { data } = response
                    if (data) {
                        setProperties(data)
                        setFilterProperties(data)

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
    }, [])

    useEffect(() => {

        let query = searchParams.get('query')
        let filter = searchParams.get('filter')
        if (properties.length > 0) {
            if (query && !filter) {
                let updatedProperties = properties.filter(property => {
                    if (property.title?.toLowerCase().includes(query.toLowerCase()) || property.address?.city?.toLowerCase().includes(query.toLowerCase()))
                        return property
                })
                setFilterProperties(updatedProperties)
            } else if (filter == "city") {
                let updatedProperties = properties.filter(property => {
                    if (property.address.city)
                        if (property.address?.city?.toLowerCase().includes(query.toLowerCase()))
                            return property
                })
                setFilterProperties(updatedProperties)
            } else if (filter == "type") {
                let updatedProperties = properties.filter(property => {
                    if (property?.houseType)
                        if (property?.houseType?.toLowerCase().includes(query.toLowerCase()))
                            return property
                })
                setFilterProperties(updatedProperties)
            } else if (!query || query == "") {
                setFilterProperties(properties)
            }
        }
    }, [searchParams.get('query')])

    const setIsFavourite = (selectedCard) => {
        let updatedProperties = properties.map(card => {
            let requestBody = {
                userId: sessionStorage.getItem("userId"), propId: selectedCard.propId
            }
            if (card.title === selectedCard.title) {
                if (card.isFavourite) {
                    axios.post('http://localhost:3000/api/users/removefavourites', requestBody)
                    .then(function (response) {
                        // handle success
                        if (response.status == 200) {
                            card.isFavourite = false
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
                    axios.post('http://localhost:3000/api/users/addfavourites', requestBody)
                    .then(function (response) {
                        // handle success
                        if (response.status == 200) {
                            card.isFavourite = true
                        }
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
            return card
        })
        setFilterProperties(updatedProperties)
    }

    

    return (
        <>
           
            <PropertyCards properties={filterProperties} setProperties={setFilterProperties} setIsFavourite={setIsFavourite}/>
               
        </>
    );
}
export default HomeProperties;

