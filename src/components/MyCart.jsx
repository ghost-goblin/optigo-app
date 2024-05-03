import React from 'react';
import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import Footer from './Footer.jsx';
import { useSelector } from 'react-redux';
import { useState, useEffect, createContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useQueryQuery  } from '../services/api/cart.js';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Cart } from 'react-bootstrap-icons';




const MyCart = () => {
  const cartstate = useSelector((state) => state.cart.cartid)
  const moneyFormat = useSelector((state) => state.shop.money)
  const [cartId] = useState(cartstate);
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
                  lines(first: 16) {
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
                        cost {
                          amountPerQuantity {
                            amount
                            currencyCode
                          }
                          subtotalAmount {
                            amount
                            currencyCode
                          }
                          totalAmount {
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
        setlineItems(response.data.data.cart.lines)
        setcheckoutUrl(response.data.data.cart.checkoutUrl) 
        settotalAmount(response.data.data.cart.cost.totalAmount.amount)
        console.log(response)
      })
      .catch(function (error) {
        console.error(error);
      });
  };



  const cartLinesUpdate = (event, merchandiseId, itemQuantity, key, value) => {
    let quantity
    if (event.target.value === '+') {
      quantity = itemQuantity + 1
    } else if (event.target.value ==='-') {
      quantity = itemQuantity - 1
    }
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
              quantity: ${quantity}
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
            setuserError(response.data.data.cartLinesUpdate.userErrors[0].message)
          } else {
            getCart(cartId)
            setuserError(null)
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
            <Container>
            <p>Wow! So empty!</p>
            <Link to="/" >Click here to go back</Link>
            </Container>
            <Footer />
            </div>
            ) : (
            <div>
            <CartContext.Provider value={lineItems}>
            <Navigator />  
            {lineItems.edges.map((item) => (
                <Container key={item.node.attributes[0].key}>
                <Row>
                <Col>
                <Link to={`/product/${item.node.attributes[0].key}`}>
                  <Image width='200px' src={item.node.attributes[0].value} />
                </Link>
                </Col>
                <Col>
                <h3>{moneyFormat.replace('{{amount}}', item.node.cost.amountPerQuantity.amount+'0')}</h3>
                <small className="text-muted">{item.node.merchandise.title}</small>
                <InputGroup size="lg">
                  <Button 
                  value="-"
                  variant="outline-secondary" 
                  id="button-addon2"
                  aria-label="Increment value"
                  onClick={(event) => cartLinesUpdate(event,item.node.id,item.node.quantity,item.node.attributes[0].key,item.node.attributes[0].value)}
                  >-</Button>
                  <Form.Control disabled placeholder={item.node.quantity}
                                aria-label="Cart Addon"
                                aria-describedby="cart-addon"
                                />
                  <Button
                  value="+"
                  variant="outline-secondary" 
                  id="button-addon2"
                  aria-label="Increment value"
                  onClick={(event) => cartLinesUpdate(event,item.node.id,item.node.quantity,item.node.attributes[0].key,item.node.attributes[0].value)}
                  >+</Button>
              </InputGroup>
              </Col>
              </Row>
              <hr />
              </Container>
             ))}
             <Container>
            <Row>
            {userError}
             <Col>
             <h3>{moneyFormat.replace('{{amount}}', totalAmount+'0')}</h3>
             </Col>
             <Col>   
             <Button variant="primary"><Link to={checkoutUrl}><Cart /> Checkout</Link></Button>
             </Col>
             </Row>
            </Container>
            </CartContext.Provider>
            <Footer />
            </div>
          )}
      </>
    );
  };

export default MyCart;