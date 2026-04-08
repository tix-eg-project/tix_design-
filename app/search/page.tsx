import { Suspense } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { SearchContent } from './search-content'
import SearchLoading from './loading'

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
