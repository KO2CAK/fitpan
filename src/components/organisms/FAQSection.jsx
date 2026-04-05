import { motion } from 'framer-motion'
import FAQItem from '../molecules/FAQItem'

const FAQS = [
  {
    q: 'Apakah Fitpan termasuk obat-obatan?',
    a: 'Fitpan bukan obat-obatan. Fitpan merupakan snack multigrain premium yang terbuat dari 100% bahan alami.',
  },
  {
    q: 'Bagaimana cara mengonsumsi Fitpan?',
    a: 'Fitpan dapat dikonsumsi langsung sebagai snack, atau disajikan bersama minuman hangat/dingin sesuai selera.',
  },
  {
    q: 'Siapa saja yang bisa mengonsumsi Fitpan?',
    a: 'Fitpan cocok untuk semua kalangan — dari anak-anak usia 5 tahun hingga lansia. Namun konsultasikan dengan dokter jika Anda memiliki kondisi medis khusus.',
  },
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-h2 text-primary-800">Frequently Asked Questions</h2>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
