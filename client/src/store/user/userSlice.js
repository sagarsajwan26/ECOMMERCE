import { createSlice } from "@reduxjs/toolkit"
import { loginUser } from "./userThunk"

const initialState={
    logginUser:null,
   

}

const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

builder.addCase(loginUser.pending,(state,action)=>{
 state.logginUser= null
})
builder.addCase(loginUser.fulfilled,(state,action)=>{
 
  state.logginUser= action.payload.existingUser
  
})
 builder.addCase(loginUser.rejected,(state,action)=>{
    state.logginUser=null
 })       
    }
})


export const {} = userSlice.actions
export default userSlice.reducer