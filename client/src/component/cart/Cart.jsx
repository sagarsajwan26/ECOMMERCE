import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, removeProductFromCart } from '../../store/product/productThunk';
import { FaTrash } from 'react-icons/fa';

function Cart() {
  const dispatch = useDispatch()
  const { logginUser } = useSelector((state) => state.user);
  
  
  const products = logginUser?.cart?.products || []; 


console.log(products);

  if (products.length === 0) {
    return (  
      <div className="col-span-5 flex items-center justify-center h-full">
        <div className="text-center">   
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-500">Add items to your cart to see them here.</p>
          <button className="btn btn-primary mt-4">
            <a href="/product">Start Shopping</a>
          </button>
        </div>


      </div>
    );
  }

  
  return (
    <div className='col-span-5 '>
    
      
      <div className="flex flex-col gap-5 bg-zinc-600 rounded-xl px-4 py-4">
        {products?.map((item, index) => (
          <div 
            key={item._id}
            className="relative card card-side bg-base-100 shadow-md border border-base-200 flex flex-row items-center gap-6 p-3 lg:p-6"
          >

            <span 
             onClick={()=>dispatch(removeProductFromCart({id:item.productId._id,option:'remove'}))}
            className='absolute right-5 top-5 text-red-800 hover:text-red-500 transition-all ease-in-out' ><FaTrash/>  </span>
            <figure className="w-32 h-32 rounded-lg overflow-hidden bg-base-200 flex-shrink-0">
              <img
                src={item.productId?.images[0]}
                alt={item.productId?.images[1]}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="flex flex-col justify-between flex-1 gap-2">
              <div>
                <h2 className="card-title text-lg font-semibold mb-1">{item.productId?.title}</h2>
               <p>{item.productId?.description}</p>
                {item.outOfStock ? (
                  <span className="badge badge-error text-sm mt-2">Out of stock</span>
                ) : (
                  <span className="badge badge-success text-sm mt-2">In Stock</span>
                )}
              </div>
            </div>
            <div className="flex  items-center gap-5 ml-auto">
              <button 
              onClick={()=>dispatch(removeProductFromCart({id:item.productId._id,option:'delete'}))}
              className="btn btn-outline btn-sm" disabled={item.quantity === 1 || item.outOfStock}>
                <FiMinus />
              </button>
              <p className="text-lg font-bold">{item.quantity}</p>
              <button 
              onClick={()=>dispatch(addProductToCart(item.productId?._id))}
              className="btn btn-outline btn-sm" disabled={item.outOfStock}>
                <FiPlus />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cart
