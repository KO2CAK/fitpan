import { motion } from 'framer-motion'
import { useParams, Link, Navigate } from 'react-router-dom'
import Spinner from '../components/atoms/Spinner'
import { useBlogPost, useBlogs } from '../hooks/useSupabase'

export default function InspirationDetailPage() {
  const { id } = useParams()
  const { post, loading } = useBlogPost(id)
  const { posts: allPosts } = useBlogs()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background-light">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!post) return <Navigate to="/inspiration" replace />

  const otherPosts = allPosts.filter((p) => p.id !== id).slice(0, 3)

  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
      <div className={`${post.avatarBg || 'bg-primary-50'} py-20`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            to="/inspiration"
            className="inline-flex items-center gap-1 text-body-sm text-gray-500 hover:text-primary-600 mb-8 transition-colors"
          >
            ← Kembali ke Inspiration
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-2">{post.category}</p>
            <p className="text-xs text-gray-500 font-semibold mb-4">Problem: {post.problem}</p>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary-800 leading-tight mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-white/70 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full border border-primary-200">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Avatar + Post content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {/* Author avatar */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-200">
          <div className={`w-16 h-16 rounded-full ${post.avatarBg || 'bg-primary-50'} flex items-center justify-center text-3xl shadow-sm overflow-hidden`}>
            {post.avatarImg
              ? <img src={post.avatarImg} alt={post.category} className="w-full h-full object-cover" />
              : post.avatar
            }
          </div>
          <div>
            <p className="font-heading font-bold text-primary-800">{post.category}</p>
            <p className="text-body-sm text-gray-500">Pelanggan Fitpan</p>
          </div>
        </div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose max-w-none text-gray-700 blog-content"
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </motion.article>
      </div>

      {/* More Stories */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-2xl text-primary-800 mb-8">Cerita Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherPosts.map((p) => (
              <Link
                key={p.id}
                to={`/inspiration/${p.id}`}
                className="group bg-background-light rounded-2xl overflow-hidden border border-background-muted hover:shadow-md transition-shadow"
              >
                <div className={`h-36 ${p.avatarBg || 'bg-primary-50'} flex items-center justify-center overflow-hidden`}>
                  {p.avatarImg
                    ? <img src={p.avatarImg} alt={p.title} className="w-full h-full object-cover" />
                    : <span className="text-5xl">{p.avatar}</span>
                  }
                </div>
                <div className="p-4">
                  <p className="text-xs text-accent-600 font-bold uppercase tracking-wide mb-1">{p.category}</p>
                  <p className="font-heading font-semibold text-primary-800 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
