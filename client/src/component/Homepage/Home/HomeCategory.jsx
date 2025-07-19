import React from 'react'
import { useSelector } from 'react-redux'

function HomeCategory() {
  const { categorisedProduct } = useSelector(state => state.products);

  return (
    <div className="min-h-[70vh] p-5 py-10 " data-theme='sunset'> 
      <h1 className="text-center text-4xl mb-5 font-bold">
        Shop by Category
      </h1>
      <p className="text-center text-medium text-gray-500 mb-10">
        Discover our wide range of products
      </p>

      <div className="flex flex-wrap gap-8 justify-center">
        {categorisedProduct.length !== 0 && categorisedProduct.slice(0, 4).map((item, idx) => {
       
          const bgUrl =
            item.products[0]?.images[1] ||
            item.products[0]?.images[0] ||
            "https://placehold.co/320x200?text=No+Image";

          return (
            <div
              key={idx}
              className="card w-80 shadow-xl border hover:scale-105 transition-transform duration-300 relative overflow-hidden"
              style={{
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "260px",
              }}
            >
           
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-10"></div>
              <div className="card-body items-center text-center z-20 relative">
                <h2 className="card-title text-2xl">{item.category}</h2>
                <span className="badge badge-primary badge-lg mt-4">
                  {item.products.length} products
                </span>
                <div className="card-actions mt-4">
                  <button className="btn btn-secondary btn-sm">
                    Explore {item.category}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeCategory;
