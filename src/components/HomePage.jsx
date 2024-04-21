import React from 'react';
import Products from './Products.jsx';
import image from "../assets/roller_skating.png";
import Navigator from './NavBar.jsx'
import eye from "../assets/eye.png";
import { useQueryQuery  } from '../services/api/info.js';
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addshopname } from '../features/shop/infoSlice.js';


const HomePage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  const dispatch = useDispatch();
  console.log(data, error, isLoading)

  useEffect(() => {
    if (data) {
      dispatch(addshopname(data.data.shop.name));
    }   
  }, [data,dispatch]); 


  if (data) {
    return (
      <div>
          <Navigator />
        <h1>{shopname}</h1>
        <h1>Optical solutions with a personal touch</h1>
        <img src={eye} />
        <img src={image} />
        <Products />
      </div>
    );
 };
};

export default HomePage;