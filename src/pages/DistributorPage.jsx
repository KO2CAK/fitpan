import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../components/atoms/Button'
import { useTrackPageView, useFetchDistributors } from '../hooks/useSupabase'

const CATEGORY_TABS = [
  { value: 'all',         label: 'Semua'       },
  { value: 'distributor', label: 'Distributor'  },
  { value: 'reseller',    label: 'Reseller'     },
  { value: 'franchise',   label: 'Franchise'    },
]

const CATEGORY_BADGE = {
  distributor: 'bg-amber-100 text-amber-700',
  reseller:    'bg-primary-100 text-primary-700',
  franchise:   'bg-purple-100 text-purple-700',
}

const CATEGORY_LABELS = {
  distributor: 'Distributor',
  reseller:    'Reseller',
  franchise:   'Franchise',
}

function buildWaLink(contact) {
  if (!contact) return null
  const digits = contact.replace(/\D/g, '')
  if (!digits) return null
  const normalized = digits.startsWith('0') ? '62' + digits.slice(1) : digits
  return `https://wa.me/${normalized}`
}

export default function DistributorPage() {
  useTrackPageView('page_distributor')
  const { distributors, loading } = useFetchDistributors()
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? distributors
    : distributors.filter((d) => d.category === activeTab)

  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pt-8 w-full">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-body-sm text-gray-500 hover:text-primary-600 transition-colors"
        >
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 w-full text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-primary-500 text-xs font-heading font-bold tracking-widest uppercase mb-3"
        >
          Jaringan Mitra Resmi
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading font-bold text-primary-800 mb-4"
        >
          Distributor &amp; <span className="text-accent-500">Reseller</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-body-lg text-gray-600 max-w-xl mx-auto"
        >
          Temukan mitra resmi Fitpan di seluruh Indonesia. Hubungi mereka langsung
          untuk pembelian partai besar atau kemitraan usaha.
        </motion.p>
      </div>

      {/* Category tabs */}
      <div className="max-w-6xl mx-auto px-4 w-full pb-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-400 hover:text-primary-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-16 w-full flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          /* Empty / Coming Soon state */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📦</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-primary-800 mb-3">
              Segera Hadir
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Kami sedang memperluas jaringan mitra ke seluruh Indonesia. Hubungi kami
              untuk informasi menjadi mitra resmi Fitpan.
            </p>
            <a
              href="https://wa.me/628983487706?text=Halo%20Fitpan%2C%20saya%20tertarik%20menjadi%20mitra%20Fitpan"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="lg">💬 Daftar Jadi Mitra</Button>
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((d, i) => {
              const waLink = buildWaLink(d.contact)
              return (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
                >
                  <div className="flex items-center gap-3">
                    {d.logo_url ? (
                      <img
                        src={d.logo_url}
                        alt={d.name}
                        className="w-12 h-12 rounded-full object-cover border border-gray-100"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg flex-shrink-0">
                        {d.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-primary-900 truncate">{d.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_BADGE[d.category] || 'bg-gray-100 text-gray-600'}`}>
                        {CATEGORY_LABELS[d.category] || d.category}
                      </span>
                    </div>
                  </div>

                  {(d.city || d.province) && (
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                      <span>📍</span>
                      {[d.city, d.province].filter(Boolean).join(', ')}
                    </p>
                  )}

                  {(d.contact || d.email) && (
                    <div className="flex flex-col gap-1 mt-auto">
                      {waLink ? (
                        <a
                          href={`${waLink}?text=Halo%20${encodeURIComponent(d.name)}%2C%20saya%20tertarik%20dengan%20produk%20Fitpan`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
                        >
                          <span>💬</span> WhatsApp
                        </a>
                      ) : d.contact && (
                        <p className="text-sm text-gray-500">{d.contact}</p>
                      )}
                      {d.email && (
                        <a
                          href={`mailto:${d.email}`}
                          className="text-sm text-primary-600 hover:underline text-center"
                        >
                          {d.email}
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* CTA — Become a partner */}
      <div className="bg-primary-50 border-t border-primary-100 py-14">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-primary-500 text-xs font-heading font-bold tracking-widest uppercase mb-3">
            Bergabung bersama kami
          </p>
          <h2 className="text-2xl font-heading font-bold text-primary-800 mb-3">
            Tertarik Menjadi Mitra Fitpan?
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Daftarkan diri Anda sebagai distributor, reseller, atau franchise Fitpan
            dan mulai usaha Anda bersama produk kesehatan terpercaya.
          </p>
          <a
            href="https://wa.me/628983487706?text=Halo%20Fitpan%2C%20saya%20tertarik%20menjadi%20mitra%20Fitpan"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="primary" size="lg">💬 Hubungi via WhatsApp</Button>
          </a>
        </div>
      </div>

      {/* Marketplace bar */}
      <div className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-heading font-bold tracking-widest uppercase text-primary-500 mb-8">
            Juga tersedia di
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Shopee',    emoji: '🛍️', href: 'https://shopee.co.id',  color: 'bg-orange-50 text-orange-700' },
              { name: 'Tokopedia', emoji: '🟢', href: 'https://tokopedia.com', color: 'bg-green-50 text-green-700'  },
              { name: 'TikTok Shop', emoji: '🎵', href: 'https://tiktok.com', color: 'bg-pink-50 text-pink-700'    },
            ].map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${s.color} border border-transparent hover:border-current transition-all shadow-sm`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-heading font-bold text-sm">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Back link */}
      <div className="max-w-6xl mx-auto px-4 pt-8 w-full">
        <Link to="/" className="inline-flex items-center gap-1 text-body-sm text-gray-500 hover:text-primary-600 transition-colors">
          ← Kembali ke Beranda
        </Link>
      </div>

      {/* Main Coming Soon */}
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
            className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
          >
            <span className="text-6xl">📦</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-primary-500 text-xs font-heading font-bold tracking-widest uppercase mb-3"
          >
            Distributor Resmi
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-heading font-bold text-primary-800 mb-6"
          >
            Coming <span className="text-accent-500">Soon</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-body-lg text-gray-600 mb-8 leading-relaxed"
          >
            Halaman distributor resmi Fitpan sedang dalam pengembangan. Kami sedang memperluas jaringan
            distributor ke seluruh Indonesia. Hubungi kami sementara melalui WhatsApp untuk informasi pembelian.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/628983487706?text=Halo%20Fitpan%2C%20saya%20ingin%20membeli%20produk%20Fitpan"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="primary" size="lg">
                💬 Hubungi via WhatsApp
              </Button>
            </a>
            <Link to="/products">
              <Button variant="outline" size="lg">Lihat Produk</Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Info cards */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-heading font-bold tracking-widest uppercase text-primary-500 mb-8">
            Juga tersedia di
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'Shopee', emoji: '🛍️', href: 'https://shopee.co.id', color: 'bg-orange-50 text-orange-700' },
              { name: 'Tokopedia', emoji: '🟢', href: 'https://tokopedia.com', color: 'bg-green-50 text-green-700' },
              { name: 'TikTok Shop', emoji: '🎵', href: 'https://tiktok.com', color: 'bg-pink-50 text-pink-700' },
            ].map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04 }}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl ${s.color} border border-transparent hover:border-current transition-all shadow-sm`}
              >
                <span className="text-3xl">{s.emoji}</span>
                <span className="font-heading font-bold text-sm">{s.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
