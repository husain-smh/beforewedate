'use client'

import { CompareAnswersScreen } from '@/components/CompareAnswersScreen'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Scenario {
  id: string;
  title: string;
  category: string;
}

export default function ComparePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [scenario, setScenario] = useState<Scenario | null>(null)
  const [userAnswer, setUserAnswer] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchScenario() {
      try {
        const response = await fetch(`/api/scenarios/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setScenario({
            id: data.id,
            title: data.title,
            category: data.category,
          })
        }
      } catch (error) {
        console.error('Error fetching scenario:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchScenario()
    }
    
    const answer = searchParams.get('answer')
    if (answer) {
      setUserAnswer(decodeURIComponent(answer))
    }
  }, [params.id, searchParams])

  const handleBack = () => {
    const categories = searchParams.get('categories') || ''
    if (categories) {
      router.push(`/feed?categories=${categories}`)
    } else {
      router.push('/feed')
    }
  }

  if (loading || !scenario) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8 safe-area-inset"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        <div 
          className="w-full max-w-md md:max-w-2xl lg:max-w-4xl h-full min-h-screen md:min-h-[600px] md:max-h-[800px] lg:max-h-[900px] rounded-[40px] md:rounded-[32px] overflow-hidden shadow-2xl relative flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-card-bg)' }}
        >
          <div style={{ color: 'var(--color-text-primary)' }}>{loading ? 'Loading...' : 'Scenario not found'}</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8 safe-area-inset"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md md:max-w-2xl lg:max-w-4xl h-full min-h-screen md:min-h-[600px] md:max-h-[800px] lg:max-h-[900px] rounded-[40px] md:rounded-[32px] overflow-hidden shadow-2xl relative"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <CompareAnswersScreen
          scenario={scenario}
          userAnswer={userAnswer}
          onBack={handleBack}
        />
      </div>
    </div>
  )
}

