import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import UserLoginSignup from './pages/User/UserLoginSignup'
import HomePage from './pages/home/HomePage'
import HomeMain from './component/Homepage/Home/HomeMain'
import ProductPage from './pages/home/Product/ProductPage'
import ProductDetailPage from './pages/home/Product/ProductDetailPage'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import UserCart from './pages/home/UserCart'
import UserAccountPage from './pages/User/UserAccountPage'
import UserPaymentSuccessful from './pages/User/UserPaymentSuccessful'
import CancelPayment from './pages/User/CancelPayment'
import SellerLoginSignup from './pages/Seller/SellerLoginSignup'
import SellerHomePage from './pages/Seller/SellerHomePage'
import SellerDashboard from './component/Seller/main/SellerDashboard'
import SellerProductsPages from './component/Seller/main/SellerProductsPages'
import SellerOrderPage from './component/Seller/main/SellerOrderPage'
import SellerSettingPage from './component/Seller/main/SellerSettingPage'
import SellerAddProductPage from './component/Seller/SellerAddProductPage'


function App() {
  const {logginUser} = useSelector(state=> state.user)
  const {logginSeller} = useSelector(state=> state.seller) 
  console.log(logginSeller);
  
  return (
    <div className="h-screen" data-theme='dark'>
      <BrowserRouter>
      <Routes>
      <Route path='/user-login' element={<UserLoginSignup/>} />
      <Route  element={<HomePage/>  }>
      <Route path='/' element={<HomeMain/>}/>
      <Route path='/product' element={<ProductPage/>}/>
      <Route path='/getProductDetails/:id' element={<ProductDetailPage/>} />
      <Route path='/cart' element={logginUser? <UserCart/> : <Navigate to='/user-login' /> } />
      <Route path='/account' element={ logginUser?<UserAccountPage/> : <Navigate to='/user-login' /> } />
        <Route path='/paymentSuccessful' element={logginUser? <UserPaymentSuccessful/> : <Navigate to='/user-login' /> } />
        <Route path='/cancelpayment' element={logginUser? <CancelPayment/> : <Navigate to='/user-login' /> } />






      </Route>
      
      
        <Route path='/seller-login'  element={<SellerLoginSignup/>} />
        <Route  element={ <SellerHomePage/>  } > 
          <Route path='/seller-home' element={<SellerDashboard/>} />
          <Route  path='/seller-home/products' element={<SellerProductsPages/>} />
          <Route  path='/seller-home/orders' element={<SellerOrderPage/>} />
          <Route  path='/seller-home/settings' element={<SellerSettingPage/>} />
          <Route  path='/seller-home/add-Product' element={<SellerAddProductPage/>} />
          
        </Route>



      
      
      
      </Routes>
      
      </BrowserRouter>
    
      <ToastContainer />
    </div>
  )
}

export default App