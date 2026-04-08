'use client'
import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'سماعات لاسلكية بلوتوث', seller: 'متجر الإلكترونيات الموثوق', price: 299, quantity: 1, image: '/placeholder.svg?height=150&width=150' },
    { id: 2, name: 'قميص رجالي قطن', seller: 'متجر الملابس الفاخرة', price: 199, quantity: 2, image: '/placeholder.svg?height=150&width=150' },
    { id: 3, name: 'ساعة ذكية رياضية', seller: 'متجر الإلكترونيات الموثوق', price: 899, quantity: 1, image: '/placeholder.svg?height=150&width=150' },
  ])
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
    }
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 1500 ? 0 : 50
  const total = subtotal + shipping - discount

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') { setDiscount(subtotal * 0.1) }
    else if (couponCode === 'SAVE20') { setDiscount(subtotal * 0.2) }
    else { setDiscount(0) }
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">سلتك ({cartItems.length} منتج)</h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold mb-2">سلتك فارغة</h2>
            <p className="text-gray-500 mb-4">لم تضف أي منتجات لسلتك بعد</p>
            <Link href="/"><Button>استكشف المتجر</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm flex gap-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.seller}</p>
                    <p className="font-bold mt-1">{item.price} ج.م</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 border rounded flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 border rounded flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                      <button onClick={() => removeItem(item.id)} className="mr-auto text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <p className="font-bold">{item.price * item.quantity} ج.م</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm h-fit space-y-4">
              <h2 className="text-lg font-bold">ملخص الطلب</h2>
              <div className="flex justify-between text-sm"><span>السعر الفرعي</span><span>{subtotal} ج.م</span></div>
              <div className="flex justify-between text-sm"><span>التوصيل</span><span>{shipping === 0 ? 'مجاني' : `${shipping} ج.م`}</span></div>
              {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>الخصم</span><span>-{discount} ج.م</span></div>}
              <div className="flex gap-2">
                <Input placeholder="رمز الخصم" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className="text-sm" />
                <Button variant="outline" onClick={applyCoupon}>تطبيق</Button>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4"><span>الإجمالي</span><span>{total} ج.م</span></div>
              <Link href="/checkout"><Button className="w-full">المتابعة للدفع</Button></Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
