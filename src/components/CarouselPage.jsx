import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";


const CarouselPage = () => {
  const shopname = useSelector((state) => state.shop.name);

  return (
    <div style={{paddingTop:'2rem'}}>
    <Container>
      <h1>Why people are raving about {shopname}</h1>
      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card>
            <Card.Img variant="top" src={photo1} />
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
        <Col>
          <Card>
            <Card.Img variant="top" src={photo2} />
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
        <Col>
          <Card>
            <Card.Img variant="top" src={photo3} />
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
    </Row>
    </Container>
    </div>
  );
};

export default CarouselPage;