import React, { useState } from "react";
import { FaEdit, FaPlus, FaTrashAlt, FaRupeeSign } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { setFilterCategory, setSearch  ,setStatus} from "../../../store/seller/sellerSlice";

const SellerProductsPages = () => {
  const Category=[
      'Fashion',
      'Electronics',
      'Books',
      'Home & Kitchen',
      'Toys',
      'Sports',
      'Beauty',
      'Automotive',
      'Grocery'
    ]
    const dispatch= useDispatch() 
    const [searchVal, setSearchVal] = useState("")
  const {logginSeller ,filterCategory,search ,status} = useSelector(state=> state.seller) 
 

    const products= logginSeller?.currentSellingProducts || []
    
console.log(products);


 let filteredProduct = [...products];

// Filter by Category
if (filterCategory) {
  filteredProduct = filteredProduct.filter(prod =>
    prod.category?.some(
      c => c.toLowerCase() === filterCategory.toLowerCase()
    )
  );
}

// Filter by Search (title or description)
if (search) {
  const lowerSearch = search.toLowerCase();
  filteredProduct = filteredProduct.filter(prod =>
    prod.title?.toLowerCase().includes(lowerSearch) ||
    prod.description?.toLowerCase().includes(lowerSearch)
  );
}

// Filter by Status
if (status) {
  const lowerStatus = status.toLowerCase();
  filteredProduct = filteredProduct.filter(prod => {
    if (lowerStatus === "active") {
      return prod.isPublished === true;
    }
    if (lowerStatus === "out of stock") {
      return prod.stock === 0;
    }
    if (lowerStatus === "draft") {
      return prod.isPublished === false && prod.stock > 0;
    }
    return true;
  });
}



  if(!logginSeller) return <div>Please login first</div>
  return  (
    <div className="max-w-7xl mx-auto py-8 px-4  max-h-screen">
 
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Product Management</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Link
          to="/seller-home/add-product"
          className="btn btn-primary gap-2"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
 
        <div>
          <label className="label text-base-content">Search Products</label>
          <div  className="relative">
            <input 
       
            onChange={(e)=> dispatch(setSearch(e.target.value))}
              type="text"
              className="input input-bordered w-full pr-10"
              placeholder="Product name or code"
            />
            <button  
            type="submit"
            className="absolute right-2 top-2 text-gray-400  ">
              <IoMdSearch size={20} />
            </button>
          </div>
        </div>
   
        <div>
          <label className="label text-base-content">Category</label>
          <select
               onChange={(e)=> dispatch(setFilterCategory(e.target.value))  }
          className="select select-bordered w-full">
            <option value=""  >All Categories</option>
            {Category.map((item,idx) => (
              <option key={idx} value={item}>{`${item}`}</option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="label text-base-content">Status</label>
          <select  
                    onChange={(e)=> dispatch(setStatus(e.target.value))  }

          className="select select-bordered w-full">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Draft">Draft</option>
          
          </select>
        </div>
   
        <div className="flex items-end pt-6">
         <button 
  onClick={() => {
    dispatch(setFilterCategory(""));
    dispatch(setSearch(""));
    dispatch(setStatus(""));
  }} 
  className="btn btn-outline w-full"
>
  Clear Filter
</button>

        </div>
      </div>

      
      <div className="overflow-x-auto bg-base-100 shadow rounded-lg  max-h-[70vh] ">
        <table className="table  w-full ">
          <thead>
            <tr>
              <th className="text-base font-semibold">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Sales</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProduct.map((product, idx) => (
              <tr key={idx}>
             
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                    <div>
                      <h1 className="font-semibold">{product.title}</h1>
                      <p className="text-xs text-gray-400">{product._id.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td>{product.category.map((item,idx)=>item + " , ")}</td>
                <td>
                  <span className="flex items-center gap-1 text-base font-medium text-primary">
                    <FaRupeeSign /> {product.price}
                  </span>
                </td>
                <td>{product.stock}</td>
                <td>
                <span className={`badge ${product.stock === 0 ? 'badge-error' : product.isPublished ? 'badge-success' : 'badge-warning'}`}>
  {product.stock === 0
    ? 'Out of Stock'
    : product.isPublished
    ? 'Active'
    : 'Draft'}
</span>

                </td>
                <td>{product.stock}</td>
                <td>
                  <div className="flex gap-2">
                    <Link to="#" className="btn btn-sm btn-ghost btn-square text-info">
                      <FaEdit />
                    </Link>
                    <Link to="#" className="btn btn-sm btn-ghost btn-square text-error">
                      <FaTrashAlt />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerProductsPages;
