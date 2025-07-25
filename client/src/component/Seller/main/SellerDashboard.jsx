import React, { useState, useRef } from "react";
import { HiOutlineCash } from "react-icons/hi";
import {
  HiOutlineCurrencyRupee,
  HiOutlineShoppingCart,
  HiOutlineShoppingBag,
  HiCheckCircle,
  HiPlus,
  HiSun,
  HiChevronDown,
} from "react-icons/hi2";
import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { sellerLogout } from "../../../store/seller/sellerThunk";

const SellerDashboard = () => {
  const [profileOption, setProfileOption] = useState(false);
  const profileRef = useRef();
  const dispatch = useDispatch();
  const { ordersDetails, logginSeller } = useSelector((state) => state.seller);

  const orderList = ordersDetails?.orders || [];
  const navigate = useNavigate();

  const totalItemsInStock = logginSeller?.currentSellingProducts?.reduce(
    (acc, item) => acc + item.stock,
    0
  );

  React.useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOption(false);
      }
    }
    if (profileOption) {
      window.addEventListener("mousedown", handleClick);
      return () => window.removeEventListener("mousedown", handleClick);
    }
  }, [profileOption]);

  if (!logginSeller) return <div>Please login first</div>;

  const handleLogout = () => {
    dispatch(sellerLogout())
      .unwrap()
      .then(() => {
        localStorage.removeItem("sellerToken");
        navigate("/seller-login");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content" data-theme="dark">
      {/* Navbar */}
      <nav className="flex items-center justify-end bg-base-100 px-6 py-4 shadow-md border-b border-gray-300 dark:border-gray-700 space-x-6 relative">
        <HiSun className="text-2xl text-primary" />
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-3 cursor-pointer p-0 bg-transparent border-none outline-none"
            onClick={() => setProfileOption((v) => !v)}
            aria-haspopup="true"
            aria-expanded={profileOption}
            aria-label="User Profile Menu Toggle"
          >
            <img
              src={logginSeller?.profilePic || "/placeholder.webp"}
              alt="User"
              className="w-11 h-11 rounded-full object-cover border-2 border-primary"
            />
            <div className="hidden sm:block text-left">
              <div className="font-semibold text-base sm:text-lg">
                {logginSeller?.username?.firstName || "Seller"}
              </div>
              <div className="text-xs text-gray-400">Seller</div>
            </div>
            <HiChevronDown className="text-xl text-gray-400" />
          </button>
          {profileOption && (
            <div className="absolute top-[68px] right-0 z-50 bg-base-100 rounded-lg shadow-lg border w-48 px-4 py-3 flex flex-col gap-2 animate-fade-in">
              <button
                onClick={() => setProfileOption(false)}
                className="btn btn-ghost btn-xs text-error self-end"
                aria-label="Close profile dropdown"
              >
                <MdCancel size={18} />
              </button>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-outline btn-sm normal-case"
          aria-label="Logout"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 px-6 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold leading-snug mb-1 tracking-tight">
              Dashboard
            </h1>
            <p className="text-gray-400">Welcome back! Here's your store overview</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              className="select select-bordered select-sm max-w-xs"
              defaultValue="1"
              aria-label="Select time range"
            >
              <option value="1">Last 1 month</option>
              <option value="3">Last 3 days</option>
              <option value="7">Last 7 days</option>
            </select>
            <Link
              to="/seller-home/add-product"
              className="btn btn-primary gap-2 normal-case hover:scale-105 transition"
            >
              <HiPlus size={20} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Total Revenue */}
          <div className="card bg-base-100 shadow p-6 min-h-[160px] justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-md font-semibold text-gray-400">Total Revenue</h3>
              <h2 className="mt-2 text-3xl font-bold flex items-center gap-2 text-primary">
                <HiOutlineCurrencyRupee size={24} /> {ordersDetails.totalSale}
              </h2>
            </div>
            <div className="text-primary text-4xl self-end opacity-50">
              <HiOutlineCash />
            </div>
          </div>

          <div className="card bg-base-100 shadow p-6 min-h-[160px] justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-md font-semibold text-gray-400">Total Orders</h3>
              <h2 className="mt-2 text-3xl font-bold">{ordersDetails.totalProductSold}</h2>
            </div>
            <div className="text-secondary text-4xl self-end opacity-50">
              <HiOutlineShoppingCart />
            </div>
          </div>
          {/* Products Sold */}
          <div className="card bg-base-100 shadow p-6 min-h-[160px] justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-md font-semibold text-gray-400">Products Sold</h3>
              <h2 className="mt-2 text-3xl font-bold">{ordersDetails.totalProductSold}</h2>
            </div>
            <div className="text-accent text-4xl self-end opacity-50">
              <HiOutlineShoppingBag />
            </div>
          </div>
          {/* Active Products */}
          <div className="card bg-base-100 shadow p-6 min-h-[160px] justify-between hover:shadow-lg transition">
            <div>
              <h3 className="text-md font-semibold text-gray-400">Active Products</h3>
              <h2 className="mt-2 text-3xl font-bold">{totalItemsInStock}</h2>
            </div>
            <div className="text-info text-5xl self-end opacity-50">
              <HiCheckCircle />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <section className="md:col-span-2 bg-base-100 shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link to="#" className="link link-primary text-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {orderList.length === 0 ? (
              <p className="text-center text-gray-500">No recent orders found.</p>
            ) : (
              orderList.slice(0, 7).map((order) => {
                const itemsTotal = order.orderItems.reduce(
                  (sum, item) => sum + item.price * item.qty,
                  0
                );
                const statusLabel = order.isDelivered ? "Delivered" : "Processing";
                const statusClass = order.isDelivered ? "badge-success" : "badge-warning";

                return (
                  <div
                    key={order._id}
                    className="flex justify-between items-center border-b border-gray-700 pb-3 last:border-b-0"
                  >
                    <div>
                      <h3 className="font-semibold leading-tight">
                        Ord-{order._id.slice(-6).toUpperCase()}
                        <span className={`badge ml-2 text-xs font-normal ${statusClass}`}>
                          {statusLabel}
                        </span>
                      </h3>
                      <p className="text-gray-400">
                        {order.user?.username?.firstName} {order.user?.username?.lastName}
                      </p>
                      <div className="text-gray-600 text-sm max-h-24 overflow-y-auto">
                        {order.orderItems.map((item) => (
                          <div key={item._id} className="mb-1">
                            {item.product?.title || item.name} x {item.qty}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className="text-primary flex items-center gap-1 font-semibold justify-end text-lg">
                        <HiOutlineCurrencyRupee size={18} /> {itemsTotal.toLocaleString()}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SellerDashboard;
