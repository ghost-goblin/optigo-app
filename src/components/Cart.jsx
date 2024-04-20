import React from 'react';
import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import { useSelector } from 'react-redux';
import { useState, useEffect, createContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useQueryQuery  } from '../services/api/cart';


const Cart = () => {
  const cart = useSelector((state) => state.cart.cartid)
  const [cartId] = useState(cart);
  const { data, error, isLoading } = useQueryQuery(cartId);
  const [lineItems, setlineItems] = useState(null);
  const CartContext = createContext(null);
  console.log(data, error, isLoading);

  

  if (data) {
    return (
      <>
        <Navigator />   
        {data.errors ? (
            <div>
            <p>Whoops! So empty!</p>
            <Link to="/" >Click here to go back</Link>
            </div>
            ) : (
            <div>
            <CartContext.Provider value={lineItems}>
            {data.data.cart.lines.edges.map((item) => (
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
};

export default Cart;