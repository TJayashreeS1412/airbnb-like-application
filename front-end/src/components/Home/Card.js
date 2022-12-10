import React, { useEffect, useState } from 'react';
import SearchComponent from './Search';
import "./card.scss"
const PropertyCards = () => {

    const [properties, setProperties] = useState([])
    const cards = [{
        title: "Card title 1",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        images: [
            "https://images.unsplash.com/photo-1520099823969-e9c747f601a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
            "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ],
        price: 130,
        Ratings: 4.8,
        isFavourite: false,
    }, {
        title: "Relaxing Summer",
        description: "Allow these colorful walls to blend in with your colorful thoughts, and ice-cream sundae.",
        images: [
            "https://images.unsplash.com/photo-1520099823969-e9c747f601a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
            "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ],
        price: 130,
        Ratings: 4.8,
        isFavourite: false,

    }, {
        title: "Card title 3",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        images: [
            "https://images.unsplash.com/photo-1520099823969-e9c747f601a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
            "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ],
        Ratings: 4.8,
        isFavourite: false,

    }, {
        title: "Card title 4",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        images: [
            "https://images.unsplash.com/photo-1520099823969-e9c747f601a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
            "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ],
        price: 130,
        Ratings: 4.8,
        isFavourite: false,

    }, {
        title: "Card title 5",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        images: [
            "https://images.unsplash.com/photo-1520099823969-e9c747f601a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=411&q=80",
            "https://images.unsplash.com/photo-1550355191-aa8a80b41353?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
            "https://images.unsplash.com/photo-1581881010555-7cefbe43ad08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        ],
        price: 130,
        Ratings: 4.8,
        isFavourite: false,

    }]
    useEffect(() => {
        setProperties(cards)
    }, [])


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
            <div class="properties">
                <div class="cards">
                    {properties.map((card, index) => {
                        return (
                            <div class="card mb-3">
                                <div id={"carouselExampleIndicators" + index} class="carousel slide" data-bs-interval="false">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicatorsA" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div class="carousel-inner" style={{ width: "100%", height: "350px" }}>
                                        {
                                            card.images.map((image, imageIndex) => {
                                                return (
                                                    <div class={`carousel-item ${imageIndex == 0 ? `active` : ``}`}>
                                                        <img src={image} class="d-block w-100" alt="..." />
                                                    </div>
                                                )
                                            })
                                        }
                                        <button class="carousel-control-prev" type="button" data-bs-target={"#carouselExampleIndicators" + index} data-bs-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Previous</span>
                                        </button>
                                        <button class="carousel-control-next" type="button" data-bs-target={"#carouselExampleIndicators" + index} data-bs-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="visually-hidden">Next</span>
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body" key={index}>
                                    <div class="card-title ">
                                        <h5 class="left" >{card.title}  </h5>
                                        <span class="right"> {card.isFavourite ? <i class="bi bi-heart-fill" onClick={() => setIsFavourite(card)} /> : <i class="bi bi-heart" onClick={() => setIsFavourite(card)} />}
                                        </span>
                                    </div>
                                    <p class="card-text">{card.description}</p>
                                    <div class="card-metadata">
                                        <p class="left" >${card.price} per night</p>
                                        <p class="right">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>
                                            {card.Ratings}
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