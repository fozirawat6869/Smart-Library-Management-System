
import {BrowserRouter,Navigate,Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import VerifyOTP from './pages/VerifyOtp';
import Books from './pages/Books';
import Category from './pages/Category';
import Navbar from './components/Navbar';

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
        <Route path="/categories" element={<Category />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
