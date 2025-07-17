import { configureStore } from "@reduxjs/toolkit";
import adminSlice from './admin/adminSlice'
import userSlice from './user/userSlice'
import sellerSlice from  './seller/sellerSlice'
export const store= configureStore({
    reducer:{
        admin:adminSlice,
        user:userSlice,
        seller:sellerSlice
    }
})