'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Question {
  id: number
  question: string
  options: {
    label: string
    value: 'A' | 'B' | 'C' | 'D'
    text: string
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    question: 'When you share something personal with him, he usually:',
    options: [
      { label: 'A', value: 'A', text: 'Listens closely and engages with what you\'re saying' },
      { label: 'B', value: 'B', text: 'Listens and responds, but keeps it surface-level' },
      { label: 'C', value: 'C', text: 'Acknowledges it briefly and moves on' },
      { label: 'D', value: 'D', text: 'Seems uncomfortable and changes the focus' }
    ]
  },
  {
    id: 2,
    question: 'When something important happens in your life, he:',
    options: [
      { label: 'A', value: 'A', text: 'Checks in, follows up, and stays involved' },
      { label: 'B', value: 'B', text: 'Responds supportively in the moment' },
      { label: 'C', value: 'C', text: 'Responds if reminded' },
      { label: 'D', value: 'D', text: 'Doesn\'t really engage with it' }
    ]
  },
  {
    id: 3,
    question: 'During emotional or difficult conversations, he tends to:',
    options: [
      { label: 'A', value: 'A', text: 'Stay present and work through it with you' },
      { label: 'B', value: 'B', text: 'Participate but prefers to resolve it quickly' },
      { label: 'C', value: 'C', text: 'Take space and return later' },
      { label: 'D', value: 'D', text: 'Avoid the conversation altogether' }
    ]
  },
  {
    id: 4,
    question: 'When it comes to sharing his own feelings, he:',
    options: [
      { label: 'A', value: 'A', text: 'Shares openly and with detail' },
      { label: 'B', value: 'B', text: 'Shares some feelings when asked' },
      { label: 'C', value: 'C', text: 'Shares only basic emotions' },
      { label: 'D', value: 'D', text: 'Rarely shares what\'s going on inside' }
    ]
  },
  {
    id: 5,
    question: 'If you bring up an emotionally heavy topic, he:',
    options: [
      { label: 'A', value: 'A', text: 'Makes an effort to understand, even if it\'s uncomfortable' },
      { label: 'B', value: 'B', text: 'Engages but seems unsure how to respond' },
      { label: 'C', value: 'C', text: 'Listens but keeps emotional distance' },
      { label: 'D', value: 'D', text: 'Tries to redirect to something lighter' }
    ]
  },
  {
    id: 6,
    question: 'When you express vulnerability (hurt, fear, insecurity), he:',
    options: [
      { label: 'A', value: 'A', text: 'Responds with care and understanding' },
      { label: 'B', value: 'B', text: 'Listens and stays calm' },
      { label: 'C', value: 'C', text: 'Acknowledges it without going deeper' },
      { label: 'D', value: 'D', text: 'Appears unsure how to respond and moves on' }
    ]
  },
  {
    id: 7,
    question: 'When you plan to talk about something important later, he:',
    options: [
      { label: 'A', value: 'A', text: 'Remembers and follows through' },
      { label: 'B', value: 'B', text: 'Follows through most of the time' },
      { label: 'C', value: 'C', text: 'Sometimes forgets or delays' },
      { label: 'D', value: 'D', text: 'Often lets it fade away' }
    ]
  },
  {
    id: 8,
    question: 'Over time, emotional closeness between you:',
    options: [
      { label: 'A', value: 'A', text: 'Has grown steadily' },
      { label: 'B', value: 'B', text: 'Has stayed fairly consistent' },
      { label: 'C', value: 'C', text: 'Comes and goes' },
      { label: 'D', value: 'D', text: 'Feels limited or hard to build' }
    ]
  }
]

const scoreRanges = [
  { min: 19, max: 24, label: 'High emotional availability', description: 'He consistently shows up emotionally. He listens, engages deeply, and creates space for both of your feelings. This level of emotional presence is rare and valuable.' },
  { min: 13, max: 18, label: 'Moderate emotional availability', description: 'He engages emotionally in some contexts but may struggle with depth or consistency. The emotional connection exists but may feel inconsistent at times.' },
  { min: 7, max: 12, label: 'Inconsistent emotional presence', description: 'Emotional engagement happens, but it\'s limited or situational. He may be present in easier moments but pull back when things get deeper or more complex.' },
  { min: 0, max: 6, label: 'Limited emotional presence', description: 'Emotional closeness is challenging to build or maintain. He may struggle with vulnerability, emotional depth, or sustained emotional engagement.' }
]

function calculateScore(answers: Record<number, 'A' | 'B' | 'C' | 'D'>): number {
  const scores: Record<'A' | 'B' | 'C' | 'D', number> = {
    A: 3,
    B: 2,
    C: 1,
    D: 0
  }
  
  return Object.values(answers).reduce((total, answer) => {
    return total + (scores[answer] || 0)
  }, 0)
}

function getResult(score: number) {
  return scoreRanges.find(range => score >= range.min && score <= range.max) || scoreRanges[scoreRanges.length - 1]
}

function getPercentileRange(score: number): { percentage: string, message: string } {
  if (score >= 21) {
    return {
      percentage: '87.5',
      message: 'Among the most emotionally available partners. Very few people consistently create this level of emotional presence and depth in relationships.'
    }
  } else if (score >= 17) {
    return {
      percentage: '75',
      message: 'More emotionally available than average. He likely shows above-average capacity for emotional intimacy and engagement.'
    }
  } else if (score >= 13) {
    return {
      percentage: '50',
      message: 'Moderate emotional availability. He\'s around or above average in his ability to engage emotionally and create emotional closeness.'
    }
  } else if (score >= 9) {
    return {
      percentage: '25',
      message: 'Slightly below average emotional presence. Many partners show more consistent emotional availability and engagement than he does.'
    }
  } else if (score >= 5) {
    return {
      percentage: '12.5',
      message: 'Below typical emotional availability. He may struggle with emotional depth, vulnerability, or sustained emotional engagement in the relationship.'
    }
  } else {
    return {
      percentage: '0',
      message: 'Among the least emotionally available partners. Building and maintaining emotional closeness is significantly limited in this relationship.'
    }
  }
}

export default function EmotionalAvailabilityPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<'instructions' | 'questions' | 'results'>('instructions')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({})

  const handleStart = () => {
    setCurrentStep('questions')
  }

  const handleAnswer = (value: 'A' | 'B' | 'C' | 'D') => {
    const questionId = questions[currentQuestion].id
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setCurrentStep('results')
      }, 300)
    }
  }

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    } else {
      setCurrentStep('instructions')
    }
  }

  const handleBackToHome = () => {
    router.push('/')
  }

  const score = calculateScore(answers)
  const result = getResult(score)
  const percentile = getPercentileRange(score)
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div 
      className="h-screen flex items-center justify-center px-2 py-2 safe-area-inset overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md h-full rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        {/* Header */}
        <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={currentStep === 'instructions' ? handleBackToHome : handleBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" style={{ color: 'var(--color-text-primary)' }} />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                How emotionally available is he?
              </h1>
              {currentStep === 'questions' && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              )}
            </div>
          </div>
          {currentStep === 'questions' && (
            <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  background: 'linear-gradient(to right, #E8879E, #EC4899)',
                  width: `${progress}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden px-4 py-4 flex flex-col min-h-0">
          <AnimatePresence mode="wait">
            {currentStep === 'instructions' && (
              <motion.div
                key="instructions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between"
              >
                <div className="flex-1 flex flex-col justify-center">
                  <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    Before you begin
                  </h2>
                  <div 
                    className="p-4 rounded-2xl mb-4"
                    style={{ backgroundColor: 'var(--color-input-bg)' }}
                  >
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-body)' }}>
                      <strong>Choose the option that best describes what usually happens.</strong>
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                      Answer based on <strong>what he actually does</strong> — not what he says, not what you hope, not his potential. If you're unsure, pick the option that happens more often.
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    This assessment measures emotional availability through behavioral patterns: listening, engagement, vulnerability, and consistency in emotional presence.
                  </p>
                </div>
                <motion.button
                  onClick={handleStart}
                  className="w-full py-3 rounded-2xl font-semibold text-white shadow-lg flex-shrink-0"
                  style={{
                    background: 'linear-gradient(to right, #E8879E, #EC4899)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start the assessment
                </motion.button>
              </motion.div>
            )}

            {currentStep === 'questions' && (
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div className="flex flex-col h-full min-h-0">
                  <div className="flex-shrink-0 mb-3">
                    <h2 className="text-lg font-semibold mb-2 leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
                      {questions[currentQuestion].question}
                    </h2>
                  </div>
                  <div className="flex-1 overflow-y-auto min-h-0 space-y-2">
                    {questions[currentQuestion].options.map((option) => {
                      const isSelected = answers[questions[currentQuestion].id] === option.value
                      return (
                        <motion.button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className="w-full text-left p-3 rounded-xl border-2 transition-all flex-shrink-0"
                          style={{
                            backgroundColor: isSelected ? 'var(--color-input-bg)' : 'transparent',
                            borderColor: isSelected ? '#E8879E' : 'var(--color-border-soft)',
                            color: 'var(--color-text-body)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{ 
                            borderColor: '#E8879E',
                            backgroundColor: 'var(--color-input-bg)'
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs"
                              style={{
                                backgroundColor: isSelected ? '#E8879E' : 'var(--color-input-bg)',
                                color: isSelected ? 'white' : 'var(--color-text-primary)'
                              }}
                            >
                              {option.label}
                            </div>
                            <p className="flex-1 text-sm leading-relaxed">{option.text}</p>
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full justify-between"
              >
                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-center mb-4">
                    <div className="mb-3">
                      <div className="inline-block px-5 py-2 rounded-full text-2xl font-bold text-white"
                        style={{
                          background: 'linear-gradient(to right, #E8879E, #EC4899)',
                        }}
                      >
                        {score} / 24
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      {result.label}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {result.description}
                    </p>
                  </div>

                  <div 
                    className="p-4 rounded-2xl mb-3"
                    style={{ backgroundColor: 'var(--color-input-bg)' }}
                  >
                    <h3 className="font-semibold mb-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>
                      What this means
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                      This score reflects patterns of emotional availability: how consistently he shows up, engages deeply, creates space for feelings, and maintains emotional presence over time.
                    </p>
                  </div>

                  <div 
                    className="p-4 rounded-2xl"
                    style={{ 
                      backgroundColor: 'var(--color-input-bg)',
                      border: '1px solid rgba(232, 135, 158, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                        More emotionally available than
                      </h3>
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{
                          background: 'linear-gradient(to right, #E8879E, #EC4899)',
                        }}
                      >
                        {percentile.percentage}%
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        of partners
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                      {percentile.message}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={handleBackToHome}
                  className="w-full py-3 rounded-2xl font-semibold text-white shadow-lg flex-shrink-0"
                  style={{
                    background: 'linear-gradient(to right, #E8879E, #EC4899)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back to home
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

