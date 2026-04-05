import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'
import SectionLabel from '../components/atoms/SectionLabel'
import AnimatedCount from '../components/atoms/AnimatedCount'
import DistributorCard, { CATEGORY_CONFIG } from '../components/molecules/DistributorCard'
import BenefitCard from '../components/molecules/BenefitCard'
import PartnerStepCard from '../components/molecules/PartnerStepCard'
import { useTrackPageView, useFetchDistributors } from '../hooks/useSupabase'

const WA_FITPAN = import.meta.env.VITE_WHATSAPP_PHONE || '628983487706'

const PARTNER_STEPS = [
  { step: '01', icon: '💬', title: 'Hubungi Kami',     desc: 'Kirim pesan WhatsApp atau email. Tim kami siap menjawab dalam 1×24 jam.' },
  { step: '02', icon: '📋', title: 'Diskusi & Syarat', desc: 'Kami akan menjelaskan syarat, margin keuntungan, dan area kemitraan.' },
  { step: '03', icon: '🚀', title: 'Mulai Berjualan',  desc: 'Tandatangani perjanjian, terima produk perdana, dan mulai bisnis Anda!' },
]

const BENEFITS = [
  { icon: '📦', title: 'Stok Terjamin',      desc: 'Prioritas pengiriman dan ketersediaan stok untuk semua mitra resmi.' },
  { icon: '💰', title: 'Margin Menarik',     desc: 'Harga khusus mitra dengan margin keuntungan kompetitif hingga 30%.' },
  { icon: '🎯', title: 'Dukungan Pemasaran', desc: 'Materi promosi, desain, dan panduan penjualan gratis.' },
  { icon: '📱', title: 'Pelatihan Produk',   desc: 'Edukasi produk lengkap agar Anda bisa menjual dengan percaya diri.' },
  { icon: '🏆', title: 'Program Reward',     desc: 'Bonus dan insentif menarik untuk mitra dengan performa terbaik.' },
  { icon: '🤝', title: 'Komunitas Mitra',    desc: 'Bergabung bersama jaringan mitra Fitpan di seluruh Indonesia.' },
]

const MARKETPLACES = [
  { name: 'Shopee',      emoji: '🛍️', href: 'https://shopee.co.id',  color: 'bg-orange-50 text-orange-700 hover:border-orange-300' },
  { name: 'Tokopedia',   emoji: '🟢', href: 'https://tokopedia.com', color: 'bg-green-50  text-green-700  hover:border-green-300'  },
  { name: 'TikTok Shop', emoji: '🎵', href: 'https://tiktok.com',    color: 'bg-pink-50   text-pink-700   hover:border-pink-300'   },
]

function groupByProvince(list) {
  const map = {}
  for (const d of list) {
    const key = d.province || 'Lainnya'
    if (!map[key]) map[key] = []
    map[key].push(d)
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b))
}

const waJoinUrl = `https://wa.me/${WA_FITPAN}?text=Halo%20Fitpan%2C%20saya%20tertarik%20menjadi%20mitra%20Fitpan`

export default function DistributorPage() {
  useTrackPageView('page_distributor')
  const { distributors, loading } = useFetchDistributors()
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const counts = {
    all:         distributors.length,
    distributor: distributors.filter((d) => d.category === 'distributor').length,
    reseller:    distributors.filter((d) => d.category === 'reseller').length,
    franchise:   distributors.filter((d) => d.category === 'franchise').length,
  }

  const filtered = distributors
    .filter((d) => activeTab === 'all' || d.category === activeTab)
    .filter((d) => {
      if (!searchQuery) return true
      const q = searchQuery.toLowerCase()
      return (
        d.name?.toLowerCase().includes(q) ||
        d.city?.toLowerCase().includes(q) ||
        d.province?.toLowerCase().includes(q)
      )
    })

  const grouped = activeTab === 'all' && !searchQuery ? groupByProvince(filtered) : null
  const provinceCount = new Set(distributors.map((d) => d.province).filter(Boolean)).size

  return (
    <div className="min-h-screen bg-background-light flex flex-col">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 text-white">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
          <Link to="/" className="inline-flex items-center gap-1 text-primary-200 hover:text-white text-body-sm transition-colors mb-8">
            ← Kembali ke Beranda
          </Link>

          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel className="text-accent-300 mb-4">Jaringan Mitra Resmi Fitpan</SectionLabel>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-heading font-bold mb-5 leading-tight">
            Distributor &amp;{' '}<span className="text-accent-400">Reseller</span>
            <br className="hidden md:block" /> di Seluruh Indonesia
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-primary-200 text-body-lg max-w-xl mx-auto mb-10">
            Temukan mitra resmi Fitpan terdekat. Hubungi langsung untuk pembelian partai besar atau peluang kemitraan usaha.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="inline-flex flex-wrap justify-center gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
            {[
              { label: 'Mitra Aktif',  target: Math.max(counts.all, 1),    suffix: '+' },
              { label: 'Provinsi',     target: Math.max(provinceCount, 1),  suffix: '' },
              { label: 'Kategori',     target: 3,                            suffix: '' },
            ].map(({ label, target, suffix }) => (
              <div key={label} className="flex flex-col items-center px-8 py-4">
                <span className="text-3xl md:text-4xl font-heading font-bold text-white">
                  <AnimatedCount target={target} suffix={suffix} />
                </span>
                <span className="text-primary-300 text-xs font-medium uppercase tracking-wider mt-1">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <svg viewBox="0 0 1440 60" className="block w-full" preserveAspectRatio="none" style={{ height: 48 }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FDFCFB" />
        </svg>
      </section>

      {/* FILTER BAR */}
      <section className="max-w-6xl mx-auto px-4 w-full -mt-2 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex gap-2 flex-wrap justify-center sm:justify-start flex-1">
            {(['all', 'distributor', 'reseller', 'franchise']).map((cat) => {
              const cfg = CATEGORY_CONFIG[cat]
              const isActive = activeTab === cat
              return (
                <button key={cat} onClick={() => setActiveTab(cat)} className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${isActive ? 'bg-primary-600 text-white shadow-md scale-105' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-700'}`}>
                  <span>{cfg.emoji}</span>
                  {cfg.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-500'}`}>{counts[cat]}</span>
                </button>
              )
            })}
          </div>
          <div className="relative w-full sm:w-60">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input type="text" placeholder="Cari nama, kota, provinsi…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 bg-gray-50" />
          </div>
        </div>
      </section>

      {/* DISTRIBUTOR GRID */}
      <section className="max-w-6xl mx-auto px-4 pb-16 w-full flex-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-gray-400 text-sm">Memuat data mitra…</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6"><span className="text-5xl">📦</span></div>
            <h2 className="text-2xl font-heading font-bold text-primary-800 mb-3">{searchQuery ? 'Tidak Ditemukan' : 'Segera Hadir'}</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">{searchQuery ? `Tidak ada mitra yang cocok dengan "${searchQuery}"` : 'Kami sedang memperluas jaringan mitra ke seluruh Indonesia.'}</p>
            {!searchQuery && (
              <a href={waJoinUrl} target="_blank" rel="noreferrer">
                <Button variant="primary" size="lg">💬 Daftar Jadi Mitra</Button>
              </a>
            )}
          </motion.div>
        ) : grouped ? (
          <div className="space-y-10">
            {grouped.map(([province, items]) => (
              <div key={province}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary-500 font-heading font-bold text-sm uppercase tracking-widest">📍 {province}</span>
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 font-medium">{items.length} mitra</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((d, i) => <DistributorCard key={d.id} d={d} index={i} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((d, i) => <DistributorCard key={d.id} d={d} index={i} />)}
          </div>
        )}
      </section>

      {/* HOW TO BECOME A PARTNER */}
      <section className="bg-gradient-to-br from-primary-50 to-background-muted border-y border-primary-100 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <SectionLabel className="text-primary-500 mb-3">Cara Bergabung</SectionLabel>
          <h2 className="text-3xl font-heading font-bold text-primary-800 mb-2">Cara Menjadi Mitra Fitpan</h2>
          <p className="text-gray-500 mb-12 max-w-md mx-auto text-sm">Hanya 3 langkah mudah untuk memulai perjalanan kemitraan bersama Fitpan.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-accent-300 to-primary-200 z-0" />
            {PARTNER_STEPS.map((s, i) => <PartnerStepCard key={s.step} {...s} index={i} />)}
          </div>
          <div className="mt-12">
            <a href={waJoinUrl} target="_blank" rel="noreferrer">
              <Button variant="primary" size="lg">💬 Mulai Daftar Sekarang</Button>
            </a>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-background-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionLabel className="text-accent-600 mb-3">Keuntungan Mitra</SectionLabel>
            <h2 className="text-3xl font-heading font-bold text-primary-800 mb-2">Mengapa Bergabung dengan Fitpan?</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">Lebih dari sekedar berjualan — jadilah bagian dari gerakan hidup sehat Fitpan.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => <BenefitCard key={b.title} {...b} index={i} />)}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-800 to-primary-700 py-16 text-white text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(193,154,107,0.2)_0%,_transparent_60%)] pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4">
          <SectionLabel className="text-accent-300 mb-3">Bergabung bersama kami</SectionLabel>
          <h2 className="text-3xl font-heading font-bold mb-3">Tertarik Menjadi Mitra Fitpan?</h2>
          <p className="text-primary-200 mb-8 text-sm">Daftarkan diri Anda sebagai distributor, reseller, atau franchise Fitpan dan mulai usaha Anda bersama produk kesehatan terpercaya.</p>
          <a href={waJoinUrl} target="_blank" rel="noreferrer">
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-heading font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg text-body-md">
              💬 Hubungi via WhatsApp
            </button>
          </a>
        </div>
      </section>

      {/* MARKETPLACE BAR */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-xs font-heading font-bold tracking-widest uppercase text-primary-500 mb-8">Juga tersedia di</p>
          <div className="flex flex-wrap justify-center gap-6">
            {MARKETPLACES.map((s) => (
              <motion.a key={s.name} href={s.href} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${s.color} border border-transparent transition-all shadow-sm min-w-[120px]`}>
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-heading font-bold text-sm">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
