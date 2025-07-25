import React, { useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { userLogout } from "../../store/user/userThunk";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logginUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout()).then(()=>{
        localStorage.clear("userToken");
    navigate("/user-login");
    });
  
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between min-h-[64px] px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/MainLogo.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-bold text-xl text-primary hidden sm:block">
              ShopEase
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/product"
              className="px-4 py-2 font-semibold text-gray-700 hover:text-primary rounded transition"
            >
              Products
            </Link>
            {/* Cart Icon */}
            {logginUser ? (
              <Link to="/cart" className="relative px-2 py-2 hover:text-primary">
                <IoCartSharp className="text-xl" />
                <span className="badge absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {logginUser?.cart?.products?.length || 0}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => toast.warning("Login to access your cart")}
                aria-disabled="true"
                className="relative px-2 py-2 opacity-60 cursor-not-allowed"
                title="Please log in to view your cart"
              >
                <IoCartSharp className="text-xl" />
              </button>
            )}
            {/* Profile Icon */}
            {logginUser ? (
              <Link to="/account" className="px-2 py-2 hover:text-primary">
                <TbUser className="text-xl" />
              </Link>
            ) : (
              <button
                onClick={() => toast.warning("Login to access your profile")}
                aria-disabled="true"
                className="px-2 py-2 opacity-60 cursor-not-allowed"
                title="Please log in to view your account"
              >
                <TbUser className="text-xl" />
              </button>
            )}
            {/* Login/Logout */}
            {logginUser ? (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/user-login"
                className="ml-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu (hamburger) */}
          <button
            className="md:hidden flex items-center px-2 py-2 rounded hover:bg-gray-200"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-4 pt-4 pb-2 space-y-2 shadow">
            <Link
              to="/product"
              className="block px-2 py-2 w-full text-left font-semibold text-gray-700 hover:text-primary rounded"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            {logginUser ? (
              <>
                <Link
                  to="/cart"
                  className="block px-2 py-2 w-full text-left hover:text-primary rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <IoCartSharp className="inline mr-2" />
                  Cart ({logginUser?.cart?.products?.length || 0})
                </Link>
                <Link
                  to="/account"
                  className="block px-2 py-2 w-full text-left hover:text-primary rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  <TbUser className="inline mr-2" />
                  Account
                </Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-2 py-2 bg-primary text-white rounded mt-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/user-login"
                className="block px-2 py-2 w-full text-left bg-primary text-white rounded mt-1"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
