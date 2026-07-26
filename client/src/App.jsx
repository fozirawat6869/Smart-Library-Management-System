
import {BrowserRouter,Navigate,Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import VerifyOTP from './pages/VerifyOtp';
import Books from './pages/Books';
import Category from './pages/Category';
import Navbar from './components/Navbar';
import NewArrivals from './pages/NewArrivals';
import BorrowCart from './pages/BorrowCart';
import LearnMore from './pages/LearnMore';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
       
        {/* User routes */}
        <Route path="/" element={<Navigate to ="/login"/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

       
        <Route path="/home" 
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }/>

        <Route path="/books" element={<Books/>} />
        <Route path="/books/:categoryId" element={<Books/>} />

        <Route path="/categories" element={<Category />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/borrow-cart" element={<PrivateRoute><BorrowCart /></PrivateRoute>} />
        <Route path="/learn-more" element={<PrivateRoute><LearnMore /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
