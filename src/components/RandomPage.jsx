import React from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Studying from "../assets/Studying.png";
import Button from 'react-bootstrap/Button';



const RandomPage = () => {

  return (
    <div style={{paddingTop:'2rem'}}>
        <Container>
       <Image src={Studying} fluid style={{padding:'2rem'}} /><br />
       <h1>Let's create your first pair of glasses!</h1>
       <Button variant="dark">Choose Random!</Button>
       </Container>

    </div>
  );
};

export default RandomPage;