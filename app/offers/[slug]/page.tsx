'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Star, Heart, ShoppingCart, Clock } from 'lucide-react'
import Image from 'next/image'

const products = [
  {
    id: 1,
    name: 'سماعات بلوتوث لاسلكية',
    price: '₩299',
    originalPrice: '₩499',
    rating: 4.5,
    reviews: 128,
    discount: '-40%',
    image: '/wireless-bluetooth-headphones.jpg',
    timeLeft: '2 أيام'
  },
  {
    id: 2,
    name: 'ساعة ذكية رياضية',
    price: '₩199',
    originalPrice: '₩399',
    rating: 4.8,
    reviews: 256,
    discount: '-50%',
    image: '/smart-sports-watch.jpg',
    timeLeft: '1 يوم'
  },
  {
    id: 3,
    name: 'شاحن لاسلكي سريع',
    price: '₩79',
    originalPrice: '₩149',
    rating: 4.3,
    reviews: 92,
    discount: '-47%',
    image: '/fast-wireless-charger.jpg',
    timeLeft: '3 أيام'
  },
  {
    id: 4,
    name: 'كاميرا ويب HD',
    price: '₩89',
    originalPrice: '₩179',
    rating: 4.6,
    reviews: 174,
    discount: '-50%',
    image: '/hd-webcam.jpg',
    timeLeft: '5 ساعات'
  },
  {
    id: 5,
    name: 'لوحة مفاتيح ميكانيكية',
    price: '₩149',
    originalPrice: '₩299',
    rating: 4.7,
    reviews: 203,
    discount: '-50%',
    image: '/mechanical-keyboard-rgb.jpg',
    timeLeft: '6 ساعات'
  },
  {
    id: 6,
    name: 'ماوس ألعاب RGB',
    price: '₩39',
    originalPrice: '₩79',
    rating: 4.4,
    reviews: 156,
    discount: '-51%',
    image: '/gaming-mouse-rgb.jpg',
    timeLeft: '1 يوم'
  },
]

export default function OffersPage({ params }: { params: { slug: string } }) {
  const offerNames = {
    'flash-deals': 'العروض الفلاش',
    'mega-sale': 'الميجا سيل',
    'daily-deals': 'عروض اليوم',
    'brand-sale': 'عروض العلامات التجارية',
  }

  const offerName = offerNames[params.slug as keyof typeof offerNames] || 'العروض'

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner */}
        <div className="bg-gradient-to-l from-orange-400 to-orange-600 text-white rounded-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-2">{offerName}</h1>
          <p className="text-orange-100 text-lg">اكتشف أفضل الأسعار المحدودة الوقت</p>
        </div>

        {/* Filter & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              الفلترة
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>الأحدث أولاً</option>
              <option>السعر: من الأقل للأعلى</option>
              <option>السعر: من الأعلى للأقل</option>
              <option>الأعلى تقييماً</option>
            </select>
          </div>
          <p className="text-gray-600">عدد المنتجات: <span className="font-bold text-black">{products.length}</span></p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.discount}
                </div>
                <div className="absolute top-2 left-2 flex gap-2">
                  <button className="bg-white rounded-full p-2 hover:bg-gray-100">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white px-3 py-2 flex items-center gap-2 text-xs">
                  <Clock className="w-3 h-3" />
                  {product.timeLeft}
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-black line-clamp-2 mb-2">{product.name}</h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating} ({product.reviews})</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-black">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>

                <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm">
                  أضف للسلة
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-bold">
            تحميل المزيد
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
