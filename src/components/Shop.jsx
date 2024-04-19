import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import Navigator from './NavBar.jsx';
import { useLocation } from 'react-router-dom';
import { useEffect, createContext, useState } from "react";
import { useQueryQuery  } from '../services/api/shop.js';



const Products = () => {
  const [loading, setLoading] = useState(true);
  const CartContext = createContext(null);
  const location = useLocation();
  const { data, error, isLoading } = useQueryQuery();
  console.log(data,error,isLoading);
  

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])



if (data) {
  try {
  return (
    <div className="App">
       <CartContext.Provider value={location.state}>
        <Navigator value={location.state} />
        </CartContext.Provider>
     <Row xs={1} md={3} className="g-4">
          {data.data.products.edges.map((item) => (
        <Col key={item.node.id}>
          <Card>
            {item.node.featuredImage == null ? (
              <Link to={`/product/${item.node.handle}` } state={location.state}><Card.Img variant="top" src={glasses} /></Link>
            ) : (
              <Link to={`/product/${item.node.handle}`} state={location.state}><Card.Img variant="top" src={item.node.featuredImage.src} /></Link>
            )}
            <Card.Body>
              <Card.Title>{item.node.title}</Card.Title>
              <Card.Text>{item.node.variants.nodes[0].price.amount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>  
    <Outlet />  
    </div>
  )} catch(e) {
    console.log(e)
  }
 } return <div>
 {loading === false ? (
 <ErrorPage />
   ) : (
     <><Navigator />
     <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
     </Spinner>
     </>
   )}
   </div>
};

export default Products;