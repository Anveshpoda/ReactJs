import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import logo from '../media/logo.svg';
import { Button , ButtonGroup , Navbar,Nav,MenuItem,NavItem,NavDropdown } from 'react-bootstrap';
const Header = () =>{
        return(
            <dev>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                 <h1 className="App-title">Anvesh  GCS</h1>
                </header>
                {/* <dev id="menu-outer">
               <ul id="horizontal-list">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
               </ul>
               </dev>     */}
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                 <Navbar.Brand>
                 <a href="#brand">React-Bootstrap</a>
              </Navbar.Brand>
                <Navbar.Toggle />
                </Navbar.Header>
                 <Navbar.Collapse>
                 <Nav>
                 <NavItem eventKey={1} href="/">
                         Home
                  </NavItem>
                  <NavItem eventKey={2} href="/Login">
                         Login
                 </NavItem>
                 <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                 <MenuItem eventKey={3.1} href="/Login1">LOGIN</MenuItem>
                 <MenuItem eventKey={3.2} href="/Table">Table</MenuItem>
                 <MenuItem eventKey={3.3} href="/category">Category</MenuItem>
                 <MenuItem divider />
                 <MenuItem eventKey={3.3}>Sign Out</MenuItem>
                </NavDropdown>
                 </Nav>
                 <Nav pullRight>
                  <NavItem eventKey={1} href="#">
                     Link Right
               </NavItem>
               <NavItem eventKey={2} href="#">
                     Link Right
                </NavItem>
                 </Nav>
                 </Navbar.Collapse>
                 </Navbar>
              </dev>
        )
}

export default Header