import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import BalanceSticker from "../assets/BalanceSticker.png";
import MagnifyingGlassSticker from "../assets/MagnifyingGlassSticker.png";
import BoxSticker from "../assets/BoxSticker.png";



const AboutPage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
      <div>
      <Container>
      <Row >
        <h1>How does {shopname} make eyewear simple and fun?</h1>
        <Col sm style={{textAlign:'left'}}>
          <Image src={MagnifyingGlassSticker} fluid /><br />
          <h2>1. Choose a frame style</h2><br />
          <p>Choose a collection from multiple styles and themes made by artists around the world.</p>
        </Col>
        <Col sm style={{textAlign:'left'}}>
          <Image src={BalanceSticker} fluid /><br />
          <h2>2. Customize your lens prescription</h2><br />
          <p>Play around with the variations until you create the art that tells your story.</p>
        </Col>
        <Col sm style={{textAlign:'left'}}>
          <Image src={BoxSticker} fluid /><br />
          <h2>3. Get it delivered</h2><br />
          <p>Download a PNG or SVG of your creation and use it on your web app, presentation, or any project you want to bring to life.</p>
        </Col>
      </Row>
    </Container>
      </div>
    );
 };
};

export default AboutPage;