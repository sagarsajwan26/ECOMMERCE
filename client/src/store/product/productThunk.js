import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const getPoductsForUser= createAsyncThunk('/user/getProducts',async(data,{rejectWithValue})=>{
    // console.log(data);
    
 try {
       const res= await axiosInstance.get(`/user/getProducts?limit=${data?.limit}&skip=${data?.skip}`)
    //    console.log(res);
       
       return res.data
      
 } catch (error) {
   
    
  return  rejectWithValue(error.response.data.message)
 }
    
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



export const getSingleProductDetails= createAsyncThunk('/user/singleProduct',async(id, {rejectWithValue})=>{
try {
    console.log(id);
    
    const res= await axiosInstance.get(`/user/getProductDetails/${id}`)
  return res.data.success
} catch (error) {
    return rejectWithValue(error.res)
}

})


export const addProductToCart= createAsyncThunk('/addToCart',async(id,{rejectWithValue})=>{
    const token= localStorage.getItem('userToken')
    try {
        const res= await axiosInstance.post(`/user/addToCart/${id}`,{
            
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }) 
        
        
        return res.data
    } catch (error) {
        
        return rejectWithValue(error.response.data.message)
    }
})

export const removeProductFromCart= createAsyncThunk('/user/remove',async(data,{rejectWithValue})=>{
    const token = localStorage.getItem('userToken')
    try {

        
        const res= await axiosInstance.put(`/user/removeFromCart/${data.id}?option=${data.option}`,{},{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
        
        return rejectWithValue(error.response.data.message)
    }

})