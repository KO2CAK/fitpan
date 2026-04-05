import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Blog/inspiration post card.
 * Shows problem and tags when available (full InspirationPage view).
 */
export default function InspirationCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
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
        {post.problem && (
          <p className="text-xs text-gray-400 font-semibold mb-2">Posted: {post.problem}</p>
        )}
        <h3 className="font-heading font-bold text-primary-800 mb-3 leading-snug line-clamp-3 flex-1">
          {post.title}
        </h3>
        <p className="text-body-sm text-gray-500 line-clamp-2 mb-4">{post.preview}</p>

        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="bg-primary-50 text-primary-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/inspiration/${post.id}`}
          className="mt-auto text-primary-600 text-body-sm font-semibold hover:underline inline-flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          Baca Selengkapnya <span>→</span>
        </Link>
      </div>
    </motion.div>
  )
}
