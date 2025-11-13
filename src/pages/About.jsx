import React from 'react'
import Layout from '../components/Layout'
import { useAppData } from '../context/AppDataContext'

export default function About() {
  const { data } = useAppData()
  const a = data.about
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Tentang Saya</h1>
          <p className="text-white/70 mt-4">{a.bio}</p>

          <div className="mt-8">
            <h2 className="font-semibold">Keahlian</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {a.skills.map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-white/10 text-sm">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-10" id="contact">
            <h2 className="font-semibold">Kontak</h2>
            <div className="mt-3 space-y-1 text-white/80">
              <p>Email: {a.contacts.email}</p>
              <p>Telepon: {a.contacts.phone}</p>
              <p>Lokasi: {a.contacts.location}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
