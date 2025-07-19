import React, { useEffect } from 'react'
import Navbar from '../../component/Homepage/Navbar'
import { Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getCategorisedProduct, getFeaturedProduct, getPoductsForUser } from '../../store/product/productThunk'

function HomePage() {
  const productData= useSelector(state=> state.products.allProducts)
const dispatch= useDispatch()
  useEffect(()=>{
dispatch(getPoductsForUser())
  },[])

useEffect(()=>{
  dispatch(getCategorisedProduct())
},[])

useEffect(()=>{
dispatch(getFeaturedProduct())
},[])

  return (
    <div>
        <Navbar/>
        <Outlet/>

    </div>
  )
}

export default HomePage