import React from 'react';
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PhoneSticker from "../assets/PhoneSticker.png";
import { Instagram, Facebook, Twitter } from 'react-bootstrap-icons';



const Footer = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
        <div style={{position:'relative', width:'100%', bottom:'0',padding:'1rem'}}>
        <hr />
        <Container>
        <Row style={{padding:'1rem'}}>
            <Col sm><b>{shopname}</b></Col>
            <Col sm><Instagram /></Col>
            <Col sm><Facebook /></Col>
            <Col sm><Twitter /></Col>
        </Row>
        <Row style={{padding:'1rem'}}>
            <Col>About</Col>
            <Col>Shop</Col>
            <Col>Contact</Col>
            <Col>Etsy</Col>
            <Col><Image width='80px' src={PhoneSticker} fluid /></Col>
        </Row>
        <Row>
            <Col><small class="text-muted">&#169; {shopname} Mobile Opticians Inc. All rights reserved.</small></Col>
            <Col><small class="text-muted">Terms of Service</small></Col>
            <Col><small class="text-muted">Privacy Policy</small></Col>
        </Row>
        </Container>
        </div>
    );
    };
};

export default Footer;