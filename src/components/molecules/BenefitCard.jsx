import { motion } from 'framer-motion'

/**
 * Benefit feature card with an emoji icon.
 * Used in the DistributorPage benefits grid.
 */
export default function BenefitCard({ icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex gap-4 items-start"
    >
      <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-heading font-bold text-primary-800 mb-1">{title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  )
}
