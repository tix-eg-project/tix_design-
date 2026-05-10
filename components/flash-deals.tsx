'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Zap, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashProduct {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
}

export default function FlashDeals() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 45, seconds: 12 })

  const flashProducts: FlashProduct[] = [
    {
      id: 1,
      name: "سماعات لاسلكية بلوتوث",
      image: "/wireless-bluetooth-headphones.jpg",
      price: 149,
      originalPrice: 350,
      discount: 57,
      rating: 5,
    },
    {
      id: 2,
      name: "ساعة ذكية رياضية",
      image: "/smart-sports-watch.jpg",
      price: 499,
      originalPrice: 999,
      discount: 50,
      rating: 5,
    },
    {
      id: 3,
      name: "شاحن لاسلكي سريع",
      image: "/fast-wireless-charger.jpg",
      price: 89,
      originalPrice: 200,
      discount: 55,
      rating: 5,
    },
    {
      id: 4,
      name: "كاميرا ويب عالية الدقة",
      image: "/hd-webcam.jpg",
      price: 199,
      originalPrice: 450,
      discount: 55,
      rating: 4,
    },
    {
      id: 5,
      name: "لوحة مفاتيح ميكانيكية",
      image: "/mechanical-keyboard-rgb.jpg",
      price: 349,
      originalPrice: 750,
      discount: 53,
      rating: 5,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) seconds--
        else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashProducts.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flashProducts.length) % flashProducts.length)
  }

  const visibleProducts = [
    flashProducts[currentIndex],
    flashProducts[(currentIndex + 1) % flashProducts.length],
    flashProducts[(currentIndex + 2) % flashProducts.length],
    flashProducts[(currentIndex + 3) % flashProducts.length],
    flashProducts[(currentIndex + 4) % flashProducts.length],
  ]

  return (
    <section style={{ backgroundColor: '#E7010B' }} className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: '#c70008' }} className="rounded-full p-2">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">عروض الفلاش</h2>
          </div>
          
          {/* Time Countdown */}
          <div className="text-white text-right">
            <p className="text-xs mb-1" style={{ color: '#ffcccc' }}>ينتهي خلال</p>
            <div className="flex gap-2 justify-end font-mono text-xl font-bold">
              <span style={{ backgroundColor: '#c70008' }} className="px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span style={{ color: '#ffcccc' }}>:</span>
              <span style={{ backgroundColor: '#c70008' }} className="px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span style={{ color: '#ffcccc' }}>:</span>
              <span style={{ backgroundColor: '#c70008' }} className="px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-sm font-semibold mb-6" style={{ color: '#ffe6e6' }}>خصومات تصل إلى 70% لفترة محدودة</p>

        {/* Products Carousel */}
        <div className="relative">
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 justify-center lg:justify-start">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-48 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  {/* Image Container */}
                  <div className="relative h-40 bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Discount Badge */}
                    <div className="absolute top-2 right-2 bg-red-600 text-white rounded px-2 py-1 font-bold text-xs">
                      {product.discount}%
                    </div>

                    {/* Heart Icon */}
                    <button className="absolute top-2 left-2 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-4 w-4 text-red-600" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-xs">{product.name}</h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={i < product.rating ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prices */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-red-600">{product.price}</span>
                      <span className="text-xs text-gray-500 line-through">{product.originalPrice}</span>
                    </div>

                    {/* Add to Cart Button */}
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold text-xs py-2 rounded">
                      أضف للسلة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white hover:bg-gray-200 rounded-full p-2 shadow-lg z-10"
          >
            <ChevronRight className="h-5 w-5 text-black" />
          </button>

          <button
            onClick={handleNext}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white hover:bg-gray-200 rounded-full p-2 shadow-lg z-10"
          >
            <ChevronLeft className="h-5 w-5 text-black" />
          </button>
        </div>
      </div>
    </section>
  )
}
