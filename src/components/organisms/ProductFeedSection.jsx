import { motion } from 'framer-motion'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import { useFetchProducts } from '../../hooks/useSupabase'

// ProductCard - Molecule
function ProductCard({ name, price, nutrition_json, image_url, className = '' }) {
  const nutrition = typeof nutrition_json === 'string' 
    ? JSON.parse(nutrition_json) 
    : nutrition_json

  return (
    <div className={`card hover:shadow-card-hover transition-all duration-300 group ${className}`}>
      {/* Product Image */}
      <div className="w-full h-48 bg-gradient-to-br from-primary-50 to-accent-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="text-5xl">🥙</div>
        )}
      </div>

      {/* Product Info */}
      <h3 className="font-heading font-bold text-lg text-primary-600 mb-2">{name}</h3>

      {/* Nutrition Highlights */}
      <div className="space-y-2 mb-4">
        {nutrition && (
          <>
            {nutrition.calories && (
              <p className="text-body-sm text-gray-700">
                🔥 <span className="font-semibold">{nutrition.calories}</span> kcal
              </p>
            )}
            {nutrition.protein && (
              <p className="text-body-sm text-gray-700">
                💪 <span className="font-semibold">{nutrition.protein}</span> Protein
              </p>
            )}
            {nutrition.fiber && (
              <p className="text-body-sm text-gray-700">
                🌾 <span className="font-semibold">{nutrition.fiber}</span> Serat
              </p>
            )}
          </>
        )}
      </div>

      {/* Price & CTA */}
      <div className="border-t border-background-muted pt-4 flex items-center justify-between">
        <span className="text-h4 text-primary-600 font-heading font-bold">
          Rp {price?.toLocaleString('id-ID') || 'N/A'}
        </span>
        <Button variant="accent" size="sm">
          Pesan
        </Button>
      </div>
    </div>
  )
}

// Product Feed Section - Organism
export default function ProductFeedSection() {
  const { products, loading, error } = useFetchProducts()

  // Mock data for development
  const mockProducts = [
    {
      id: 1,
      name: 'Fitpan Original',
      price: 45000,
      nutrition_json: { calories: '150', protein: '5g', fiber: '12g' },
      image_url: null,
      is_featured: true,
    },
    {
      id: 2,
      name: 'Fitpan Choco',
      price: 50000,
      nutrition_json: { calories: '160', protein: '6g', fiber: '11g' },
      image_url: null,
      is_featured: true,
    },
    {
      id: 3,
      name: 'Fitpan Berry Blast',
      price: 52000,
      nutrition_json: { calories: '155', protein: '5g', fiber: '13g' },
      image_url: null,
      is_featured: true,
    },
  ]

  const displayProducts = products.length > 0 ? products : mockProducts

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="products" className="section-container py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-h2 text-primary-600 mb-4">
          Koleksi <span className="text-accent-500">Produk Fitpan</span>
        </h2>
        <p className="text-body-lg text-gray-700 max-w-2xl mx-auto">
          Pilih dari berbagai varian rasa yang lezat dan bergizi untuk kebutuhan Anda.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mt-6"></div>
      </motion.div>

      {/* Error State */}
      {error && !products.length && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
          <p className="text-orange-800">
            ⚠️ Tidak dapat memuat produk. Menampilkan varian sampel...
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && products.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
        </div>
      )}

      {/* Products Grid */}
      {(products.length > 0 || !loading) && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
                name={product.name}
                price={product.price}
                nutrition_json={product.nutrition_json}
                image_url={product.image_url}
                className="card-hover-lift"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center mt-16 bg-background-darker rounded-2xl p-12"
      >
        <h3 className="text-h3 text-primary-600 mb-4">
          Siap untuk <span className="text-accent-500">Gaya Hidup Sehat?</span>
        </h3>
        <p className="text-body-lg text-gray-700 mb-8 max-w-xl mx-auto">
          Dapatkan pengalaman cemilan premium dengan harga spesial untuk member baru.
        </p>
        <Button variant="primary" size="lg">
          Beli Sekarang via WhatsApp
        </Button>
      </motion.div>
    </section>
  )
}
