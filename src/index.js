import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Products from "./components/Shop.jsx";
import Product from './components/Product.jsx';
import ErrorPage from "./components/ErrorPage.jsx";
import Cart from './components/Cart.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './app/store'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "products",
    element: <Products />
  },
  {
    path: "product/:handle",
    element: <Product />,
  },
  {
    path: "cart",
    element: <Cart />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}>
    <App />
    </RouterProvider>
  </React.StrictMode>
  </Provider>
);

reportWebVitals();