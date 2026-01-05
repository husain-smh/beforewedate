'use client'

import { FeedScreen } from '@/components/FeedScreen'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function FeedContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const categoriesParam = searchParams.get('categories')
    if (categoriesParam) {
      setCategories(categoriesParam.split(',').filter(Boolean))
    }
  }, [searchParams])

  const handleScenarioClick = (scenario: any) => {
    const categoriesParam = categories.length > 0 ? `?categories=${categories.join(',')}` : ''
    router.push(`/scene/${scenario.id}${categoriesParam}`)
  }

  const handleNavigateToCategories = () => {
    const categoriesParam = categories.length > 0 ? `?categories=${categories.join(',')}` : ''
    router.push(`/${categoriesParam}`)
  }

  return (
    <div 
      className="h-screen flex items-center justify-center px-2 py-2 safe-area-inset overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md h-full rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col"
        style={{ backgroundColor: 'var(--color-card-bg)' }}
      >
        <FeedScreen 
          categories={categories} 
          onScenarioClick={handleScenarioClick}
          onNavigateToCategories={handleNavigateToCategories}
        />
      </div>
    </div>
  )
}

export default function FeedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-start justify-center px-2 py-4 md:px-8 md:py-6 safe-area-inset">
        <div className="w-full max-w-md md:max-w-5xl lg:max-w-6xl min-h-screen md:min-h-0 rounded-[40px] md:rounded-[32px] overflow-hidden shadow-2xl relative flex items-center justify-center" style={{ backgroundColor: 'var(--color-card-bg)' }}>
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <FeedContent />
    </Suspense>
  )
}

