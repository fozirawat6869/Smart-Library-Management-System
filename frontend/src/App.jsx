import './App.css'
import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home'


function App() {

  return (
    <>
      <div className="bg-blue-500 text-white p-4">mayur rawat</div>
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
