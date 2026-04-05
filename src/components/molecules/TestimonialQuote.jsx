import { motion } from 'framer-motion'

/**
 * Simple testimonial quote card used in the TestimonialsStrip section.
 */
export default function TestimonialQuote({ text, name, rating, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-background-light rounded-2xl p-7 border border-background-muted"
    >
      {rating && (
        <p className="text-accent-400 text-sm mb-2">{'⭐'.repeat(rating)}</p>
      )}
      <p className="text-body-md text-gray-700 italic mb-4">{text}</p>
      <p className="text-body-sm font-bold text-primary-600">— {name}</p>
    </motion.div>
  )
}
