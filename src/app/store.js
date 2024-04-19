import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productApi } from '../services/api/product';
import { productsApi } from '../services/api/products';
import { infoApi } from '../services/api/info';
import { shopApi } from '../services/api/shop';
import counterReducer from '../features/counter/counterSlice'
import shopReducer from '../features/shop/infoSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    [productApi.reducerPath]: productApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [infoApi.reducerPath]: infoApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(productApi.middleware)
    .concat(productsApi.middleware)
    .concat(infoApi.middleware)
    .concat(shopApi.middleware)
})


setupListeners(store.dispatch)