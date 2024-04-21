import React from 'react';
import { Link } from "react-router-dom";
import Navigator from './NavBar.jsx';
import { useSelector } from 'react-redux';
import { useState, useEffect, createContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
// import { useQueryQuery  } from '../services/api/product';
import axios from 'axios';


const Cart = () => {
  const cart = useSelector((state) => state.cart.cartid)
  const [cartId] = useState(cart);
  const [lineItems, setlineItems] = useState(null);
  const [imageSrc, setimageSrc] = useState([]);
  const [productHandles, setproductHandles] = useState([]);
  const CartContext = createContext(lineItems);
  const ImageContext = createContext(imageSrc);



  // const { data, error, isLoading } = useQueryQuery();


  useEffect(() => {

    if (cartId) {
      const options = {
        method: 'POST',
        url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
        },
        data: {
          query: `
                {
                  cart(id: "${cartId}") {
                    id
                    totalQuantity
                    checkoutUrl
                    cost {
                      totalAmount {
                        amount
                        currencyCode
                      }
                    }
                    lines(first: 10) {
                      edges {
                        node {
                          attributes {
                            key
                            value
                          }
                          id
                          quantity
                        }
                      }
                    }
                  }
                }
             `
          }
      };
      axios.request(options)
        .then(function (response) {
          setlineItems(response.data.data.cart.lines)
          
        
          console.log(response)
          return response
        })
        .catch(function (error) {
          console.error(error);
        });
    }

  }, [cartId]);



  useEffect(() => {
    let handles = []
    let productimages = []
    if (lineItems) {
      lineItems.edges.forEach((edge) => {
        edge.node.attributes.forEach((atrribute) => {
          console.log(atrribute)
          handles.push(atrribute.key)

        })
    })
    setproductHandles(handles)
    handles.forEach((handle) => {
      const options = {
        method: 'POST',
        url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
        },
        data: {
          query: `
              {
                product(handle: "${handle}") {
                  title
                  handle
                  availableForSale
                  totalInventory
                  images(first: 5) {
                    nodes {
                      src
                    }
                  }
                  variants(first: 5) {
                    edges {
                      node {
                        id
                      }
                    }
                  }
                }
              }
            `
          }
      };

      axios.request(options)
        .then(function (response) {
          response.data.data.product.images.nodes.forEach((image) => {
            productimages.push(image.src)

          })
          console.log(productimages)
          setimageSrc(productimages)

        
        })
        .catch(function (error) {
          console.error(error);
        });
      
    })   

   } 
  }, [lineItems]); 

  

  

  console.log(productHandles,imageSrc)


  return (
      <> 
        <Navigator />  
        {lineItems == null ? (
            <div>
            <p>Whoops! So empty!</p>
            <Link to="/" >Click here to go back</Link>
            </div>
            ) : (
            <div>
            <CartContext.Provider value={lineItems}>
            <ImageContext.Provider value={imageSrc}>
            {JSON.stringify(productHandles)}
            {JSON.stringify(imageSrc)}
        
            {lineItems.edges.map((item) => (
              <div>
              {item.node.attributes.map((node) => (
               <InputGroup size="lg">
                {/* <img src={imageSrc} />{imageSrc} */}
                {JSON.stringify(node)}
              

                {/* {imageSrc.map((src) => (
                  <>
                   {JSON.stringify(src)}
                   </>
                ))} */}

             


               
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                aria-label="Increment value"
                // onClick={() => dispatch(decrement())}
                >-</Button>
                <Form.Control disabled placeholder={item.node.quantity}
                              aria-label="Cart Addon"
                              aria-describedby="cart-addon"
                              />
                <Button 
                variant="outline-secondary" 
                id="button-addon2"
                aria-label="Increment value"
                // onClick={() => dispatch(increment())}
                >+</Button>
              </InputGroup> 
               ))}      
              </div>
            ))}
            </ImageContext.Provider>
            </CartContext.Provider>
            <Link to="/cart"><Button>Checkout</Button></Link>
            </div>
          )}
      </>
    );
  };

export default Cart;