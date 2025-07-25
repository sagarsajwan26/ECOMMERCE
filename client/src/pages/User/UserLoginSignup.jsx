import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, signupUser } from '../../store/user/userThunk';
import { set } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

function UserLoginSignup() {
  const [signupState, setSignupState] = useState(false);
  const [username, setUsername] = useState({ firstName: '', lastName: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data= {username,email,password, contactNumber, address}
    if(!signupState){
      
      
      
     const res= await dispatch(loginUser(data))
      if(res?.payload?.existingUser){
      console.log(res.payload.existingUser);
      
        const data= res.payload.existingUser
        localStorage.setItem("userToken",res.payload.token)
        navigate('/')
        
       


      }
      else{
        toast.error(res.payload)
      }
    
    }
    else{
      
     const res=  await dispatch(signupUser(data))
  
     if(res.status===201){
      toast.success(res.data)
     }
     else {
      
      
       toast.error(res.payload)
     }
    
     
      setUsername({ firstName: '', lastName: '' })
      setEmail('')
      setPassword("")
      setContactNumber(null)
      setAddress('')
      setSignupState(false)
    }
   
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('/bg_image.jpg')" }}
    >
      {/* Main Logo */}
      <div className="flex flex-col items-center mb-6">
        <span className="mb-4" >
          <img src="/MainLogo.jpg" alt="Logo" className="h-20 w-20 rounded-full shadow-xl border-4 border-white/40 object-cover bg-white/20" />
        </span>
        <h1 className="text-3xl font-bold text-gray-900 drop-shadow-xl tracking-tight glass px-8 py-2 rounded-xl">
          {signupState ? "Signup" : "Login"}
        </h1>
      </div>

      <form
        className="w-full max-w-md bg-white/60 border border-white/30 shadow-2xl 
                   backdrop-blur-lg rounded-2xl p-8 flex flex-col gap-4 glass"
        onSubmit={handleSubmit}
      >
        {/* Only Show These Fields for Signup */}
        {signupState && (
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full bg-white/80 text-gray-900"
              value={username.firstName}
              onChange={e => setUsername(prev => ({ ...prev, firstName: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full bg-white/80 text-gray-900"
              value={username.lastName}
              onChange={e => setUsername(prev => ({ ...prev, lastName: e.target.value }))}
              required
            />
          </div>
        )}

        {/* Always Show These Fields */}
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full bg-white/80 text-gray-900"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full bg-white/80 text-gray-900"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Only Show For Signup */}
        {signupState && (
          <>
            <input
              type="text"
              placeholder="Contact Number"
              className="input input-bordered w-full bg-white/80 text-gray-900"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              required
            />
            <textarea
              placeholder="Address"
              className="textarea textarea-bordered w-full bg-white/80 text-gray-900"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
          </>
        )}

        <button className="btn btn-primary mt-2 w-full tracking-wide" type="submit">
          {signupState ? "Signup" : "Login"}
        </button>

     {/* Switcher between signup and login */}
<div className="mt-1 text-center text-gray-700">
  {signupState
    ? <>
        Already have an account?{" "}
        <button
          type="button"
          className="btn btn-ghost btn-xs text-primary hover:underline"
          onClick={() => setSignupState(false)}
        >
          Login
        </button>
      </>
    : <>
        Don't have an account?{" "}
        <button
          type="button"
          className="btn btn-ghost btn-xs text-primary hover:underline"
          onClick={() => setSignupState(true)}
        >
          Signup
        </button>
      </>
  }
</div>

{/* Seller login link */}
<div className="mt-3 text-center">
  <Link
    to="/seller-login"
    className="btn btn-link text-primary underline font-semibold"
    style={{ textDecoration: "underline" }}
  >
    Login as Seller?
  </Link>
</div>

      </form>
    </div>
  );
}

export default UserLoginSignup;