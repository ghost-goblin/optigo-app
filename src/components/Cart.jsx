import React from 'react';
import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import { useSelector } from 'react-redux';
import { useState, useEffect, createContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useQueryQuery  } from '../services/api/cart';
import axios from 'axios';


const Cart = () => {
  const cart = useSelector((state) => state.cart.cartid)
  const [cartId] = useState(cart);
  const { data, error, isLoading } = useQueryQuery(cartId);
  const [lineItems, setlineItems] = useState(null);
  const CartContext = createContext(lineItems);
  console.log(data, error, isLoading);


  useEffect(() => {
    if (cartId) {
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
                    lines(first: 10) {
                      edges {
                        node {
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
          console.log(response)
          return response
        })
        .catch(function (error) {
          console.error(error);
        });   
    }
  }, [cartId]);




    return (
      <>
        <Navigator />   
        {lineItems == null ? (
            <div>
            <p>Whoops! So empty!</p>
            <Link to="/" >Click here to go back</Link>
            </div>
            ) : (
            <div>
            <CartContext.Provider value={lineItems}>
            {lineItems.edges.map((item) => (
              <div>
              {item.node.attributes.map((node) => (
               <InputGroup size="lg">
                {JSON.stringify(node)}
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                aria-label="Increment value"
                // onClick={() => dispatch(decrement())}
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
               ))}      
              </div>
            ))}
            </CartContext.Provider>
            <Button>Checkout</Button>
            </div>
          )}
      </>
    );
  };

export default Cart;