import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBlogs, useTrackPageView } from '../hooks/useSupabase'

export default function InspirationPage() {
  useTrackPageView('page_inspiration')
  const { posts, loading } = useBlogs()
  const [activeTag, setActiveTag] = useState('Semua')

  const allTags = ['Semua', ...new Set(posts.flatMap((p) => p.tags || []))]

  const filtered = activeTag === 'Semua'
    ? posts
    : posts.filter((p) => (p.tags || []).includes(activeTag))

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className="bg-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-300 text-xs font-heading font-bold tracking-widest uppercase mb-3"
          >
            Blog & Testimoni
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Find Inspirations <br />
            <span className="text-accent-400">From Our Stories</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-200 mt-4 text-body-lg max-w-xl mx-auto"
          >
            Kisah nyata dari pelanggan Fitpan yang telah merasakan perubahan positif dalam hidup mereka.
          </motion.p>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="sticky top-[57px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-body-sm font-semibold transition-all whitespace-nowrap ${
                  activeTag === tag
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group flex flex-col"
            >
              {/* Thumbnail */}
              <div className={`h-48 ${post.avatarBg || 'bg-primary-50'} flex items-center justify-center flex-shrink-0 overflow-hidden`}>
                {post.avatarImg
                  ? <img src={post.avatarImg} alt={post.title} className="w-full h-full object-cover" />
                  : <span className="text-7xl">{post.avatar}</span>
                }
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs text-accent-600 font-bold uppercase tracking-wide mb-1">{post.category}</p>
                <p className="text-xs text-gray-400 font-semibold mb-2">Problem: {post.problem}</p>
                <h3 className="font-heading font-bold text-primary-800 mb-3 leading-snug line-clamp-3 flex-1">
                  {post.title}
                </h3>
                <p className="text-body-sm text-gray-500 line-clamp-2 mb-4">{post.preview}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-primary-50 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/inspiration/${post.id}`}
                  className="mt-auto text-primary-600 text-body-sm font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Baca Selengkapnya <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-body-lg">Tidak ada cerita dengan tag ini.</p>
          </div>
        )}
      </div>
    </div>
  )
}
