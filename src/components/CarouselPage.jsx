import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import glasses from "../assets/glasses.svg";
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';


const CarouselPage = () => {
  const shopname = useSelector((state) => state.shop.name);

  return (
    <div style={{paddingTop:'2rem'}}>
    <Container>
      <h1>Why people are raving about {shopname}</h1>
      <Row xs={1} md={3} className="g-4">
      {Array.from({ length: 3 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={glasses} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
    </div>
  );
};

export default CarouselPage;