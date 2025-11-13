import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppDataProvider } from './context/AppDataContext'
import Home from './pages/Home'
import About from './pages/About'
import Blog, { BlogDetail } from './pages/Blog'
import Store from './pages/Store'
import { Login, Register, Forgot, Confirm } from './pages/Auth'
import Admin from './pages/Admin'

function App() {
  return (
    <AppDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/store" element={<Store />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/confirm" element={<Confirm />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AppDataProvider>
  )
}

export default App
