'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { CartItem } from '@/lib/types'

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart', {
        headers: {
          'x-user-id': '1',
        },
      })
      const { data } = await res.json()
      setCartItems(data || [])
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'x-user-id': '1',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })
      setCartItems(cartItems.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error('Failed to remove item:', error)
    }
  }
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'سماعات لاسلكية بلوتوث',
      seller: 'متجر الإلكترونيات الموثوق',
      price: 299,
      quantity: 1,
      image: '/placeholder.svg?height=150&width=150',
    },
    {
      id: 2,
      name: 'قميص رجالي قطن',
      seller: 'متجر الملابس الفاخرة',
      price: 199,
      quantity: 2,
      image: '/placeholder.svg?height=150&width=150',
    },
    {
      id: 3,
      name: 'ساعة ذكية رياضية',
      seller: 'متجر الإلكترونيات الموثوق',
      price: 899,
      quantity: 1,
      image: '/placeholder.svg?height=150&width=150',
    },
  ])
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 1500 ? 0 : 50
  const total = subtotal + shipping - discount

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setDiscount(subtotal * 0.1)
    } else if (couponCode === 'SAVE20') {
      setDiscount(subtotal * 0.2)
    } else {
      setDiscount(0)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">سلتك ({cartItems.length} منتج)</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Product Suggestions */}
          {cartItems.length > 0 && (
            <div className="mb-8 bg-white rounded-lg border border-border p-6">
              <h2 className="text-lg font-bold mb-4">اقتراحات المنتجات</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="border border-border rounded-lg p-3 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="bg-gray-100 rounded h-32 mb-2 flex items-center justify-center">
                      <div className="text-gray-400">صورة المنتج</div>
                    </div>
                    <p className="text-xs font-semibold mb-1">منتج مقترح {i}</p>
                    <p className="text-sm font-bold text-primary">299 ج.م</p>
                    <Button className="w-full mt-2 bg-primary text-white hover:bg-primary/90 h-8 text-xs">إضافة</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-2">سلتك فارغة</h2>
              <p className="text-muted-foreground mb-6">لم تضف أي منتجات لسلتك بعد</p>
              <Button className="bg-primary text-white hover:bg-primary/90">
                استكشف المتجر
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-border overflow-hidden">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`p-4 flex gap-4 ${index !== cartItems.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.seller}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">{item.price} ج.م</span>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-between">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">الكمية</p>
                          <div className="flex items-center gap-1 border border-border rounded">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-secondary"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-secondary"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground mb-1">الإجمالي</p>
                          <span className="font-bold">{item.price * item.quantity} ج.م</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
                  <h2 className="text-lg font-bold mb-4">ملخص الطلب</h2>

                  <div className="space-y-3 mb-4 pb-4 border-b border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">السعر الفرعي</span>
                      <span className="font-semibold">{subtotal} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">التوصيل</span>
                      <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                        {shipping === 0 ? 'مجاني' : `${shipping} ج.م`}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">الخصم</span>
                        <span className="font-semibold text-green-600">-{discount} ج.م</span>
                      </div>
                    )}
                  </div>

                  {/* Coupon Section */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-xs text-muted-foreground mb-2">هل لديك رمز الخصم؟</p>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="أدخل الرمز"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="text-sm"
                      />
                      <Button 
                        onClick={applyCoupon}
                        variant="outline"
                        className="text-xs"
                      >
                        تطبيق
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between mb-6 pb-6 border-b border-border">
                    <span className="font-bold">الإجمالي</span>
                    <span className="text-2xl font-bold text-primary">{total} ج.م</span>
                  </div>

                  <Button className="w-full bg-green-600 text-white hover:bg-green-700 h-12 font-semibold text-base">
                    المتابعة للدفع
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-4">
                    الدفع آمن وسري بموجب تصريح SSL
                  </p>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs font-semibold text-gray-700 mb-3">جميع طرق الدفع متاحة</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="px-3 py-2 bg-secondary rounded text-xs text-center">دفع بالفيزا</div>
                      <div className="px-3 py-2 bg-secondary rounded text-xs text-center">دفع عند الاستقبال</div>
                      <div className="px-3 py-2 bg-secondary rounded text-xs text-center">فوري</div>
                      <div className="px-3 py-2 bg-secondary rounded text-xs text-center">فودافون كاش</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
