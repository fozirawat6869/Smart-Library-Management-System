
import {BrowserRouter,Navigate,Routes, Route} from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import VerifyOTP from './pages/VerifyOtp';

function App() {

  return (
    <BrowserRouter>
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

      </Routes>
    </BrowserRouter>
  )
}

export default App;
