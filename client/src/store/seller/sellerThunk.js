import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from '../../utils/axios'
export const sellerLogin= createAsyncThunk('/seller/login',async(data, {rejectWithValue})=>{
    
try {
    const res= await axiosInstance.post('/seller/login',data)
  return res.data
    
} catch (error) {
    
    
    return rejectWithValue(error.response.data.message)
}
})

export const sellerSignup= createAsyncThunk('/seller/signup', async(data,{rejectWithValue})=>{
try {
    console.log(data);
    
    const res= await axiosInstance.post('/seller/signup',data)
return res.data
} catch (error) {
    
    
    return rejectWithValue(error.response.data.message)
}

})