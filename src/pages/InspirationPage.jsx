import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionLabel from '../components/atoms/SectionLabel'
import Spinner from '../components/atoms/Spinner'
import InspirationCard from '../components/molecules/InspirationCard'
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel className="text-accent-300 mb-3">Blog &amp; Testimoni</SectionLabel>
          </motion.div>
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
            <Spinner />
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <InspirationCard key={post.id} post={post} index={i} />
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
