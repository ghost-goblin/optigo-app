import React from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import GreetingSticker from "../assets/GreetingSticker.png";
import LightningSticker from "../assets/LightningSticker.png";
import AtomSticker from "../assets/AtomSticker.png";
import ShoeSticker from "../assets/ShoeSticker.png";



const FunFactsPage = () => {
  const shopname = useSelector((state) => state.shop.name);

  return (
    <div style={{paddingTop:'2rem'}}>
      <h1>Keep your eyes smiling</h1>
      <br />
       <Container style={{textAlign:'left'}}>
      <Row>
        <Col md>
          <Row>
          <Col sm={4}><Image src={GreetingSticker} fluid /></Col>
          <Col sm={8}>
          <h3>We listen to you</h3>
          <p>Get in touch with us! We provide all the expertise and experience of an opticians in a mobile package.</p>
          </Col>
          </Row>
        </Col>
        <Col md>
        <Row>
          <Col sm={4}><Image src={LightningSticker} fluid /></Col>
          <Col sm={8}>
          <h3>Lightning-fast service</h3>
          <p>{shopname} offers speedy services for all your optical needs. From prescription lenses to sunglasses, we've got you covered.</p>
          </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col md>
        <Row>
          <Col sm={4}><Image src={AtomSticker} fluid /></Col>
          <Col sm={8}>
          <h3>Custom made lenses</h3>
          <p>We cut and make our lenses by hand. Each pair of glasses is made with love!</p>
          </Col>
          </Row>
        </Col>
        <Col md>
        <Row>
          <Col sm={4}><Image src={ShoeSticker} fluid /></Col>
          <Col sm={8}>
          <h3>We come to you</h3>
          <p>The {shopname} philosophy is that we do the work so you don't have to. Delivery available throughout the U.K.</p>
          </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default FunFactsPage;