import React, { useEffect, useState } from 'react';
import "./property.scss"
import { DateRange } from 'react-date-range';

import CommentModal from './CommentModal';
import { formatDate } from '../../utils/helperFunction';
const Property = () => {

    const cards = {
        "prop_id": 1,
        "host_user_id": 1,
        "hostName": "Andrew",
        "title": "NEW! Stunning Broken Bow Cabin w/ Hot Tub + Views!",
        "description": "Nestled in the woods of Broken Bow, this hidden gem awaits a lucky group of travelers looking to experience luxury amenities and ample conveniences all wrapped into one. The 3-bedroom, 3-bathroom cabin boasts a modern-chic feel, complete with stylish decor, a variety of sleeping arrangements, and plenty of outdoor spaces to enjoy the peaceful surroundings. The vacation rental is also just moments from the area's best spots like Beavers Bend State Park and local wineries and eateries.",
        "images": [
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/0470dbb6-adea-4c76-8167-b1fd131e6830.jpeg?im_w=1200",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/56966a5f-e2fc-4718-ab07-2b9ad03d006d.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/30bb1786-5eaf-4488-9abe-b29c20f5b5dd.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/d1fdd29d-5818-4a1e-beee-aefe8a6914ef.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/5756a17f-e0d7-49a3-9c7f-e855cd123b08.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/3e145820-8f8e-4dd9-b7b8-bbdd2245fdff.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/fe83006e-17fa-452e-ac3c-2a78158e8061.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/003c3382-5963-478a-86e6-4e9776dc14ab.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/7f2e14ec-b382-4ff3-90bf-8d70c40c17e5.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/b11dca52-ac1b-476b-82e3-4e90c28e32d8.jpeg?im_w=1440",
            "https://a0.muscache.com/im/pictures/prohost-api/Hosting-635796702565692921/original/cbe85161-7b80-4969-8043-48b59f15e409.jpeg?im_w=1440"
        ],
        "price": 300,
        "avgRating": 4.75,
        "userReview": [
            {
                "userName": "Chelyse",
                "comments": "We enjoyed a wonderful Thanksgiving at this beautiful cabin and felt right at home!",
                "commentedDate": "November 2022",
                "rating": 4.6
            },
            {
                "userName": "Laura",
                "comments": "Our family visited here for 4 days and we did not want to leave. We greatly enjoyed everything about our stay.",
                "commentedDate": "October 2022",
                "rating": 4.6
            },
            {
                "userName": "Danny",
                "comments": "exceptional food, friendly staff and experience. this be go place again the future. thank you",
                "commentedDate": "September 2022",
                "rating": 4.6
            },
            {
                "userName": "Whitney",
                "comments": "A good location with a nice lawn(can play mini football/cricket) and a barbeque place. Excellent food and services by Mr.Rajappan & Team. ",
                "commentedDate": "July 2022",
                "rating": 4.6
            }
        ],
        "house_type": "private",
        "maxGuests": 8,
        "bedrooms": 3,
        "beds": 6,
        "baths": 3,
        "address": "Broken Bow, Oklahoma, United States",
        "ameneties": {
            "airConditioning": true,
            "hairDryer": true,
            "hotTub": false,
            "wifi": true,
            "iron": true,
            "washer": true
        },
        "house_rules": [
            "Check-in after 4:00 PM",
            "Checkout before 11:00 AM",
            "Pets allowed",
            "No smoking"
        ]
    }


    const [property, setProperty] = useState(cards)
    const [reservationDates, setReservationDates] = useState({})
    const [selectedDatesCount, setSelectedDatesCount] = useState(0)
    const [guestsCount, setGuestsCount] = useState(1)



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


    const getBookingPrice = () => {
        let bookingPrice = property.price;
        if (guestsCount >= 1) {
            bookingPrice = Math.ceil(guestsCount / 2) * property.price * selectedDatesCount
        }
        return bookingPrice;
    }

    return (
        <>

            <div className='property d-flex flex-row justify-content-center m-lg-5 m-2 flex-lg-nowrap flex-wrap' style={{ gap: "10px" }}>
                <div className="col-12 col-lg-6">
                    <span><h1>{property.title}</h1></span>
                    <div className='mt-3'><span>Hosted by {property.hostName}</span><span className='star-separator'>  * </span> <span>{property.address}</span></div>
                    <div className='descripton mt-4'>
                        <div className='mb-2'><b>Description</b></div>
                        <span>{property.description}</span>
                    </div>
                    <div className='mt-3'>
                        <span>{property.maxGuests} Max Guests</span>
                        <span className='star-separator'>  * </span>
                        <span>{property.bedrooms} Bedrooms</span>
                        <span className='star-separator'>  * </span>
                        <span>{property.beds} Beds</span>
                        <span className='star-separator'>  * </span>
                        <span>{property.baths} Baths</span>
                    </div>
                </div>
                <div id="carouselExampleIndicators" class="carousel slide w-100 property-carousel m-3 m-lg-0" data-bs-interval="false" style={{ height: "500px" }} >
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner property-carousel" style={{ width: "100%", height: "500px" }} >
                        {
                            property.images.map((image, imageIndex) => {
                                return (
                                    <div class={`carousel-item ${imageIndex == 0 ? `active` : ``}`} style={{ width: "100%", height: "500px" }}>
                                        <img src={image} class="d-block property-image" alt="..." style={{ width: "100%", height: "500px" }} />
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
            <hr className='m-lg-5 m-2' />
            <div className='d-flex flex-row justify-content-between ms-md-5 me-md-5'>
                <div className='d-flex flex-column align-items-center align-items-md-start  '>
                    <div className="pb-3">
                        <span>{selectedDatesCount}</span> nights in  {property.title}
                    </div>
                    <div>
                        <DateRange
                            ranges={[reservationDates]}
                            onChange={handleSelect}
                        />
                    </div>
                </div>
                <div class="card property-reservation-card">
                    <div class="card-body d-flex flex-column">
                        <b>{property.price} / night </b>
                        <hr />
                        <div className='d-flex flex-row justify-content-between'>
                            <div className='mt-2'>
                                <div className='mb-2 fs-6'><b>Check-in Date</b></div>
                                <span>{formatDate(reservationDates.startDate)}</span>
                            </div>
                            <div className='mt-2'>
                                <div className='mb-2 fs-6'><b>Checkout Date</b></div>
                                <span>{formatDate(reservationDates.endDate)}</span>
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-between mb-2'>
                            <div className='mt-2'>
                                <div className='mb-2 fs-6'><b>Guests</b></div>
                                <input type="number" min={1} onChange={event => setGuestsCount(event.target.value)} defaultValue={guestsCount}/>
                            </div>

                        </div>
                        <hr />
                        <div className='d-flex flex-row justify-content-between '>
                            <div className='mt-2'>
                                <div className='mb-2 fs-6'><b>Total Price</b></div>
                                <span>{property.price} * {selectedDatesCount} night(s) * {Math.ceil(guestsCount / 2)} room(s) = {getBookingPrice()}</span>
                            </div>

                        </div>

                        <div className='d-flex flex-row justify-content-center mt-4'>
                           <button type="button" className="btn btn-primary reserve-button" >
                                Reserve
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <hr className='m-lg-5 m-2' />
            <div className='property-review d-flex flex-row justify-content-center flex-column mb-5'>
                <div class="container user-review-container ">
                    <div className='d-flex mb-lg-5 m-2 justify-content-between' style={{ gap: "10px" }}>
                        <div className='d-flex' style={{ gap: "10px" }}>
                            <span>{cards.Ratings}</span> <span>*</span><span>{property.userReview.length} reviews</span>
                        </div>
                        <div className='d-flex' style={{ gap: "10px" }}>
                            <button type="button" className="btn btn-primary add-comment" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Comment
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        {property.userReview.map((review, index) => {
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
            <CommentModal propertyId={property.prop_id} />

        </>
    );
}
export default Property;