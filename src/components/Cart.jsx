import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';

const Cart = () => {
  return (
    <>
      <Navigator />
      <p>Cart!</p>
      <Link to="/">Click here to go back</Link>
    </>
  );
};

export default Cart;