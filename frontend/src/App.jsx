
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes - Pages
import Dashboard from './pages/dashboard'
import Login from "./pages/Login"
import Venues from "./pages/venues"
import MyBookings from "./pages/MyBookings"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/venues' element={<Venues/>} />
        <Route path='/my-bookings' element={<MyBookings/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
