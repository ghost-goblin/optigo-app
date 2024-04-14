import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import Navigator from './NavBar.jsx';


const Products = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const getProducts = async () => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
      },
      data: {
        query: `{
          products(first: 9) {
            edges {
              node {
                id
                title
                handle
                description
                featuredImage {
                  src
                }
                variants(first: 1) {
                  nodes {
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        } 
        `
      }
    };
    axios.request(options)
      .then(function (response) {
        setData(response.data.data.products);
      })
      .catch(function (error) {
        console.error(error);
      });      
  
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])

  useEffect(() => {
    getProducts();
    
  }, []);  


if (data) {
  try {
  return (
    <div className="App">
      <Navigator />
     <Row xs={1} md={3} className="g-4">
          {data.edges.map((item) => (
        <Col key={item.node.id}>
          <Card>
            {item.node.featuredImage == null ? (
              <Link to={`/product/${item.node.handle}`}><Card.Img variant="top" src={glasses} /></Link>
            ) : (
              <Link to={`/product/${item.node.handle}`}><Card.Img variant="top" src={item.node.featuredImage.src} /></Link>
            )}
            <Card.Body>
              <Card.Title>{item.node.title}</Card.Title>
              <Card.Text>{item.node.variants.nodes[0].price.amount}</Card.Text>
              <Button>Add to Cart</Button>
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
     <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
     </Spinner>
   )}
   </div>
};

export default Products;