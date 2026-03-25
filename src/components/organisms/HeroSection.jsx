import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import photoOfProduct from '../../assets/PhotoOfProduct.jpeg'

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <section className="relative min-h-[90vh] flex items-center bg-background-light overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full -translate-y-1/3 translate-x-1/3 opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-100 rounded-full translate-y-1/3 -translate-x-1/3 opacity-40 blur-3xl pointer-events-none" />

      <motion.div
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left */}
        <div className="space-y-7">
          <motion.p
            variants={itemVariants}
            className="text-xs font-heading font-bold tracking-[0.2em] text-primary-500 uppercase"
          >
            A BETTER YOU, A BETTER FUTURE
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-[2.8rem] md:text-[3.5rem] leading-[1.1] font-heading font-bold text-primary-800"
          >
            Fitpan{' '}
            <span className="text-accent-500 italic">for</span>{' '}
            <span className="underline decoration-accent-400 decoration-4 underline-offset-4">Anyone</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-body-lg text-gray-600 max-w-md">
            Tak pernah ada kata terlambat untuk hidup sehat. Mulailah dari snack yang lebih baik — Fitpan
            membantu penuhi nutrisi harian, kontrol berat badan, dan jaga energi sepanjang hari.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link to="/distributor">
              <Button variant="primary" size="lg">Beli Sekarang</Button>
            </Link>
            <Link to="/products">
              <Button variant="outline" size="lg">Lihat Semua Produk</Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-2">
            <div className="flex -space-x-2">
              {['🧑', '👩', '👨', '🧕'].map((e, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-primary-100 border-2 border-white flex items-center justify-center text-lg"
                >
                  {e}
                </div>
              ))}
            </div>
            <p className="text-body-sm text-gray-600">
              <span className="font-bold text-primary-700">10,000+</span> pelanggan puas
            </p>
          </motion.div>
        </div>

        {/* Right – product visual */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <div className="relative">
            <div className="w-72 md:w-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={photoOfProduct}
                alt="Produk Fitpan"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white shadow-lg rounded-xl px-3 py-2 text-xs font-bold text-primary-600 border border-primary-100">
              ✓ Halal Certified
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white shadow-lg rounded-xl px-3 py-2 text-xs font-bold text-accent-600 border border-accent-100">
              🌾 Tinggi Serat
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
