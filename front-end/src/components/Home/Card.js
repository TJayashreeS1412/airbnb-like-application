import React from 'react';
import SearchComponent from './Search';
import "./Home.css"
const PropertyCards = () => {

    const cards = [{
        title: "Card title 1",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        imgLocation: "../"
    }, {
        title: "Card title 2",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        imgLocation: "../"
    }, {
        title: "Card title 3",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        imgLocation: "../"
    }, {
        title: "Card title 4",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        imgLocation: "../"
    }, {
        title: "Card title 5",
        description: "This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.",
        imgLocation: "../"
    }]
    return (
        <>
            <div class="row row-cols-1 row-cols-md-3 g-4 p-4">
                {cards.map((card,index) => {
                    return (
                        <div class="col" key={index}>
                            <div class="card h-100">
                                <img src="..." class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title">{card.title}</h5>
                                    <p class="card-text">{card.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>

    );
}
export default PropertyCards;