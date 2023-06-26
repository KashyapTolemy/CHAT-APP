import React from 'react'
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom'
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Chat from "./pages/Chat/Chat"
import SetAvatar from './pages/SetAvatar/setavatar'
import Home from './pages/Home/Home'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/setavatar" element={<SetAvatar />}/>
        <Route path="/chat" element={<Chat />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
