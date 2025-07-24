import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { addProductToCart, getSingleProductDetails } from '../../store/product/productThunk'
import { addReview, deleteReview, editReview } from '../../store/review/reviewThunk'
import { FaCrown, FaStar,  FaTrash, FaTrashCan } from 'react-icons/fa6'
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify'


function ProductDetailComponent() {
  const [currentImage, setCurrentImage] = useState('')
  const [reviewInput, setReviewInput] = useState('')
  const [rating, setRating] = useState(0)
  const [showReview, setShowReview] = useState(false)
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const dispatch = useDispatch()
  const { logginUser } = useSelector(state => state.user)
  const { id } = useParams()

  useEffect(() => {
    if (id) dispatch(getSingleProductDetails(id))
  }, [id, dispatch])

  const { productDetail } = useSelector((state) => state.products)
  if (!id) return <div className="alert alert-error my-10">Product id is missing</div>
  if (!productDetail) return <div className="flex justify-center items-center h-64">Please wait while loading your data...</div>

  const discounted = productDetail.discount > 0
  const finalPrice = productDetail.price - (productDetail.discount || 0)
  const reviews = productDetail.reviews ?? []

  const handleAddReview = (e) => {
    e.preventDefault()
    if (!reviewInput.trim() || !rating) return
    if (!logginUser) return toast.error("You must login first")
    dispatch(addReview({ id, rating: rating, comment: reviewInput })).then(res => {
      dispatch(getSingleProductDetails(id))
      setReviewInput('')
      setRating(0)
      
    })
  }

  const handleEditStart = (review) => {
    
    setEditingReviewId(review._id)
    setEditContent(review.comment)
 


  }

  // Fake handlers for edit and delete,
  // Replace with your actual thunk/actions for these features.
  const handleEditSubmit = (reviewId) => {
     dispatch(editReview({id:editingReviewId, comment:editContent})).then((res)=>{
        dispatch(getSingleProductDetails(id))
            toast.success('Edit saved (hook this up to backend)!')
    setEditingReviewId(null)
    setEditContent('')
  })

  }
  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId)).then(res=> {
   if(res.meta.rejectedWithValue ){
    toast.error(res?.payload?.message)
   }
     else{
      dispatch(getSingleProductDetails(id))
          toast.success('product deleted successfully')
     } 
    })

  }

  return (
    <div className="max-w-4xl mx-auto my-10 bg-base-100 shadow-xl rounded-2xl overflow-hidden">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 flex flex-col gap-3 p-4">
          <div className="relative rounded-xl aspect-square overflow-hidden">
            {productDetail.isFeatured && (
              <div className="absolute top-3 right-3 z-10 badge badge-warning gap-1 text-white px-3 py-2 text-lg font-bold shadow-lg flex items-center">
                <FaCrown className="me-2" />
                Featured
              </div>
            )}
            <img 
              src={currentImage || productDetail.images?.[0]} 
              alt={productDetail.title} 
              className="w-full h-full object-cover duration-200" 
            />
          </div>
          <div className="flex gap-2 mt-2">
            {productDetail.images?.map((img, idx) => (
              <img 
                onClick={() => setCurrentImage(img)} 
                key={idx} 
                src={img} 
                className={`w-16 h-16 rounded-lg object-cover ring-2 cursor-pointer ${currentImage === img ? 'ring-primary' : 'ring-base-200'}`} 
                alt={`${productDetail.title} shot ${idx + 1}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div className="md:w-1/2 p-6 flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {productDetail.title}
              {productDetail.category && (
                <span className="badge badge-outline ms-3">{productDetail.category}</span>
              )}
            </h1>
            <p className="text-gray-400 mb-2">{productDetail.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < (productDetail.ratings?.average || 0) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </span>
            <span className="text-sm text-gray-500">
              {productDetail.ratings?.average?.toFixed(1) || '0.0'} / 5.0 ({productDetail.ratings?.count || 0} reviews)
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {discounted && (<span className="line-through text-gray-400 text-lg">${productDetail.price}</span>)}
            <span className="text-2xl text-primary font-bold">
              ${finalPrice}
              {discounted && <span className="ms-2 badge badge-success">Save ${productDetail.discount}</span>}
            </span>
          </div>
          <div className="mt-2">
            {productDetail.stock > 0
              ? <span className="badge badge-info">In Stock: {productDetail.stock}</span>
              : <span className="badge badge-error">Out of Stock</span>
            }
          </div>
          <button 
          onClick={()=> {
            logginUser ?   dispatch(addProductToCart(productDetail._id)):toast.warning('Login to access cart');
          }}
            className="btn btn-primary btn-lg mt-4 w-full transition-transform duration-150 hover:scale-105"
            disabled={productDetail.stock === 0}
          >
            {productDetail.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Review Form + Reviews List */}
      <div className="p-6 border-t">
        {/* Add Review */}
        <form className="flex flex-col sm:flex-row gap-2 mb-3 items-center" onSubmit={handleAddReview}>
          <input
            type="text"
            className="input input-bordered flex-1"
            placeholder="Write a review..."
            value={reviewInput}
            onChange={e => setReviewInput(e.target.value)}
            required
          />
          <div className="flex items-center gap-2">
            <label htmlFor="rating" className="text-base font-medium">Rating</label>
            <select
              id="rating"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="select select-bordered min-w-[70px]"
              required
            >
              <option value={0}>--</option>
              <option value={1}>1 ⭐</option>
              <option value={2}>2 ⭐</option>
              <option value={3}>3 ⭐</option>
              <option value={4}>4 ⭐</option>
              <option value={5}>5 ⭐</option>
            </select>
          </div>
          <button 
            type="submit"
            className="btn btn-accent"
            disabled={!reviewInput.trim() || !rating}
          >
            Add Review
          </button>
        </form>

        {/* Reviews Toggle and List */}
        <div>
          {!showReview ? (
            <button className="btn btn-outline btn-sm" onClick={() => setShowReview(true)}>
              Show Reviews
            </button>
          ) : (
            <div>
              <button className="btn btn-ghost btn-xs mb-3" onClick={() => setShowReview(false)}>
                Hide Reviews
              </button>
              <div className="space-y-3">
                {/* No reviews */}
                {reviews.length === 0
                  ? <div className="text-gray-400">No reviews yet.</div>
                  : reviews.map((review, idx) => {
                      const isOwner =
                        logginUser &&
                        review.user &&
                        (logginUser._id === review.user._id || logginUser._id === review.user)
                      return (
                        <div
                          key={review._id || idx}
                          className="bg-base-200 p-4 rounded-xl flex flex-col sm:flex-row items-start gap-3 sm:gap-5 shadow"
                        >
                          {/* Left: Avatar + user info */}
                          <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            {review?.user?.profileImage
                              ? (
                                <img
                                  src={review.user.profileImage}
                                  className="w-10 h-10 object-cover rounded-full border"
                                  alt={review.user.username?.firstName || "User"}
                                />
                              )
                              : (
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold">
                                  {(review.user?.username?.firstName || 'U')[0]}
                                </div>
                              )
                            }
                            <div>
                              <div className="font-semibold text-base-content">
                                {review.user?.username
                                  ? `${review.user.username.firstName}${review.user.username.lastName ? ' ' + review.user.username.lastName : ''}`
                                  : "User"}
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={i < (review.rating || 0) ? "text-yellow-400" : "text-gray-300"}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Review Comment or Editable Input */}
                          <div className="flex-1">
                            {editingReviewId === review._id ? (
                              <form className="flex flex-col sm:flex-row items-end gap-2"
                                    onSubmit={e => {
                                      e.preventDefault()
                                      handleEditSubmit(review._id)
                                    }}>
                                <input
                                  value={editContent}
                                  onChange={e => setEditContent(e.target.value)}
                                  className="input input-sm input-bordered flex-1"
                                />
                                <button type="submit" className="btn btn-success btn-sm">Save</button>
                                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingReviewId(null)}>
                                  Cancel
                                </button>
                              </form>
                            ) : (
                              <p className="text-base-content">{review.comment}</p>
                            )}
                          </div>

                          {/* Edit/Delete Buttons */}
                          {isOwner && editingReviewId !== review._id && (
                            <div className="flex gap-2 sm:flex-col flex-row mt-2 sm:mt-0 ml-auto">
                              <button
                                onClick={() => handleEditStart(review)}
                                className="btn btn-sm btn-outline btn-info flex items-center gap-1"
                              >
                                <MdEdit /> Edit
                              </button>
                              <button
                                onClick={() => handleDelete(review._id)}
                                className="btn btn-sm btn-outline btn-error flex items-center gap-1"
                              >
                                <FaTrashCan /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailComponent
