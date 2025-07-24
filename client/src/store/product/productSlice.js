import { createSlice } from "@reduxjs/toolkit"
import { getCategorisedProduct, getFeaturedProduct, getPoductsForUser, getSingleProductDetails } from "./productThunk"

const initialState= {
    allProducts:[],
    similarProducts:[],
    categorisedProduct:[],
    featuredProduct:[],
    filterby:'',
    minPrice:null,
    maxPrice:null,
    inputSearch:'',
    totalProducts:null,
    productDetail:null

}


const productSlice= createSlice({
    name:"product",
    initialState,
    reducers:{
        categoryFilter:(state,action)=>{
            state.filterby=action.payload
        },
        minMaxUpdate:(state,action)=>{
            console.log(action.payload);
            state.maxPrice= action.payload.highestPrice 
            state.minPrice= action.payload.lowestPrice
            
            
        },
        inputSearchUpdate:(state,action)=>{
            state.inputSearch= action.payload
        }
    },
    extraReducers:(builder)=>{

builder.addCase(getPoductsForUser.fulfilled,(state,action)=>{


const planeArray= [...state.allProducts]



    const ids= new Set(state.allProducts.map(p=> p._id))
 
    
    const uniqueNewProducts= action.payload.success.products.filter(p=> !ids.has(p._id))

  state.allProducts= [...state.allProducts, ...uniqueNewProducts]
  state.totalProducts= action.payload.success.total
  
  
})
 builder.addCase(getPoductsForUser.rejected,(state,action)=>{
    state.allProducts= []
 })       




builder.addCase(getCategorisedProduct.pending,(state,action)=>{
    state.allProducts= []
})
builder.addCase(getCategorisedProduct.fulfilled,(state,action)=>{

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

builder.addCase(getSingleProductDetails.fulfilled,(state,action)=>{
    state.productDetail = action.payload
    
})

builder.addCase(getSingleProductDetails.rejected,(state,action)=>{
    state.productDetail=null
})


    }
})


export const {categoryFilter,minMaxUpdate,inputSearchUpdate} = productSlice.actions 
export default productSlice.reducer