import React from 'react'
import Cart from '../../component/cart/Cart'
import CartRightSection from '../../component/cart/CartRightSection'

function UserCart() {
  return (
    <div className='px-14' >
        <div className="text-2xl font-bold mb-1 ">Shopping cart</div>
      <p className="text-gray-400 mb-6"> in your cart</p>
     <div className='grid grid-cols-7'>
       <Cart/>
      <CartRightSection/>
     </div>
    </div>
  )
}

export default UserCart