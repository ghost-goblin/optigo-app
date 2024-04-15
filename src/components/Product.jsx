import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigator from './NavBar.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ErrorPage from "./ErrorPage.jsx";
import CartCounter from "./CartCounter.jsx";
import glasses from "../assets/glasses.svg";
import Button from 'react-bootstrap/Button';


const Product = () => {
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getProduct = (handle) => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
      },
      data: {
        query: `{
          product(handle: "${handle}") {
            id
            title
            handle
            availableForSale
            totalInventory
            images(first: 1) {
              nodes {
                src
              }
            }
          }
        }
        `
      }
    };
    axios.request(options)
      .then(function (response) {
        setData(response.data.data.product);
        console.log(response)
      })
      .catch(function (error) {
        console.error(error);
      });      
  
  };


  
  useEffect(() => {
    getProduct(`${handle}`);
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])


  if (data) {
    try {
    return (
      <div>
        <Navigator />
        <Container>
        <Row>
          <Col>
          {data.images.nodes[0] == null ? (
                <img width="100%" src={glasses} />
              ) : (
                <img width="100%" src={data.images.nodes[0].src} />
          )}
          
          </Col>
          <Col>
          <h1>{data.title}</h1>
          <CartCounter />
          <Button type="submit">Add to Cart</Button>
          </Col>
        </Row>
        </Container>
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

export default Product;