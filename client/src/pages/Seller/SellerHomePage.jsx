import React from 'react'
import { Outlet } from 'react-router'
import SellerSidebar from '../../component/Seller/SellerSidebar'

function SellerHomePage() {
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