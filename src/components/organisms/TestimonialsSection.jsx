import { motion } from 'framer-motion'
import TestimonialCard from '../molecules/TestimonialCard'
import Button from '../atoms/Button'
import { useFetchTestimonials } from '../../hooks/useSupabase'

// Testimonials Section - Organism
export default function TestimonialsSection() {
  const { testimonials, loading, error } = useFetchTestimonials()

  // Mock data for development (remove when Supabase is connected)
  const mockTestimonials = [
    {
      id: 1,
      customer_name: 'Siti Nurhaliza',
      rating: 5,
      review_text: 'Fitpan benar-benar mengubah kebiasaan snacking saya. Rasanya enak dan saya bisa fokus lebih lama tanpa rasa ngantuk.',
      avatar_url: null,
    },
    {
      id: 2,
      customer_name: 'Budi Santoso',
      rating: 5,
      review_text: 'Sebagai atlet, saya butuh snack bergizi. Fitpan adalah pilihan terbaik—tinggi serat, rendah gula, energi stabil.',
      avatar_url: null,
    },
    {
      id: 3,
      customer_name: 'Clara Wulandari',
      rating: 4,
      review_text: 'Sudah 3 bulan konsumsi Fitpan. Berat badan stabil, kulit lebih cerah, dan kolesterol turun signifikan!',
      avatar_url: null,
    },
    {
      id: 4,
      customer_name: 'Rudi Hermawan',
      rating: 5,
      review_text: 'Harga mungkin premium, tapi worth it! Kualitas bahan benar-benar terasa berbeda dari snack lain.',
      avatar_url: null,
    },
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials : mockTestimonials
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="testimonials" className="section-container py-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-h2 text-primary-600 mb-4">
          Apa Kata <span className="text-accent-500">Customer Kami?</span>
        </h2>
        <p className="text-body-lg text-gray-700 max-w-2xl mx-auto">
          Ribuan pelanggan puas telah merasakan perubahan positif dengan Fitpan.
        </p>
        <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mx-auto mt-6"></div>
      </motion.div>

      {/* Error State */}
      {error && !testimonials.length && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
          <p className="text-orange-800">
            ⚠️ Tidak dapat menampilkan testimonial. Menampilkan data sampel...
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && testimonials.length === 0 && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-500"></div>
        </div>
      )}

      {/* Testimonials Grid */}
      {(testimonials.length > 0 || !loading) && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayTestimonials.slice(0, 4).map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="card-hover-lift"
            >
              <TestimonialCard
                customerName={testimonial.customer_name}
                rating={testimonial.rating}
                reviewText={testimonial.review_text}
                avatarUrl={testimonial.avatar_url}
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
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center mt-16"
      >
        <p className="text-body-lg text-gray-700 mb-6">
          Bergabunglah dengan ribuan pelanggan puas Fitpan hari ini
        </p>
        <Button variant="primary" size="lg">
          Mulai Journey Sehat Anda
        </Button>
      </motion.div>
    </section>
  )
}
