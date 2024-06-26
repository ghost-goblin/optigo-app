import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Outlet, Link } from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import glasses from "../assets/glasses.svg";
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import { useQueryQuery  } from '../services/api/products.js';



const Products = () => {
  const { data, error, isLoading } = useQueryQuery();
  console.log(data,error,isLoading);
  
  if (data) {
    return (
      <div style={{paddingTop:'1rem'}}>
      <Container>
      <Row>
      <Col style={{textAlign:'left'}}><h3>Try the new collections</h3></Col>
      <Col style={{textAlign:'right'}}><small className="text-muted">Browse All</small></Col>
      </Row>
      <Row xs={1} md={3} className="g-4">
            {data.data.products.edges.map((item) => (
          <Col key={item.node.id}>
            <Card>
              {item.node.featuredImage == null ? (
                <Link to={`/product/${item.node.handle}`}><Card.Img variant="top" src={glasses} /></Link>
              ) : (
                <Link to={`/product/${item.node.handle}`}><Card.Img variant="top" src={item.node.featuredImage.src} /></Link>
              )}
            </Card>
          </Col>
        ))}
      </Row>  
      <Outlet />  
      </Container>
      </div>
    )
  } 
  if (isLoading) {
    return <div style={{textAlign:'center'}}>
    <Container>
    <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
     </Spinner>
     </Container>
      </div>
   }
  if (error) {
  return <div>
   <ErrorPage />
    </div>
 }
};

export default Products;