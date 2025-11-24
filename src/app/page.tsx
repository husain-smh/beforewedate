'use client'

import { CategoriesScreen } from '@/components/CategoriesScreen'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'

function HomeContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  useEffect(() => {
    const categories = searchParams.get('categories')
    if (categories) {
      setSelectedCategories(categories.split(',').filter(Boolean))
    }
  }, [searchParams])

  const handleContinue = (categories: string[]) => {
    setSelectedCategories(categories)
    router.push('/feed?categories=' + categories.join(','))
  }

  const handleBack = () => {
    if (selectedCategories.length > 0) {
      router.push('/feed?categories=' + selectedCategories.join(','))
    }
  }

  return (
    <div 
      className="h-screen-dynamic flex items-center justify-center p-4 safe-area-inset"
      style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
    >
      <div 
        className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative"
        style={{ 
          backgroundColor: 'var(--color-card-bg)',
          color: 'var(--color-text-primary)'
        }}
      >
        <CategoriesScreen 
          onContinue={handleContinue}
          initialSelected={selectedCategories}
          onBack={selectedCategories.length > 0 ? handleBack : undefined}
        />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <div 
        className="h-screen-dynamic flex items-center justify-center p-4 safe-area-inset"
        style={{ background: 'linear-gradient(to bottom, var(--color-bg-gradient-start), var(--color-bg-gradient-mid), var(--color-bg-gradient-end))' }}
      >
        <div 
          className="w-full max-w-md h-full max-h-screen-dynamic rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-card-bg)' }}
        >
          <div style={{ color: 'var(--color-text-primary)' }}>Loading...</div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

