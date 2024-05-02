import React from 'react';
import Rollerskating from "../assets/Rollerskating.png";
import EyeSticker from "../assets/eye.png";
import { useQueryQuery  } from '../services/api/info.js';
import { useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';


const AboutPage = () => {
  const { data, error, isLoading } = useQueryQuery();
  const shopname = useSelector((state) => state.shop.name);
  console.log(data, error, isLoading)


  if (data) {
    return (
      <div>
      <h1>How does {shopname} make eyewear simple and fun?</h1>
      <Image src={Rollerskating} fluid />
      <h1>Why people are raving about {shopname} ...</h1>
      <Image src={EyeSticker} fluid />
      </div>
    );
 };
};

export default AboutPage;