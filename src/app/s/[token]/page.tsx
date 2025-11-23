'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Send, Heart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ShareData {
  scenario: {
    id: string
    title: string
    category: string
    fullText: string
    tags: string[]
  }
  answers: Array<{
    id: string
    name: string
    perspective: string
    createdAt: string
  }>
}

export default function SharePage() {
  const params = useParams()
  const router = useRouter()
  const [shareData, setShareData] = useState<ShareData | null>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [perspective, setPerspective] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchShare() {
      try {
        const response = await fetch(`/api/share/${params.token}`)
        if (response.ok) {
          const data = await response.json()
          setShareData(data)
        }
      } catch (error) {
        console.error('Error fetching share:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.token) {
      fetchShare()
    }
  }, [params.token])

  const handleSubmit = async () => {
    if (!name.trim() || !perspective.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch(`/api/share/${params.token}/answers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), perspective: perspective.trim(), public: true }),
      })

      if (response.ok) {
        const data = await response.json()
        setShareData(prev => prev ? { ...prev, answers: data.answers } : null)
        setName('')
        setPerspective('')
      }
    } catch (error) {
      console.error('Error submitting answer:', error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
        <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    )
  }

  if (!shareData) {
    return (
      <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
        <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center">
          <div className="text-white text-center px-6">
            <p className="mb-4">Share link not found</p>
            <button
              onClick={() => router.push('/')}
              className="text-pink-400 hover:text-pink-300"
            >
              Go to home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
      <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative">
        <div className="h-full flex flex-col bg-[#0B0B0D] relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-pink-900/5 to-transparent pointer-events-none" />
          
          {/* Header */}
          <div className="relative px-6 pt-14 pb-4 border-b border-white/5 z-20">
            <button 
              onClick={() => router.push('/')}
              className="absolute left-6 top-14 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <h2 className="text-gray-400">Shared Scenario</h2>
            </motion.div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category chip */}
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/15 to-pink-500/15 border border-purple-400/30 mb-4 shadow-sm shadow-purple-500/20">
                <span className="text-purple-300">{shareData.scenario.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-white mb-6 leading-tight">
                {shareData.scenario.title}
              </h1>

              {/* Story */}
              <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#15151a] rounded-3xl p-6 border border-white/5 mb-6 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent rounded-3xl pointer-events-none" />
                <p className="text-[#DAD9E8] leading-[1.75] whitespace-pre-line relative z-10">
                  {shareData.scenario.fullText}
                </p>
              </div>

              {/* Existing Answers */}
              {shareData.answers.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white mb-4">What others think:</h3>
                  {shareData.answers.map((answer, index) => (
                    <motion.div
                      key={answer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                          <span className="text-white text-xs">{answer.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{answer.name}</span>
                      </div>
                      <div className="relative bg-gradient-to-br from-[#1a1a1f] to-[#15151a] rounded-3xl p-5 border border-white/5">
                        <p className="text-[#DAD9E8] leading-[1.7]">{answer.perspective}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add Your Answer Section */}
              <div className="mb-6">
                <h3 className="text-white mb-4">What's your honest take?</h3>
                
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  maxLength={40}
                  className="w-full bg-[#15151a] rounded-2xl border border-white/5 text-[#DAD9E8] placeholder-gray-500 p-3 mb-3 outline-none focus:border-white/10 transition-colors"
                />
                
                <div className="relative bg-[#15151a] rounded-3xl border border-white/5 overflow-hidden shadow-inner">
                  <textarea
                    value={perspective}
                    onChange={(e) => setPerspective(e.target.value)}
                    placeholder="Write your honest take…"
                    maxLength={5000}
                    className="w-full bg-transparent text-[#DAD9E8] placeholder-gray-500 p-4 min-h-[120px] resize-none outline-none"
                    style={{ lineHeight: '1.7' }}
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!perspective.trim() || submitting}
                  className={`relative w-full h-12 rounded-full overflow-hidden mt-4 transition-opacity ${
                    !perspective.trim() || submitting ? 'opacity-40 cursor-not-allowed' : 'shadow-lg shadow-pink-500/20'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-400" />
                  <div className="absolute inset-0 flex items-center justify-center text-white gap-2">
                    <span className="tracking-wide">{submitting ? 'Submitting...' : 'Share your take'}</span>
                    <Send className="w-4 h-4" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

