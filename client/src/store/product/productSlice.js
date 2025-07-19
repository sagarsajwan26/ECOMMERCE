import { createSlice } from "@reduxjs/toolkit"
import { getCategorisedProduct, getFeaturedProduct, getPoductsForUser } from "./productThunk"

const initialState= {
    allProducts:[],
    similarProducts:[],
    categorisedProduct:[],
    featuredProduct:[],
    filterby:''

}


const productSlice= createSlice({
    name:"product",
    initialState,
    reducers:{
        categoryFilter:(state,action)=>{
            state.filterby=action.payload
        }
    },
    extraReducers:(builder)=>{
builder.addCase(getPoductsForUser.pending,(state,action)=>{
    state.allProducts= []
})
builder.addCase(getPoductsForUser.fulfilled,(state,action)=>{

  state.allProducts= action.payload.success
  
})
 builder.addCase(getPoductsForUser.rejected,(state,action)=>{
    state.allProducts= []
 })       




builder.addCase(getCategorisedProduct.pending,(state,action)=>{
    state.allProducts= []
})
builder.addCase(getCategorisedProduct.fulfilled,(state,action)=>{

 console.log(action.payload);
 state.categorisedProduct= action.payload.success
 
  
})
 builder.addCase(getCategorisedProduct.rejected,(state,action)=>{
    state.allProducts= []
 })       

builder.addCase(getFeaturedProduct.pending,(state,action)=>{
    state.featuredProduct=[]
})

builder.addCase(getFeaturedProduct.fulfilled,(state,action)=>{

state.featuredProduct= action.payload.success
})


 builder.addCase(getFeaturedProduct.rejected,(state,action)=>{
    state.featuredProduct=[]
 })




    }
})


export const {categoryFilter} = productSlice.actions 
export default productSlice.reducer