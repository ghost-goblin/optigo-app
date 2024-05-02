import React from 'react';
import Products from './Products.jsx';
import Navigator from './NavBar.jsx';
import LandingPage from './LandingPage.jsx';
import AboutPage from './AboutPage.jsx';
import Footer from './Footer.jsx';


const HomePage = () => {

  return (
    <div>
    <Navigator />
    <LandingPage />
    <AboutPage />
    <Products />
    <Footer />
    </div>
  );
};

export default HomePage;