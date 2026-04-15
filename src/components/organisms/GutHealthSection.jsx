import { motion } from 'framer-motion'
import photoOfProduct from '../../assets/PhotoOfProduct-2.jpeg'

export default function GutHealthSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white overflow-hidden relative">
      {/* Subtle overlay gradients for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary-900 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="space-y-6">
            <p className="text-accent-300 text-xs font-heading font-bold tracking-widest uppercase">
              Mengapa Fitpan?
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold leading-tight">
              Untuk sehat{' '}
              <span className="text-accent-400">tetap harus enak</span>
            </h2>
            <p className="text-primary-200 text-body-md leading-relaxed">
              Fitpan merupakan produk olahan buah dan sayur segar yang diolah tanpa minyak, tanpa bahan
              pengawet ataupun bahan berbahaya. Fitpan diolah dengan teknologi khusus yang menjaga
              kandungan serat dan nutrisi alami dari buah dan sayur. Namun nutrisi dari fitpan tidak
              sebesar buah dan sayur alami.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-primary-700 max-w-sm w-full">
              <img src={photoOfProduct} alt="Produk Fitpan" className="w-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
