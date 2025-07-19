import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { categoryFilter } from '../../store/product/productSlice';

function ProductPageSidebar() {
  const [lowestPrice, setLowestPrice] = useState(0)
  const [highestPrice, setHighestPrice] = useState(1000)
  const { categorisedProduct } = useSelector(state => state.products)
  const dispatch= useDispatch()
  if (!categorisedProduct || categorisedProduct.length === 0)
    return <div className="p-6">Loading...</div>
  
  return (
    <aside className=" md:col-span-2 w-full h-fit bg-base-100 rounded-xl shadow border p-6 flex flex-col gap-6 sticky top-16" data-theme="dew">
    
      <section>
        <h2 className="text-lg font-bold text-primary mb-4">Categories</h2>
        <ul className="flex flex-col gap-2">
          {categorisedProduct.map((item, idx) => (
            <li 
            onClick={()=> dispatch(categoryFilter(item.category))}
              className="flex justify-between items-center px-3 py-2 rounded hover:bg-primary/10 cursor-pointer font-medium"
              key={idx}
            >
              <span>{item.category}</span>
              <span className="badge badge-primary badge-outline">{item.products.length}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Price Range */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3">Price Range</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="number"
            className="input input-bordered input-sm w-1/2"
            min={0}
            value={lowestPrice}
            onChange={(e) => setLowestPrice(e.target.value)}
            placeholder="Min"
          />
          <input
            type="number"
            className="input input-bordered input-sm w-1/2"
            min={0}
            value={highestPrice}
            onChange={(e) => setHighestPrice(e.target.value)}
            placeholder="Max"
          />
        </div>
        <div className="mb-2 text-sm text-gray-400">
          {lowestPrice} - {highestPrice}
        </div>
        <button className="btn btn-primary btn-sm w-full" type="button">Filter</button>
      </section>

      {/* Ratings */}
      <section>
        <h2 className="text-lg font-bold text-primary mb-3">Rating</h2>
        <div className="flex gap-1 items-center">
          {[1,2,3,4,5].map(star => (
            <FaStar key={star} className="text-yellow-400"/>
          ))}
        </div>
      </section>
    </aside>
  )
}

export default ProductPageSidebar
