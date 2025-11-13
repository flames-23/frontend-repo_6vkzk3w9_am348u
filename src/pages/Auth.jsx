import React, { useState } from 'react'
import Layout from '../components/Layout'

function AuthCard({ title, children }) {
  return (
    <div className="max-w-md w-full mx-auto rounded-2xl border border-white/10 bg-white/5 p-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="mt-6 space-y-4">{children}</div>
    </div>
  )
}

export function Login() {
  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Masuk">
            <input placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" />
            <button className="w-full px-4 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300">Masuk</button>
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
  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Daftar Akun">
            <input placeholder="Nama" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" />
            <input placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" />
            <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" />
            <button className="w-full px-4 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300">Daftar</button>
          </AuthCard>
        </div>
      </section>
    </Layout>
  )
}

export function Forgot() {
  return (
    <Layout>
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <AuthCard title="Lupa Password">
            <input placeholder="Email" className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" />
            <button className="w-full px-4 py-3 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300">Kirim Link Reset</button>
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
