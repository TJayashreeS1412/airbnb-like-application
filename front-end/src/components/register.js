import React from 'react';
import { useState } from "react";
import "./scss/register.scss"
const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    var passwordFlag = false;
    let handleRegistration = async (e) => {
        e.preventDefault();
        try{
            const getResponse = await fetch("http://localhost:3000/api/users/");
            const getData = await getResponse.json();
            let firstNameBox = document.getElementById('firstNameRegister');
            let lastNameBox = document.getElementById('lastNameRegister');
            let emailBox = document.getElementById('exampleInputEmail1');
            let passwordBox = document.getElementById('exampleInputPassword1');
            firstNameBox.style.borderColor = "grey";
            lastNameBox.style.borderColor = "grey";
            emailBox.style.borderColor = "grey";
            passwordBox.style.borderColor = "grey";

            if (firstName.length == 0){
                firstNameBox.style.borderColor = "red";
                alert('First name cannot be empty!');   
            }
            if (lastName.length == 0){
                lastNameBox.style.borderColor = "red";
                alert('Last name cannot be empty!');
            }
            if (email.length == 0){
                emailBox.style.borderColor = "red";
                alert('Email cannot be empty!');
            }
            console.log(getData);
            // Check if the email address already exists
            for (let i = 0; i < getData.length; i++) {
                
                if (getData[i].email == email){
                    emailBox.style.borderColor = "red";
                    alert('Email already exists!');
                }
            }

            // Check the strength of the password
            // TODO - more complex regex check for strength
            if (password.length < 8){
                passwordBox.style.borderColor = "red";
                passwordFlag = true;
                alert('Password should be atleast 8 characters long!');
            }

            // Proceeding toward POST request
            let response = await fetch("http://localhost:3000/api/users", {
                method: "POST",

                // Upon removing headers, null values will get pushed to DB
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password
                })
            });
            if (response.status == 200){
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                alert("User successfully registered!");
                window.location.href="/login";
            }
            else{
                alert("Registration failed!");
            }
        }
        catch(err){
            console.log(err);
        }
    };
    return(
        <div class="registerFormBlock app-body d-flex justify-content-center">
            <form class="registerForm  w-100 m-4 m-lg-0 d-flex justify-content-center flex-column" onSubmit={handleRegistration}>
                <div class="mb-3">
                    <label class="form-label">First Name</label>
                    <input type="text" 
                    class="form-control"
                    value={firstName}
                    id="firstNameRegister"
                    onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input type="text" class="form-control"
                    value={lastName}
                    id="lastNameRegister"
                    onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    {passwordFlag && <p class="error" >Password should be atleast 8 characters long! //make this red color</p>}
                </div>
                <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
        </div>
    );
}

export default Register;