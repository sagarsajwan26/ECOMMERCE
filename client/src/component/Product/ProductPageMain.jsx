import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProductToCart, getPoductsForUser } from '../../store/product/productThunk'
import InfiniteScroll from 'react-infinite-scroll-component'
import { TbH4 } from 'react-icons/tb'
import { all } from 'axios'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
function ProductPageMain () {
  const [sortBy, setSortBy] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const dispatch = useDispatch()
  const { logginUser } = useSelector (state => state.user)
  const {
    allProducts,
    filterby,
    categorisedProduct,
    minPrice,
    maxPrice,
    inputSearch,
    totalProducts
  } = useSelector(state => state.products)

  const navigate = useNavigate()

  const fetchMoreData = () => {
    const nextPage = page + 1

    dispatch(getPoductsForUser({ limit: 10, skip: allProducts.length })).then(
      res => {
        if (allProducts.length === totalProducts) {
          setHasMore(false)
        }

        setPage(nextPage)
      }
    )
  }

  let filterProduct = allProducts

  if (filterby.trim()) {
    const catObj = categorisedProduct.find(prod => {
      return prod.category === filterby
    })

    filterProduct = catObj ? catObj.products : []
  }
  if (inputSearch.trim()) {
    filterProduct = filterProduct.filter(item => {
      return (
        item.title.toLowerCase().includes(inputSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(inputSearch.toLowerCase())
      )
    })
  }
  if (minPrice || maxPrice)
    filterProduct = filterProduct.filter(
      item => item.price > minPrice && item.price < maxPrice
    )

  if (sortBy === 'asc') {
    filterProduct = [...filterProduct].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'desc') {
    filterProduct = [...filterProduct].sort((a, b) => a.price - b.price)
  }

  if (allProducts.length === 0) return <div>Loading...</div>

  return (
    <main className='bg-base-100 border border-gray-300 min-h-[40vh] md:col-span-6 col-span-1 w-full text-2xl text-gray-400 rounded-xl'>
      {/* Filter and Sort Row */}
      <InfiniteScroll
        dataLength={allProducts?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more products</p>}
      >
        <div className='flex flex-col md:flex-row md:justify-between items-center gap-6 px-10 pt-10'>
          {filterby.trim() && (
            <h1 className='text-center text-base font-semibold text-white bg-primary/10 rounded px-3 py-1 mb-2 md:mb-0'>
              Filtered By : {filterby}
            </h1>
          )}
          <div
            className={`flex items-center gap-2 ${
              !filterby.trim() && 'mx-auto'
            }`}
          >
            <h3 className='text-base text-white'>Sort By Price</h3>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className='select select-sm select-bordered bg-base-100 text-white ml-2'
            >
              <option value=''>Select</option>
              <option value='asc'>High To Low</option>
              <option value='desc'>Low to High</option>
            </select>
          </div>
        </div>

        <div className='flex flex-wrap gap-6 w-full px-6 py-10'>
          {filterProduct?.map(product => (
            <div
             
              className='card w-80 bg-base-100 shadow border border-base-200 flex flex-col'
              key={product._id}
            >
              <figure className='h-40 bg-base-200 rounded-t-xl overflow-hidden'>
                <img

                 onClick={() => {
                navigate(`/getProductDetails/${product._id}`)
              }}
                  className='w-full h-full object-cover'
                  src={product.images[1]}
                  alt={product.images[0]}
                  onError={e => {
                    e.target.src =
                      'https://imgs.search.brave.com/XPT4KZAmcyhIBwVzhgwsRBtjQta0BsqJ_AY8E2_SiZ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jbG91/ZGluYXJ5LW1hcmtl/dGluZy1yZXMuY2xv/dWRpbmFyeS5jb20v/aW1hZ2VzL3dfMTAw/MCxjX3NjYWxlL3Yx/NzE5Nzc1MzQ4L2lt/YWdlX2xvYWRpbmdf/ZXJyb3JfaGVhZGVy/L2ltYWdlX2xvYWRp/bmdfZXJyb3JfaGVh/ZGVyLXBuZz9faT1B/QQ'
                  }}
                />
              </figure>
              <div className='card-body px-4 py-3 flex-1 flex flex-col'>
                <h2 className='card-title text-lg mb-1'>
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + '...'
                    : product.title}
                </h2>
                <p className='text-gray-500 text-sm mb-2'>
                  {product.description.length > 20
                    ? product.description.slice(0, 20) + '...'
                    : product.description}
                </p>
                <div className='flex items-center justify-between mt-auto'>
                  <span className='font-bold text-primary text-lg'>
                    ₹{product.price}
                  </span>
                  <button 
                  onClick={()=> {
                    if (!logginUser) {
                      toast.warning('Please login to add items to cart')
                      return
                    }
                    dispatch(addProductToCart(product._id))
                  }}
                  className='btn btn-primary btn-sm'>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </main>
  )
}

export default ProductPageMain
