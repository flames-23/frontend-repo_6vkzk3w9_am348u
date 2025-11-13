import React from 'react'
import Spline from '@splinetool/react-spline'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-16">
        <div>
          <p className="text-cyan-300/90 text-sm mb-3">PORTOFOLIO • AUTOMATION • WEB APPS</p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
            Bangun produk digital yang cepat, elegan, dan berdampak
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl">
            Saya menggabungkan desain modern, otomasi cerdas, dan arsitektur yang rapi untuk menghadirkan pengalaman digital yang halus dan berkelas.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/about" className="inline-flex items-center gap-2 bg-cyan-400 text-slate-900 font-semibold px-5 py-3 rounded-lg shadow hover:bg-cyan-300 transition">
              Lihat Portofolio <ChevronRight size={18} />
            </Link>
            <Link to="/store" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-5 py-3 rounded-lg hover:bg-white/20 transition">
              Produk Digital
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
