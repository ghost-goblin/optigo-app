import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import RobotSticker from "../assets/RobotSticker.png";


const ErrorPage = () => {
  return (
    <div style={{textAlign:'center'}}>
      <Container fluid>
      <h1>Oh no, something went wrong!</h1>
      <Image width='200px' src={RobotSticker} /><br />
      <Link to="/">You can go back to the home page by clicking here, though!</Link>
      </Container>
    </div>
  );
};

export default ErrorPage;