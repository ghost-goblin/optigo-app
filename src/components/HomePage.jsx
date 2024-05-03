import React from 'react';
import Products from './Products.jsx';
import Navigator from './NavBar.jsx';
import LandingPage from './LandingPage.jsx';
import InfoPage from './InfoPage.jsx';
import Footer from './Footer.jsx';
import CarouselPage from './CarouselPage.jsx';
import CustomerPage from './CustomerPage.jsx';
import RandomPage from './RandomPage.jsx';


const HomePage = () => {

  return (
    <div>
    <Navigator />
    <LandingPage />
    <InfoPage />
    <Products />
    <CustomerPage />
    <CarouselPage />
    <RandomPage />
    <Footer />
    </div>
  );
};

export default HomePage;