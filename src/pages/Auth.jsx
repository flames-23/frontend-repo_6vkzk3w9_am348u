import React, { useState } from 'react'
import Layout from '../components/Layout'
import { useAppData } from '../context/AppDataContext'

function AuthCard({ title, subtitle, children }) {
  return (
    <div className="max-w-md w-full mx-auto rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/5">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {subtitle && <p className="text-white/70 mt-2 text-sm">{subtitle}</p>}
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  )
}

function Field({ ...props }) {
  return <input {...props} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" />
}

function Button({ className = '', ...props }) {
  return <button {...props} className={`w-full px-4 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300 transition ${className}`} />
}

export function Login() {
  const { login, data } = useAppData()
  const [email, setEmail] = useState('admin@demo.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const before = data.auth?.currentUser
    login(email, password)
    const after = JSON.parse(localStorage.getItem('portfolio_app_data_v1')).auth?.currentUser
    if (!after || before?.email === after?.email) {
      setError('Email atau password salah')
    } else {
      window.location.href = '/admin'
    }
  }

  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Masuk" subtitle="Gunakan akun demo: admin@demo.com / admin123">
            <form onSubmit={onSubmit} className="space-y-4">
              <Field placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <Button type="submit">Masuk</Button>
            </form>
            <div className="text-sm text-white/70 flex justify-between">
              <a href="/forgot" className="hover:text-cyan-300">Lupa password?</a>
              <a href="/register" className="hover:text-cyan-300">Daftar</a>
            </div>
          </AuthCard>
        </div>
      </section>
    </Layout>
  )
}

export function Register() {
  const { register } = useAppData()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [info, setInfo] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    register({ name, email, password })
    setInfo('Akun dibuat. Silakan masuk.')
  }

  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Daftar Akun">
            <form onSubmit={onSubmit} className="space-y-4">
              <Field placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
              <Field placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Field type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit">Daftar</Button>
            </form>
            {info && <p className="text-sm text-green-400 mt-2">{info}</p>}
          </AuthCard>
        </div>
      </section>
    </Layout>
  )
}

export function Forgot() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Lupa Password" subtitle="Kami akan mengirimkan tautan reset (simulasi)">
            {!sent ? (
              <div className="space-y-4">
                <Field placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button onClick={() => setSent(true)}>Kirim Link Reset</Button>
              </div>
            ) : (
              <p className="text-white/70">Tautan reset terkirim (simulasi). Cek email kamu.</p>
            )}
          </AuthCard>
        </div>
      </section>
    </Layout>
  )
}

export function Confirm() {
  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Konfirmasi Email">
            <p className="text-white/70">Kami telah mengirimkan link konfirmasi ke email kamu. Silakan cek inbox.</p>
          </AuthCard>
        </div>
      </section>
    </Layout>
  )
}
