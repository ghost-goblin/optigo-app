import { Link } from "react-router-dom";
// import Navigator from './NavBar.jsx';

const ErrorPage = () => {
  return (
    <div>
      {/* <Navigator /> */}
      <h1>Oh no, this route doesn't exist!</h1>
      <Link to="/">
        You can go back to the home page by clicking here, though!
      </Link>
    </div>
  );
};

export default ErrorPage;