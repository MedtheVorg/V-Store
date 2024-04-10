import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';
import { authApi } from './services/authService';
import { storeApi } from './services/storeService';
import { billboardApi } from './services/billboardService';
import { categoryApi } from './services/categoryService';
import { sizeApi } from './services/sizeService';
import { ColorApi } from './services/colorService';
import { productApi } from './services/productService';
import { orderApi } from './services/orderService';

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [storeApi.reducerPath]: storeApi.reducer,
    [billboardApi.reducerPath]: billboardApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [ColorApi.reducerPath]: ColorApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(storeApi.middleware)
      .concat(billboardApi.middleware)
      .concat(categoryApi.middleware)
      .concat(sizeApi.middleware)
      .concat(ColorApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type o reducers
export type AppDispatch = typeof store.dispatch;

export default store;
