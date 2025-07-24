import React from "react";
import { FaEdit, FaPlus, FaTrashAlt, FaRupeeSign } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router";

const SellerProductsPages = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4  max-h-screen">
      {/* Header and Add Product */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Product Management</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Link
          to="/seller-home/add-product"
          className="btn btn-primary gap-2"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <div>
          <label className="label text-base-content">Search Products</label>
          <div className="relative">
            <input
              type="text"
              className="input input-bordered w-full pr-10"
              placeholder="Product name or code"
            />
            <button className="absolute right-2 top-2 text-gray-400">
              <IoMdSearch size={20} />
            </button>
          </div>
        </div>
        {/* Category */}
        <div>
          <label className="label text-base-content">Category</label>
          <select className="select select-bordered w-full">
            <option value="">All Categories</option>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <option key={item} value={`Category-${item}`}>{`Category-${item}`}</option>
            ))}
          </select>
        </div>
        {/* Status */}
        <div>
          <label className="label text-base-content">Status</label>
          <select className="select select-bordered w-full">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Draft">Draft</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        {/* Clear */}
        <div className="flex items-end pt-6">
          <button className="btn btn-outline w-full">Clear Filter</button>
        </div>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg  max-h-[70vh] ">
        <table className="table  w-full ">
          <thead>
            <tr>
              <th className="text-base font-semibold">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 4, 5, 6, 7, 8, 5, 9].map((_, idx) => (
              <tr key={idx}>
                {/* Product cell */}
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src="https://imgs.search.brave.com/colZnGcv0fqOiT-BUN6trpTJtNHuVzrZ6cdrDhz5vao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg1/MzM4MDQxMS9waG90/by9saWdodC1ncmVl/bi13aXJlbGVzcy1o/ZWFkcGhvbmVzLXdp/dGgtaGFyZC1zaGFk/b3ctb24tYmx1ZS1i/YWNrZ3JvdW5kLWNv/bmNlcHQtb2YtbXVz/aWMuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPXIteVE3UVF1/SXhXUUJXNHdUTlhf/V2Frcm5pZEZJV0Vu/YzNaSmpsVmhUSDA9"
                      alt=""
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                    <div>
                      <h1 className="font-semibold">Wireless headphone</h1>
                      <p className="text-xs text-gray-400">PRO-001</p>
                    </div>
                  </div>
                </td>
                <td>Electronics</td>
                <td>
                  <span className="flex items-center gap-1 text-base font-medium text-primary">
                    <FaRupeeSign /> 4234
                  </span>
                </td>
                <td>45</td>
                <td>
                  <span className="badge badge-success">Active</span>
                </td>
                <td>423</td>
                <td>
                  <div className="flex gap-2">
                    <Link to="#" className="btn btn-sm btn-ghost btn-square text-info">
                      <FaEdit />
                    </Link>
                    <Link to="#" className="btn btn-sm btn-ghost btn-square text-error">
                      <FaTrashAlt />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProductsPages;
