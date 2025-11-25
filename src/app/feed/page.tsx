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
      className="min-h-screen flex items-center justify-center px-2 py-4 md:p-6 lg:p-8 safe-area-inset"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md md:max-w-2xl lg:max-w-4xl h-full min-h-screen md:min-h-[600px] md:max-h-[800px] lg:max-h-[900px] rounded-[40px] md:rounded-[32px] overflow-hidden shadow-2xl relative"
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
      <div className="min-h-screen flex items-center justify-center px-2 py-4 md:p-6 lg:p-8 safe-area-inset">
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-4xl h-full min-h-screen md:min-h-[600px] md:max-h-[800px] lg:max-h-[900px] rounded-[40px] md:rounded-[32px] overflow-hidden shadow-2xl relative flex items-center justify-center" style={{ backgroundColor: 'var(--color-card-bg)' }}>
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <FeedContent />
    </Suspense>
  )
}

