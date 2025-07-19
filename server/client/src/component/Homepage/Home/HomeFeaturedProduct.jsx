import React from 'react'
import { useSelector } from 'react-redux'
import { FaCrown } from "react-icons/fa6";
import { Link } from 'react-router';
import { FaArrowRight } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

function HomeFeaturedProduct() {
  const { featuredProduct } = useSelector(state => state.products);

  if (!featuredProduct || featuredProduct.length === 0)
    return <div className="min-h-[40vh] flex items-center justify-center text-xl">Please wait while loading your data</div>;

  return (
    <div className="min-h-[70vh] py-10" data-theme="night">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Featured Products</h1>
        <span className="text-gray-400 text-lg">Handpicked favourites just for you</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch justify-center max-w-6xl mx-auto">
        {featuredProduct.slice(0, 4).map((item, idx) => (
          <div
            key={item._id}
            className="card relative bg-base-200 shadow-xl group overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <span className="absolute top-3 right-3 text-yellow-400 text-2xl z-10">
              <FaCrown/>
            </span>
            <figure className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
              <img
                src={item.images[1] || item.images[0] || "https://placehold.co/400x400"}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* SHOP NOW Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all z-20">
                <Link to={`/product/${item._id}`}
                  className="btn btn-warning text-black text-lg font-semibold gap-2">
                  Shop now <FaArrowRight/>
                </Link>
              </div>
            </figure>
            <div className="card-body items-center text-center z-10 relative bg-base-100">
              <h2 className="card-title text-lg font-bold">
                {item.title.length>20 ?item.title.slice(0,20)+'...':item.title}
              </h2>
              <div className="text-xl font-semibold text-yellow-500 flex items-center justify-center gap-1">
                <FaRupeeSign/> {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeFeaturedProduct
