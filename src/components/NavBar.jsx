import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Cart } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addcarttotalitem } from '../features/cart/cartSlice';




const Navigator = () => {
  const [totalItems, settotalItems] = useState(0);
  const shop = useSelector((state) => state.shop.value);
  const cart = useSelector((state) => state.cart.cartid);
  const [cartId] = useState(cart);
  const carttotalitems = useSelector((state) => state.cart.totalitems);
  const CartContext = createContext(cart);
  const dispatch = useDispatch();


  const getCart = () => {
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
                cart(id: "${cart}") {
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
        settotalItems(response.data.data.cart.totalQuantity)
        dispatch((addcarttotalitem(response.data.data.cart.totalQuantity)))
        console.log(response)
        return response
      })
      .catch(function (error) {
        console.error(error);
      });   
 
  };



  useEffect(() => {
    if (cartId) {
      getCart();
    }
  }, [cartId]);


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <CartContext.Provider value={totalItems}>
        <Link to="/cart">
      {carttotalitems == null ? ('') : (carttotalitems)}
        <Cart /></Link>
      <Link to="/"><Navbar.Brand><img src={logo} height="25px" alt="icon" />{shop}</Navbar.Brand></Link>    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/products">Shop</Link></Nav.Link>
            <Nav.Link><Link to="/">About</Link></Nav.Link>
            <Nav.Link><Link to="/">Contact</Link></Nav.Link>
          </Nav>
        
        </Navbar.Collapse>
        </CartContext.Provider>
      </Container>
    </Navbar>
  );
}

export default Navigator;