import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Cart } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import axios from 'axios';
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector, useDispatch } from 'react-redux';
import { addshopname } from '../features/shop/infoSlice.js';
import { addcarttotalitem } from '../features/cart/cartSlice.js';
import Badge from 'react-bootstrap/Badge';



const Navigator = () => {
  const [totalItems, settotalItems] = useState(0);
  const cart = useSelector((state) => state.cart.cartid);
  const [cartId] = useState(cart);
  const carttotalitems = useSelector((state) => state.cart.totalitems);
  const CartContext = createContext(cart);
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  const dispatch = useDispatch();
  console.log(data, error, isLoading)



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
                    checkoutUrl
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
        })
        .catch(function (error) {
          console.error(error);
        }); 
    }
  }, [cartId, dispatch]);

  

  useEffect(() => {
    if (data) {
      dispatch(addshopname(data.data.shop.name));
    }   
  }, [data,dispatch]); 


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <CartContext.Provider value={totalItems}>
        <div>
      <Link to="/"><Navbar.Brand><img src={logo} height="25px" alt="icon" />{shopname}</Navbar.Brand></Link>
      <Link to="/cart"><Navbar.Text><Cart /></Navbar.Text><Badge bg="secondary">{carttotalitems == 0 ? ('') : (carttotalitems)}</Badge></Link>
      </div>  
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/products"><Navbar.Text>Shop</Navbar.Text></Link></Nav.Link>
            <Nav.Link><Link to="/"><Navbar.Text>About</Navbar.Text></Link></Nav.Link>
            <Nav.Link><Link to="/"><Navbar.Text>Contact</Navbar.Text></Link></Nav.Link>
          </Nav>
        
        </Navbar.Collapse>
        </CartContext.Provider>
      </Container>
    </Navbar>
  );
}

export default Navigator;