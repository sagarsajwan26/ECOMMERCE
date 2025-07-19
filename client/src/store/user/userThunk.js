import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";
import toast, { ToastBar } from "react-hot-toast";

export const loginUser= createAsyncThunk('/user/login',async(data,{rejectWithValue})=>{
   try {

    
     const res= await axiosInstance.post('/user/login',data)
  
     
     return res.data
   } catch (error) {
   
    return rejectWithValue(error.response.data.message)

    
   }
   
   
    
})


export const signupUser= createAsyncThunk('/user/signup',async(data,{rejectWithValue})=>{
    console.log(data);
   try {
     
     const res= await axiosInstance.post('/user/signup',data)
     console.log(res.data);
     
     
return res.data.data
   } catch (error) {
    console.log('hi i am error');  
      console.log(error);
     if(error.response && error.response.data && error.response.data.message) 

    
    return rejectWithValue(error.response.data.message)
    
   }
})
