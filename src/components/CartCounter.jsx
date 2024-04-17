import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



const CartCounter = () => {

  
  return (
      <div>
      <InputGroup size="lg">
        <Button variant="outline-secondary" id="button-addon2">-</Button>
        <Form.Control disabled placeholder="1" 
                      aria-label="Cart Addon"
                      aria-describedby="cart-addon"
                       />
        <Button variant="outline-secondary" id="button-addon2">+</Button>
        </InputGroup>
        <Button type="submit">Loading...</Button>
       </div>
  );
};

export default CartCounter;