'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const headlines = [
  'But how does he act in real situations?',
  'Ask without asking.',
  'Know the real him.'
]

export default function ComingSoonPage() {
  const [currentHeadline, setCurrentHeadline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % headlines.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* Couple Shadow Background Image - Base layer */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/couple shadow.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.5
        }}
      />
      
      {/* Gradient overlay on top of image */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ 
          background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))',
          opacity: 0.7
        }}
      />
      
      {/* Decorative gradient circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#D946A6]/30 blur-3xl z-[2]" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#9333EA]/30 blur-3xl z-[2]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F7C7DB]/20 blur-3xl z-[2]" />
      
      <div className="relative z-[10] w-full max-w-md">

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-8"
        >
          {/* Coming Soon Heading */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Coming Soon
          </motion.h2>
          
          {/* Animated Headlines */}
          <div className="h-36 mb-8 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentHeadline}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -80, opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="absolute inset-0 flex items-center justify-center text-[2.5rem] md:text-4xl leading-tight font-medium drop-shadow-lg"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {headlines[currentHeadline]}
              </motion.h1>
            </AnimatePresence>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl font-medium mt-6"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Save this page to test the man
          </motion.p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center gap-3 mt-8"
        >
          <div className="w-2 h-2 rounded-full bg-[#D946A6]" />
          <div className="w-2 h-2 rounded-full bg-[#9333EA]" />
          <div className="w-2 h-2 rounded-full bg-[#D946A6]" />
        </motion.div>
      </div>
    </div>
  )
}

