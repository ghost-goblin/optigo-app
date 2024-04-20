import React from 'react';
import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../features/counter/counterSlice';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const Cart = () => {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  
  return (
    <>
      <Navigator />
      <p>Cart!</p>
      <Link to="/" >Click here to go back</Link>
      <InputGroup size="lg">
        <Button 
        variant="outline-secondary" 
        id="button-addon2"
        aria-label="Increment value"
        onClick={() => dispatch(decrement())}
        >-</Button>
        <Form.Control disabled placeholder={count}
                      aria-label="Cart Addon"
                      aria-describedby="cart-addon"
                       />
        <Button 
        variant="outline-secondary" 
        id="button-addon2"
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
        >+</Button>
      </InputGroup>
    </>
  );
};

export default Cart;