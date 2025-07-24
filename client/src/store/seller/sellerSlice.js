import { createSlice } from "@reduxjs/toolkit"

import { sellerLogin } from "./sellerThunk"

const initialState={
        logginSeller:null
}

const sellerSlice= createSlice({
    name:"seller",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

builder.addCase(sellerLogin.pending,(state,action)=>{

})
builder.addCase(sellerLogin.fulfilled,(state,action)=>{
    console.log(action.payload);
    
    state.logginSeller= action.payload.success.existingSeller
    localStorage.setItem('sellerToken', action.payload.token)
  
})
 builder.addCase(sellerLogin.rejected,(state,action)=>{

 })       
    }
})


export const {} = sellerSlice.actions
export default sellerSlice.reducer