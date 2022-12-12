import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "./scss/TopMenu.scss"
const TopMenu = () => {
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

    let fetchUserName = async (e) => {
        console.log("Inside FetchUserName" + userId);
        e.preventDefault();
        try {
            let userId = localStorage.getItem("userId");
            const response = await fetch("http://localhost:3000/api/users?userId=" + userId);
            const data = await response.json();
            setUserName(data[0].firstName + ' ' + data[0].lastName);
        }
        catch (err) {
            console.log(err);
        }
    }

    //use this in profile
    useEffect(() => {
        fetchUserName()
    }, [])

    useEffect(()=>{
        {console.log("session",sessionStorage.getItem("userId"))}
        setUserId(sessionStorage.getItem("userId"))
    },[])

    const handleSignOut = ()=>{
        localStorage.clear();
        sessionStorage.clear();
    }

    return (
        <Navbar bg="light" expand="lg" className='ps-4 pe-4 top-menu'>
            <Container fluid>
                <Navbar.Brand href="/">
                    <img class="logo" src="/logo.svg" alt="logo" width="150" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                    <Nav>

                        {
                            !userId && <Nav.Link as={Link} to="/login" >
                                Login
                            </Nav.Link>
                        }
                        {
                            userId &&  <Nav.Link eventKey={2} as={Link} to="/profile">
                            Profile
                            </Nav.Link>
                        }
                       
                        {
                            !userId &&
                            <Nav.Link eventKey={2} as={Link} to="/register">
                                Register
                            </Nav.Link>
                        }
                        {
                             userId && <Nav.Link eventKey={2} as={Link} to="/login" onClick={handleSignOut}>
                             Signout
                         </Nav.Link>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopMenu;
