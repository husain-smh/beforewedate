'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Question {
  id: number
  question: string
  options: {
    label: string
    value: 'A' | 'B' | 'C' | 'D'
    text: string
  }[]
  insight?: string
}

const questions: Question[] = [
  {
    id: 1,
    question: 'When something needs to be done (planning, remembering, fixing), what usually happens?',
    options: [
      { label: 'A', value: 'A', text: 'He notices and does it without prompting' },
      { label: 'B', value: 'B', text: 'He does it after being asked' },
      { label: 'C', value: 'C', text: 'He does it inconsistently or partially' },
      { label: 'D', value: 'D', text: 'I mostly handle it' }
    ],
    insight: 'High predictive power. This correlates strongly with real-world egalitarianism.'
  },
  {
    id: 2,
    question: 'When you\'re upset with him, his first reaction is usually:',
    options: [
      { label: 'A', value: 'A', text: 'Listening and trying to understand' },
      { label: 'B', value: 'B', text: 'Explaining himself immediately' },
      { label: 'C', value: 'C', text: 'Getting defensive or dismissive' },
      { label: 'D', value: 'D', text: 'Minimizing or mocking the issue' }
    ],
    insight: 'Measures ego fragility + accountability.'
  },
  {
    id: 3,
    question: 'When your choices inconvenience him (career, clothes, friends, time):',
    options: [
      { label: 'A', value: 'A', text: 'He supports them even if uncomfortable' },
      { label: 'B', value: 'B', text: 'He supports them but complains' },
      { label: 'C', value: 'C', text: 'He subtly discourages them' },
      { label: 'D', value: 'D', text: 'He directly tries to stop or guilt me' }
    ],
    insight: 'This detects control masked as concern.'
  },
  {
    id: 4,
    question: 'How does he usually talk about women he\'s not attracted to?',
    options: [
      { label: 'A', value: 'A', text: 'As individuals, without stereotypes' },
      { label: 'B', value: 'B', text: 'Neutrally, but with some respect' },
      { label: 'C', value: 'C', text: 'With stereotypes or jokes' },
      { label: 'D', value: 'D', text: 'With open disrespect or contempt' }
    ],
    insight: 'Strong signal for baseline misogyny.'
  },
  {
    id: 5,
    question: 'If you say no (sex, intimacy, affection):',
    options: [
      { label: 'A', value: 'A', text: 'He accepts it without pressure' },
      { label: 'B', value: 'B', text: 'He accepts it but is a bit resentful/upset' },
      { label: 'C', value: 'C', text: 'He tries to negotiate or guilt' },
      { label: 'D', value: 'D', text: 'He ignores or pushes past it' }
    ],
    insight: 'One of the strongest predictors of feminist behavior.'
  },
  {
    id: 6,
    question: 'Is his respect toward you consistent when others are around?',
    options: [
      { label: 'A', value: 'A', text: 'Same or better in public' },
      { label: 'B', value: 'B', text: 'Same overall' },
      { label: 'C', value: 'C', text: 'Worse in private' },
      { label: 'D', value: 'D', text: 'Worse in public' }
    ],
    insight: 'Filters out performative allyship.'
  },
  {
    id: 7,
    question: 'When other men say sexist things around him:',
    options: [
      { label: 'A', value: 'A', text: 'He challenges or shuts it down' },
      { label: 'B', value: 'B', text: 'He changes the topic' },
      { label: 'C', value: 'C', text: 'He stays silent' },
      { label: 'D', value: 'D', text: 'He joins in' }
    ],
    insight: 'This captures costly signaling — the gold standard.'
  },
  {
    id: 8,
    question: 'When you succeed or know more than him:',
    options: [
      { label: 'A', value: 'A', text: 'He amplifies and credits you' },
      { label: 'B', value: 'B', text: 'He acknowledges it neutrally' },
      { label: 'C', value: 'C', text: 'He downplays it' },
      { label: 'D', value: 'D', text: 'He competes or undermines' }
    ],
    insight: 'Measures status insecurity, a core variable.'
  }
]

const scoreRanges = [
  { min: 19, max: 24, label: 'Practicing feminist behavior', description: 'Rare, high-signal. He consistently demonstrates egalitarian behavior through actions, not just words.' },
  { min: 13, max: 18, label: 'Selective / situational ally', description: 'He shows feminist behavior in some contexts but not others. Inconsistent application.' },
  { min: 7, max: 12, label: 'Feminist in name or intent only', description: 'He may say the right things, but his actions don\'t consistently match his stated values.' },
  { min: 0, max: 6, label: 'Actively patriarchal behavior', description: 'His behavior consistently reflects traditional gender roles and power imbalances.' }
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
  if (score > 20) {
    return {
      percentage: '87.5',
      message: 'Among the most gender-egalitarian men. Very few men consistently show equal behavior across all domains like this.'
    }
  } else if (score >= 18) {
    return {
      percentage: '75',
      message: 'More egalitarian than average. He likely shows above-average support for equality and acts on it consistently.'
    }
  } else if (score >= 14) {
    return {
      percentage: '50',
      message: 'Moderate egalitarian behavior. He\'s around or above average compared to most men in gender equality attitudes and actions.'
    }
  } else if (score >= 10) {
    return {
      percentage: '25',
      message: 'Slightly below average behaviorally. Many men behave more egalitarian than him, though he may still hold some equality attitudes.'
    }
  } else if (score >= 6) {
    return {
      percentage: '12.5',
      message: 'Below typical egalitarian behavior. He may claim to support equality but doesn\'t consistently translate that to actions.'
    }
  } else {
    return {
      percentage: '0',
      message: 'Among the least egalitarian behaviors. His actions consistently reflect traditional gender roles and power imbalances.'
    }
  }
}

export default function FeministTestPage() {
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
                Is he really a feminist?
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
                  background: 'linear-gradient(to right, #F472B6, #EC4899)',
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
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-body)' }}>
                      Answer based on <strong>what he actually does</strong> — not what he says, not what you hope, not his "potential". If you're unsure, pick the option that happens more often.
                    </p>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    This test measures behavior, not beliefs. We're looking at power-sharing, response to autonomy, reactions under ego threat, and consistency when no reward exists.
                  </p>
                </div>
                <motion.button
                  onClick={handleStart}
                  className="w-full py-3 rounded-2xl font-semibold text-white shadow-lg flex-shrink-0"
                  style={{
                    background: 'linear-gradient(to right, #F472B6, #EC4899)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Start the test
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
                    {questions[currentQuestion].insight && (
                      <p className="text-xs italic" style={{ color: 'var(--color-text-muted)' }}>
                        {questions[currentQuestion].insight}
                      </p>
                    )}
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
                            borderColor: isSelected ? '#F472B6' : 'var(--color-border-soft)',
                            color: 'var(--color-text-body)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          whileHover={{ 
                            borderColor: '#F472B6',
                            backgroundColor: 'var(--color-input-bg)'
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs"
                              style={{
                                backgroundColor: isSelected ? '#F472B6' : 'var(--color-input-bg)',
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
                          background: 'linear-gradient(to right, #F472B6, #EC4899)',
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
                      This score is based on behavioral patterns, not stated beliefs. Remember: actions speak louder than words, and consistency matters more than perfect moments.
                    </p>
                  </div>

                  <div 
                    className="p-4 rounded-2xl"
                    style={{ 
                      backgroundColor: 'var(--color-input-bg)',
                      border: '1px solid rgba(244, 114, 182, 0.2)'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                        More feminist than
                      </h3>
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                        style={{
                          background: 'linear-gradient(to right, #F472B6, #EC4899)',
                        }}
                      >
                        {percentile.percentage}%
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        of men
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
                    background: 'linear-gradient(to right, #F472B6, #EC4899)',
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

