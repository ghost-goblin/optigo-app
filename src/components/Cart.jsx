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
  const carttotalitems = useSelector((state) => state.cart.totalitems);
  const [lineItems, setlineItems] = useState(null);
  const CartContext = createContext(null);
  console.log(data, error, isLoading);

  
  useEffect(() => {
    setlineItems(data);
  }, []);


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
              {carttotalitems}
            {data.data.cart.lines.edges.map((item) => (
              <div>
               {JSON.stringify(item)}
               <InputGroup size="lg">
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                aria-label="Increment value"
                // onClick={() => dispatch(decrement())}
                >-</Button>
                <Form.Control disabled placeholder='0'
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
            </div>
          )}
      </>
    );
  };
};

export default Cart;