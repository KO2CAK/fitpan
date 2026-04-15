import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../atoms/Button'
import photoOfProduct from '../../assets/PhotoOfProduct.jpeg'
import { useBeliCounter } from '../../hooks/useSupabase'

export default function HeroSection() {
  const navigate = useNavigate()
  const { count, increment } = useBeliCounter()

  const handleBeliSekarang = () => {
    increment()
    navigate('/products')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background Image: High-res Lifestyle Photo */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2000&auto=format&fit=crop" 
          alt="Healthy lifestyle background" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/20 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-32 pb-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Content Area */}
        <div className="space-y-7 z-10 max-w-xl">
          <motion.p
            variants={itemVariants}
            className="text-sm font-heading font-bold tracking-[0.2em] text-white/90 uppercase drop-shadow-md"
          >
            A BETTER YOU, A BETTER FUTURE
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-[3rem] md:text-[4.5rem] leading-[1.1] font-heading font-bold text-white drop-shadow-xl flex flex-wrap items-center gap-2 md:gap-4"
          >
            <span>Fitpan</span>
            <span className="text-accent-300 italic drop-shadow-lg">for</span>
            <motion.span 
              className="inline-block underline decoration-accent-400 decoration-4 underline-offset-8 text-white relative"
              animate={{ 
                opacity: [0.6, 1, 0.6],
                textShadow: [
                  "0px 0px 0px rgba(255, 255, 255, 0)",
                  "0px 0px 20px rgba(255, 255, 255, 0.8)",
                  "0px 0px 0px rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              Anyone
            </motion.span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/95 max-w-lg drop-shadow-md font-medium leading-relaxed">
            Tak pernah ada kata terlambat untuk hidup sehat. Mulailah dari cemilan yang lebih baik — Fitpan
            membantu penuhi nutrisi harian, kontrol berat badan, dan jaga energimu.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => { increment(); navigate('/products') }} 
              className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-green-500 border-none !shadow-[0_4px_20px_rgba(249,115,22,0.4)] hover:!shadow-[0_8px_30px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-white font-bold tracking-wider">Beli Fitpan</span>
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 pt-6">
            <div className="flex -space-x-3">
              {['🧑', '👩', '👨', '🧕'].map((e, i) => (
                <div
                  key={i}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/50 flex items-center justify-center text-lg md:text-xl shadow-lg"
                >
                  {e}
                </div>
              ))}
            </div>
            <p className="text-sm md:text-base text-white font-medium bg-black/20 px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-white/10">
              <span className="font-bold text-accent-300">{count.toLocaleString('id-ID')}</span> orang sudah beli
            </p>
          </motion.div>
        </div>

        {/* Right – empty or minimalistic to keep background as star */}
        <motion.div variants={itemVariants} className="hidden md:flex justify-center relative z-10 h-full items-end pb-10">
          {/* We've removed the extra product box here to let the gorgeous food background shine! */}
        </motion.div>
      </motion.div>
    </section>
  )
}
