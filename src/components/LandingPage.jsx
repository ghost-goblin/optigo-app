import React from 'react';
import { Link } from "react-router-dom";
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Eye } from 'react-bootstrap-icons';
import Rolling from "../assets/Rolling.png";
import LaptopSticker from "../assets/LaptopSticker.png";


const LandingPage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopdescription = useSelector((state) => state.shop.description);
  const shopslogan = useSelector((state) => state.shop.slogan);
  console.log(data, error, isLoading)


  if (data) {
    return (
        <div style={{paddingTop:'2rem'}}>
        <Container>
        <Row md>
          <Col md>
            <div style={{textAlign:'left'}}>
            <h1>{shopslogan}</h1>
            <p>{shopdescription}</p>
            <Image width='150px' src={LaptopSticker} />
            <p>Give it a go, it’s kind of fun.</p>
            <Row>
            <Col>
            <Button variant="dark"><Link to="/products"><Eye />&nbsp;Shop&nbsp;Frames</Link></Button>
            </Col>
            <Col>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
              👓💫&nbsp;About&nbsp;Us
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as="button">Our Services</Dropdown.Item>
                <Dropdown.Item as="button">Contact</Dropdown.Item>
                <Dropdown.Item as="button">FAQ</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </Col>
            </Row>
            </div>
          </Col>
          <Col md>
          <Image src={Rolling} fluid />
          </Col>
        </Row>
  
      </Container>
      </div>

    );
 };
};

export default LandingPage;