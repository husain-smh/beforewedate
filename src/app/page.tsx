'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface QuestionCard {
  id: string
  question: string
  description: string
  imageUrl: string
  color: string
  bgColor: string
}

const questionCards: QuestionCard[] = [
  {
    id: 'feminist',
    question: 'How feminist is he?',
    description: 'See how he handles gender roles in real situations',
    imageUrl: 'https://images.unsplash.com/photo-1541679368093-5c967ac6de11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBoYW5kcyUyMGhvbGRpbmd8ZW58MXx8fHwxNzY2MjM4NjEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#C55C8D',
    bgColor: '#FFE5F0'
  },
  {
    id: 'self-obsessed',
    question: 'How self-obsessed is he?',
    description: 'See if he truly considers your needs',
    imageUrl: 'https://images.unsplash.com/photo-1584385002340-d886f3a0f097?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBkaXN0YW5jZSUyMGFwYXJ0fGVufDF8fHx8MTc2NjIzODYxNnww&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#B97DB6',
    bgColor: '#F5E8F4'
  },
  {
    id: 'boundaries',
    question: 'How much does he respect your boundaries?',
    description: 'Discover how he reacts when you say no',
    imageUrl: 'https://images.unsplash.com/photo-1755003842734-382751c01a6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB3YWxraW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzY2MjM4NjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#6B8FB4',
    bgColor: '#E5F2FF'
  },
  // {
  //   id: 'priorities',
  //   question: 'Would he choose you or his friends?',
  //   description: 'Find out where you stand in his priorities',
  //   imageUrl: 'https://images.unsplash.com/photo-1626233563542-148409467765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzaWxob3VldHRlJTIwc3Vuc2V0fGVufDF8fHx8MTc2NjIzODYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  //   color: '#D48B6A',
  //   bgColor: '#FFEEE5'
  // },
  // {
  //   id: 'money',
  //   question: 'Is money a dealbreaker for him?',
  //   description: 'Learn his true values around finances',
  //   imageUrl: 'https://images.unsplash.com/photo-1764815306651-29b36b4e507a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjB0YWxraW5nJTIwY29udmVyc2F0aW9ufGVufDF8fHx8MTc2NjIzODYxNHww&ixlib=rb-4.1.0&q=80&w=1080',
  //   color: '#7BA882',
  //   bgColor: '#E8F5EA'
  // },
  // {
  //   id: 'ambition',
  //   question: 'Does he value your ambitions?',
  //   description: 'See if he supports your dreams or feels threatened',
  //   imageUrl: 'https://images.unsplash.com/photo-1642295353355-bafd7b61c716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBlbWJyYWNpbmclMjBzaGFkb3d8ZW58MXx8fHwxNzY2MjM4NjE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  //   color: '#8B7DC0',
  //   bgColor: '#F0EDFF'
  // },
  {
    id: 'emotional',
    question: 'How emotionally available is he?',
    description: 'Check if he can handle deep conversations',
    imageUrl: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxhdGlvbnNoaXAlMjBpbnRpbWFjeSUyMGNvdXBsZXxlbnwxfHx8fDE3NjYyMzg2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#C55C8D',
    bgColor: '#FFE5F0'
  },
  {
    id: 'conflict',
    question: 'How mature is he in conflict?',
    description: 'Understand his communication style when things get tough',
    imageUrl: 'https://images.unsplash.com/photo-1756772796998-22d2c745653b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzaGFkb3clMjBzaWxob3VldHRlfGVufDF8fHx8MTc2NjIzODYxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#6B8FB4',
    bgColor: '#E5F2FF'
  }
]

export default function HomePage() {
  const router = useRouter()
  const [currentHeadline, setCurrentHeadline] = useState(0)
  const headlines = [
    'But how does he act in real situations?',
    'Ask without asking.',
    'Know the real him.'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline(prev => (prev + 1) % headlines.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleCardClick = (cardId: string) => {
    if (cardId === 'feminist') {
      router.push('/test/feminist')
    } else {
      router.push('/coming-soon')
    }
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <div 
        className="min-h-[55vh] px-6 pt-12 pb-8 flex flex-col justify-center relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom right, #D946A6, #9333EA)' }}
      >
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/30 blur-2xl" />
        <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-[#F7C7DB]/40 blur-xl" />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <h2 className="text-white text-xl mb-2" style={{ color: '#FFFFFF' }}>Know That Person</h2>
          </motion.div>

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
                className="absolute inset-0 flex items-center text-[2.5rem] leading-tight font-medium drop-shadow-lg"
                style={{ color: '#FFFFFF' }}
              >
                {headlines[currentHeadline]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg leading-relaxed max-w-sm"
            style={{ color: '#FFFFFF' }}
          >
            Would he pass the real tests ? Find out.
          </motion.p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="bg-[#FFF7F2] px-6 py-6">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-[#7B5B6F] mb-4 text-xl"
        >
          Choose a question
        </motion.h3>
        <div className="grid grid-cols-1 gap-4 pb-4">
          {questionCards.map((card, index) => (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card.id)}
              className="relative h-44 rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              style={{ backgroundColor: card.bgColor }}
            >
              {/* Background Image with Opacity */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${card.imageUrl})`,
                  opacity: 0.4
                }}
              />

              {/* Gradient Overlay for better text readability */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${card.bgColor}DD 0%, ${card.bgColor}CC 100%)`
                }}
              />

              {/* Content */}
              <div className="relative h-full p-6">
                <div className="text-left">
                  <h3 
                    className="mb-2 text-2xl font-semibold"
                    style={{ color: card.color, textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}
                  >
                    {card.question}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed font-medium"
                    style={{ color: card.color, opacity: 0.95 }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Arrow button - fixed position at bottom-right */}
                <div className="absolute bottom-6 right-6">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: card.color }}
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

