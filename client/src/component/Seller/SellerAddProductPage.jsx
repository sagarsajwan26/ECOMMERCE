import React, { useRef } from "react";
import { FaArrowAltCircleLeft, FaPlus } from "react-icons/fa";
import { Link } from "react-router";

const SellerAddProductPage = () => {
  const fileInputRef = useRef(null);

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    // You can implement form handling logic here
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Header */}
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

      {/* Add Product Form */}
      <form
        onSubmit={handleAddNewProduct}
        className="bg-base-100 rounded-xl shadow-lg p-6 flex flex-col gap-5"
      >
        <h3 className="text-lg font-bold text-base-content mb-2">Basic Info</h3>
        {/* Product Name */}
        <div>
          <label htmlFor="title" className="label font-semibold">Product Name *</label>
          <input
            type="text"
            id="title"
            placeholder="Enter product name"
            required
            className="input input-bordered w-full focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="label font-semibold">Description</label>
          <textarea
            id="description"
            placeholder="Describe your product"
            className="textarea textarea-bordered w-full min-h-[100px] focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
        {/* Category */}
        <div>
          <label className="label font-semibold">Category *</label>
          <select
            className="select select-bordered w-full"
            required
          >
            <option value="">Select your product category</option>
            {[1, 2, 3, 4, 5, 6, 7].map((idx) => (
              <option key={idx} value={`Fashion-${idx}`}>Fashion {idx}</option>
            ))}
          </select>
        </div>
        {/* Price */}
        <div>
          <label htmlFor="price" className="label font-semibold">Price *</label>
          <input
            type="number"
            id="price"
            placeholder="₹0"
            min="0"
            required
            className="input input-bordered w-full focus:ring-2 focus:ring-primary/60 transition"
          />
        </div>
        {/* Stock */}
        <div>
          <label htmlFor="stock" className="label font-semibold">Available Stock *</label>
          <input
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
