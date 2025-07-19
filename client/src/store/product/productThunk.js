import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const getPoductsForUser= createAsyncThunk('/user/getProducts',async()=>{
    const res= await axiosInstance.get(`/user/getProducts?limit=${10}&skip=${0}`)
    return res.data
   
    
})

export const getSimilarProduct= createAsyncThunk('/product/similar',async()=>{

})



export const getCategorisedProduct= createAsyncThunk("/product/getCategorisedProduct",async(data,{rejectWithValue})=>{
    try {
        const res= await axiosInstance.get('/user/allGroupedProducts')
       
        return res.data
    
    } catch (error) {
        console.log(error);
        
    }
})


export const getFeaturedProduct= createAsyncThunk('/user/getFeaturedProduct',async()=>{
    const res= await axiosInstance.get("/user/getFeaturedProduct")
    
    return res.data
    
})