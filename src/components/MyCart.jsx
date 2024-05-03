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
import { Cart, Trash } from 'react-bootstrap-icons';
import glasses from "../assets/glasses.svg";
import MonsterSticker from "../assets/MonsterSticker.png";
import Spinner from 'react-bootstrap/Spinner';




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
  const [loading, setLoading] = useState(true);



  const getCart = React.useCallback(() => {
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
                            product {
                              title
                              handle
                              featuredImage {
                                src
                              }
                            }
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
        setLoading(false)
        console.log(response)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [cartId]);



  const cartLinesUpdate = (event, merchandiseId, itemQuantity) => {
    event.preventDefault();
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
            console.log(response)
          } else {
            getCart()
            setuserError(null)
            console.log(response)
          }
         
        })
        .catch(function (error) {
          console.error(error);
        });    
    };
  };


  const cartLinesRemove = (event, merchandiseId) => {
    event.preventDefault();
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
          cartLinesRemove(
            cartId: "${cartId}"
            lineIds: "${merchandiseId}"
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
          if (response.data.data.cartLinesRemove.userErrors[0]) {
            setuserError(response.data.data.cartLinesRemove.userErrors[0].message)
            console.log(response)
          } else {
            getCart()
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
      getCart();  
    }
  }, [getCart, cartId]);


  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, []);

  
  if (loading) {
    return (
    <div style={{textAlign:'center'}}>
    <Navigator />
    <Container>
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>
    </Container>
    <Footer />
    </div>
  )
  } else {
  return (
      <div>     
        {lineItems == null ? (
            <div style={{textAlign:'center'}}>
            <Navigator />
            <Container>
            <p>Wow! So empty!</p>
            <Image width='200px' src={MonsterSticker} /><br />
            <Link to="/" >Click here to go back</Link>
            </Container>
            <Footer />
            </div>
            ) : (
            <div>
            <CartContext.Provider value={lineItems}>
            <Navigator />
            <Container>
            <Link to="/products" ><h3>Continue shopping</h3></Link>
            </Container>
            {lineItems.edges.map((item) => (
                <Container key={item.node.id}>
                <Row>
                <small className="text-muted">{item.node.merchandise.product.title} {moneyFormat.replace('{{amount}}', item.node.cost.amountPerQuantity.amount+'0')}</small>
                <Col>
                <Link to={`/product/${item.node.merchandise.product.handle}`}>   
                {item.node.merchandise.product.featuredImage ? (
                <Image width='200px' src={item.node.merchandise.product.featuredImage.src} />
                ) : (
                <Image width='200px' src={glasses} />
                )}     
                </Link>
                </Col>
                <Col>
                <h3>{moneyFormat.replace('{{amount}}', item.node.cost.subtotalAmount.amount+'0')}</h3>
                <small className="text-muted">{item.node.merchandise.title}</small>
                <InputGroup size="lg">
                  <Button 
                  value="-"
                  variant="outline-secondary" 
                  id="button-addon2"
                  aria-label="Increment value"
                  onClick={(event) => cartLinesUpdate(event, item.node.id, item.node.quantity)}
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
                  onClick={(event) => cartLinesUpdate(event, item.node.id, item.node.quantity)}
                  >+</Button>
                  <Button 
                  variant="light"
                  onClick={(event) => cartLinesRemove(event, item.node.id)}>
                    <Trash /></Button>
              </InputGroup>
              </Col>
              </Row>
              <hr />
              </Container>
             ))}
             <Container>
            <Row>
            {userError ? (<div className="alert alert-danger">{userError}</div>) : (<div></div>)}
             <Col>
             <h3>{moneyFormat.replace('{{amount}}', totalAmount+'0')}</h3>
             <small className="text-muted">Tax included.<br /></small>
             <small className="text-muted">Shipping and discounts calculated at checkout.</small>
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
      </div>
    );
   };
  };

export default MyCart;