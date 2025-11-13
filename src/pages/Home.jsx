import React from 'react'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import { Highlights, CTASection, SectionHeader } from '../components/Sections'
import { Link } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'

export default function Home() {
  const { data } = useAppData()
  return (
    <Layout>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Highlights />

        <section className="py-10">
          <SectionHeader eyebrow="TERBARU" title="Artikel" action={<Link to="/blog" className="text-sm text-cyan-300 hover:underline">Lihat semua</Link>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.posts.slice(0,3).map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-white/70 text-sm mt-2 line-clamp-3">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-10">
          <SectionHeader eyebrow="KOLEKSI" title="Produk Digital" action={<Link to="/store" className="text-sm text-cyan-300 hover:underline">Lihat semua</Link>} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.products.slice(0,3).map((p) => (
              <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-white/70 text-sm mt-2 line-clamp-3">{p.description}</p>
                <p className="mt-4 font-semibold">Rp {Number(p.price).toLocaleString('id-ID')}</p>
              </div>
            ))}
          </div>
        </section>

        <CTASection />
      </div>
    </Layout>
  )
}
