import React from 'react';
import { Link } from "react-router-dom";
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PhoneSticker from "../assets/PhoneSticker.png";
import { Instagram, Facebook, Envelope } from 'react-bootstrap-icons';



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
            <Col sm>{shopname}</Col>
            <Col sm><Link to='https://www.instagram.com/optigomobileoptics' target='_blank' rel='noopener noreferrer'><Instagram /></Link></Col>
            <Col sm><Link to='https://www.facebook.com/optigomobileoptics' target='_blank' rel='noopener noreferrer'><Facebook /></Link></Col>
            <Col sm><Envelope /></Col>
        </Row>
        <Row style={{padding:'1rem'}}>
            <Col>About</Col>
            <Col>Shop</Col>
            <Col>Contact</Col>
            <Col><Link to='https://speckleeyewear.etsy.com' target='_blank' rel='noopener noreferrer'>👜&nbsp;Our&nbsp;Etsy&nbsp;Store</Link></Col>
            <Col><Image width='80px' src={PhoneSticker} fluid /></Col>
        </Row>
        <Row>
            <Col><small className="text-muted">&#169;&nbsp;{shopname}&nbsp;Mobile&nbsp;Opticians&nbsp;Inc. All rights reserved.</small></Col>
            <Col><small className="text-muted">Terms of Service</small></Col>
            <Col><small className="text-muted">Privacy Policy</small></Col>
        </Row>
        </Container>
        </div>
    );
    };
};

export default Footer;