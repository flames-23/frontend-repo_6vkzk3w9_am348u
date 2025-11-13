import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'portfolio_app_data_v1'

const defaultData = {
  about: {
    name: 'Nama Anda',
    role: 'Software Engineer',
    bio: 'Saya membangun produk digital yang intuitif dan berperforma tinggi. Fokus pada automation, web apps, dan pengalaman pengguna yang halus.',
    skills: ['React', 'FastAPI', 'n8n', 'TailwindCSS', 'MongoDB', 'Cloud'],
    contacts: {
      email: 'anda@email.com',
      phone: '+62 812 3456 7890',
      location: 'Indonesia',
      socials: {
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://x.com/'
      }
    }
  },
  posts: [
    {
      id: 'hello-world',
      title: 'Hello, World! — Memulai Portofolio Digital',
      excerpt: 'Kenapa penting punya rumah digital untuk karya-karya kita dan bagaimana membangunnya dengan cepat.',
      content: 'Ini adalah contoh artikel. Kamu bisa kelola dari halaman admin. Desain berfokus pada keterbacaan dan tipografi yang nyaman.',
      tags: ['portfolio', 'design'],
      date: new Date().toISOString()
    }
  ],
  products: [
    {
      id: 'n8n-starter-pack',
      name: 'N8N Automation Starter Pack',
      description: 'Puluhan workflow siap pakai untuk bisnis kamu: lead capture, enrichment, CRM sync, WhatsApp & email automation.',
      price: 490000,
      highlights: ['20+ workflow', 'Dokumentasi lengkap', 'Update gratis 6 bulan'],
      image: ''
    },
    {
      id: 'b2b-web-starter',
      name: 'B2B Web Starter',
      description: 'Template web B2B modern dengan komponen siap pakai: pricing, hero, testimonial, blog, CTA, dan dashboard ringan.',
      price: 790000,
      highlights: ['Next.js + Tailwind', 'Akses Figma', 'SEO Ready'],
      image: ''
    },
    {
      id: 'kasir-android',
      name: 'Aplikasi Kasir Android',
      description: 'Aplikasi POS ringan untuk UMKM. Sinkronisasi cloud opsional, ekspor laporan, multi-cabang.',
      price: 1290000,
      highlights: ['Offline-first', 'Ekspor PDF/Excel', 'Barcode'],
      image: ''
    }
  ],
  users: [
    { id: 'admin', name: 'Admin', email: 'admin@demo.com', password: 'admin123', role: 'admin' }
  ],
  auth: {
    currentUser: null
  }
}

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [data, setData] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    try {
      const parsed = JSON.parse(raw)
      // Backward compatible merge
      return {
        ...defaultData,
        ...parsed,
        about: { ...defaultData.about, ...(parsed.about || {}) },
        posts: parsed.posts || defaultData.posts,
        products: parsed.products || defaultData.products,
        users: parsed.users || defaultData.users,
        auth: parsed.auth || defaultData.auth
      }
    } catch (e) {
      return defaultData
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const actions = useMemo(() => ({
    // About
    updateAbout: (about) => setData((d) => ({ ...d, about })),

    // Posts
    createPost: (post) => setData((d) => ({ ...d, posts: [{ ...post, id: slugify(post.title), date: new Date().toISOString() }, ...d.posts] })),
    updatePost: (id, next) => setData((d) => ({ ...d, posts: d.posts.map((p) => (p.id === id ? { ...p, ...next } : p)) })),
    deletePost: (id) => setData((d) => ({ ...d, posts: d.posts.filter((p) => p.id !== id) })),

    // Products
    createProduct: (prod) => setData((d) => ({ ...d, products: [{ ...prod, id: slugify(prod.name) }, ...d.products] })),
    updateProduct: (id, next) => setData((d) => ({ ...d, products: d.products.map((p) => (p.id === id ? { ...p, ...next } : p)) })),
    deleteProduct: (id) => setData((d) => ({ ...d, products: d.products.filter((p) => p.id !== id) })),

    // Users
    createUser: (user) => setData((d) => ({ ...d, users: [{ ...user, id: user.id || uid(), role: user.role || 'user' }, ...d.users] })),
    updateUser: (id, next) => setData((d) => ({ ...d, users: d.users.map((u) => (u.id === id ? { ...u, ...next } : u)) })),
    deleteUser: (id) => setData((d) => ({ ...d, users: d.users.filter((u) => u.id !== id) })),

    // Auth
    login: (email, password) => setData((d) => {
      const u = d.users.find((x) => x.email.toLowerCase() === String(email).toLowerCase() && x.password === password)
      if (!u) return d
      const { password: _pw, ...safe } = u
      return { ...d, auth: { currentUser: safe } }
    }),
    logout: () => setData((d) => ({ ...d, auth: { currentUser: null } })),
    register: (payload) => setData((d) => {
      const exists = d.users.some((x) => x.email.toLowerCase() === String(payload.email).toLowerCase())
      if (exists) return d
      const newUser = { id: uid(), name: payload.name || 'User', email: payload.email, password: payload.password, role: 'user' }
      return { ...d, users: [newUser, ...d.users] }
    })
  }), [])

  return (
    <AppDataContext.Provider value={{ data, setData, ...actions }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}
