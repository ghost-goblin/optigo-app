import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import GreetingSticker from "../assets/GreetingSticker.png";
import EyeSticker from "../assets/EyeSticker.png";
import MagnifyingGlassSticker from "../assets/MagnifyingGlassSticker.png";


const AboutPage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
      <div>
      <Container>
      <Row>
        <h1>How does {shopname} make eyewear simple and fun?</h1>
        <Col sm><Image src={GreetingSticker} fluid /><br />Text 1</Col>
        <Col sm><Image src={EyeSticker} fluid /><br />Text 2</Col>
        <Col sm><Image src={EyeSticker} fluid /><br />Text 3</Col>
      </Row>
      <Row>
        <h1>Why people are raving about {shopname} ...</h1>
        <Col sm><Image src={MagnifyingGlassSticker} fluid /><br />Text 1</Col>
        <Col sm><Image src={GreetingSticker} fluid /><br />Text 2</Col>
        <Col sm><Image src={GreetingSticker} fluid /><br />Text 3</Col>
      </Row>
    </Container>
      </div>
    );
 };
};

export default AboutPage;