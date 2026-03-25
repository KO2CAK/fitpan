import { motion } from 'framer-motion'

// Why Choose Fitpan Section - Organism
export default function WhyChooseFitpan() {
  const features = [
    {
      title: 'Bahan Segar & Alami',
      description: 'Setiap batch diproduksi dari sweet potato, oats, dan bahan pilihan terbaik tanpa pengawet berbahaya.',
      stats: '100% Organik',
    },
    {
      title: 'Tabel Nutrisi Transparan',
      description: 'Lihat setiap nutrisi dengan detail untuk keputusan pembelian yang lebih informed.',
      stats: '12g Serat/Sajian',
    },
  ]

  return (
    <section id="why" className="section-container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-h2 text-primary-600 mb-4">
          Mengapa Memilih <span className="text-accent-500">Fitpan?</span>
        </h2>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto"></div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="card-elevated"
          >
            <div className="mb-6">
              <span className="badge badge-accent">{feature.stats}</span>
            </div>
            <h3 className="text-h4 text-primary-600 mb-4">{feature.title}</h3>
            <p className="text-body-md text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
