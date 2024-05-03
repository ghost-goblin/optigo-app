import React from 'react';
import Products from './Products.jsx';
import Navigator from './NavBar.jsx';
import LandingPage from './LandingPage.jsx';
import InfoPage from './InfoPage.jsx';
import Footer from './Footer.jsx';


const HomePage = () => {

  return (
    <div>
    <Navigator />
    <LandingPage />
    <InfoPage />
    <Products />
    <Footer />
    </div>
  );
};

export default HomePage;