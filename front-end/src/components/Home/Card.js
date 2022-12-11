import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./card.scss"
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
const PropertyCards = () => {

    const [properties, setProperties] = useState([])
    const [filterProperties, setFilterProperties] = useState([])

    const navigate = useNavigate()

    // const { query } = useParams();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        axios.get('http://localhost:3000/api/properties/')
            .then(function (response) {
                // handle success
                console.log(response);
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
                    if (property.title?.toLowerCase().includes(query.toLowerCase()) || property.address?.toLowerCase().includes(query.toLowerCase()))
                        return property
                })
                setFilterProperties(updatedProperties)
            } else if (filter == "city") {
                let updatedProperties = properties.filter(property => {
                    if (property.address)
                        if (property.address?.toLowerCase().includes(query.toLowerCase()))
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
            if (card.title === selectedCard.title) {
                if (card.isFavourite) {
                    card.isFavourite = false
                } else {
                    card.isFavourite = true
                }
            }
            return card
        })

        setProperties(updatedProperties)
    }

    return (
        <>
            <div className="properties">
                <div className="cards">
                    {filterProperties && filterProperties.length > 0 && filterProperties.map((property, index) => {
                        return (
                            <div className="card mb-3"  >
                                <div id={"carouselExampleIndicators" + index} className="carousel slide" data-bs-interval="false">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner" style={{ width: "100%" }}>
                                        {property.images && property.images.length > 0 && property.images.map((image, imageIndex) => {
                                            return (
                                                <div className={`carousel-item ${imageIndex == 0 ? `active` : ``}`} key={image}>
                                                    <img src={image} className="d-block w-100" alt="..." />
                                                </div>
                                            )
                                        })}
                                        <button className="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators" + index} data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators" + index} data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body property-card-body" key={index} onClick={() => navigate(`/property/${property.propId}`)}>
                                    <div className="card-title ">
                                        <h5 className="" >{property.title}</h5>
                                        <span className="right"> {property.isFavourite ? <i className="bi bi-heart-fill" onClick={() => setIsFavourite(property)} /> : <i className="bi bi-heart" onClick={() => setIsFavourite(property)} />}
                                        </span>
                                    </div>
                                    <div className="card-metadata">
                                        <p className="left" >${property.price} per night</p>
                                        <p className="right">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                            {property.AverageRatings}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
export default PropertyCards;