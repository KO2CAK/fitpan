import { motion } from 'framer-motion'

export default function TimingCard({ icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="font-heading font-bold text-primary-700 mb-2">{title}</h4>
      <p className="text-body-sm text-gray-500">{desc}</p>
    </motion.div>
  )
}
