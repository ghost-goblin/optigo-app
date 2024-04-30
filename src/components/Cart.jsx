import React from 'react';
import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import { useSelector } from 'react-redux';
import { useState, useEffect, createContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useQueryQuery  } from '../services/api/cart.js';


const Cart = () => {
  const cart = useSelector((state) => state.cart.cartid)
  const [cartId] = useState(cart);
  const [totalAmount, settotalAmount] = useState(0);
  const [lineItems, setlineItems] = useState(null);
  const [checkoutUrl, setcheckoutUrl] = useState(null);
  const CartContext = createContext(lineItems);
  const { data, error, isLoading } = useQueryQuery(cartId);
  const [userError, setuserError] = useState(null);
  console.log(data,error,isLoading);

  const getCart = (cartId) => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
      },
      data: {
        query: `
              {
                cart(id: "${cartId}") {
                  id
                  totalQuantity
                  checkoutUrl
                  cost {
                    totalAmount {
                      amount
                      currencyCode
                    }
                  }
                  lines(first: 10) {
                    edges {
                      node {
                        merchandise {
                          ... on ProductVariant {
                            id
                            title
                          }
                        }
                        attributes {
                          key
                          value
                        }
                        id
                        quantity
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
        setlineItems(response.data.data.cart.lines)
        setcheckoutUrl(response.data.data.cart.checkoutUrl) 
        settotalAmount(response.data.data.cart.cost.totalAmount.amount)
        console.log(response)
      })
      .catch(function (error) {
        console.error(error);
      });
  };



  const cartLinesUpdate = (merchandiseId, itemQuantity, key, value) => {
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
          cartLinesUpdate(
            cartId: "${cartId}"
            lines: {
              id: "${merchandiseId}"
              quantity: ${itemQuantity - 1}
              attributes: { key: "${key}", value: "${value}" }
            }
          ) {
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
          if (response.data.data.cartLinesUpdate.userErrors[0]) {
            setuserError(response.data.data.cartLinesAdd.userErrors[0].message)
          } else {
            getCart(cartId)
            console.log(response)
          }
         
        })
        .catch(function (error) {
          console.error(error);
        });    
    };
  };


  useEffect(() => {
    if (cartId) {
      getCart(cartId)     
    }
  }, [cartId]);

  
  
  return (
      <> 
        
        {lineItems == null ? (
            <div>
            <Navigator />  
            <p>Wow! So empty!</p>
            <Link to="/" >Click here to go back</Link>
            </div>
            ) : (
            <div>
            <CartContext.Provider value={lineItems}>
            <Navigator />  
            {lineItems.edges.map((item) => (
              <div>
               <InputGroup size="lg">
                <Link to={`/product/${item.node.attributes[0].key}`}>
                <img width="200px" src={item.node.attributes[0].value} />
                </Link>
                <h3>{item.node.attributes[0].key}</h3>
                <p>{item.node.merchandise.title}</p>        
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                aria-label="Increment value"
                onClick={() => cartLinesUpdate(item.node.id,item.node.quantity,item.node.attributes[0].key,item.node.attributes[0].value)}
                >-</Button>
                <Form.Control disabled placeholder={item.node.quantity}
                              aria-label="Cart Addon"
                              aria-describedby="cart-addon"
                              />
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                aria-label="Increment value"
                // onClick={() => dispatch(increment())}
                >+</Button>
              </InputGroup>   
        
            </div>
             ))}
            </CartContext.Provider>
            {totalAmount}
            <Link to={checkoutUrl}><Button>Checkout</Button></Link>
            </div>
          )}
      </>
    );
  };

export default Cart;