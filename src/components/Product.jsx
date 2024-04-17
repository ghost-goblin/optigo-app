import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
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
import { useLocation } from 'react-router-dom';


const Product = () => {
  const { handle } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const CartContext = createContext(null);
  const location = useLocation();
  const [cartId, setcartId] = useState(location.state);
  
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
            title
            handle
            availableForSale
            totalInventory
            images(first: 1) {
              nodes {
                src
              }
            }
            variants(first: 5) {
              edges {
                node {
                  id
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
        setData(response.data.data.product);
        console.log(response)
      })
      .catch(function (error) {
        console.error(error);
      });      
  
  };


const createCart = (merchandiseId) => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
      },
      data: {
        query: `
        mutation {
          cartCreate(
            input: {
              lines: [
                {
                  quantity: 1
                  merchandiseId: "${merchandiseId}"
                }
              ]
              attributes: { key: "cart_attribute", value: "This is a cart attribute" }
            }
          ) {
            cart {
              id
              createdAt
              updatedAt
              lines(first: 10) {
                edges {
                  node {
                    id
                    merchandise {
                      ... on ProductVariant {
                        id
                      }
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
        setcartId(response.data.data.cartCreate.cart.id)
        console.log(cartId+' Cart created!')
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
        <CartContext.Provider value={cartId}>
        <Navigator value={cartId} />
        </CartContext.Provider>
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
          <Button onClick={(event) => createCart("gid://shopify/ProductVariant/48129423180120", event)}>Add to Cart</Button>
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