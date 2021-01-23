import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/navbar.sass';

import W2WLogo from '../assets/images/w2w-logo.png';
import WTCLogo from '../assets/images/wtcfl-logo-white.png';

class MainNavbar extends Component {
  public render(): JSX.Element {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <LinkContainer to="/home">
          <Navbar.Brand>
            <img
              src={ W2WLogo }
              height="100"
              alt="We To World"
            ></img>
            <span className="d-none d-lg-inline-block mx-lg-4">|</span>
            <img
              className="d-none d-lg-inline-block"
              src={ WTCLogo }
              height="30"
              alt="World Trade Center - Fort Lauderdale"
            >
            </img>
            <span className="mx-3 mx-lg-4">|</span>
            <span>
              <b>Apps</b>
            </span>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="main-navbar-links"/>
        <Navbar.Collapse id="main-navbar-links">
          <Nav className="ml-auto">
            <LinkContainer to="/home">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/services">
              <Nav.Link>Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default MainNavbar;
