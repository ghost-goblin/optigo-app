import React from 'react';
import Products from './Products.jsx';
import image from "../assets/roller_skating.png";
import Navigator from './NavBar.jsx'
import eye from "../assets/eye.png";
import { createContext } from "react";
import { useQueryQuery  } from '../services/api/info.js';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addshopname } from '../features/shop/infoSlice.js';


const HomePage = () => {
  const CartContext = createContext(null);
  const { data, error, isLoading } = useQueryQuery();
  const shop = useSelector((state) => state.shop.value);
  const dispatch = useDispatch();
  console.log(data, error, isLoading)

  useEffect(() => {
    if (data) {
      dispatch(addshopname(data.data.shop.name));
    }   
  }, [data]); 


  if (data) {
    return (
      <div>
        <CartContext.Provider >
          <Navigator />
        <h1>{shop}</h1>
        <h1>Optical solutions with a personal touch</h1>
        <img src={eye} />
        <img src={image} />
        <Products />
        </CartContext.Provider>
      </div>
    );
 };
};

export default HomePage;