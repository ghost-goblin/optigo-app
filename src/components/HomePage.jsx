import React from 'react';
import Products from './Products.jsx';
import image from "../assets/roller_skating.png";
import Navigator from './NavBar.jsx'
import eye from "../assets/eye.png";
import { createContext } from "react";
import { useLocation } from 'react-router-dom';
import { useQueryQuery  } from '../services/api/shop.js';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getshop } from '../features/shop/shopSlice.js';


const HomePage = () => {
  const CartContext = createContext(null);
  const location = useLocation();
  const { data, error, isLoading } = useQueryQuery();
  const shop = useSelector((state) => state.shop.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
    dispatch(getshop(data.data.shop.name));
    }   
  }, [data]); 

  console.log(shop)
  console.log(data,error,isLoading);

  if (data) {
    return (
      <div>
        <CartContext.Provider value={location.state}>
          <Navigator value={location.state} />
        <h1>{shop}</h1>
        <h1>Optical solutions with a personal touch</h1>
        <img src={eye} />
        <img src={image} />
        <Products value={location.state}  />
        </CartContext.Provider>
      </div>
    );
 };
};

export default HomePage;