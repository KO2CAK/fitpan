import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import SectionLabel from '../atoms/SectionLabel'
import CategoryCard from '../molecules/CategoryCard'
import { useBeliCounter, useWebProductCategories } from '../../hooks/useSupabase'

export default function ProductsShowcase() {
  const { increment } = useBeliCounter()
  const { categories: productCategories } = useWebProductCategories()

  return (
    <section className="py-20 bg-background-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <SectionLabel className="text-primary-500 mb-3">Produk Kami</SectionLabel>
          <h2 className="text-h2 text-primary-800 mb-4">Keripik Sehat untuk Semua</h2>
          <p className="text-body-lg text-gray-500 max-w-xl mx-auto">
            Tiga kategori keripik premium yang diproses secara alami — tanpa MSG, tanpa pengawet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} maxVariants={4} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products" onClick={increment}>
            <Button variant="outline" size="lg">Lihat Semua Produk</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
