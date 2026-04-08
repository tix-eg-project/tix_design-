'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Star, ChevronDown, Grid3X3, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [viewType, setViewType] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const categoryName = {
    electronics: 'إلكترونيات',
    fashion: 'أزياء',
    home: 'منزل ومطبخ',
    books: 'كتب',
    toys: 'ألعاب',
  }[params.slug] || 'منتجات'

  // Mock products
  const allProducts = Array.from({ length: 48 }, (_, i) => ({
    id: i + 1,
    name: `منتج ${categoryName} ${i + 1}`,
    price: Math.random() * 3000 + 100,
    originalPrice: Math.random() * 4000 + 200,
    discount: Math.floor(Math.random() * 40 + 10),
    rating: Math.floor(Math.random() * 5 + 1),
    reviews: Math.floor(Math.random() * 5000 + 100),
    image: '/placeholder.svg?height=250&width=250',
    brand: ['الماركة أ', 'الماركة ب', 'الماركة ج'][Math.floor(Math.random() * 3)],
  }))

  const itemsPerPage = 20
  const filteredProducts = allProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const totalPages = Math.ceil(allProducts.length / itemsPerPage)

  const handleRatingChange = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
    setCurrentPage(1)
  }

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Category Header */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
            <p className="text-muted-foreground">
              {allProducts.length.toLocaleString('ar-EG')} منتج
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className="w-72 flex-shrink-0">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">تصفية النتائج</h3>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-border">
                  <h4 className="font-semibold text-sm mb-3">نطاق السعر</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-muted-foreground">من</label>
                      <Input 
                        type="number" 
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">إلى</label>
                      <Input 
                        type="number" 
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6 pb-6 border-b border-border">
                  <h4 className="font-semibold text-sm mb-3">التقييم</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox 
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingChange(rating)}
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">فما فوق</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6 pb-6 border-b border-border">
                  <h4 className="font-semibold text-sm mb-3">الماركة</h4>
                  <div className="space-y-2">
                    {['الماركة أ', 'الماركة ب', 'الماركة ج'].map((brand) => (
                      <label key={brand} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox 
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandChange(brand)}
                        />
                        <span className="text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      setPriceRange([0, 5000])
                      setSelectedRatings([])
                      setSelectedBrands([])
                      setCurrentPage(1)
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    إعادة تعيين
                  </Button>
                  <Button className="flex-1 bg-primary text-white hover:bg-primary/90">
                    تطبيق
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="bg-white rounded-lg border border-border p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">الترتيب:</span>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded px-3 py-2 bg-white"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="price-low">السعر: من الأقل للأعلى</option>
                    <option value="price-high">السعر: من الأعلى للأقل</option>
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="popular">الأكثر شيوعاً</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewType('grid')}
                    className={`p-2 rounded ${viewType === 'grid' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-secondary'}`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewType('list')}
                    className={`p-2 rounded ${viewType === 'list' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-secondary'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className={viewType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8' : 'space-y-4 mb-8'}>
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className={`bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow ${
                      viewType === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={viewType === 'list' ? 'w-40 h-40 flex-shrink-0' : 'w-full h-48'}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {product.discount}%
                      </div>
                    )}
                    <div className={viewType === 'list' ? 'flex-1 p-4' : 'p-4'}>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
                      
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

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button 
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  variant="outline"
                  disabled={currentPage === 1}
                >
                  السابق
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded border transition-all ${
                        page === currentPage
                          ? 'bg-primary text-white border-primary'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <Button 
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  variant="outline"
                  disabled={currentPage === totalPages}
                >
                  التالي
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
