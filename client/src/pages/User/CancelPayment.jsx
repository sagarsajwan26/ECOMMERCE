import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const CancelPayment = () => {
  return (
    <div 
      className="
        max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
        flex items-center space-x-4 border border-gray-300 dark:border-gray-600
        transition-transform transform hover:scale-105 hover:shadow-2xl
        duration-300 ease-in-out
      "
      aria-label="Cancel Payment"
    >
      <FaTimesCircle 
        className="text-red-500 w-8 h-8 animate-pulse" 
        aria-hidden="true" 
      />
      <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
         Payment cancelled
      </div>
    </div>
  );
};

export default CancelPayment;
