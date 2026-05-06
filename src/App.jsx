import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders"; 
import './index.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element= {<Register/>}/>
        <Route path="/" element= {<Login/>}/>
        <Route path="/home" element= {<Home/>} />
        <Route path="/admin" element= {<Admin/>} />
        <Route path="/cart" element= {<Cart/>} />
        <Route path="/orders" element= {<Orders/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
