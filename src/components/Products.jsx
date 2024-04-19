import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import { useQueryQuery  } from '../services/api/products.js';



const Products = ({value}) => {

  const { data, error, isLoading } = useQueryQuery();
  console.log(data,error,isLoading);
  
  if (data) {
    try {
    return (
      <div className="App">
      <Row xs={1} md={3} className="g-4">
            {data.data.products.edges.map((item) => (
          <Col key={item.node.id}>
            <Card>
              {item.node.featuredImage == null ? (
                <Link to={`/product/${item.node.handle}`} state={value}><Card.Img variant="top" src={glasses} /></Link>
              ) : (
                <Link to={`/product/${item.node.handle}`} state={value}><Card.Img variant="top" src={item.node.featuredImage.src} /></Link>
              )}
            </Card>
          </Col>
        ))}
      </Row>  
      <Outlet />  
      </div>
    )} catch(e) {
      console.log(e)
    }
  } return <div>
  <ErrorPage />
    </div>
};

export default Products;