import Products from './Products.jsx';
import image from "../assets/roller_skating.png";
import Navigator from './NavBar.jsx'
import eye from "../assets/eye.png";
import { createContext } from "react";
import { useLocation } from 'react-router-dom';




const HomePage = () => {
  const CartContext = createContext(null);
  const location = useLocation();

  return (
    <div>
      <CartContext.Provider value={location.state}>
        <Navigator value={location.state} />
      <h1>Optical solutions with a personal touch</h1>
      <img src={eye} />
      <img src={image} />
      <Products value={location.state}  />
      </CartContext.Provider>
    </div>
  );
};

export default HomePage;