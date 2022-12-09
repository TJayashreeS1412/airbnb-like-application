import React from 'react';
import SearchComponent from './Search';
import "./Home.css"
import PropertyCards from './Card';
const HomePage = () => {
    return (
        <>
            <SearchComponent />
            <PropertyCards />
        </>

    );
}
export default HomePage;