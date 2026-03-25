import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '../components/organisms/HeroSection'
import BenefitBar from '../components/organisms/BenefitBar'
import Button from '../components/atoms/Button'
import { productCategories } from '../data/products'
import { inspirationPosts } from '../data/inspiration'
import photoOfProduct from '../assets/PhotoOfProduct-2.jpeg'

// ─── Gut Health Section ────────────────────────────────────────────────────
function GutHealthSection() {
  return (
    <section className="py-20 bg-primary-800 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Semua kesehatan dimulai dari{' '}
              <span className="text-accent-400">pencernaan yang baik</span>
            </h2>
            <p className="text-primary-200 text-body-md leading-relaxed">
              Tak pernah ada kata terlambat untuk hidup sehat. Mulailah dari pola makan yang lebih baik —
              Fitpan membantu mengatasi masalah pencernaan, kolesterol tinggi, dan kelebihan berat badan.
            </p>
            <Link to="/products">
              <Button variant="accent" size="lg">Lihat Semua Produk</Button>
            </Link>
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

// ─── Products Showcase Section ─────────────────────────────────────────────
function ProductsShowcase() {
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
          <p className="text-xs font-heading font-bold tracking-widest text-primary-500 uppercase mb-3">
            Produk Kami
          </p>
          <h2 className="text-h2 text-primary-800 mb-4">Keripik Sehat untuk Semua</h2>
          <p className="text-body-lg text-gray-500 max-w-xl mx-auto">
            Tiga kategori keripik premium yang diproses secara alami — tanpa MSG, tanpa pengawet.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <Link to={`/products/${cat.id}`} className="group block h-full">
                <div className={`bg-gradient-to-br ${cat.bgClass} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
                  <div className="h-48 flex items-center justify-center relative">
                    <span className="text-[6rem] group-hover:scale-110 transition-transform duration-500">
                      {cat.emoji}
                    </span>
                    <span
                      className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ backgroundColor: cat.accentColor }}
                    >
                      {cat.variants.length} Varian
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: cat.accentColor }}>
                      {cat.subtitle}
                    </p>
                    <h3 className="font-heading font-bold text-xl text-primary-800 mb-2">{cat.name}</h3>
                    <p className="text-body-sm text-gray-600 mb-4 flex-1">{cat.tagline}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cat.variants.slice(0, 4).map((v) => (
                        <span key={v.id} className={`${cat.badgeBg} ${cat.textColor} text-xs font-semibold px-2 py-0.5 rounded-full`}>
                          {v.emoji} {v.name}
                        </span>
                      ))}
                      {cat.variants.length > 4 && (
                        <span className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-0.5 rounded-full">
                          +{cat.variants.length - 4} lagi
                        </span>
                      )}
                    </div>
                    <span
                      className="text-white text-sm font-heading font-semibold px-4 py-2.5 rounded-xl text-center block transition-opacity group-hover:opacity-90"
                      style={{ backgroundColor: cat.accentColor }}
                    >
                      Lihat Semua →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/products">
            <Button variant="outline" size="lg">Lihat Semua Produk</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Usage Timing Section ──────────────────────────────────────────────────
function UsageTimingSection() {
  const timings = [
    { icon: '🌅', title: 'Sarapan', desc: 'Mulai hari dengan asupan nutrisi lengkap dan energi stabil.' },
    { icon: '🏋️', title: 'Sebelum Olahraga', desc: 'Tambahan energi sebelum berolahraga, tanpa rasa begah.' },
    { icon: '☕', title: 'Camilan Cepat', desc: 'Pengganti camilan rendah kalori, penuh nutrisi.' },
    { icon: '🌙', title: 'Kapan Saja', desc: 'Pilihan tepat untuk segala waktu dan kebutuhan Anda.' },
  ]

  return (
    <section className="py-20 bg-background-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-h2 text-primary-800 mb-2">Kapan Waktu Terbaik untuk Fitpan?</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {timings.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{t.icon}</div>
              <h4 className="font-heading font-bold text-primary-700 mb-2">{t.title}</h4>
              <p className="text-body-sm text-gray-500">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials Strip ────────────────────────────────────────────────────
function TestimonialsStrip() {
  const quotes = [
    { text: '"Fitpan beneran mengubah kebiasaan snacking saya. Berat badan turun, energy stabil!"', name: 'Siti, Balikpapan' },
    { text: '"Sebagai atlet, recovery pakai Fitpan Edamame enak banget. Highly recommended!"', name: 'Budi, Pelari Maraton' },
    { text: '"Kolesterol saya turun 55 poin dalam 3 bulan. Gak nyangka efeknya sebesar ini."', name: 'Rara, Ibu Rumah Tangga' },
    { text: '"Praktis banget buat sarapan di kantor. Gak perlu repot, nutrisi tetap terjaga."', name: 'Dina, Karyawan' },
  ]

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
            <span className="text-accent-500">10,000+ Orang</span>
          </h2>
          <Link to="/inspiration">
            <Button variant="outline">Lihat Semua Cerita</Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background-light rounded-2xl p-7 border border-background-muted"
            >
              <p className="text-body-md text-gray-700 italic mb-4">{q.text}</p>
              <p className="text-body-sm font-bold text-primary-600">— {q.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Inspiration Preview ───────────────────────────────────────────────────
function InspirationPreview() {
  const preview = inspirationPosts.slice(0, 3)

  return (
    <section className="py-20 bg-background-darker">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-heading font-bold tracking-widest text-primary-500 uppercase mb-3">Blog</p>
          <h2 className="text-h2 text-primary-800">Find Inspirations from Our Stories</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {preview.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className={`h-44 ${post.avatarBg} flex items-center justify-center`}>
                <span className="text-6xl">{post.avatar}</span>
              </div>
              <div className="p-6">
                <p className="text-xs text-accent-600 font-bold uppercase tracking-wide mb-2">{post.category}</p>
                <h3 className="font-heading font-bold text-primary-800 mb-3 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-body-sm text-gray-500 line-clamp-2 mb-4">{post.preview}</p>
                <Link
                  to={`/inspiration/${post.id}`}
                  className="text-primary-600 text-body-sm font-semibold hover:underline"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/inspiration">
            <Button variant="outline" size="lg">See All Stories</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Section ───────────────────────────────────────────────────────────
function FAQSection() {
  const faqs = [
    { q: 'Apakah Fitpan termasuk obat-obatan?', a: 'Fitpan bukan obat-obatan. Fitpan merupakan snack multigrain premium yang terbuat dari 100% bahan alami.' },
    { q: 'Apakah sudah bersertifikat Halal?', a: 'Ya, Fitpan telah mendapatkan sertifikasi Halal dan telah melalui uji lab independen untuk keamanan maksimal.' },
    { q: 'Bagaimana cara mengonsumsi Fitpan?', a: 'Fitpan dapat dikonsumsi langsung sebagai snack, atau disajikan bersama minuman hangat/dingin sesuai selera.' },
    { q: 'Siapa saja yang bisa mengonsumsi Fitpan?', a: 'Fitpan cocok untuk semua kalangan — dari anak-anak usia 5 tahun hingga lansia. Namun konsultasikan dengan dokter jika Anda memiliki kondisi medis khusus.' },
  ]

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
          {faqs.map((faq, i) => (
            <motion.details
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-background-light border border-background-muted rounded-2xl p-5 group"
            >
              <summary className="font-heading font-semibold text-primary-800 cursor-pointer list-none flex justify-between items-center">
                {faq.q}
                <span className="text-primary-400 text-lg ml-4">+</span>
              </summary>
              <p className="text-body-sm text-gray-600 mt-3 leading-relaxed">{faq.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Banner ────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-16 bg-primary-500">
      <div className="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
          Mulai Perjalanan Sehat Anda Hari Ini
        </h2>
        <p className="text-primary-100 mb-8 text-body-lg">
          Bergabunglah dengan ribuan pelanggan yang sudah merasakan manfaat Fitpan.
        </p>
        <Link to="/distributor">
          <Button variant="accent" size="lg">Beli di Distributor Resmi</Button>
        </Link>
      </div>
    </section>
  )
}

// ─── HomePage ──────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitBar />
      <GutHealthSection />
      <ProductsShowcase />
      <UsageTimingSection />
      <TestimonialsStrip />
      <InspirationPreview />
      <FAQSection />
      <CTABanner />
    </>
  )
}
