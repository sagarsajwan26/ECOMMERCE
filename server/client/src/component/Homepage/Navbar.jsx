import React, { useState } from 'react';
import { IoCartSharp, IoSearch } from "react-icons/io5";
import { TbUser } from "react-icons/tb";
import { Link } from 'react-router';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link to="/cart" className="relative btn btn-ghost btn-sm">
            <IoCartSharp className="text-xl" />
            <span className="badge badge-primary badge-xs absolute -top-2 -right-2">5</span>
          </Link>
          <Link to="/account" className="btn btn-ghost btn-sm">
            <TbUser className="text-xl" />
          </Link>
        </div>
        <button
          className="md:hidden btn btn-ghost btn-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
    
        </button>
      </div>
    </div>

  
    {menuOpen && (
      <div className="md:hidden bg-base-100 px-4 pt-2 pb-4 border-t">
  
      </div>
    )}
  </nav>
</header>

  );
}

export default Navbar;
