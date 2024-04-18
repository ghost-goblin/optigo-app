import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import { useLocation } from 'react-router-dom';

const Cart = () => {
  const location = useLocation();
  
  return (
    <>
      <Navigator value={location.state}/>
      <p>Cart!</p>
      <Link to="/" state={location.state}>Click here to go back</Link>
    </>
  );
};

export default Cart;