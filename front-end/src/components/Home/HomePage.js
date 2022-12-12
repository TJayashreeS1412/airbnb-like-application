import React from 'react';
import SearchComponent from './Search';
import "./HomePage.scss"
import HomeProperties from './HomeProperties';
const HomePage = () => {
    return (
        <div  className='app-body'>
            <SearchComponent />
            <HomeProperties />
        </div>

    );
}
export default HomePage;