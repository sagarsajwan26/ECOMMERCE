import React from 'react'
import { Link } from 'react-router'
import { FaTruck, FaShieldAlt, FaHeadphonesAlt, FaUndoAlt } from "react-icons/fa";

const advantages = [
  {
    icon: FaTruck,
    title: "Free Shipping",
    description: "On order above ₹500",
    to: "/delivery_policy"
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payment",
    description: "100% secure transactions",
    to: "/secure_policy"
  },
  {
    icon: FaHeadphonesAlt,
    title: "24/7 Support",
    description: "Round the clock assistance",
    to: "/support_policy"
  },
  {
    icon: FaUndoAlt,
    title: "Easy Return",
    description: "7-day return policy",
    to: "/return_policy"
  },
];

const HomeAdvantages = () => {
  return (
    <div className="min-h-[40vh] py-12 px-20 bg-base-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" data-theme="sunset">
      {advantages.map((item, index) => (
        <Link to={item.to}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-base-100 shadow hover:scale-105 transition-transform"
              key={index}>
          <span className="text-4xl text-primary mb-3">
            <item.icon />
          </span>
          <h2 className="text-lg font-bold mb-1">{item.title}</h2>
          <p className="text-gray-400">{item.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default HomeAdvantages;
