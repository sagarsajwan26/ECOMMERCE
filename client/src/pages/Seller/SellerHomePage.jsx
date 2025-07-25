import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import SellerSidebar from '../../component/Seller/SellerSidebar'
import { useDispatch } from 'react-redux'
import { getOrderList } from '../../store/seller/sellerThunk'

function SellerHomePage() {
  const navigate= useNavigate()
  const dispatch= useDispatch()
  useEffect(()=>{

      dispatch(getOrderList())
  },
  
  [navigate])
  return (
    <div className='flex w-full'  >
        <div className='' >
          <SellerSidebar/>
        </div>
       <div className='w-full ' >
         <Outlet/>
       </div>
    </div>
  )
}

export default SellerHomePage