import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigator from './NavBar.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";


const Product = () => {
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getProduct = async (handle) => {
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
        // console.log(response)
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
        {data.images.nodes[0] == null ? (
              <img src={glasses} />
            ) : (
              <img src={data.images.nodes[0].src} />
        )}
        <h1>{data.title}</h1>
        <InputGroup size="lg">
        <Button variant="outline-secondary" id="button-addon2">-</Button>
        <Form.Control disabled placeholder="1" 
                      aria-label="Cart Addon"
                      aria-describedby="cart-addon"
                       />
        <Button variant="outline-secondary" id="button-addon2">+</Button>
        </InputGroup>
        <Button type="submit">Add to Cart</Button>
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

export default Product;