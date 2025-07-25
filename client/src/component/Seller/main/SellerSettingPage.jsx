import React, { useState, useEffect, useRef } from "react";
import { FaCamera, FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { CgArrowLeft, CgDanger } from "react-icons/cg";
import { gsap } from "gsap";
import { useNavigate } from "react-router";
import { updateProfile, updateProfilePic } from "../../../store/seller/sellerThunk";
import {toast} from 'react-toastify';

const SellerSettingPage = () => {
  const { logginSeller } = useSelector((state) => state.seller);
const dispatch= useDispatch()
const navigate= useNavigate()
  const [editState, setEditState] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    firstName: logginSeller?.username?.firstName || "",
    lastName: logginSeller?.username?.lastName || "",
    address: logginSeller?.address || "",
    contactNumber: logginSeller?.contactNumber || "",
    storeName: logginSeller?.storeName || "",
  });
  const formRef = useRef(null);

  useEffect(() => {
    if (editState && formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [editState]);

  if (!logginSeller)
    return (
      <div className="flex flex-col items-center justify-center h-80 text-lg font-bold text-error">
        Please login first
      </div>
    );

    const handleProfiePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file)
    }}
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    
          dispatch(updateProfile(form)).then(res => {
            if(res?.meta?.rejectedWithValue) {
              toast.error(res.payload.message || "Profile update failed");
            }else{
              toast.success("Profile updated successfully");
              setEditState(false);
              setEditProfilePic(false);
            }
            
          })
    
     

  };

  const handlePicSubmit = (e) => {
    e.preventDefault();

const form= new FormData();
    form.append('image', profile);

  dispatch(updateProfilePic(form)).then(res=>{ 
    console.log(res);
    
if(res?.meta?.rejectedWithValue) {
  toast.error(res.payload.message || "Profile picture update failed");
}
else{
  toast.success("Profile picture updated successfully");
  setEditState(false);
  setEditProfilePic(false);
 
}
  })
   
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div
        className="bg-base-200 shadow-xl rounded-xl p-8"
        ref={formRef}
      >
        <h1 className="text-3xl font-extrabold mb-6">Profile Settings</h1>
        {editState ? (
          <div>
            <button
              className="btn btn-ghost mb-4 flex items-center gap-2"
              onClick={() => {
                setEditState(false);
                setEditProfilePic(false);
              }}
            >
              <CgArrowLeft className="text-xl" /> Back to Profile
            </button>
            {editProfilePic ? (
              <form className="flex items-end gap-4" onSubmit={handlePicSubmit}>
                <div>
                  <input 
                  onChange={(e)=> handleProfiePicChange(e)}
                    type="file"
                    accept="image/*"
                    className="file-input file-input-md file-input-bordered w-full max-w-xs"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Picture
                </button>
              </form>
            ) : (
              <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={handleDetailsSubmit}
              >
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="input input-bordered w-full"
               
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="tel"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact number"
                  className="input input-bordered w-full"
                  required
                />
                <input
                  type="text"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  placeholder="Store name"
                  className="input input-bordered w-full"
                  required
                />
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Shop address"
                  className="textarea textarea-bordered col-span-1 md:col-span-2 resize-none"
                  required
                  rows={3}
                />
                <button
                  type="submit"
                  className="btn btn-primary col-span-1 md:col-span-2 mt-2"
                >
                  Update Details
                </button>
              </form>
            )}
          </div>
        ) : (
          <div>
            {/* Profile Header Section */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative group">
                <img
                  src={logginSeller?.profilePic || "/placeholder.webp"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg"
                />
                <button
                  type="button"
                  aria-label="Change profile picture"
                  className="absolute bottom-2 right-2 p-1 rounded-full bg-base-100 shadow group-hover:bg-primary transition"
                  onClick={() => {
                    setEditState(true);
                    setEditProfilePic(true);
                  }}
                >
                  <FaCamera className="text-lg text-primary" />
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-2 text-base font-medium">
                  Email Verified:{" "}
                  {logginSeller.isEmailVerified ? (
                    <FaCheckCircle className="text-success" />
                  ) : (
                    <CgDanger className="text-error" />
                  )}
                </span>
                <span className="text-md text-gray-500">
                  LoginId:  <span className="font-mono">{logginSeller.LoginId}</span>
                </span>
              </div>
            </div>
            {/* Seller Profile Details */}
            <div className="mb-6">
              <div className="grid gap-1">
                <strong>
                  Full Name:{" "}
                  <span className="font-normal">
                    {logginSeller?.username?.firstName}{" "}
                    {logginSeller?.username?.lastName}
                  </span>
                </strong>
                <span>
                  <span className="font-semibold">Email:</span> {logginSeller.email}
                </span>
                <span>
                  <span className="font-semibold">Contact:</span> {logginSeller.contactNumber}
                </span>
                <span>
                  <span className="font-semibold">Address:</span> {logginSeller.address}
                </span>
                <span>
                  <span className="font-semibold">Store Name:</span> {logginSeller.storeName}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                className="btn btn-outline btn-primary"
                onClick={() => {
                  setEditState(true);
                  setEditProfilePic(false);
                }}
              >
                Update Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerSettingPage;
