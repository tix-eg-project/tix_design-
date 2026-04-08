'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Heart, Trash2, Star } from 'lucide-react'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'سماعات لاسلكية بلوتوث',
      price: 299,
      originalPrice: 450,
      discount: 34,
      rating: 5,
      reviews: 1250,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 2,
      name: 'ساعة ذكية رياضية',
      price: 899,
      originalPrice: 1200,
      discount: 25,
      rating: 4,
      reviews: 890,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 3,
      name: 'فستان نسائي صيفي',
      price: 349,
      originalPrice: 500,
      discount: 30,
      rating: 5,
      reviews: 450,
      image: '/placeholder.svg?height=200&width=200',
    },
    {
      id: 4,
      name: 'حذاء رياضي للجري',
      price: 599,
      originalPrice: 850,
      discount: 30,
      rating: 5,
      reviews: 780,
      image: '/placeholder.svg?height=200&width=200',
    },
  ])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">المفضلة ({wishlistItems.length} منتج)</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-secondary rounded-full mb-4">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">قائمة المفضلة فارغة</h2>
              <p className="text-muted-foreground mb-6">لم تضف أي منتجات للمفضلة بعد</p>
              <Button className="bg-primary text-white hover:bg-primary/90">
                استكشف المتجر
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-48 bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {item.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        {item.discount}%
                      </div>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-2 left-2 p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors"
                    >
                      <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                    </button>
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{item.name}</h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({item.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-primary">{item.price} ج.م</span>
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice} ج.م</span>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-primary text-white hover:bg-primary/90 text-xs h-9">
                        أضف للسلة
                      </Button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex-1 px-3 py-2 border border-red-200 text-red-600 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
