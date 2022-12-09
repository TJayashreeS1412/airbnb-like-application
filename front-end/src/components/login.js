import React from 'react';
import { useState } from 'react';
import SuccessfulLogin from './SuccessfulLogin';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/api/users/");
            const data = await response.json();
            let isLogin = false;

            // Check if the user exists and credentials match
            for (let i = 0; i < data.length; i++) {
                if (data[i].email == email && data[i].password == password){
                    isLogin = true;
                    console.log("User successfully logged in!");
                    localStorage.setItem("userId", email);
                    console.log(localStorage.getItem("userId"));
                    setEmail("");
                    setPassword("");
                }
                else if(data[i].email == email){
                    isLogin = true;
                    console.log("Incorrect password");
                }
            }
            if (isLogin == false){
                console.log("No user found!");
                setEmail("");
                setPassword("");
            }
        }
        catch(err){
            console.log(err);
        }
    };
    return(
        <div class="loginFormBlock">
            <form class="loginForm m-3 m-lg-5" onSubmit={handleLogin}>
                <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
                </div>
                <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;