import { createSlice } from "@reduxjs/toolkit"
import { getUserProfle, loginUser, updateUserDetails, updateUserProfilePic, userLogout } from "./userThunk"
import { addProductToCart, removeProductFromCart } from "../product/productThunk"

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
 builder.addCase(addProductToCart.fulfilled,(state,action)=>{
    console.log(action.payload);
    state.logginUser.cart.products =action.payload.success.products
    state.logginUser.cart.totalPrice= action.payload.success.totalPrice
}) 

builder.addCase(removeProductFromCart.fulfilled,(state,action)=>{
    console.log(action.payload);
    state.logginUser.cart.products= action.payload.success.products 
    state.logginUser.cart.totalPrice= action.payload.success.totalPrice 

})



builder.addCase(getUserProfle.fulfilled,(state,action)=>{
    console.log(action.payload);
    const data= action.payload.success
    console.log(data);
    
    state.logginUser= { ...state.logginUser, dateofBirth:data.dateofBirth, contactNumber:data.contactNumber, gender:data.gender , favoriteCategories: data.favoriteCategories, address:data.address ,username:data.username }
    
})

builder.addCase(updateUserProfilePic.fulfilled,(state,action)=>{
    console.log(action.payload);
    state.logginUser.profileImage=action.payload.success.profileImage
    
})

builder.addCase(userLogout.fulfilled,(state,action)=>{
    state.logginUser= null
})



    }
})





export const {} = userSlice.actions
export default userSlice.reducer