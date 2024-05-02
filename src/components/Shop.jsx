import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ErrorPage from "./ErrorPage.jsx";
import Footer from './Footer.jsx';
import glasses from "../assets/glasses.svg";
import Navigator from './NavBar.jsx';
import { useSelector } from 'react-redux';
import { useQueryQuery  } from '../services/api/shop.js';



const Products = () => {
  const moneyFormat = useSelector((state) => state.shop.money)
  const { data, error, isLoading } = useQueryQuery();
  console.log(data,error,isLoading);
  

  if (data) {
    try {
    return (
      <div className="App">
      <Navigator />
      <Container>
      <Row xs={1} md={3} className="g-4">
            {data.data.products.edges.map((item) => (
          <Col key={item.node.id}>
            <Card>
              {item.node.featuredImage == null ? (
                <Link to={`/product/${item.node.handle}` }><Card.Img variant="top" src={glasses} /></Link>
              ) : (
                <Link to={`/product/${item.node.handle}`}><Card.Img variant="top" src={item.node.featuredImage.src} /></Link>
              )}
              <Card.Body>
                <Card.Title>{item.node.title}</Card.Title>
                <Card.Text>{moneyFormat.replace('{{amount}}', item.node.variants.nodes[0].price.amount+'0')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>  
      </Container>
      <Outlet />
      <Footer />
      </div>
    )} catch(e) {
      console.log(e)
    }
  } 
  if (isLoading) {
    return <div>
    <Navigator />
    <Container>
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>
    </Container>
    <Footer />
    </div>
  }
  if (error) {
  return <div>
    <Navigator />
    <ErrorPage />
    <Footer />
    </div>
  }
};

export default Products;