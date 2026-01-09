
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes - Pages
import Dashboard from './pages/dashboard'
import Login from "./pages/Login"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
