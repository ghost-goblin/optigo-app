import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";


const CustomerPage = () => {
  const shopname = useSelector((state) => state.shop.name);

  return (
    <div style={{paddingTop:'2rem'}}>
    <Container>
      <h1>Why people are raving about {shopname}</h1>
      <Row xs={1} md={3} className="g-4" style={{paddingTop:'2rem', textAlign:'left'}}>
        <Col>
          <Card>
            <Card.Img variant="top" src={photo1} />
            <Card.Body>
              <Card.Text  className="blockquote">
               {shopname} instantly replaced my old glasses.
               Hard to believe something so easy and so fast can add so much style but it's a real game changer.
              </Card.Text>
              <Card.Title className="blockquote-footer mb-0 font-italic">Jessica</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={photo2} />
            <Card.Body>
              <Card.Text className="blockquote">
              Every time I use {shopname} I smile.
              It has made getting new glasses so much fun.
              As someone who constantly changes frames, {shopname} is a must-have!
              </Card.Text>
              <Card.Title className="blockquote-footer mb-0 font-italic">Adrian</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Img variant="top" src={photo3} />
            <Card.Body>
              <Card.Text className="blockquote">
               {shopname} is an amazing and friendly opticians.
               They offer stylish and customisable frames with any prescription that you require.
               And they deliver!
              </Card.Text>
              <Card.Title className="blockquote-footer mb-0 font-italic">Elliot</Card.Title>
            </Card.Body>
          </Card>
        </Col>
    </Row>
    </Container>
    </div>
  );
};

export default CustomerPage;