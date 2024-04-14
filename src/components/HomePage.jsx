import Products from './Products.jsx';
import image from "../assets/roller_skating.png";
import eye from "../assets/eye.png";


const HomePage = () => {
  return (
    <div>
      <h1>Optical solutions with a personal touch</h1>
      <img src={eye} />
      <img src={image} />
      <Products />
    </div>
  );
};

export default HomePage;