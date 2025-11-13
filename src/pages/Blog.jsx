import React from 'react'
import Layout from '../components/Layout'
import { useAppData } from '../context/AppDataContext'
import { Link, useParams } from 'react-router-dom'

export default function BlogList() {
  const { data } = useAppData()
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Blog</h1>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {data.posts.map((p) => (
              <Link key={p.id} to={`/blog/${p.id}`} className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-white/70 text-sm mt-2 line-clamp-3">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export function BlogDetail() {
  const { id } = useParams()
  const { data } = useAppData()
  const post = data.posts.find((p) => p.id === id)
  return (
    <Layout>
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {!post ? (
            <p>Artikel tidak ditemukan.</p>
          ) : (
            <article>
              <h1 className="text-4xl font-bold">{post.title}</h1>
              <p className="text-white/60 text-sm mt-2">{new Date(post.date).toLocaleDateString('id-ID')}</p>
              <div className="prose prose-invert mt-6 max-w-none">
                <p>{post.content}</p>
              </div>
            </article>
          )}
        </div>
      </section>
    </Layout>
  )
}
