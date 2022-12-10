import React, { useEffect, useState } from 'react';
import "./property.scss"
import { DateRangePicker } from 'react-date-range';
const Property = () => {

    const [property, setProperty] = useState({})
    const [reservationDates, setReservationDates] = useState({})
    const [selectedDatesCount, setSelectedDatesCount] = useState(0)

    const cards = {
        title: "Tree House",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        images: [
            "https://images.unsplash.com/photo-1520099823969-e9c747f601a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
            "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

        ],
        price: 130,
        Ratings: 4.8,
        isFavourite: false,
        userReview: [

            {
                userName: "Jay",
                comments: "exceptional food, friendly staff and experience. this be go place again the future. thank you",
                commentedDate: new Date(),
                rating: 4.6
            },
            {
                userName: "Jay",
                comments: "A good location with a nice lawn(can play mini football/cricket) and a barbeque place. Excellent food and services by Mr.Rajappan & Team. ",
                commentedDate: new Date(),
                rating: 4.6
            },
            {
                userName: "Jay",
                comments: "exceptional food, friendly staff and experience. this be go place again the future. thank you",
                commentedDate: new Date(),
                rating: 4.6
            },
            {
                userName: "Jay",
                comments: "A good location with a nice lawn(can play mini football/cricket) and a barbeque place. Excellent food and services by Mr.Rajappan & Team. ",
                commentedDate: new Date(),
                rating: 4.6
            }
        ]
    }

    useEffect(() => {
        setProperty(cards)
        let selectionRange = {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
        setReservationDates(selectionRange)
    }, [])

    const handleSelect = (range) => {

        const startDate = new Date(range.selection.startDate);
        const endDate = new Date(range.selection.endDate);
        const diffTime = Math.abs(endDate - startDate);
        const reservationDates = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(reservationDates + " days");
        setSelectedDatesCount(reservationDates)
        setReservationDates(range.selection)
    }

    return (
        <>
            <div className='property d-flex flex-row justify-content-center'>
                <div id="carouselExampleIndicators" class="carousel slide w-100 m-5" data-bs-interval="false" style={{ height: "500px" }} >
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner" style={{ width: "100%", height: "500px" }} >
                        {
                            cards.images.map((image, imageIndex) => {
                                return (
                                    <div class={`carousel-item ${imageIndex == 0 ? `active` : ``}`} style={{ width: "100%", height: "500px" }}>
                                        <img src={image} class="d-block " alt="..." style={{ width: "100%", height: "500px" }} />
                                    </div>
                                )
                            })
                        }
                        <button class="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators"} data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators"} data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>


            </div>
            <div className='d-flex justify-content-center flex-column align-items-center'>
                <div>
                    <span>{selectedDatesCount}</span> nights in  {cards.title}
                </div>
                <DateRangePicker
                    ranges={[reservationDates]}
                    onChange={handleSelect}
                />
            </div>
            <hr />
            <div className='property-review d-flex flex-row justify-content-center flex-column m-5'>
              


                <div class="container user-review-container">
                <div className='d-flex mb-5' style={{gap:"10px"}}>
                    <span>{cards.Ratings}</span> <span>*</span><span>{cards.userReview.length} reviews</span>
                </div>
                    <div class="row">
                        {cards.userReview.map((review, index) => {
                            return (
                                <div key={index} className="col-sm-6">
                                    <p >{review.userName} | <span className='commented-date' style={{ color: "#717171", fontSize: "12px" }}> {`22 October 2022`} </span></p>
                                    <p>{review.comments}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Property;