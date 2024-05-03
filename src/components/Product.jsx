import React from 'react';
import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Navigator from './NavBar.jsx';
import Footer from './Footer.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import Button from 'react-bootstrap/Button';
import { useQueryQuery  } from '../services/api/product.js';
import { useSelector, useDispatch } from 'react-redux';
import { addcartid } from '../features/cart/cartSlice'
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { CartPlus, Pencil } from 'react-bootstrap-icons';


const Product = () => {
  const { handle } = useParams();
  const [loading, setLoading] = useState(true);
  const CartContext = createContext(null);
  const [totalItems, settotalItems] = useState(0);
  const [availableForSale, setavailableForSale] = useState(false);
  const [price, setPrice] = useState(0);
  const [userError, setuserError] = useState(null);
  const [selectedOptions, setselectedOptions] = useState(null);
  const [merchandiseId, setmerchandiseId] = useState(null);
  const [featuredImage, setfeaturedImage] = useState(glasses);
  const { data, error, isLoading } = useQueryQuery(handle);
  console.log(data,error,isLoading);
  const cart = useSelector((state) => state.cart.cartid);
  const moneyFormat = useSelector((state) => state.shop.money);
  const [cartId, setcartId] = useState(cart);
  const dispatch = useDispatch();

  

  const createCart = () => {
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
                      value: "${featuredImage}"
                    }
                  ],
                  quantity: 1
                  merchandiseId: "${merchandiseId}"
                }
              ]
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
          if (response.data.data.cartCreate.userErrors[0]) {
            setuserError(response.data.data.cartCreate.userErrors[0].message)
          } else {
            setcartId(response.data.data.cartCreate.cart.id)
            settotalItems(response.data.data.cartCreate.cart.totalQuantity)
            console.log(response.data.data.cartCreate.cart.id+' Cart created!')
            console.log(response)
            dispatch((addcartid(response.data.data.cartCreate.cart.id)))
            setuserError(null)
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      console.log('Cart already created')
      cartLinesAdd()
    } 
  };



  const cartLinesAdd = () => {
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
                    value: "${featuredImage}"
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
          if (response.data.data.cartLinesAdd.userErrors[0]) {
            setuserError(response.data.data.cartLinesAdd.userErrors[0].message)
          } else {
            settotalItems(response.data.data.cartLinesAdd.cart.totalQuantity)
            setuserError(null)
            console.log(response)
          }
          
        })
        .catch(function (error) {
          console.error(error);
        });    
    };
  };



  const handleChange = (event) => {
    event.preventDefault();
    const selectOptions = () => {
      let selectedList = [];
      let option
      for (let i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].name === event.target.name) {
          option = {name: selectedOptions[i].name, value: event.target.value}
        } else {
          option = {name: selectedOptions[i].name, value: selectedOptions[i].value}
        }
        selectedList.push(option)
      };
      return selectedList
    };
    const alloptions = selectOptions()
    setselectedOptions(alloptions)
    const options = alloptions.map((opt) => `{name: "${opt.name}", value: "${opt.value}"}`)
    getVariantBySelectedOptions(options)
   
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    createCart();
   
  };


  
  const getVariantBySelectedOptions = (selectedoptions) => {
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
                product(handle: "${handle}") {
                  variantBySelectedOptions(selectedOptions: [${selectedoptions}]) {
                    id
                    title
                    availableForSale
                    quantityAvailable
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
        
           `
        }
    };
    axios.request(options)
      .then(function (response) {
        setmerchandiseId(response.data.data.product.variantBySelectedOptions.id)
        setPrice(response.data.data.product.variantBySelectedOptions.price.amount)
        console.log(response)     
      })
      .catch(function (error) {
        console.error(error);
      });
  };





  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, []);



  useEffect(() => {
    if (data) {
      if (data.data.product) {
        if (data.data.product.featuredImage) {
          setfeaturedImage(data.data.product.featuredImage.src) 
        }   
        setavailableForSale(data.data.product.availableForSale)
        setselectedOptions(data.data.product.variants.edges[0].node.selectedOptions)
        setmerchandiseId(data.data.product.variants.edges[0].node.id)
        setPrice(data.data.product.variants.edges[0].node.price.amount)
      };
  
    };

  }, [data, handle]);

  
  if (data) {
    try {
    return (
      <div>
        <CartContext.Provider value={cartId} itemtotal={totalItems}>
        <Navigator />
        </CartContext.Provider>
        <Container>
        <Row>
          <Col>
          <Image src={featuredImage} fluid />
          </Col>
          <Col>
          <h1>{data.data.product.title}</h1>
          <h3>{moneyFormat.replace('{{amount}}', price+'0')}</h3>
          <small className="text-muted">Tax included.</small>
          {availableForSale ? (
            <Form.Group className="mb-3">
            <form method="post" onSubmit={handleSubmit}>         
            {data.data.product.variants.edges[0].node.product.options.map((option,index) => (
                <Row key={index}> 
                <Form.Label>{option.name}
                <Form.Select name={option.name} index={index} onChange={handleChange}>
                {option.values.map((value,index) => (
                    <option key={value} index={index}>{value}</option>
                  ))}
                  </Form.Select>
                  </Form.Label>
                  </Row>
              
               ))}
               {userError ? (<div className="alert alert-danger">{userError}</div>) : (<div></div>)}
               <Row>
                <Col>
                <Button variant="primary" type="submit"><CartPlus /> Add to Cart</Button>
                </Col>
                <Col>
                <Button variant="light"><Link to="/cart"><Pencil /> Review Order</Link></Button>
                </Col>
              </Row>
            </form>
            </Form.Group>
            ) : (
            <Container>
            <div>😢 Oh No! Not Available For Sale!</div>
            </Container>
          )}
          </Col>
        </Row>
        </Container>
        <Footer />
      </div>
    )} catch(e) {
      console.log(e)
    }
  } return <div>
    {loading === false ? (
    <div>
    <Navigator />
    <ErrorPage />
    <Footer />
    </div>
      ) : (
        <div>
        <Navigator />
        <Container>
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
        </Container>
        <Footer />
        </div>
      )}
      </div>
};

export default Product;