
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Routes - Pages
import Dashboard from './pages/Dashboard'
import Login from "./pages/Login"


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
