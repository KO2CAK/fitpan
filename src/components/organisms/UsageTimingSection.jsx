import { motion } from 'framer-motion'
import TimingCard from '../molecules/TimingCard'

const TIMINGS = [
  { icon: '🌅', title: 'Sarapan',           desc: 'Mulai hari dengan asupan nutrisi lengkap dan energi stabil.' },
  { icon: '🏋️', title: 'Sebelum Olahraga', desc: 'Tambahan energi sebelum berolahraga, tanpa rasa begah.' },
  { icon: '☕', title: 'Camilan Cepat',      desc: 'Pengganti camilan rendah kalori, penuh nutrisi.' },
  { icon: '🌙', title: 'Kapan Saja',         desc: 'Pilihan tepat untuk segala waktu dan kebutuhan Anda.' },
]

export default function UsageTimingSection() {
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
          {TIMINGS.map((t, i) => (
            <TimingCard key={t.title} icon={t.icon} title={t.title} desc={t.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
