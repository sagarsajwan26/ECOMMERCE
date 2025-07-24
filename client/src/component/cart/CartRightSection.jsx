import React from "react";
import { RiShieldCheckFill, RiTruckFill } from "react-icons/ri";
import { MdReplay } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router'
import { userPayment } from "../../store/user/userThunk";

function CartRightSection() {
  const {logginUser} = useSelector((state) => state.user);
const dispatch= useDispatch()
  const navigate= useNavigate()
  const tax = 74;
  const subtotal = logginUser?.cart?.totalPrice || 0;
  const discount= 4
  const youSave = discount * subtotal / 100;
  const shipping = 50;
  const total = subtotal + tax + shipping - discount*subtotal/100 ;

 
  const handlePayment= async()=>{
      dispatch(userPayment(logginUser.cart)).then(res=>{
      if(res?.meta?.rejectedWithValue){
        toast.error(res?.payload?.message)
      }else{
       window.location= res?.payload?.success
      
   }
  })
  }
  return (
    <div className="col-span-2">
      <div className="bg-base-100 rounded-xl shadow p-6">
        <h1 className="text-xl font-bold mb-4">Order Summary</h1>

        {/* Detail breakdown */}
        <div className="space-y-2 mb-4 text-base">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
        {
          subtotal > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Discount</span>
              <span className="text-green-500">₹{youSave.toFixed(2)}</span>
            </div>
          )
        }
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="badge badge-success badge-sm">{total> 500 ?"Free":50}</span>
          </div>
         {
          subtotal > 0 && (
          <>
             <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>₹{tax}</span>
          </div>
          <hr className="my-3 border-base-300" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary">₹{total.toFixed(2)}</span>
          </div>
          </>
          )
         }
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mb-6">
          <button  
          onClick={handlePayment}
          disabled={subtotal===0}
          className="btn btn-primary w-full">Proceed to Checkout</button>
          <button onClick={()=> navigate('/product')} className="btn btn-outline w-full">Continue Shopping</button>
        </div>

        {/* Benefits */}
        <div className="rounded-lg bg-base-200 p-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <RiShieldCheckFill className="text-success" />
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <RiTruckFill className="text-primary" />
            <span>Free shipping over ₹500</span>
          </div>
          <div  className="flex items-center gap-2">
            <MdReplay className="text-warning" />
            <span>7-days return guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartRightSection;
