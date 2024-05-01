import React from 'react';
import Products from './Products.jsx';
import image from "../assets/roller_skating.png";
import Navigator from './NavBar.jsx'
import eye from "../assets/eye.png";
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Eye } from 'react-bootstrap-icons';


const HomePage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
      <div>
        <Navigator />
        <Container style={{height:"100vh", textAlign:"left", padding:".8rem"}}>
        <Row>
          <Col>
            <div>
            <h1>Optics on the Go</h1>
            <p>{shopname} gives you access to all kinds of professional optical services in the comfort of your own home. <br />Give it a go, it’s kind of fun.</p>
            <p>Take a look around.</p>
            </div>
            </Col>
          <Col><Image src={image} fluid /></Col>
        </Row>
        <Row  xs={2} md={4} lg={6}>
          <Col><Button variant="dark"><Eye /> Shop Frames</Button></Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
              👓💫 About Us
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Our Services</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Contact</Dropdown.Item>
                <Dropdown.Item href="#/action-3">FAQ</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </Col>
      </Row>
      </Container>
      <Products />
      </div>
    );
 };
};

export default HomePage;