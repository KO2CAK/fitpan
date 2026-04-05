import { motion } from 'framer-motion'

/**
 * A single step card for the "How to Become a Partner" section.
 */
export default function PartnerStepCard({ step, icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="relative z-10 bg-white rounded-2xl p-6 shadow-sm border border-primary-100 flex flex-col items-center text-center gap-3"
    >
      <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-primary-600/25 mb-1">
        {icon}
      </div>
      <span className="text-xs font-heading font-bold text-primary-400 uppercase tracking-widest">{step}</span>
      <h3 className="font-heading font-bold text-primary-800 text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}
