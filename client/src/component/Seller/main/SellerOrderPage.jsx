import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import {
  HiOutlineClipboardList,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineCheckCircle,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';

const SellerOrderPage = () => {
  const { ordersDetails } = useSelector((state) => state.seller);


  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState('');

  if (!ordersDetails) return <div className="p-4 text-center">Loading orders...</div>;


  let filteredOrders = [...ordersDetails.orders];


  if (search) {
    const term = search.toLowerCase();
    filteredOrders = filteredOrders.filter((order) => {
      return (
        order._id.toLowerCase().includes(term) ||
        order.user.username.firstName.toLowerCase().includes(term) ||
        order.user.username.lastName.toLowerCase().includes(term) ||
        (order.user.email && order.user.email.toLowerCase().includes(term))
      );
    });
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => {
      if (status === 'Processing') return !order.isDelivered;
      if (status === 'Delivered') return order.isDelivered;
      if (status === 'Pending') return !order.isPaid;
      if (status === 'Shipped') return order.isPaid && !order.isDelivered;
      return true;
    });
  }

  // Filter by date
  if (date) {
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate === date;
    });
  }


  const handleClear = () => {
    setSearch('');
    setStatus('');
    setDate('');
  };


  const totalOrders = ordersDetails.count ?? ordersDetails.orders.length;
  const pendingCount = ordersDetails.orders.filter((o) => !o.isDelivered && !o.isPaid).length;
  const shippedCount = ordersDetails.orders.filter((o) => o.isPaid && !o.isDelivered).length;
  const deliveredCount = ordersDetails.orders.filter((o) => o.isDelivered).length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 max-h-screen overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-base-content">Order Management</h1>
        <p className="text-gray-500">Track and manage your orders</p>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Search */}
        <div>
          <label className="label text-base-content font-medium">Search Order</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Order ID or Customer"
              className="input input-bordered w-full pr-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600" tabIndex={-1}>
              <IoMdSearch size={20} />
            </button>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="label text-base-content font-medium">Status</label>
          <select
            className="select select-bordered w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="label text-base-content font-medium">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Clear */}
        <div className="flex items-end pt-6">
          <button className="btn btn-outline w-full" type="button" onClick={handleClear}>
            Clear Filter
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg mb-8 max-h-[60vh] h-[50vh]">
        <table className="table w-full">
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
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-8">No orders found.</td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <span className="font-semibold">{order._id.toUpperCase()}</span>
                  </td>
                  <td>
                    <div>
                      <span className="font-medium">
                        {order.user.username.firstName} {order.user.username.lastName}
                      </span>
                      <p className="text-gray-400 text-xs">{order.user.email}</p>
                    </div>
                  </td>
                  <td>
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="mb-1 flex items-center gap-2">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{item.product.title}</h3>
                          <p className="text-sm">Qty: {item.qty}</p>
                          <p className="text-sm">Price: ₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td>
                    <span className="badge badge-primary badge-outline text-lg font-semibold">
                      ₹
                      {order.orderItems.reduce(
                        (sum, i) => sum + i.price * i.qty,
                        0
                      )}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge text-xs ${order.isDelivered ? 'badge-success' : 'badge-warning'}`}
                    >
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select className="select select-bordered select-sm w-full">
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Pending</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <div className="card bg-base-100 shadow p-5 flex flex-col items-center gap-2">
          <HiOutlineClipboardList className="text-4xl text-primary" />
          <p className="text-sm text-gray-500">Total Orders</p>
          <h1 className="text-3xl font-bold text-base-content">{totalOrders}</h1>
        </div>
        <div className="card bg-base-100 shadow p-5 flex flex-col items-center gap-2">
          <HiOutlineRefresh className="text-4xl text-accent" />
          <p className="text-sm text-gray-500">Pending</p>
          <h1 className="text-3xl font-bold text-base-content">{pendingCount}</h1>
        </div>
        <div className="card bg-base-100 shadow p-5 flex flex-col items-center gap-2">
          <HiOutlineTruck className="text-4xl text-secondary" />
          <p className="text-sm text-gray-500">Shipped</p>
          <h1 className="text-3xl font-bold text-base-content">{shippedCount}</h1>
        </div>
        <div className="card bg-base-100 shadow p-5 flex flex-col items-center gap-2">
          <HiOutlineCheckCircle className="text-4xl text-success" />
          <p className="text-sm text-gray-500">Delivered</p>
          <h1 className="text-3xl font-bold text-base-content">{deliveredCount}</h1>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderPage;
