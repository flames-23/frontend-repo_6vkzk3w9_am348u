import React, { useMemo, useState } from 'react'
import Layout from '../components/Layout'
import { useAppData } from '../context/AppDataContext'

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <input {...props} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" />
    </label>
  )
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <textarea {...props} className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/60" />
    </label>
  )
}

function Guard({ children }) {
  const { data } = useAppData()
  if (!data.auth?.currentUser) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6">
          <p className="text-yellow-300">Akses admin memerlukan login. Gunakan akun demo di halaman Masuk.</p>
        </div>
      </div>
    )
  }
  return children
}

export default function Admin() {
  const { data, updateAbout, createPost, updatePost, deletePost, createProduct, updateProduct, deleteProduct, createUser, updateUser, deleteUser } = useAppData()
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
              { id: 'products', label: 'Produk' },
              { id: 'users', label: 'Pengguna' }
            ].map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-lg border ${tab===t.id? 'bg-cyan-400 text-slate-900 border-cyan-300' : 'bg-white/5 border-white/10 text-white/80'}`}>
                {t.label}
              </button>
            ))}
          </div>

          <Guard>
            {tab === 'about' && <AboutEditor value={data.about} onSave={updateAbout} />}
            {tab === 'blog' && <BlogManager posts={data.posts} createPost={createPost} updatePost={updatePost} deletePost={deletePost} />}
            {tab === 'products' && <ProductManager products={data.products} createProduct={createProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} />}
            {tab === 'users' && <UserManager users={data.users} createUser={createUser} updateUser={updateUser} deleteUser={deleteUser} />}
          </Guard>
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
  const empty = { title: '', excerpt: '', content: '', tags: '' }
  const [draft, setDraft] = useState(empty)

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
        <div className="mt-4 flex gap-2">
          <button onClick={() => { if(!draft.title) return; createPost({ ...draft, tags: draft.tags.split(',').map(s=>s.trim()).filter(Boolean) }); setDraft(empty) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Publikasikan</button>
          <button onClick={() => setDraft(empty)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Reset</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        {posts.map((p) => (
          <PostItem key={p.id} p={p} updatePost={updatePost} deletePost={deletePost} />)
        )}
      </div>
    </div>
  )
}

function PostItem({ p, updatePost, deletePost }) {
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ title: p.title, excerpt: p.excerpt, content: p.content })
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      {edit ? (
        <div className="space-y-3">
          <Field label="Judul" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} />
          <TextArea label="Ringkasan" rows={3} value={form.excerpt} onChange={(e)=>setForm({...form, excerpt: e.target.value})} />
          <TextArea label="Konten" rows={6} value={form.content} onChange={(e)=>setForm({...form, content: e.target.value})} />
          <div className="flex gap-2">
            <button onClick={()=>{ updatePost(p.id, form); setEdit(false) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Simpan</button>
            <button onClick={()=>setEdit(false)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Batal</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="font-semibold">{p.title}</h4>
          <p className="text-white/70 text-sm mt-1">{p.excerpt}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setEdit(true)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">Edit</button>
            <button onClick={() => deletePost(p.id)} className="px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-sm">Hapus</button>
          </div>
        </>
      )}
    </div>
  )
}

function ProductManager({ products, createProduct, updateProduct, deleteProduct }) {
  const empty = { name: '', description: '', price: 0, highlights: '' }
  const [draft, setDraft] = useState(empty)

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
        <div className="mt-4 flex gap-2">
          <button onClick={() => { if(!draft.name) return; createProduct({ ...draft, price: Number(draft.price)||0, highlights: draft.highlights.split('\n').map(s=>s.trim()).filter(Boolean) }); setDraft(empty) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Tambahkan</button>
          <button onClick={() => setDraft(empty)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Reset</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map((p) => (
          <ProductItem key={p.id} p={p} updateProduct={updateProduct} deleteProduct={deleteProduct} />
        ))}
      </div>
    </div>
  )
}

function ProductItem({ p, updateProduct, deleteProduct }) {
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ name: p.name, price: p.price, description: p.description, highlights: (p.highlights||[]).join('\n') })
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      {edit ? (
        <div className="space-y-3">
          <Field label="Nama" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
          <Field label="Harga" type="number" value={form.price} onChange={(e)=>setForm({...form, price: Number(e.target.value)})} />
          <TextArea label="Deskripsi" rows={4} value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} />
          <TextArea label="Highlight (pisah baris)" rows={4} value={form.highlights} onChange={(e)=>setForm({...form, highlights: e.target.value})} />
          <div className="flex gap-2">
            <button onClick={()=>{ updateProduct(p.id, { ...form, highlights: String(form.highlights).split('\n').map(s=>s.trim()).filter(Boolean) }); setEdit(false) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Simpan</button>
            <button onClick={()=>setEdit(false)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Batal</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="font-semibold">{p.name}</h4>
          <p className="text-white/70 text-sm mt-1">Rp {Number(p.price).toLocaleString('id-ID')}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setEdit(true)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">Edit</button>
            <button onClick={() => deleteProduct(p.id)} className="px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-sm">Hapus</button>
          </div>
        </>
      )}
    </div>
  )
}

function UserManager({ users, createUser, updateUser, deleteUser }) {
  const empty = { name: '', email: '', password: '', role: 'user' }
  const [draft, setDraft] = useState(empty)

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="font-semibold mb-4">Tambah Pengguna</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Nama" value={draft.name} onChange={(e)=>setDraft({...draft, name: e.target.value})} />
          <Field label="Email" value={draft.email} onChange={(e)=>setDraft({...draft, email: e.target.value})} />
          <Field label="Password" value={draft.password} onChange={(e)=>setDraft({...draft, password: e.target.value})} />
          <Field label="Peran (user/admin)" value={draft.role} onChange={(e)=>setDraft({...draft, role: e.target.value})} />
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => { if(!draft.email || !draft.password) return; createUser(draft); setDraft(empty) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Tambahkan</button>
          <button onClick={() => setDraft(empty)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Reset</button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {users.map((u) => (
          <UserItem key={u.id} u={u} updateUser={updateUser} deleteUser={deleteUser} />
        ))}
      </div>
    </div>
  )
}

function UserItem({ u, updateUser, deleteUser }) {
  const [edit, setEdit] = useState(false)
  const [form, setForm] = useState({ name: u.name, email: u.email, password: u.password, role: u.role })
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      {edit ? (
        <div className="space-y-3">
          <Field label="Nama" value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} />
          <Field label="Email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} />
          <Field label="Password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} />
          <Field label="Peran" value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})} />
          <div className="flex gap-2">
            <button onClick={()=>{ updateUser(u.id, form); setEdit(false) }} className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-semibold">Simpan</button>
            <button onClick={()=>setEdit(false)} className="px-4 py-2 rounded-lg bg-white/10 border border-white/10">Batal</button>
          </div>
        </div>
      ) : (
        <>
          <h4 className="font-semibold">{u.name} <span className="text-xs text-white/50">({u.role})</span></h4>
          <p className="text-white/70 text-sm mt-1">{u.email}</p>
          <div className="mt-3 flex gap-2">
            <button onClick={() => setEdit(true)} className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm">Edit</button>
            <button onClick={() => deleteUser(u.id)} className="px-3 py-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-sm">Hapus</button>
          </div>
        </>
      )}
    </div>
  )
}
