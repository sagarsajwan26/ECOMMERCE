import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, signupUser } from '../../store/user/userThunk';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router'; // Corrected from 'react-router'

export default function UserLoginSignup() {
  const [signupState, setSignupState] = useState(false);
  const [username, setUsername] = useState({ firstName: '', lastName: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, email, password, contactNumber, address };
    console.log(data);
    if(signupState){
        dispatch(signupUser(data)).then((res)=> {
          console.log(res);
          
        })
    }
    else{
        dispatch(loginUser(data)).then(res=> {
          console.log(res);
          if(res?.meta?.rejectedWithValue){
            toast.error(res.payload)
          }
          else{
            localStorage.setItem('userToken', res.payload.token)
            toast.success('Login Successfull')
            navigate('/')
          }
          
        })
    }
    
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-8">
      <div className="w-full max-w-md bg-base-100 rounded-box shadow-xl p-8 border border-base-300">
        <div className="text-center mb-6">
          <img
            src="/MainLogo.jpg"
            alt="Logo"
            className="w-20 h-20 mx-auto rounded-full shadow"
          />
          <h1 className="text-3xl font-bold mt-4 text-base-content">
            {signupState ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-base-content/70">
            {signupState
              ? 'Join us and explore a new world!'
              : 'Login to continue your journey'}
          </p>
          <Link
            to="/seller-login"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Login as Seller
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {signupState && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="input input-bordered w-1/2"
                value={username.firstName}
                onChange={(e) =>
                  setUsername({ ...username, firstName: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="input input-bordered w-1/2"
                value={username.lastName}
                onChange={(e) =>
                  setUsername({ ...username, lastName: e.target.value })
                }
                required
              />
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          
          />

          {signupState && (
            <>
              <input
                type="text"
                placeholder="Contact Number"
                className="input input-bordered w-full mb-4"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <textarea
                placeholder="Address"
                className="textarea textarea-bordered w-full mb-4 resize-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                required
              />
            </>
          )}

          <button type="submit" className="btn btn-primary w-full mb-4">
            {signupState ? 'Sign Up' : 'Log In'}
          </button>

          <p className="text-center text-sm text-base-content/70">
            {signupState ? (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setSignupState(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setSignupState(true)}
                  className="text-primary font-semibold hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
