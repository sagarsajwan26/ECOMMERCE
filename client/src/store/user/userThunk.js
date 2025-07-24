import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

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


export const updateUserDetails= createAsyncThunk('/user/update-user',async(data, {rejectWithValue})=>{
  const token= localStorage.getItem('userToken')
  console.log(data.id);
  
  try {
const res= await axiosInstance.put(`/user/update-user/${data.id}`,data.userData,{

  headers:{
    "Authorization":  `Bearer ${token}`
  }
})

return res.data
  } catch (error) {
      return rejectWithValue(error.response.data)
  }
})
export const updateUserProfilePic= createAsyncThunk('/user/updateProfilePic',async(data,{rejectWithValue})=>{
  const token = localStorage.getItem('userToken') 

  
try {
  const res= await axiosInstance.put('/user/updateProfilePic', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  
   

  return res.data


} catch (error) {
  return rejectWithValue(error.response.data)
}

})

export const getUserProfle= createAsyncThunk('/user/getProfile',async(data,{rejectWithValue})=>{
const token= localStorage.getItem('userToken')
  try {

    const res= await axiosInstance.get('/user/getProfile',{
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


export const userPayment= createAsyncThunk('/user/payment',async(data, {rejectWithValue})=>{
console.log(data);

const token = localStorage.getItem('userToken')
  const res = await axiosInstance.post('/user/payment',data,{
  headers:{
    Authorization:`Bearer ${token}`
  }
})
return res.data
})