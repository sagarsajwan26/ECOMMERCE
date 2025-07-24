import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import {
  HiOutlineClipboardList,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineCheckCircle,
} from 'react-icons/hi';

const SellerOrderPage = () => {
  return (
    <div className='max-w-7xl mx-auto py-8 px-4 max-h-screen'>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-base-content">Order Management</h1>
        <p className="text-gray-500">Track and manage your orders</p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <div>
          <label className="label text-base-content">Search Order</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Order ID or Customer"
              className="input input-bordered w-full pr-10"
            />
            <button className="absolute right-2 top-2 text-gray-400">
              <IoMdSearch size={20} />
            </button>
          </div>
        </div>
        {/* Status */}
        <div>
          <label className="label text-base-content">Status</label>
          <select className="select select-bordered w-full">
            <option value="">All Status</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Pending</option>
          </select>
        </div>
        {/* Date (optional) */}
        <div>
          <label className="label text-base-content">Date</label>
          <input type="date" className="input input-bordered w-full" />
        </div>
        {/* Clear */}
        <div className="flex items-end pt-6">
          <button className="btn btn-outline w-full">Clear Filter</button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg mb-8 h-[50vh] max-h-[60vh]">
        <table className="table  w-full ">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className=' ' >
            {[1,2,3,4,5,6,7,8].map((id) => (
              <tr key={id}>
                <td>
                  <span className="font-semibold">ORD-001</span>
                </td>
                <td>
                  <div>
                    <span className="font-medium">John Smith</span>
                    <p className="text-gray-400 text-xs">johnSmith@gmail.com</p>
                  </div>
                </td>
                <td>
                  <span>Wireless Headphone x 5</span>
                </td>
                <td>
                  <span className="badge badge-primary badge-outline">₹4,999</span>
                </td>
                <td>
                  <span className="badge badge-warning text-xs">Processing</span>
                </td>
                <td>2024-10-12</td>
                <td>
                  <select className="select select-bordered select-sm">
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Pending</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Total Orders */}
        <div className="card bg-base-100 shadow p-5 flex items-center flex-col gap-2">
          <HiOutlineClipboardList className="text-3xl text-primary" />
          <p className="text-sm text-gray-500">Total Orders</p>
          <h1 className="text-2xl font-bold text-base-content">6</h1>
        </div>
        {/* Pending */}
        <div className="card bg-base-100 shadow p-5 flex items-center flex-col gap-2">
          <HiOutlineRefresh className="text-3xl text-accent" />
          <p className="text-sm text-gray-500">Pending</p>
          <h1 className="text-2xl font-bold text-base-content">2</h1>
        </div>
        {/* Shipped */}
        <div className="card bg-base-100 shadow p-5 flex items-center flex-col gap-2">
          <HiOutlineTruck className="text-3xl text-secondary" />
          <p className="text-sm text-gray-500">Shipped</p>
          <h1 className="text-2xl font-bold text-base-content">2</h1>
        </div>
        {/* Delivered */}
        <div className="card bg-base-100 shadow p-5 flex items-center flex-col gap-2">
          <HiOutlineCheckCircle className="text-3xl text-success" />
          <p className="text-sm text-gray-500">Delivered</p>
          <h1 className="text-2xl font-bold text-base-content">2</h1>
        </div>
      </div>

    </div>
  );
};

export default SellerOrderPage;
