import { configureStore } from "@reduxjs/toolkit";

import productSlice from './product/productSlice'
import userSlice from './user/userSlice'
import adminSlice from './admin/adminSlice'
import sellerSlice from './seller/sellerSlice'
export const store= configureStore({
   reducer:{
     user:userSlice,
    admin:adminSlice,
    seller:sellerSlice,
    products:productSlice
   }
})