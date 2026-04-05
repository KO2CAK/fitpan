import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import SectionLabel from '../atoms/SectionLabel'
import InspirationCard from '../molecules/InspirationCard'
import { useBlogs } from '../../hooks/useSupabase'

export default function InspirationPreview() {
  const { posts } = useBlogs()
  const preview = posts.slice(0, 3)

  return (
    <section className="py-20 bg-background-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <SectionLabel className="text-primary-500 mb-3">Blog</SectionLabel>
          <h2 className="text-h2 text-primary-800">Find Inspirations from Our Stories</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {preview.map((post, i) => (
            <InspirationCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/inspiration">
            <Button variant="outline" size="lg">See All Stories</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
