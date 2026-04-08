'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Star, Heart, Share2 } from 'lucide-react'

export default function SellerStorePage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState('products')
  const [isFollowing, setIsFollowing] = useState(false)

  const seller = {
    name: 'متجر الإلكترونيات الموثوق',
    slug: params.slug,
    avatar: '/placeholder.svg?height=150&width=150',
    banner: '/placeholder.svg?height=300&width=1200',
    rating: 4.8,
    reviews: 5420,
    verified: true,
    productsCount: 1250,
    satisfactionRate: 98,
    description: 'متجر متخصص في بيع الإلكترونيات والأجهزة الذكية بأفضل الأسعار والجودة العالية',
  }

  const products = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `منتج متجر ${seller.name} ${i + 1}`,
    price: Math.random() * 3000 + 100,
    originalPrice: Math.random() * 4000 + 200,
    discount: Math.floor(Math.random() * 40 + 10),
    rating: Math.floor(Math.random() * 5 + 1),
    reviews: Math.floor(Math.random() * 5000 + 100),
    image: '/placeholder.svg?height=250&width=250',
  }))

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Banner */}
        <div className="relative h-64 bg-gray-200 overflow-hidden">
          <img 
            src={seller.banner} 
            alt={seller.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Seller Info */}
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg border border-border -mt-20 relative z-10 p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img 
                src={seller.avatar} 
                alt={seller.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold">{seller.name}</h1>
                  {seller.verified && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      موثق
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{seller.rating}</span>
                    <span className="text-muted-foreground">({seller.reviews.toLocaleString('ar-EG')})</span>
                  </div>
                  <div className="text-muted-foreground">
                    {seller.productsCount.toLocaleString('ar-EG')} منتج
                  </div>
                  <div className="text-muted-foreground">
                    معدل الرضا {seller.satisfactionRate}%
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{seller.description}</p>

                <div className="flex gap-3 flex-wrap">
                  <Button 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={isFollowing ? 'bg-gray-300 hover:bg-gray-400' : 'bg-primary text-white hover:bg-primary/90'}
                  >
                    {isFollowing ? 'متابع' : '+ متابعة المتجر'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex border-b border-border gap-8 mb-6">
              <button
                onClick={() => setActiveTab('products')}
                className={`pb-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                المنتجات
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'about'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                من نحن
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 font-semibold border-b-2 transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground'
                }`}
              >
                التقييمات
              </button>
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
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
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold mb-4">عن المتجر</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {seller.description}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  نحن متخصصون في توفير أحدث الأجهزة الإلكترونية والذكية بأفضل الأسعار والجودة العالية. 
                  نهتم بتجربة العملاء ونقدم خدمة عملاء ممتازة وتوصيل سريع وآمن لجميع محافظات مصر.
                </p>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-xl font-bold mb-6">تقييمات المتجر</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="pb-4 border-b border-border last:border-0">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="font-semibold">محمد أحمد</div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        منتج ممتاز وجودة عالية جداً. التوصيل كان سريع والخدمة رائعة. سأطلب منهم مجدداً.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
