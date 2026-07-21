import './App.css'
import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home'


function App() {

  return (
<<<<<<< HEAD
    <>
  <div className="bg-blue-500 text-white p-4">  mayur rawat </div>
      </>
=======
    <Routes>
      
      {/*User routes  */}
      <Route path="/" element={<Home />} />

      {/* Admin routes */}
      

    </Routes>
>>>>>>> 9c56dd6a77bf00f18fbcc9d79222e3dfd947bd17
  )
}

export default App
