import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const TopMenu = () => {
    const [userName, setUserName] = useState("");
    let fetchUserName = async (e) => {
        console.log("Inside FetchUserName");
        e.preventDefault();
        try {
            let userId = localStorage.getItem("userId");
            const response = await fetch("http://localhost:3000/api/users/" + userId);
            const data = await response.json();
            setUserName(data[0].firstName + ' ' + data[0].lastName);
        }
        catch (err) {
            console.log(err);
        }
    }
    
    //use this in profile
    useEffect(()=>{
        fetchUserName()
    },[])

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">
                    {/* <img class="logo" src="./Logo-Balloon-RefinedFonts.svg" alt="logo" /> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className='justify-content-end'>

                    <Nav >
                        <Nav.Link as={Link} to="/login" >
                            Login
                        </Nav.Link>
                        <Nav.Link eventKey={2} as={Link} to="/profile">
                            Profile
                        </Nav.Link>
                        {/* ----- */}
                        <Nav.Link eventKey={2} as={Link} to="/register">
                            Register
                        </Nav.Link>
                        <Nav.Link eventKey={2} as={Link} to="/register">
                            Signout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default TopMenu;
