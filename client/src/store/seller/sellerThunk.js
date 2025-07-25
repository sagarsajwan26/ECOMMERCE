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

export const sellerLogout= createAsyncThunk('/seller/logout', async(data,{rejectWithValue})=>{
    try {
        const res= await axiosInstance.get('/seller/logout')
    } catch (error) {
        return rejectWithValue(error.response.payload.message)
    }
})

export const getOrderList= createAsyncThunk('/seller/getOrders',async(data, {rejectWithValue})=>{
        const token = localStorage.getItem('sellerToken')
        try {
            const res= await axiosInstance.get('/seller/getOrderList',{
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            return res.data
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.payload.message)
        }
})

export const addProduct= createAsyncThunk('/seller/addProduct',async(data,{rejectWithValue})=>{
    const token = localStorage.getItem('sellerTokne')
    try {
        const res= await axiosInstance.post( `/seller/add-product`,data,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
       
        
        return res.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.payload.message)
        
    }
})

export const updateProfile= createAsyncThunk('/seller/updateProfile',async(data,{rejectWithValue})=>{
    const token = localStorage.getItem('sellerToken')
    
    
    try {
        const res= await axiosInstance.put( `/seller/update-profile`,data,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        
        return rejectWithValue(error.response.data)
    }
})

export const updateProfilePic= createAsyncThunk('/seller/updateProfilePic',async(data,{rejectWithValue})=>{
    const token = localStorage.getItem('sellerToken')
    console.log(data);
    
    try {
        const res= await axiosInstance.put( `/seller/update-profile-pic`,data,{
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data.message)
    }
})