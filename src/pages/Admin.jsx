import React, { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { useAppData } from '../context/AppDataContext'

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <input {...props} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <textarea {...props} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" />
    </label>
  )
}

export default function Admin() {
  const { data, updateAbout, createPost, updatePost, deletePost, createProduct, updateProduct, deleteProduct } = useAppData()
  const [tab, setTab] = useState('about')

  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <div className="mt-6 flex gap-2 overflow-auto">
            {[
              { id: 'about', label: 'Tentang' },
              { id: 'blog', label: 'Blog' },
              { id: 'products', label: 'Produk' }
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-lg border ${tab===t.id? 'bg-cyan-400 text-slate-900 border-cyan-300' : 'bg-white/5 border-white/10 text-white/80'}`}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'about' && <AboutEditor value={data.about} onSave={updateAbout} />}
          {tab === 'blog' && <BlogManager posts={data.posts} createPost={createPost} updatePost={updatePost} deletePost={deletePost} />}
          {tab === 'products' && <ProductManager products={data.products} createProduct={createProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} />}
        </div>
      </section>
    </Layout>
  )
}

function AboutEditor({ value, onSave }) {
  const [v, setV] = useState(value)
  return (
    <div className="mt-8 grid lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Field label="Nama" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} />
        <Field label="Peran" value={v.role} onChange={(e) => setV({ ...v, role: e.target.value })} />
        <TextArea label="Bio" rows={6} value={v.bio} onChange={(e) => setV({ ...v, bio: e.target.value })} />
      </div>
      <div className="space-y-4">
        <Field label="Email" value={v.contacts.email} onChange={(e) => setV({ ...v, contacts: { ...v.contacts, email: e.target.value } })} />
        <Field label="Telepon" value={v.contacts.phone} onChange={(e) => setV({ ...v, contacts: { ...v.contacts, phone: e.target.value } })} />
        <Field label="Lokasi" value={v.contacts.location} onChange={(e) => setV({ ...v, contacts: { ...v.contacts, location: e.target.value } })} />
      </div>
      <div className="lg:col-span-2 flex gap-3">
        <button onClick={() => onSave(v)} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Simpan</button>
      </div>
    </div>
  )
}

function BlogManager({ posts, createPost, updatePost, deletePost }) {
  const [draft, setDraft] = useState({ title: '', excerpt: '', content: '', tags: '' })
  return (
    <div className="mt-8">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold mb-4">Tulis Artikel</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Judul" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <Field label="Tag (pisah koma)" value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} />
          <TextArea label="Ringkasan" rows={3} value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} />
          <TextArea label="Konten" rows={6} value={draft.content} onChange={(e) => setDraft({ ...draft, content: e.target.value })} />
        </div>
        <div className="mt-4">
          <button onClick={() => { createPost({ ...draft, tags: draft.tags.split(',').map(s=>s.trim()).filter(Boolean) }); setDraft({ title: '', excerpt: '', content: '', tags: '' }) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Publikasikan</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {posts.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-white/70 text-sm mt-1">{p.excerpt}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => deletePost(p.id)} className="px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductManager({ products, createProduct, updateProduct, deleteProduct }) {
  const [draft, setDraft] = useState({ name: '', description: '', price: 0, highlights: '' })
  return (
    <div className="mt-8">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold mb-4">Tambah Produk</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nama" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          <Field label="Harga" type="number" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
          <TextArea label="Deskripsi" rows={4} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          <TextArea label="Highlight (pisah baris)" rows={4} value={draft.highlights} onChange={(e) => setDraft({ ...draft, highlights: e.target.value })} />
        </div>
        <div className="mt-4">
          <button onClick={() => { createProduct({ ...draft, highlights: draft.highlights.split('\n').map(s=>s.trim()).filter(Boolean) }); setDraft({ name: '', description: '', price: 0, highlights: '' }) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Tambahkan</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((p) => (
          <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-white/70 text-sm mt-1">Rp {Number(p.price).toLocaleString('id-ID')}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => deleteProduct(p.id)} className="px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-sm">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
