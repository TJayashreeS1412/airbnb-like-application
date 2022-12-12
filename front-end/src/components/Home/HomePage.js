import React from 'react';
import SearchComponent from './Search';
import "./HomePage.scss"
import PropertyCards from './Card';
const HomePage = () => {
    return (
        <div  className='app-body'>
            <SearchComponent />
            <PropertyCards />
        </div>

    );
}
export default HomePage;