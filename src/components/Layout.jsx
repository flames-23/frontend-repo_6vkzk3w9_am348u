import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Home, User, PenTool, ShoppingBag, LogIn, LogOut, Shield } from 'lucide-react'
import { useAppData } from '../context/AppDataContext'

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const { data, logout } = useAppData()
  const navigate = useNavigate()

  const nav = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/about', label: 'Tentang', icon: User },
    { to: '/blog', label: 'Blog', icon: PenTool },
    { to: '/store', label: 'Produk', icon: ShoppingBag }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-x-[-20%] top-[-10%] h-[500px] bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-transparent blur-3xl" />
      </div>

      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-tight text-white">
            <span className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent">YourName</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 text-sm transition hover:text-cyan-300 ${
                    isActive ? 'text-cyan-300' : 'text-white/80'
                  }`
                }
              >
                <Icon size={16} /> {label}
              </NavLink>
            ))}

            {data.auth?.currentUser ? (
              <div className="flex items-center gap-3">
                <NavLink to="/admin" className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-cyan-300">
                  <Shield size={16} /> Admin
                </NavLink>
                <button
                  onClick={() => { logout(); navigate('/') }}
                  className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-cyan-300"
                >
                  <LogOut size={16} /> Keluar
                </button>
              </div>
            ) : (
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-cyan-300">
                <LogIn size={16} /> Masuk
              </Link>
            )}
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded hover:bg-white/10">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-white/10 bg-slate-900/80">
            <div className="px-4 py-3 space-y-2">
              {nav.map(({ to, label }) => (
                <Link key={to} to={to} onClick={() => setOpen(false)} className="block py-2 text-white/80 hover:text-cyan-300">
                  {label}
                </Link>
              ))}
              {data.auth?.currentUser ? (
                <>
                  <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-white/80 hover:text-cyan-300">Admin</Link>
                  <button
                    onClick={() => { setOpen(false); logout(); navigate('/') }}
                    className="block py-2 text-left text-white/80 hover:text-cyan-300 w-full"
                  >Keluar</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="block py-2 text-white/80 hover:text-cyan-300">Masuk</Link>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">{children}</main>

      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} YourName. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-cyan-300">GitHub</a>
            <a href="#" className="hover:text-cyan-300">LinkedIn</a>
            <a href="#" className="hover:text-cyan-300">X</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
