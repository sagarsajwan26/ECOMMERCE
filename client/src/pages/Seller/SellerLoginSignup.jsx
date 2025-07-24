import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Link, useNavigate } from "react-router"; // Do not change this
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux'
import { sellerLogin, sellerSignup } from "../../store/seller/sellerThunk";
import { toast } from "react-toastify";

function SellerLoginSignup() {
  const categories = [
    "Fashion",
    "Electronics",
    "Books",
    "Home & Kitchen",
    "Toys",
    "Sports",
    "Beauty",
    "Automotive",
    "Grocery",
  ];

  const { register, handleSubmit } = useForm();

  const [signupState, setSignupState] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  const personalRef = useRef(null);
  const businessRef = useRef(null);
  const dispatch= useDispatch()
  const navigate= useNavigate()

  useEffect(() => {
    if (onboarding) {
      gsap.to(personalRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.5,
        pointerEvents: "none",
      });
      gsap.to(businessRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        pointerEvents: "auto",
        delay: 0.2,
      });
    } else {
      gsap.to(businessRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        pointerEvents: "none",
      });
      gsap.to(personalRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        pointerEvents: "auto",
        delay: 0.2,
      });
    }
  }, [onboarding]);


  const handleLoginSignup = (data) => {
    console.log("Form submitted:", data);

    if(signupState){
    dispatch(sellerSignup(data)).then(res=> {
      console.log(res);
      if(res?.meta?.rejectedWithValue){
          toast.error(res.payload)
        }
        else{
          console.log(res);
          
        }
      
    })
    }
    else{
      dispatch(sellerLogin(data)).then(res=>{
        console.log(res);
        if(res?.meta?.rejectedWithValue){
          toast.error(res.payload)
        }
        else{
        toast.success(res.payload.data)
        localStorage.setItem('sellerToken', res.payload.success.token)
        navigate('/seller-home')
        }
      })
    }
  };

  return (
    <div className="min-h-[100vh] flex flex-col justify-center items-center bg-[url('/bg_image_seller.jpg')] bg-cover bg-center relative p-4">
      {/* Overlay for glass effect */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[4px] z-0" />

      {/* Header */}
      <div className="z-10 text-black flex flex-col md:flex-row items-center gap-4 mb-6">
        <img src="/Logo.png" alt="Logo" className="h-14 " />
        <Link to="/user-login" className="btn  bg-gray-600 text-white ">
          Login as User
        </Link>
      </div>

      {/* Glass Card */}
      <div className="z-10 card w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl p-6 text-black rounded-2xl">
        <form onSubmit={handleSubmit(handleLoginSignup)} className="space-y-4">
          <div className="relative min-h-[350px]">
            <div
              ref={personalRef}
              className="absolute w-full space-y-4 transition-all duration-500"
              style={{ opacity: onboarding ? 0 : 1 }}
            >
              {signupState && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: signupState })}
                    className="input input-bordered w-1/2 bg-white/70 text-black placeholder-black/50"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: signupState })}
                    className="input input-bordered w-1/2 bg-white/70 text-black placeholder-black/50"
                  />
                </div>
              )}

              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: signupState })}
                className="input input-bordered w-full bg-white/70 text-black placeholder-black/50"
              />

              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: signupState })}
                className="input input-bordered w-full bg-white/70 text-black placeholder-black/50"
              />

              {signupState && (
                <input
                  type="number"
                  placeholder="Contact Number"
                  {...register("contactNumber", { required: signupState })}
                  className="input input-bordered w-full bg-white/70 text-black placeholder-black/50"
                />
              )}

              {signupState && (
                <button
                  type="button"
                  onClick={() => setOnboarding(true)}
                  className="btn btn-primary w-full"
                >
                  Next
                </button>
              )}
            </div>

            {/* Business Info Form */}
            <div
              ref={businessRef}
              className="absolute w-full space-y-4 transition-all duration-500"
              style={{ opacity: onboarding ? 1 : 0 }}
            >
              <input
                type="text"
                placeholder="Store Name"
                {...register("storeName", { required: signupState })}
                className="input input-bordered w-full bg-white/70 text-black placeholder-black/50"
              />
              <textarea
                placeholder="Store Address"
                {...register("address", { required: signupState })}
                className="textarea textarea-bordered w-full bg-white/70 text-black placeholder-black/50"
              />
              <div>
                <label htmlFor="productCategories" className="label text-black">
                  <span className="label-text">Product Category</span>
                </label>
                <select 
                multiple
                  id="productCategories"
                  {...register("productCategory", { required: signupState })}
                  className="select select-bordered w-full bg-white/70 text-black"
                >
                  {categories.map((item, idx) => (
                    <option key={idx} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => setOnboarding(false)}
                className="btn btn-outline w-full"
              >
                Prev
              </button>
            </div>
          </div>

          {/* Toggle Login / Signup */}
          <div className="text-sm text-center text-black">
            {signupState ? (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setSignupState(false);
                    setOnboarding(false);
                  }}
                  className="text-primary cursor-pointer underline"
                >
                  Sign In
                </span>
              </p>
            ) : (
              <p>
                Don’t have an account?{" "}
                <span
                  onClick={() => setSignupState(true)}
                  className="text-primary cursor-pointer underline"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-full">
            {signupState ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SellerLoginSignup;
