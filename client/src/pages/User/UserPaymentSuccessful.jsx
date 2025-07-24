import React from 'react';
import { useNavigate } from 'react-router';
import { FaCheckCircle } from 'react-icons/fa';

const UserPaymentSuccessful = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md text-center animate-fade-in">
        
        <div className="flex justify-center mb-4">
          <FaCheckCircle className="text-green-500 text-6xl animate-ping-once" />
        </div>

        <h2 className="text-3xl font-bold text-primary mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your order has been placed and is being processed.
        </p>

        <button
          onClick={() => navigate('/product')}
          className="btn btn-primary btn-wide animate-bounce-once"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default UserPaymentSuccessful;
