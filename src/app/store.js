import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '../services/api/products';
import { shopApi } from '../services/api/shop';
import counterReducer from '../features/counter/counterSlice'
import shopReducer from '../features/shop/shopSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(productsApi.middleware)
    .concat(shopApi.middleware),
})


setupListeners(store.dispatch)