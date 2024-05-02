import React from 'react';
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Instagram, Facebook } from 'react-bootstrap-icons';



const Footer = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
        <div style={{position:'fixed', width:'100%', left:'0', bottom:'0', backgroundColor:'#eeeeee', padding:'1rem'}}>
        <Container>
        <Row>
            <Col>{shopname}</Col>
            <Col sm><Instagram /></Col>
            <Col sm><Facebook /></Col>
            <Col>Heading 1</Col>
        </Row>
        <Row>
            <Col>Text 1</Col>
            <Col>Text 2</Col>
            <Col>Text 3</Col>
            <Col>Text 4</Col>
        </Row>
        </Container>
        </div>
    );
    };
};

export default Footer;