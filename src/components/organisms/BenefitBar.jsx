import { motion } from 'framer-motion'
import { Leaf, TrendingUp, Zap } from 'lucide-react'

// Benefit Bar Component - Organism
export default function BenefitBar() {
  const benefits = [
    {
      icon: Leaf,
      title: 'Tinggi Serat',
      description: 'Didukung bahan alami terbaik untuk pencernaan optimal',
    },
    {
      icon: TrendingUp,
      title: 'Rendah Gula',
      description: 'Kontrol gula darah dengan formula spesial',
    },
    {
      icon: Zap,
      title: 'Energi Stabil',
      description: 'Daya tahan sepanjang hari tanpa crash',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-background-darker py-12">
      <motion.div
        className="section-container grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-heading font-bold text-lg text-primary-600 mb-2">
                {benefit.title}
              </h3>
              <p className="text-body-sm text-gray-600">{benefit.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
