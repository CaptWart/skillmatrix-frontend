import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';

function Header(){
    return(
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Brand href="/admin">Admin</Navbar.Brand>
        <Navbar.Brand href="/manager">Manager</Navbar.Brand>
        <Navbar.Brand href="/user">User</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Form inline>
            <a href="/login"><Button>Login</Button></a>
            </Form>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;