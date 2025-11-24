'use client'

import { DetailScreen } from '@/components/DetailScreen'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface Scenario {
  id: string;
  title: string;
  category: string;
  fullText: string;
  tags?: string[];
  shareCount?: number;
}

export default function ScenePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [scenario, setScenario] = useState<Scenario | null>(null)
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
            fullText: data.fullText,
            tags: data.tags,
            shareCount: data.shareCount,
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
  }, [params.id])

  const handleBack = () => {
    const categories = searchParams.get('categories') || ''
    if (categories) {
      router.push(`/feed?categories=${categories}`)
    } else {
      router.push('/feed')
    }
  }

  const handleAnswerSubmit = (answer: string) => {
    const categories = searchParams.get('categories') || ''
    const queryParams = new URLSearchParams()
    if (categories) queryParams.set('categories', categories)
    queryParams.set('answer', answer)
    
    setTimeout(() => {
      router.push(`/compare/${params.id}?${queryParams.toString()}`)
    }, 1000)
  }

  if (loading || !scenario) {
    return (
      <div 
        className="h-screen-dynamic flex items-center justify-center p-4 safe-area-inset"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        <div 
          className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-card-bg)' }}
        >
          <div style={{ color: 'var(--color-text-primary)' }}>{loading ? 'Loading...' : 'Scenario not found'}</div>
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
        <DetailScreen 
          scenario={scenario}
          onBack={handleBack}
          onAnswerSubmit={handleAnswerSubmit}
        />
      </div>
    </div>
  )
}

