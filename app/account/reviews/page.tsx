'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Star, CheckCircle } from 'lucide-react'
import { getAuthToken } from '@/lib/auth'

interface Review {
  id: string
  orderId: string
  product: string
  rating: number
  comment: string
  isReviewed: boolean
  date?: string
  image: string
}

const DEMO_REVIEWS: Review[] = [
  {
    id: '1',
    orderId: '1001',
    product: 'سماعات لاسلكية',
    rating: 4,
    comment: 'منتج ممتاز وجودة عالية',
    isReviewed: true,
    date: '2024-03-17',
    image: '/wireless-bluetooth-headphones.jpg',
  },
  {
    id: '2',
    orderId: '1002',
    product: 'ساعة ذكية',
    rating: 0,
    comment: '',
    isReviewed: false,
    image: '/smart-sports-watch.jpg',
  },
  {
    id: '3',
    orderId: '1003',
    product: 'شاحن لاسلكي',
    rating: 0,
    comment: '',
    isReviewed: false,
    image: '/fast-wireless-charger.jpg',
  },
]

export default function ReviewsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [reviews, setReviews] = useState<Review[]>(DEMO_REVIEWS)
  const [expandedReview, setExpandedReview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
  })

  useEffect(() => {
    const user = getAuthToken()
    if (!user) {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router])

  const handleReviewSubmit = (reviewId: string) => {
    if (formData.rating === 0) {
      alert('يرجى اختيار تقييم')
      return
    }

    const updatedReviews = reviews.map((r) =>
      r.id === reviewId
        ? {
            ...r,
            rating: formData.rating,
            comment: formData.comment,
            isReviewed: true,
            date: new Date().toLocaleDateString('ar-EG'),
          }
        : r
    )

    setReviews(updatedReviews)
    setExpandedReview(null)
    setFormData({ rating: 0, comment: '' })
  }

  const handleEditReview = (review: Review) => {
    setExpandedReview(review.id)
    setFormData({
      rating: review.rating,
      comment: review.comment,
    })
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">جاري التحميل...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/account" className="text-primary hover:underline">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">تقييم المنتجات</h1>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg border border-border p-6">
                {/* Product Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src={review.image} alt={review.product} className="w-full h-full object-contain p-2" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{review.product}</h3>
                      <span className="text-xs text-muted-foreground">طلب #{review.orderId}</span>
                    </div>

                    {review.isReviewed ? (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                        <p className="text-sm">{review.comment}</p>
                        <Button
                          onClick={() => handleEditReview(review)}
                          variant="outline"
                          size="sm"
                          className="mt-3"
                        >
                          تعديل التقييم
                        </Button>
                      </div>
                    ) : expandedReview === review.id ? (
                      <form className="space-y-4">
                        {/* Rating Stars */}
                        <div>
                          <label className="block text-sm font-semibold mb-2">التقييم</label>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setFormData({ ...formData, rating: star })}
                                className="focus:outline-none transition-transform hover:scale-110"
                              >
                                <Star
                                  className={`w-6 h-6 ${
                                    star <= formData.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Comment */}
                        <div>
                          <label className="block text-sm font-semibold mb-2">تعليقك (اختياري)</label>
                          <Textarea
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                            placeholder="شارك رأيك حول المنتج..."
                            className="text-sm resize-none"
                            rows={4}
                          />
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            onClick={() => handleReviewSubmit(review.id)}
                            className="flex-1 bg-primary text-white hover:bg-primary/90"
                          >
                            إرسال التقييم
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setExpandedReview(null)
                              setFormData({ rating: 0, comment: '' })
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            إلغاء
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <Button
                        onClick={() => {
                          setExpandedReview(review.id)
                          setFormData({ rating: 0, comment: '' })
                        }}
                        className="bg-primary text-white hover:bg-primary/90 mt-2"
                      >
                        قيّم الآن
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {reviews.every((r) => r.isReviewed) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-700 font-semibold">شكراً لتقييمك! آراؤك تساعدنا على التحسن</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
