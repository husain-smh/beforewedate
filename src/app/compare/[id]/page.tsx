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
      <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
        <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center">
          <div className="text-white">{loading ? 'Loading...' : 'Scenario not found'}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
      <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative">
        <CompareAnswersScreen
          scenario={scenario}
          userAnswer={userAnswer}
          onBack={handleBack}
        />
      </div>
    </div>
  )
}

