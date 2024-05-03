import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Cart, ThreeDotsVertical } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import axios from 'axios';
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector, useDispatch } from 'react-redux';
import { addshopname, addmoneyformat, adddescription, addslogan } from '../features/shop/infoSlice.js';
import { addcarttotalitem } from '../features/cart/cartSlice.js';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';



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
      dispatch(addmoneyformat(data.data.shop.moneyFormat));
      dispatch(adddescription(data.data.shop.brand.shortDescription))
      dispatch(addslogan(data.data.shop.brand.slogan))
    }   
  }, [data,dispatch]); 


  return (
    <div style={{width:'100%'}}>
    <Navbar className="bg-body-tertiary">
      <Container>
      <CartContext.Provider value={totalItems}> 
        <Navbar.Brand>
          <Link to="/"><Navbar.Brand><img src={logo} height="25px" alt="icon" />{shopname}</Navbar.Brand></Link>
        </Navbar.Brand>
        <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <ThreeDotsVertical />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item><Link to="/products">Shop</Link></Dropdown.Item>
        <Dropdown.Item>About</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>Contact Us</Dropdown.Item>
      </Dropdown.Menu>
      </Dropdown>  
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand>
          <Link to="/cart">
          {carttotalitems === 0 ? (<Cart />) : (<div><Cart style={{position:'inline-block'}} /><Badge style={{position:'absolute'}} pill bg="warning">{carttotalitems}</Badge></div>)}
          </Link>
          </Navbar.Brand>
        </Navbar.Collapse>
        </CartContext.Provider>
      </Container>
    </Navbar>
    </div>
  );
}

export default Navigator;