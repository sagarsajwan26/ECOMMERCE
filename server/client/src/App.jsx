import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import UserLoginSignup from './pages/User/UserLoginSignup'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/home/HomePage'
import HomeMain from './component/Homepage/Home/HomeMain'
import ProductPage from './pages/home/Product/ProductPage'


function App() {
  return (
    <div className="h-screen" data-theme='dark'>
      <BrowserRouter>
      <Routes>
      <Route path='/user-login' element={<UserLoginSignup/>} />
      <Route  element={<HomePage/>  }>
      <Route path='/' element={<HomeMain/>}/>
      <Route path='/product' element={<ProductPage/>}/>
        
      </Route>
      
      
      
      
      
      </Routes>
      
      </BrowserRouter>
      <Toaster/>
    </div>
  )
}

export default App