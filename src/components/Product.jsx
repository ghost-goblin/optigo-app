import React from 'react';
import { useParams } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Navigator from './NavBar.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import Button from 'react-bootstrap/Button';
import { useQueryQuery  } from '../services/api/product.js';
import { useSelector, useDispatch } from 'react-redux';
import { addcartid } from '../features/cart/cartSlice'
import { Link } from "react-router-dom";


const Product = () => {
  const { handle } = useParams();
  const [loading, setLoading] = useState(true);
  const CartContext = createContext(null);
  const [totalItems, settotalItems] = useState(0);
  const [selectedOptions, setselectedOptions] = useState(null);
  // const [merchandiseId, setmerchandiseId] = useState(null);
  const [featuredImage, setfeaturedImage] = useState('');
  const { data, error, isLoading } = useQueryQuery(handle);
  console.log(data,error,isLoading);
  const cart = useSelector((state) => state.cart.cartid);
  const [cartId, setcartId] = useState(cart);
  const dispatch = useDispatch();
  const inputs = document.getElementsByTagName('label')

  

const createCart = (merchandiseId) => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
      },
      data: {
        query: `
        mutation {
          cartCreate(
            input: {
              lines: [
                {  
                  attributes: [
                    {
                      key: "${handle}",
                      value: "${featuredImage}"
                    }
                  ],
                  quantity: 1
                  merchandiseId: "${merchandiseId}"
                }
              ]
              attributes: { key: "cart_key", value: "cart_value" }
            }
          ) {
            cart {
              id
              totalQuantity
            }
            userErrors {
              field
              message
            }
          }
        }
        `
      }
    };
    if (cartId == null) {
      axios.request(options)
        .then(function (response) {
          setcartId(response.data.data.cartCreate.cart.id)
          settotalItems(response.data.data.cartCreate.cart.totalQuantity)
          console.log(response.data.data.cartCreate.cart.id+' Cart created!')
          console.log(response)
          dispatch((addcartid(response.data.data.cartCreate.cart.id)))
        })
        .catch(function (error) {
          console.error(error);
        });
    } else {
      console.log('Cart already created')
      cartLinesAdd(merchandiseId)
    }
  
  };



  const cartLinesAdd  = (merchandiseId) => {
    const options = {
      method: 'POST',
      url: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
      },
      data: {
        query: `
        mutation {
          cartLinesAdd(
            cartId: "${cartId}",
            lines: [
              {
                attributes: [
                  {
                    key: "${handle}",
                    value: "${featuredImage}"
                  }
                ],
                merchandiseId: "${merchandiseId}",
                quantity: 1
              }
            ]
          ) {
            cart {
              id
              totalQuantity
            }
            userErrors {
              field
              message
            }
          }
        }  
        `
      }
    };
    if (cartId) {
      axios.request(options)
        .then(function (response) {
          settotalItems(response.data.data.cartLinesAdd.cart.totalQuantity)
          console.log(response)
        })
        .catch(function (error) {
          console.error(error);
        });    
    };
  };





  const handleSubmit = (event) => {
    event.preventDefault()
    const selectOptions = () => {
      let selectedList = [];
      for (let i = 0; i < inputs.length; i++) {
          let option = `{name: "${event.target[i].name}", value: "${event.target[i].value}"}`
          selectedList.push(option)
      };
      return selectedList
    };

    setselectedOptions(selectOptions())
    console.log("sel:"+selectedOptions)
    getVariantBySelectedOptions(selectOptions())
   
  };


  
  const getVariantBySelectedOptions = (opt) => {
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
                  variantBySelectedOptions(selectedOptions: [${opt}]) {
                    id
                    title
                    availableForSale
                  }
                }
              }
        
           `
        }
    };
    axios.request(options)
      .then(function (response) {
        // setmerchandiseId(response.data.data.product.variantBySelectedOptions.id)
        createCart(response.data.data.product.variantBySelectedOptions.id);
        console.log(response)
      
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  



  useEffect(() => {
    setTimeout(() => setLoading(false), 5000)
  }, []);



  useEffect(() => {
    if (data) {
      setfeaturedImage(data.data.product.featuredImage.src)
      setselectedOptions(data.data.product.variants.edges[0].node.selectedOptions)
  
    }

  }, [data]);

  
  if (data) {
    try {
    return (
      <div>
        <CartContext.Provider value={cartId} itemtotal={totalItems}>
        <Navigator />
        </CartContext.Provider>
        <Container>
        <Row>
          <Col>
          {data.data.product.featuredImage == null ? (
                <img width="100%" src={glasses} />
              ) : (
                <img width="100%" src={data.data.product.featuredImage.src} />
          )}
          </Col>
          <Col>

          <h1>{data.data.product.title}</h1>

          <form method="post" onSubmit={handleSubmit}>         
          {data.data.product.variants.edges[0].node.product.options.map((option,index) => (         
              <label key={option.name}>
              {option.name}
              <select name={option.name} index={index}>
              {option.values.map((value,index) => (
                  <option key={value} index={index}>{value}</option>
                ))}
                </select>
                </label>
            
             ))}
          <Button type="submit">Add to Cart</Button>
          </form>
          <Link to="/cart"><Button>Review Order</Button></Link>
          </Col>
        </Row>
        </Container>
      </div>
    )} catch(e) {
      console.log(e)
    }
  } return <div>
    {loading === false ? (
    <ErrorPage />
      ) : (
        <>
        <Navigator />
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
        </>
      )}
      </div>
};

export default Product;