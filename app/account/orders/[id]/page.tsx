'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Check, Clock, Truck, MapPin, DollarSign } from 'lucide-react'

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const orderId = params.id
  const order = {
    id: orderId,
    date: '2024-03-15',
    status: 'delivered',
    items: [
      { id: 1, name: 'سماعات لاسلكية بلوتوث', price: 299, quantity: 1, image: '/placeholder.svg' },
      { id: 2, name: 'قميص رجالي قطن', price: 199, quantity: 1, image: '/placeholder.svg' },
    ],
    shippingAddress: {
      name: 'أحمد محمد علي',
      phone: '01234567890',
      address: 'شارع النيل، العمارة 5، الشقة 10',
      city: 'الجيزة',
      governorate: 'الجيزة',
    },
    paymentMethod: 'الدفع عند الاستقبال',
    subtotal: 498,
    shipping: 50,
    discount: 0,
    total: 548,
  }

  const statusTimeline = [
    { status: 'ordered', label: 'تم الطلب', date: '2024-03-15 10:30', completed: true },
    { status: 'processing', label: 'قيد التجهيز', date: '2024-03-15 14:00', completed: true },
    { status: 'shipped', label: 'تم الشحن', date: '2024-03-16 08:00', completed: true },
    { status: 'delivered', label: 'تم التسليم', date: '2024-03-17 16:45', completed: true },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" className="mb-4">
              {'← العودة للطلبات'}
            </Button>
            <h1 className="text-3xl font-bold mb-2">تفاصيل الطلب #{orderId}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Timeline */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-lg font-bold mb-6">حالة الطلب</h2>
                <div className="space-y-4">
                  {statusTimeline.map((step, index) => (
                    <div key={step.status} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                          step.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          {step.completed ? <Check className="w-5 h-5" /> : index + 1}
                        </div>
                        {index < statusTimeline.length - 1 && (
                          <div className={`w-1 h-12 mt-2 ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                        )}
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="font-semibold text-lg">{step.label}</p>
                        <p className="text-sm text-muted-foreground">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-lg font-bold mb-4">المنتجات</h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">الكمية: {item.quantity}</span>
                          <span className="font-bold text-primary">{item.price * item.quantity} ج.م</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg border border-border p-6">
                <h2 className="text-lg font-bold mb-4">ملخص الطلب</h2>
                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">السعر الفرعي</span>
                    <span className="font-semibold">{order.subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">التوصيل</span>
                    <span className="font-semibold">{order.shipping} ج.م</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>الخصم</span>
                      <span className="font-semibold">-{order.discount} ج.م</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-primary">{order.total} ج.م</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-3">عنوان الشحن</h3>
                    <p className="font-semibold text-sm mb-2">{order.shippingAddress.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.address}<br/>
                      {order.shippingAddress.city} - {order.shippingAddress.governorate}<br/>
                      {order.shippingAddress.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold mb-2">طريقة الدفع</h3>
                    <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button className="w-full bg-primary text-white hover:bg-primary/90 h-10">
                  تحميل الفاتورة
                </Button>
                <Button variant="outline" className="w-full h-10">
                  إعادة الطلب
                </Button>
                <Button variant="outline" className="w-full h-10 text-red-600 hover:bg-red-50">
                  إرجاع الطلب
                </Button>
              </div>

              {/* Support */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
                <p className="text-sm text-blue-900 mb-3">
                  هل لديك أي استفسار حول هذا الطلب؟
                </p>
                <Button variant="outline" className="w-full text-xs h-9">
                  التواصل مع الدعم
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
