'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashProduct {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  timeLeft: string
  rating: number
}

export default function FlashDeals() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const flashProducts: FlashProduct[] = [
    {
      id: 1,
      name: "سماعات لاسلكية بلوتوث",
      image: "/wireless-bluetooth-headphones.jpg",
      price: 199,
      originalPrice: 450,
      discount: 56,
      timeLeft: "2:45:30",
      rating: 5,
    },
    {
      id: 2,
      name: "ساعة ذكية رياضية",
      image: "/smart-sports-watch.jpg",
      price: 599,
      originalPrice: 1200,
      discount: 50,
      timeLeft: "1:30:15",
      rating: 4,
    },
    {
      id: 3,
      name: "شاحن لاسلكي سريع",
      image: "/fast-wireless-charger.jpg",
      price: 99,
      originalPrice: 220,
      discount: 55,
      timeLeft: "3:15:45",
      rating: 5,
    },
    {
      id: 4,
      name: "كاميرا ويب عالية الدقة",
      image: "/hd-webcam.jpg",
      price: 249,
      originalPrice: 550,
      discount: 55,
      timeLeft: "2:00:20",
      rating: 4,
    },
    {
      id: 5,
      name: "لوحة مفاتيح ميكانيكية",
      image: "/mechanical-keyboard-rgb.jpg",
      price: 399,
      originalPrice: 850,
      discount: 53,
      timeLeft: "1:45:50",
      rating: 5,
    },
    {
      id: 6,
      name: "ماوس ألعاب احترافي",
      image: "/gaming-mouse-rgb.jpg",
      price: 149,
      originalPrice: 350,
      discount: 57,
      timeLeft: "2:30:10",
      rating: 4,
    },
  ]

  useEffect(() => {
    if (!isAutoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flashProducts.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlay, flashProducts.length])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flashProducts.length)
    setIsAutoPlay(false)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + flashProducts.length) % flashProducts.length)
    setIsAutoPlay(false)
  }

  const visibleProducts = [
    flashProducts[currentIndex],
    flashProducts[(currentIndex + 1) % flashProducts.length],
    flashProducts[(currentIndex + 2) % flashProducts.length],
    flashProducts[(currentIndex + 3) % flashProducts.length],
  ]

  return (
    <section className="bg-gradient-to-r from-red-600 via-orange-600 to-orange-500 py-12 relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-3 animate-bounce">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">عروض فلاش</h2>
            <div className="bg-yellow-300 text-red-700 px-4 py-1 rounded-full font-bold text-sm animate-pulse">
              تخفيضات تصل لـ 60%
            </div>
          </div>
          
          <div className="text-white text-center">
            <p className="text-xs opacity-80">ينتهي خلال</p>
            <p className="text-2xl font-bold font-mono">02:45:30</p>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {visibleProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                className="bg-white rounded-xl overflow-hidden shadow-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                {/* Image Container */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-red-600 text-white rounded-lg px-3 py-1 font-bold text-sm shadow-lg">
                    -{product.discount}%
                  </div>

                  {/* Flash Badge */}
                  <div className="absolute top-3 left-3 bg-yellow-400 text-red-700 rounded-full p-2 animate-pulse">
                    <Zap className="h-4 w-4" />
                  </div>

                  {/* Time Left */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-white text-xs font-semibold text-center">ينتهي خلال {product.timeLeft}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 text-sm">{product.name}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < product.rating ? 'text-yellow-400' : 'text-gray-300'}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.rating})</span>
                  </div>

                  {/* Prices */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-red-600">{product.price} ر.س</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice} ر.س</span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold hover:from-red-700 hover:to-orange-700 rounded-lg">
                    أضف للسلة الآن
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={handlePrev}
              className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 border border-white/30"
              size="icon"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 border border-white/30"
              size="icon"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {flashProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  setIsAutoPlay(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex % flashProducts.length
                    ? 'bg-white w-8'
                    : 'bg-white/40 w-2 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
