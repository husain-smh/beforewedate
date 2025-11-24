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
      className="h-screen-dynamic flex items-center justify-center px-2 py-4 safe-area-inset"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative"
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
      <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center px-2 py-4 safe-area-inset">
        <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <FeedContent />
    </Suspense>
  )
}

