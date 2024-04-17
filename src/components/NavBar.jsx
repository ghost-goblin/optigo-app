import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Cart } from 'react-bootstrap-icons';
import logo from '../assets/logo.png';
import { Link } from "react-router-dom";
import { useEffect, createContext, useState } from "react";
import axios from 'axios';



const Navigator = ({value}) => {
  const [totalItems, settotalItems] = useState(null);
  const [cartId, setcartId] = useState(value)
  const CartContext = createContext(value);

  useEffect(() => {
    getCart(cartId);
  }, []);


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
                }
              }
        
        `
      }
    };
    axios.request(options)
      .then(function (response) {
        settotalItems(response.data.data.cart.totalQuantity)
        console.log(response)
        console.log(cartId)
      })
      .catch(function (error) {
        console.error(error);
      });      
  
  };




  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <CartContext.Provider value={cartId}>
        {cartId}
      <Link to="/cart">{totalItems}<Cart /></Link>
      <Link to="/" state={cartId}><Navbar.Brand><img src={logo} height="25px" alt="icon" />Optigo</Navbar.Brand></Link>    
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to="/products" state={cartId}>Shop</Link></Nav.Link>
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