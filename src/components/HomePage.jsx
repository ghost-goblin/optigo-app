import React from 'react';
import Products from './Products.jsx';
import Navigator from './NavBar.jsx';
import LandingPage from './LandingPage.jsx';
import HowToPage from './HowToPage.jsx';
import Footer from './Footer.jsx';
import CustomerPage from './CustomerPage.jsx';
import FunFactsPage from './FunFactsPage.jsx';
import RandomPage from './RandomPage.jsx';


const HomePage = () => {

  return (
    <div>
    <Navigator />
    <LandingPage />
    <HowToPage />
    <Products />
    <FunFactsPage />
    <CustomerPage />
    <RandomPage />
    <Footer />
    </div>
  );
};

export default HomePage;