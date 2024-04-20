import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApi } from '../services/api/product';
import { productsApi } from '../services/api/products';
import { infoApi } from '../services/api/info';
import { shopApi } from '../services/api/shop';
import { cartApi } from '../services/api/cart'
import counterReducer from '../features/counter/counterSlice'
import shopReducer from '../features/shop/infoSlice'
import cartReducer from '../features/cart/cartSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [infoApi.reducerPath]: infoApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [cartApi .reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(productApi.middleware)
    .concat(productsApi.middleware)
    .concat(infoApi.middleware)
    .concat(shopApi.middleware)
    .concat(cartApi.middleware)
})


setupListeners(store.dispatch)