import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ProfileStartup = () => {
    return(
        <>
            <div>
                {/* If this is clicked, call Login component */}
                <Link class="m-3" to="/login">Login</Link>
                {/* If this is clicked, call <Register /> */}
                <Link class="m-3" to="/register">Register</Link>
                <Link to="/profile">Profile</Link>
            </div>
            <Outlet />
        </>
    );
}

export default ProfileStartup