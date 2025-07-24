import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos, MdDashboard, MdShoppingCart, MdSettings, MdListAlt } from "react-icons/md";
import { Link, useLocation } from "react-router"; // fixed react-router import

const SellerSidebar = () => {
  // Define links with actual icon components
  const SideLinks = [
    {
      name: "Dashboard",
      path: "/seller-home",
      icon: MdDashboard,
    },
    {
      name: "Products",
      path: "/seller-home/products",
      icon: MdListAlt,
    },
    {
      name: "Orders",
      path: "/seller-home/orders", 
      icon: MdShoppingCart,
    },
    {
      name: "Settings",
      path: "/seller-home/settings",
      icon: MdSettings,
    },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={`sticky top-0 flex flex-col bg-base-200 border-r border-gray-300 dark:border-gray-700 h-screen transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo and collapse button */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Logo" className={`h-8 w-auto transition-all duration-300 ${collapsed ? "hidden" : "block"}`} />
          {!collapsed && <span className="text-lg font-bold text-primary">Seller Hub</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle Sidebar"
          className="btn btn-square btn-ghost p-2 rounded-md hover:bg-primary hover:text-white"
        >
          {collapsed ? <MdArrowForwardIos size={20} /> : <MdArrowBackIos size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-grow mt-4 space-y-1 overflow-y-auto">
        {SideLinks.map(({ name, path, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-4 py-3 px-4 mx-2 rounded-lg transition-colors duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "text-base-content hover:bg-primary hover:text-primary-content"
                }
              `}
            >
              <Icon size={24} />
              {!collapsed && <span className="font-medium">{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Add Product Button */}
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <Link 
        to='/seller-home/add-Product' 
        
          type="button"
          className={`btn btn-primary btn-block gap-2 normal-case justify-center ${
            collapsed ? "btn-square btn-sm" : ""
          }`}
        >
          <FaPlus size={collapsed ? 16 : 20} />
          {!collapsed && "Add Product"}
        </Link>
      </div>
    </div>
  );
};

export default SellerSidebar;
