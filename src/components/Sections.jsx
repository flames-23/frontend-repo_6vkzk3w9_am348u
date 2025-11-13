import React from 'react'
import { Code, Puzzle, Github, Rocket, BookOpen, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Highlights() {
  const items = [
    { icon: Code, title: 'Engineering', desc: 'Frontend elegan, backend rapi, performa optimal.' },
    { icon: Puzzle, title: 'Automation', desc: 'n8n, API orchestration, integrasi cepat.' },
    { icon: Rocket, title: 'Delivery', desc: 'Ship cepat, iterasi lincah, fokus nilai.' }
  ]
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <Icon className="text-cyan-300" />
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <p className="text-white/70 text-sm mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 p-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Siap diskusi project?</h3>
            <p className="text-white/70 mt-2">Saya terbuka untuk kerja sama pembuatan aplikasi, otomasi, hingga redesign website.</p>
          </div>
          <Link to="/about#contact" className="inline-flex items-center gap-2 bg-cyan-400 text-slate-900 font-semibold px-5 py-3 rounded-lg shadow hover:bg-cyan-300 transition">
            Hubungi Saya
          </Link>
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        {eyebrow && <p className="text-cyan-300/90 text-xs">{eyebrow}</p>}
        <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
      </div>
      {action}
    </div>
  )
}
