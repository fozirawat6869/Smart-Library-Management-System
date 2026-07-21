import './App.css'
import {Routes, Route} from 'react-router-dom'

import Home from './pages/Home'


function App() {

  return (
    <Routes>
      
      {/*User routes  */}
      <Route path="/" element={<Home />} />

      {/* Admin routes */}
      

    </Routes>
  )
}

export default App
