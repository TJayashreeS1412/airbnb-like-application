import React, { useEffect, useState } from 'react';
import "./property.scss"
import { DateRange } from 'react-date-range';

import CommentModal from './CommentModal';
import { formatDate } from '../../utils/helperFunction';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Property = () => {

    const [property, setProperty] = useState({})
    const [reservationDates, setReservationDates] = useState({})
    const [selectedDatesCount, setSelectedDatesCount] = useState(0)
    const [guestsCount, setGuestsCount] = useState(1)

    const { propertyId } = useParams();

    const setIsFavourite = (property) => {
        property.isFavourite = !property.isFavourite;
    }


    useEffect(() => {

        if (propertyId === undefined) {
            return <Navigate to="/" />;
        }

        if (propertyId) {
            axios.get(`http://localhost:3000/api/properties/property?propId=${propertyId}`)
                .then(function (response) {
                    // handle success
                    console.log(response);
                    if (response.status == 200) {
                        const { data } = response
                        if (data) {
                            setProperty(data)
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
            let selectionRange = {
                startDate: new Date(),
                endDate: new Date(),
                key: 'selection',
            }
            setReservationDates(selectionRange)
        }
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

    const updateComments = (comments) => {
        console.log(comments)
        let userReview = property.userReview.concat(comments)
        console.log(property.userReview)
        setProperty({ ...property, userReview: userReview })
    }

    const handleClick = async () => {
        let requestBody = {
            startDate: reservationDates.startDate, endDate: reservationDates.endDate, propertyId: propertyId, userId: sessionStorage.getItem("userId"),
        }

        await axios.post(`http://localhost:3000/api/reservations/`, requestBody)
            .then(function (response) {
                // handle success
                if (response.status == 200) {
                    alert("your reservation is succesfull");
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

    return (
        <>
            {property.propId &&
                <div>
                    <div className='property d-flex flex-row justify-content-center m-lg-5 m-2 flex-lg-nowrap flex-wrap' style={{ gap: "10px" }}>
                        <div className="col-12 col-lg-6">
                            <span><h1>{property.title}</h1></span>
                            <div className='mt-3'>
                                <span>Hosted by {property.hostName}</span><span className='star-separator'>  * </span> <span>{property.address}</span>
                                <span className="right" style={{jusitfyContent:"right"}}> {property.isFavourite ? <i className="bi bi-heart-fill" onClick={() => setIsFavourite(property)} /> : <i className="bi bi-heart" onClick={() => setIsFavourite(property)} />}</span>
                            </div>
                            
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
                            <div className='mt-3'>
                                <div>House Rules: </div>
                                <ul>
                                {property.houseRules && property.houseRules.length > 0 && property.houseRules.map((rule, ruleIndex) => {
                                            return (<li>{rule} </li>)
                                })}
                                </ul>
                            </div>
                            <div className='mt-3'>
                                <div>Amenities: </div>
                                    {property.ameneties.airConditioning && <span className='ms-3'>Air Conditioning</span>}
                                    {property.ameneties.hairDryer && <span className='ms-3'>Hair Dryer</span>}
                                    {property.ameneties.hotTub && <span className='ms-3'>Hot Tub</span>}
                                    {property.ameneties.wifi && <span className='ms-3'>Wifi</span>}
                                    {property.ameneties.iron && <span className='ms-3'>Iron </span>}
                                    {property.ameneties.washer && <span className='ms-3'>Washer/ Dryer</span>}
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
                                        <input type="number" min={1} onChange={event => setGuestsCount(event.target.value)} defaultValue={guestsCount} />
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
                                    <button type="button" className="btn btn-primary reserve-button" onClick={handleClick}>
                                        Reserve
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center" style={{minHeight: "200px"}}>
                        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <img src="..." class="rounded mr-2" alt="..."/>
                                <strong class="mr-auto">Confirmation</strong>
                                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="toast-body">
                                Your reservation is succesfull. Have a great stay!
                            </div>
                        </div>
                    </div> */}
                    <hr className='m-lg-5 m-2' />
                    <div className='property-review d-flex flex-row justify-content-center flex-column mb-5'>
                        <div class="container user-review-container ">
                            <div className='d-flex mb-lg-5 m-2 justify-content-between' style={{ gap: "10px" }}>
                                <div className='d-flex' style={{ gap: "10px" }}>
                                    <span><i className="bi bi-star-fill" /></span><b>{property.AverageRatings}</b> <span>*</span><b>{property.userReview.length} reviews</b>
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
                                            <p >{review.userName} | <span className='commented-date' style={{ color: "#717171", fontSize: "12px" }}> {formatDate(review.commentedDate)} </span></p>
                                            <p>{review.comments}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                    <CommentModal propertyId={property.propId} updateComments={updateComments.bind(this)} />
                </div>
            }
        </>
    );
}
export default Property;