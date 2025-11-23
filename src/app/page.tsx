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
    <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
      <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative">
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
      <div className="h-screen-dynamic bg-[#0B0B0D] flex items-center justify-center p-4 safe-area-inset">
        <div className="w-full max-w-md h-full max-h-screen-dynamic bg-[#0B0B0D] rounded-[40px] overflow-hidden shadow-2xl relative flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}

