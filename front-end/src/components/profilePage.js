import React from 'react';
import FavProps from './ProfilePage/FavProps';
import UpcomingTrips from './ProfilePage/UpcomingTrips';
import PastTrips from './ProfilePage/PastTrips';
import Greeting from './ProfilePage/Greeting';

const ProfilePage = () => {
    return(
    <>
    <Greeting />
    <FavProps />
    <UpcomingTrips />
    <PastTrips />
    </>
    );
}

export default ProfilePage