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



const HowToPage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
      <div>
      <Container>
      <h1>How does {shopname} make eyewear simple and fun?</h1>
      <Row style={{paddingTop:'2rem', textAlign:'left'}}>
        <Col md>
          <Image src={MagnifyingGlassSticker} fluid /><br />
          <h2>1. Choose a style</h2><br />
          <p>Choose from a collection of multiple styles, shades and colours.</p>
        </Col>
        <Col md>
          <Image src={BalanceSticker} fluid /><br />
          <h2>2. Customise your lens prescription</h2><br />
          <p>Add your prescription lens variation and create the pair of glasses that tells your story.</p>
        </Col>
        <Col md>
          <Image src={BoxSticker} fluid /><br />
          <h2>3. Get it delivered</h2><br />
          <p>We deliver your new glasses to your home so you don't have to move a muscle.</p>
        </Col>
      </Row>
    </Container>
      </div>
    );
 };
};

export default HowToPage;