import React from 'react';
import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Navigator from './NavBar.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router-dom';
import { useQueryQuery  } from '../services/api/product.js';


const Product = () => {
  const { handle } = useParams();
  const [loading, setLoading] = useState(true);
  const CartContext = createContext(null);
  const location = useLocation();
  const [cartId, setcartId] = useState(location.state);
  const [totalItems, settotalItems] = useState(null);
  const { data, error, isLoading } = useQueryQuery(handle);
  console.log(data,error,isLoading);

  

const createCart = (merchandiseId, handle) => {
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
                  attributes: [
                    {
                      key: "${handle}",
                      value: "${merchandiseId}"
                    }
                  ],
                  quantity: 1
                  merchandiseId: "${merchandiseId}"
                }
              ]
              attributes: { key: "cart_key", value: "cart_value" }
            }
          ) {
            cart {
              id
              totalQuantity
            }
            userErrors {
              field
              message
            }
          }
        }
        `
      }
    };
    if (cartId == null) {
      axios.request(options)
        .then(function (response) {
          setcartId(response.data.data.cartCreate.cart.id)
          settotalItems(response.data.data.cartCreate.cart.totalQuantity)
          console.log(response.data.data.cartCreate.cart.id+' Cart created!')
          console.log(response)
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      console.log('Cart already created')
      cartLinesAdd(merchandiseId, handle)
    }
  
  };



  const cartLinesAdd  = (merchandiseId, handle) => {
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
          cartLinesAdd(
            cartId: "${cartId}",
            lines: [
              {
                attributes: [
                  {
                    key: "${handle}",
                    value: "${merchandiseId}"
                  }
                ],
                merchandiseId: "${merchandiseId}",
                quantity: 1
              }
            ]
          ) {
            cart {
              id
              totalQuantity
            }
            userErrors {
              field
              message
            }
          }
        }  
        `
      }
    };
    if (cartId) {
      axios.request(options)
        .then(function (response) {
          settotalItems(response.data.data.cartLinesAdd.cart.totalQuantity)
          console.log(response)
        })
        .catch(function (error) {
          console.error(error);
        });    
    };
  };



  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, [])

  
  if (data) {
    try {
    return (
      <div>
        <CartContext.Provider value={cartId} itemtotal={totalItems}>
        <Navigator value={cartId}/>
        </CartContext.Provider>
        <Container>
        <Row>
          <Col>
          {data.data.product.images.nodes[0] == null ? (
                <img width="100%" src={glasses} />
              ) : (
                <img width="100%" src={data.data.product.images.nodes[0].src} />
          )}
          
          </Col>
          <Col>
          <h1>{data.data.product.title}</h1>
          <Button onClick={(e) => createCart(data.data.product.variants.edges[0].node.id, data.data.product.handle)}>Add to Cart</Button>
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
        <>
        <Navigator />
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
      )}
      </div>
};

export default Product;