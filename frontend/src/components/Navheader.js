import React from 'react'
import { Button, Navbar, Container } from 'react-bootstrap';
import {Link, useLocation } from 'react-router-dom';



function Navheader() {
    const location = useLocation();

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Application Dashboard</Navbar.Brand>
                    {location.pathname !== '/' && (
                        <Link to="/">
                            <Button variant="primary">Back to Dashboard</Button>
                        </Link>
                    )}
                    {location.pathname !== '/add' && (
                        <Link to="/add">
                            <Button variant="primary">Add Project</Button>
                        </Link>
                    )}
                </Container>
            </Navbar>
        </>
    )
}

export default Navheader