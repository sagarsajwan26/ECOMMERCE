import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/axios";

export const addReview = createAsyncThunk('/user/review',async(data,{rejectWithValue})=>{ 
    const token = localStorage.getItem('userToken')
    console.log(data.id);
    
try {
    const res= await axiosInstance.post(`/user/addReview/${data.id} `,{rating:data.rating, comment:data.comment},
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    )
    console.log(res);
    
} catch (error) {
    
}
})

export const getProductReview= createAsyncThunk('/user/getProductReview',async(id,{rejectWithValue})=>{
const token = localStorage.getItem('userToken')
try {
    const res= await axiosInstance.get(`/user/getProductReview/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    return res.data.data
} catch (error) {
    return rejectWithValue(error.response.data.message || 'Failed to fetch product reviews');
} 

})


export const editReview= createAsyncThunk('/user/editreview',async(data,{rejectWithValue})=>{
    const token= localStorage.getItem('userToken')
    try {
        const res= await axiosInstance.put(`/user/updateReview/${data.id}`,{
            comment:data.comment
        },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)        
    }
})



export const deleteReview= createAsyncThunk('/user/deleteReview',async(id,{rejectWithValue})=>{
       const token= localStorage.getItem('userToken')
    try {
        const res= await axiosInstance.delete(`/user/deleteReview/${id}`,{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }
        )
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})