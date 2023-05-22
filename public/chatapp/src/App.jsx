import React from 'react'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import Register from "./pages/Register/Register"
import Login from "../src/pages/Login"
import Chat from "../src/pages/Chat"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
