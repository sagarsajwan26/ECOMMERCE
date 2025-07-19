import React from 'react'
import { Link } from 'react-router' 
import { IoLogoInstagram } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { ImFacebook } from "react-icons/im";

const QuickLinks = [
  { name: "All Products", to: "/products" },
  { name: "My Account", to: "/my-profile" },
  { name: "Shopping Cart", to: "/cart" },
  { name: "Check Out", to: "/checkout" },
]

const customerService = [
  { name: "Contact Us", to: "/contact_us" },
  { name: "FAQ", to: "/faq" },
  { name: "Shopping Info", to: "/info" },
  { name: "Returns", to: "/returns" },
]

function HomeFooter() {
  return (
    <footer className='bg-base-200 text-base-content py-12 px-4' data-theme='night'>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-8">
        {/* Logo and About */}
        <div className='md:col-span-3 flex flex-col gap-4'>
        <div className='w-full flex items-center justify-center '>
              <img
            className='bg-secondary rounded-full h-30 w-30 mb-2'
            src='/Logo.png'
            alt='Logo'
          />
        </div>
          <p className='text-lg text-gray-400'>
            Your trusted online shopping destination for quality products, competitive prices, and exceptional customer service.
          </p>
          {/* Socials (DaisyUI) */}
          <div className="flex gap-3 mt-2">
            <a href="/" aria-label="Facebook" className="btn btn-circle btn-sm btn-outline text-primary">
            <ImFacebook/>
            </a>
            <a href="/" aria-label="Instagram" className="btn btn-circle btn-sm btn-outline text-primary">
              <IoLogoInstagram/>
            </a>
            <a href="/" aria-label="Twitter" className="btn btn-circle btn-sm btn-outline text-primary">
            <FaXTwitter/>
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div className='md:col-span-2 flex flex-col gap-2'>
          <span className="footer-title text-lg">Quick Links</span>
          <ul className="menu menu-vertical p-0">
            {QuickLinks.map((item, idx) => (
              <li key={idx}>
                <Link to={item.to} className="hover:text-primary transition-colors duration-200">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className='md:col-span-2 flex flex-col gap-2'>
          <span className="footer-title text-lg">Customer Service</span>
          <ul className="menu menu-vertical p-0">
            {customerService.map((item, idx) => (
              <li key={idx}>
                <Link to={item.to} className="hover:text-primary transition-colors duration-200">{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="border-t border-base-300 mt-10 pt-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Your Shop Name. All rights reserved.
      </div>
    </footer>
  )
}

export default HomeFooter
