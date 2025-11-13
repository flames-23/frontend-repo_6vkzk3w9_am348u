import React from 'react'
import Layout from '../components/Layout'
import { useAppData } from '../context/AppDataContext'

export default function Store() {
  const { data } = useAppData()
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Produk Digital</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {data.products.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
                <div className="aspect-video rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10" />
                <h3 className="font-semibold mt-4">{p.name}</h3>
                <p className="text-white/70 text-sm mt-2 line-clamp-3">{p.description}</p>
                <ul className="text-white/60 text-sm mt-3 list-disc pl-5 space-y-1">
                  {p.highlights?.map((h) => (<li key={h}>{h}</li>))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-semibold">Rp {Number(p.price).toLocaleString('id-ID')}</p>
                  <button className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold hover:bg-cyan-300">Beli</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
