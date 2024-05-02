import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
// import Navigator from './NavBar.jsx';

const ErrorPage = () => {
  return (
    <div>
      {/* <Navigator /> */}
      <Container>
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
      </Container>
    </div>
  );
};

export default ErrorPage;