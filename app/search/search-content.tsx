'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Star, Search as SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate search API call
    setTimeout(() => {
      if (query.length > 0) {
        setSearchResults(
          Array.from({ length: 24 }, (_, i) => ({
            id: i + 1,
            name: `نتيجة بحث عن "${query}" - ${i + 1}`,
            price: Math.random() * 3000 + 100,
            originalPrice: Math.random() * 4000 + 200,
            discount: Math.floor(Math.random() * 40 + 10),
            rating: Math.floor(Math.random() * 5 + 1),
            reviews: Math.floor(Math.random() * 5000 + 100),
            image: '/placeholder.svg?height=250&width=250',
            category: ['إلكترونيات', 'أزياء', 'منزل', 'كتب', 'ألعاب'][Math.floor(Math.random() * 5)],
          }))
        )
      }
      setIsLoading(false)
    }, 500)
  }, [query])

  const categories = ['إلكترونيات', 'أزياء', 'منزل ومطبخ', 'كتب', 'ألعاب', 'رياضة', 'جمال', 'أطفال']

  return (
    <>
      {/* Search Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-2">نتائج البحث عن "{query}"</h1>
          <p className="text-muted-foreground">
            {searchResults.length.toLocaleString('ar-EG')} نتيجة
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {searchResults.length === 0 && !isLoading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-full mb-4">
              <SearchIcon className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">لم نجد نتائج</h2>
            <p className="text-muted-foreground mb-8">
              عذراً، لم نتمكن من العثور على منتجات تطابق "{query}". جرب كلمات مفتاحية أخرى.
            </p>

            <div>
              <h3 className="font-semibold mb-4 text-lg">تصفح حسب الفئة:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant="outline"
                    className="hover:bg-primary hover:text-white hover:border-primary"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {searchResults.map((product) => (
                <div 
                  key={product.id}
                  className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-48 bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {product.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-primary font-semibold mb-1">
                      {product.category}
                    </div>
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 h-10">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-primary">{Math.round(product.price)} ج.م</span>
                      <span className="text-sm text-muted-foreground line-through">{Math.round(product.originalPrice)} ج.م</span>
                    </div>

                    <Button className="w-full bg-primary text-white hover:bg-primary/90 text-xs">
                      أضف للسلة
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Results Button */}
            <div className="text-center">
              <Button className="bg-primary text-white hover:bg-primary/90 px-12 h-12">
                عرض جميع النتائج
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
