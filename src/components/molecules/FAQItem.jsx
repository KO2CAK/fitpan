import { motion } from 'framer-motion'

export default function FAQItem({ q, a, index }) {
  return (
    <motion.details
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-background-light border border-background-muted rounded-2xl p-5 group"
    >
      <summary className="font-heading font-semibold text-primary-800 cursor-pointer list-none flex justify-between items-center">
        {q}
        <span className="text-primary-400 text-lg ml-4">+</span>
      </summary>
      <p className="text-body-sm text-gray-600 mt-3 leading-relaxed">{a}</p>
    </motion.details>
  )
}
