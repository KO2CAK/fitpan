import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'
import SectionLabel from '../components/atoms/SectionLabel'
import CategoryCard from '../components/molecules/CategoryCard'
import { useBeliCounter, useWebProductCategories, useTrackPageView } from '../hooks/useSupabase'

export default function ProductsPage() {
  useTrackPageView('page_products')
  const { count } = useBeliCounter()
  const { categories: productCategories } = useWebProductCategories()

  return (
    <div className="min-h-screen bg-background-light">
      {/* Page Header */}
      <div className="bg-primary-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel className="text-accent-300 mb-3">Produk Kami</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4"
          >
            Keripik Sehat <span className="text-accent-400">Fitpan</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-primary-200 text-body-lg max-w-xl mx-auto mb-8"
          >
            Diproses secara alami, tanpa pengawet, tanpa MSG. Nikmati kelezatan buah dan sayuran dalam setiap gigitan renyah.
          </motion.p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { label: 'Kategori', value: '3' },
              { label: 'Total Varian', value: `${productCategories.reduce((a, c) => a + c.variants.length, 0)}+` },
              { label: 'Tanpa Pengawet', value: '100%' },
              { label: 'Pelanggan Puas', value: `${count.toLocaleString('id-ID')}+` },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-heading font-bold text-primary-700">{s.value}</p>
                <p className="text-body-xs text-gray-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      </div>

      {/* Features strip */}
      <div className="bg-primary-800 py-14 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { title: 'Tanpa MSG',       desc: 'Bebas MSG & bahan kimia berbahaya' },
              { title: 'Tanpa Pengawet',  desc: 'Alami 100%, tanpa bahan pengawet' },
              { title: 'Vacuum Frying',   desc: 'Proses vakum, high quality of packaging' },
              { title: 'Tanpa Minyak',    desc: 'Proses tanpa minyak tambahan' },
            ].map((f) => (
              <div key={f.title} className="space-y-2">
                <p className="font-heading font-bold text-primary-100">{f.title}</p>
                <p className="text-primary-300 text-body-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order CTA */}
      <div className="py-16 bg-background-darker text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-h3 text-primary-800 mb-3">Siap Memesan?</h2>
          <p className="text-body-md text-gray-600 mb-6">
            Hubungi distributor resmi kami atau pilih produk di atas untuk melihat daftar harga.
          </p>
          <Link to="/distributor">
            <Button variant="primary">Hubungi Kami</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
