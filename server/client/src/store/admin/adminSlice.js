import { createSlice } from "@reduxjs/toolkit"

import { adminLogin } from "./adminThunk"

const initialState={

}

const adminSlice= createSlice({
    name:"seller",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

builder.addCase(adminLogin.pending,(state,action)=>{

})
builder.addCase(adminLogin.fulfilled,(state,action)=>{

})
 builder.addCase(adminLogin.rejected,(state,action)=>{

 })       
    }
})


export const {} = adminSlice.actions
export default adminSlice.reducer