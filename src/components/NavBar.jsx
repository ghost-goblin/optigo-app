import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Cart } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';

import { Link } from "react-router-dom";


const Navigator = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Link to="/cart"><Cart /></Link>
      <Link to="/"><Navbar.Brand><img src={logo} height="25px" alt="icon" />Optigo</Navbar.Brand></Link>    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/products">Shop</Link></Nav.Link>
            <Nav.Link><Link to="/">About</Link></Nav.Link>
            <Nav.Link><Link to="/">Contact</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;