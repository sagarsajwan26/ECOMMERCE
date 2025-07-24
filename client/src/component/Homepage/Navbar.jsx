import React, { useState } from 'react';
import { IoCartSharp } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import { useSelector } from 'react-redux';
import { Link } from 'react-router'; // Should be from 'react-router-dom' in most setups!
import { toast } from 'react-toastify';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logginUser } = useSelector(state => state.user);
 

  return (
    <header className="bg-base-100 shadow sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between min-h-[64px] px-2 lg:px-6 w-full">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/MainLogo.jpg" alt="Logo" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-bold text-xl text-primary hidden sm:block">ShopEase</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex gap-2">
              <Link to="/product" className="btn btn-ghost btn-sm font-semibold capitalize text-base-content">Products</Link>
              
              {/* Cart button */}
              {!logginUser ? (
                <button
                  className="relative btn btn-ghost btn-sm opacity-60 cursor-not-allowed"
                  onClick={() => toast.warning('Login to access your cart')}
                  aria-disabled="true"
                  title="Please log in to view your cart"
                >
                  <IoCartSharp className="text-xl" />
                </button>
              ) : (
                <Link to="/cart" className="relative btn btn-ghost btn-sm">
                  <IoCartSharp className="text-xl" />
                  <span className="badge badge-primary badge-xs absolute -top-2 -right-2">
                    {logginUser?.cart?.products?.length}
                  </span>
                </Link>
              )}

              {/* Profile/account button */}
              {!logginUser ? (
                <button
                  className="btn btn-ghost btn-sm opacity-60 cursor-not-allowed"
                  onClick={() => toast.warning('Login to access your profile')}
                  aria-disabled="true"
                  title="Please log in to view your account"
                >
                  <TbUser className="text-xl" />
                </button>
              ) : (
                <Link to="/account" className="btn btn-ghost btn-sm">
                  <TbUser className="text-xl" />
                </Link>
              )}
            </div>
            <button
              className="md:hidden btn btn-ghost btn-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            />
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-base-100 px-4 pt-2 pb-4 border-t">
            {/* Mobile menu content */}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
