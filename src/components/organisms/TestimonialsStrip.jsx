import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import TestimonialQuote from '../molecules/TestimonialQuote'
import { useBeliCounter, useFetchTestimonials } from '../../hooks/useSupabase'

const STATIC_QUOTES = [
  { text: '"Fitpan beneran mengubah kebiasaan snacking saya. Berat badan turun, energy stabil!"', name: 'Siti, Balikpapan' },
  { text: '"Sebagai atlet, recovery pakai Fitpan Edamame enak banget. Highly recommended!"', name: 'Budi, Pelari Maraton' },
  { text: '"Kolesterol saya turun 55 poin dalam 3 bulan. Gak nyangka efeknya sebesar ini."', name: 'Rara, Ibu Rumah Tangga' },
  { text: '"Praktis banget buat sarapan di kantor. Gak perlu repot, nutrisi tetap terjaga."', name: 'Dina, Karyawan' },
]

export default function TestimonialsStrip() {
  const { count } = useBeliCounter()
  const { testimonials } = useFetchTestimonials()

  const quotes = testimonials.length > 0
    ? testimonials.slice(0, 4).map((t) => ({
        text: `"${t.review_text}"`,
        name: t.customer_name,
        rating: t.rating,
      }))
    : STATIC_QUOTES

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-h2 text-primary-800 mb-3">
            Dicintai & Direkomendasikan oleh{' '}
            <span className="text-accent-500">{count.toLocaleString('id-ID')}+ Orang</span>
          </h2>
          <Link to="/inspiration">
            <Button variant="outline">Lihat Semua Cerita</Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <TestimonialQuote key={i} text={q.text} name={q.name} rating={q.rating} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
