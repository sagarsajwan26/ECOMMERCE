import React from "react";
import ProductPageSidebar from "../../../component/Product/ProductPageSidebar";
import ProductPageMain from "../../../component/Product/ProductPageMain";
import { IoSearch } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { inputSearchUpdate } from "../../../store/product/productSlice";

function ProductPage() {
  const dispatch = useDispatch();

  return (
    <div className="p-4 md:p-10 bg-base-200 min-h-screen">
      {/* Header Section */}
      <div className="h-[18vh] max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
          Discover Amazing Products
        </h1>
        <p className="mb-4 text-gray-400">
          Find exactly what you're looking for from our curated collection
        </p>
        {/* Search Bar */}
        <div className="flex items-center max-w-md w-full bg-base-100 rounded-full shadow px-2 py-1">
          <input
            onChange={(e) => dispatch(inputSearchUpdate(e.target.value))}
            type="search"
            className="input bg-transparent border-0 flex-1 focus:outline-none focus:ring-0"
            placeholder="Search products, brands, categories..."
            autoComplete="off"
            name="search"
            id="search"
          />
          <button type="submit" className="btn btn-ghost btn-circle text-lg">
            <IoSearch />
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-6 mt-8">
        <ProductPageSidebar />

        <ProductPageMain />
      </div>
    </div>
  );
}

export default ProductPage;
