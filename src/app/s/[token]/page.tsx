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
      <div 
        className="h-screen-dynamic flex items-center justify-center px-2 py-4 safe-area-inset"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        <div 
          className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-card-bg)' }}
        >
          <div style={{ color: 'var(--color-text-primary)' }}>Loading...</div>
        </div>
      </div>
    )
  }

  if (!shareData) {
    return (
      <div 
        className="h-screen-dynamic flex items-center justify-center px-2 py-4 safe-area-inset"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        <div 
          className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-card-bg)' }}
        >
          <div className="text-center px-3" style={{ color: 'var(--color-text-primary)' }}>
            <p className="mb-4">Share link not found</p>
            <button
              onClick={() => router.push('/')}
              style={{ color: 'var(--color-button-primary-start)' }}
            >
              Go to home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="h-screen-dynamic flex items-center justify-center px-2 py-4 safe-area-inset"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <div 
          className="h-full flex flex-col relative overflow-hidden"
          style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
        >
          
          {/* Header */}
          <div className="relative px-6 pt-14 pb-4 z-20">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-2 transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span style={{ fontSize: 'var(--font-size-base)' }}>Back</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category chip */}
              <div 
                className="inline-flex items-center mb-4"
                style={{
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-tag-bg)',
                  border: `1px solid var(--color-tag-border)`
                }}
              >
                <span style={{ 
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-tag-text)'
                }}>
                  {shareData.scenario.category}
                </span>
              </div>

              {/* Title */}
              <h1 
                className="mb-4"
                style={{
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 'var(--font-weight-bold)',
                  color: 'var(--color-text-primary)',
                  lineHeight: 'var(--line-height-tight)'
                }}
              >
                {shareData.scenario.title}
              </h1>

              {/* Story */}
              <p 
                className="mb-6 whitespace-pre-line"
                style={{
                  fontSize: 'var(--font-size-base)',
                  color: 'var(--color-text-body)',
                  lineHeight: 'var(--line-height-relaxed)'
                }}
              >
                {shareData.scenario.fullText}
              </p>

              {/* Existing Answers */}
              {shareData.answers.length > 0 && (
                <div className="mb-6">
                  <h3 
                    className="mb-3"
                    style={{
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--color-text-primary)'
                    }}
                  >
                    What others think:
                  </h3>
                  {shareData.answers.map((answer, index) => (
                    <motion.div
                      key={answer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4"
                      style={{
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: 'var(--color-input-bg)',
                        border: `1px solid var(--color-input-border)`
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="rounded-full flex items-center justify-center"
                          style={{
                            width: '32px',
                            height: '32px',
                            background: 'linear-gradient(135deg, var(--color-icon-circle-start), var(--color-icon-circle-end))'
                          }}
                        >
                          <span style={{ color: 'white', fontSize: 'var(--font-size-xs)' }}>
                            {answer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span style={{ 
                          fontSize: 'var(--font-size-sm)',
                          color: 'var(--color-text-body)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>
                          {answer.name}
                        </span>
                      </div>
                      <p style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-body)',
                        lineHeight: 'var(--line-height-relaxed)'
                      }}>
                        {answer.perspective}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Add Your Answer Section */}
              <div className="mb-4">
                <h3 
                  className="mb-3"
                  style={{
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--color-text-primary)'
                  }}
                >
                  What's your honest take?
                </h3>
                
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  maxLength={40}
                  className="w-full mb-3 outline-none transition-colors"
                  style={{
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-input-bg)',
                    border: `1px solid var(--color-input-border)`,
                    color: 'var(--color-input-text)',
                    fontSize: 'var(--font-size-base)'
                  }}
                />
                
                <textarea
                  value={perspective}
                  onChange={(e) => setPerspective(e.target.value)}
                  placeholder="Write your honest take…"
                  maxLength={5000}
                  className="w-full resize-none outline-none mb-4"
                  style={{
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-input-bg)',
                    border: `1px solid var(--color-input-border)`,
                    color: 'var(--color-input-text)',
                    fontSize: 'var(--font-size-base)',
                    lineHeight: 'var(--line-height-relaxed)',
                    minHeight: '120px'
                  }}
                />

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSubmit}
                  disabled={!perspective.trim() || submitting}
                  className="relative w-full overflow-hidden transition-all duration-300"
                  style={{
                    height: '56px',
                    borderRadius: 'var(--radius-full)',
                    background: (!perspective.trim() || submitting)
                      ? 'linear-gradient(135deg, #E5E7EB, #D1D5DB)'
                      : 'linear-gradient(135deg, var(--color-button-primary-start), var(--color-button-primary-end))',
                    boxShadow: (!perspective.trim() || submitting) ? 'none' : 'var(--shadow-lg)',
                    opacity: (!perspective.trim() || submitting) ? 0.5 : 1,
                    cursor: (!perspective.trim() || submitting) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--spacing-sm)'
                  }}
                >
                  <span style={{
                    color: 'var(--color-button-text)',
                    fontSize: 'var(--font-size-base)',
                    fontWeight: 'var(--font-weight-semibold)'
                  }}>
                    {submitting ? 'Submitting...' : 'Share your take'}
                  </span>
                  <Send className="w-5 h-5" style={{ color: 'var(--color-button-text)' }} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

