import React, { useRef } from "react";
import { useState } from "react";
import {  useForm } from "react-hook-form";
import { FaArrowAltCircleLeft, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import { addProduct, getOrderList } from "../../store/seller/sellerThunk";

const SellerAddProductPage = () => {
  const dispatch= useDispatch()
const [images, setImages]= useState(null)
const Category=[
      'Fashion',
      'Electronics',
      'Books',
      'Home & Kitchen',
      'Toys',
      'Sports',
      'Beauty',
      'Automotive',
      'Grocery'
    ]

  const fileInputRef = useRef(null);
const {register, handleSubmit,reset} = useForm()
const handleImages = (e)=>{
console.log(e);
const files= e.target.files 

setImages(files)

}

const handleAddNewProduct = (data) => {
  const form = new FormData();

  form.append("title", data.title);
  form.append("description", data.description);
  form.append("price", data.price);
  form.append("stock", data.stock);

  if (Array.isArray(data.category)) {
    form.append("category", data.category.join(","));
  } else {
    form.append("category", data.category);
  }

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }
  }

  dispatch(addProduct(form)).then((res) => {
    dispatch(getOrderList());

    // ✅ Clear form and file input after successful submit
    reset();              // Clears all text fields
    setImages(null);      // Resets images state
    if (fileInputRef.current) {
      fileInputRef.current.value = "";  // Clears file input manually
    }
  });
};


  return (
    <div className="max-w-2xl mx-auto py-10 px-4">

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Add New Product</h1>
          <p className="text-gray-500">Create a new product listing.</p>
        </div>
        <Link
          to="/seller-home/products"
          className="btn btn-ghost text-primary hover:bg-primary hover:text-white transition"
        >
          <FaArrowAltCircleLeft className="mr-2" />
          Back to Products
        </Link>
      </div>

  
      <form
        onSubmit={handleSubmit(handleAddNewProduct)}
        className="bg-base-100 rounded-xl shadow-lg p-6 flex flex-col gap-5"
      >
        <h3 className="text-lg font-bold text-base-content mb-2">Basic Info</h3>
      
        <div>
          <label htmlFor="title" className="label font-semibold">Product Name *</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product name"
            {...register('title',{
              required:true
            })}
            
            className="input input-bordered w-full focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="label font-semibold">Description</label>
          <textarea 
          {...register('description',{
            required:true
          })}
            id="description"
            placeholder="Describe your product"
            className="textarea textarea-bordered w-full min-h-[100px] focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
        {/* Category */}
        <div>
          <label className="label font-semibold">Category *</label>
          <select 
          multiple
          {...register('category',{
            required:true,
          
          })}
            className="select select-bordered w-full"
            required
          >
            <option  value="">Select your product category</option>
            {Category.map((item, idx) => (
              <option key={idx} value={item}>{item}</option>
            ))}
          </select>
        </div>
        {/* Price */}
        <div>
          <label htmlFor="price" className="label font-semibold">Price *</label>
          <input 
        {...register('price',{
          required:true
        })}
            type="number"
            id="price"
            placeholder="₹0"
            min="0"
            required
            className="input input-bordered w-full focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
       
        <div>
          <label htmlFor="stock" className="label font-semibold">Available Stock *</label>
          <input 
          {...register('stock',{
            required:true
          })}
            type="number"
            id="stock"
            placeholder="Enter available stock"
            min="0"
            required
            className="input input-bordered w-full focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
        {/* Product Images */}
        <div>
          <label htmlFor="images" className="label font-semibold">Product Images</label>
          <input
            type="file"
            id="images"
            multiple
            ref={fileInputRef}
            onChange={handleImages}
            className="file-input file-input-bordered file-input-primary w-full"
            accept="image/*"
          />
        </div>
        {/* Add Button */}
        <button
          type="submit"
          className="btn btn-primary gap-2 text-lg font-semibold hover:scale-105 active:scale-100 transition-all duration-150"
        >
          <FaPlus />
          Add Product
        </button>
      </form>
    </div>
  );
};

export default SellerAddProductPage;
