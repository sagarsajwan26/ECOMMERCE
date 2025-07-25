import { createSlice } from "@reduxjs/toolkit"

import { addProduct, getOrderList, sellerLogin, sellerLogout, updateProfile, updateProfilePic } from "./sellerThunk"

const initialState={
        logginSeller:null,
        ordersDetails:[] ,
        search:'',
        filterCategory: '',
        status:''

}

const sellerSlice= createSlice({
    name:"seller",
    initialState,
    reducers:{
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setFilterCategory: (state, action) => { 
            state.filterCategory = action.payload;
        },
        setStatus:(state,action)=>{
            state.status= action.payload
        }
    },
    extraReducers:(builder)=>{


builder.addCase(sellerLogin.fulfilled,(state,action)=>{
    console.log(action.payload);
    
    state.logginSeller= action.payload.success.existingSeller
    localStorage.setItem('sellerToken', action.payload.token)
  
})


builder.addCase(addProduct.fulfilled,(state,action)=> {
    // console.log(action.payload);
    
})

builder.addCase(getOrderList.fulfilled, (state,action)=>{
    // console.log(action.payload);
    state.ordersDetails= action.payload
})

builder.addCase(sellerLogout.fulfilled,(state,action)=>{
    state.logginSeller=null
})

builder.addCase(updateProfile.fulfilled,(state,action)=>{
    console.log(action.payload);
    state.logginSeller ={...state.logginSeller, username:action.payload.success.username, address:action.payload.success.address, contactNumber:action.payload.success.contactNumber, storeName:action.payload.success.storeName}

    
})

builder.addCase(updateProfilePic.fulfilled,(state,action)=>{
    console.log(action.payload);
    state.logginSeller = {...state.logginSeller, profilePic:action.payload.profilePic}
    
})

    }
})


export const {setSearch, setFilterCategory ,setStatus} = sellerSlice.actions 
export default sellerSlice.reducer