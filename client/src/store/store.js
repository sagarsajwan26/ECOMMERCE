import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

import productSlice from './product/productSlice';
import userSlice from './user/userSlice';
import adminSlice from './admin/adminSlice';
import sellerSlice from './seller/sellerSlice';
import reviewSlice from './review/reviewSlice';

const sellerPersistConfig = {
  key: 'seller',
  storage,
  whitelist: ['logginSeller', 'ordersDetails'] // persist only these fields
};

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
    seller: persistReducer(sellerPersistConfig, sellerSlice),
    products: productSlice,
    review: reviewSlice
  }
});

export const persistor = persistStore(store);