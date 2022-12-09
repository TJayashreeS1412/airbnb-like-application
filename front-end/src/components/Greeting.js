import React from 'react';
import { useState } from 'react';

const Greeting = (props) => {
    const [userName, setUserName] = useState("");
    let fetchUserName = async (e) => {
        console.log("Inside FetchUserName");
        // e.preventDefault();
        try{
            let userId = localStorage.getItem("userId");
            const response = await fetch("http://localhost:3000/api/users/"+userId);
            const data = await response.json();
            setUserName(data[0].firstName+' '+data[0].lastName);
        }
        catch(err){
            console.log(err);
        }
    }
    return(
        <div class="greetingBlock">
            <h1>Hello,</h1>
            {fetchUserName()}
            {/* {userName} */}
            {/* <button class="dropdown-item" type="button" onClick={fetchUserName}>
                <a href="#">Profile</a>
            </button> */}
        </div>
    );
}

export default Greeting;