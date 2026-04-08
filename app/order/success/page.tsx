'use client'

import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { CheckCircle, Truck, Clock, MapPin } from 'lucide-react'

export default function OrderSuccessPage() {
  const orderNumber = 'TIX-2024-001234'
  const orderDate = new Date().toLocaleDateString('ar-EG')
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-EG')

  const orderItems = [
    { id: 1, name: 'سماعات لاسلكية بلوتوث', price: 299, quantity: 1 },
    { id: 2, name: 'قميص رجالي قطن', price: 199, quantity: 2 },
  ]

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">شكراً لك!</h1>
            <p className="text-xl text-muted-foreground mb-2">تم استلام طلبك بنجاح</p>
            <p className="text-lg text-primary font-semibold">رقم الطلب: {orderNumber}</p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Order Summary Card */}
            <div className="bg-white rounded-lg border border-border p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">تاريخ الطلب</p>
                    <p className="font-semibold text-lg">{orderDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-muted-foreground">التسليم المتوقع</p>
                    <p className="font-semibold text-lg">{estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h2 className="font-bold text-lg mb-4">ملخص الطلب</h2>
                <div className="space-y-3 mb-4">
                  {orderItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm pb-2 border-b border-border">
                      <span>
                        {item.name}
                        {item.quantity > 1 && ` x${item.quantity}`}
                      </span>
                      <span className="font-semibold">{item.price * item.quantity} ج.م</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">السعر الفرعي</span>
                    <span>{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التوصيل</span>
                    <span>{shipping} ج.م</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>الإجمالي</span>
                  <span className="text-primary">{total} ج.م</span>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-lg border border-border p-8 mb-8">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-2">عنوان الشحن</h3>
                  <p className="text-muted-foreground">
                    أحمد محمد علي<br/>
                    شارع النيل، العمارة 5، الشقة 10<br/>
                    الجيزة - مصر<br/>
                    01234567890
                  </p>
                </div>
              </div>
            </div>

            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg border border-border p-8 mb-8">
              <h3 className="font-bold text-lg mb-6">حالة الطلب</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-green-600"></div>
                  <div className="flex-1">
                    <p className="font-semibold">تم استقبال الطلب</p>
                    <p className="text-sm text-muted-foreground">{orderDate}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-muted-foreground">قيد التجهيز</p>
                    <p className="text-sm text-muted-foreground">سيتم تجهيز طلبك قريباً</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-muted-foreground">تم الشحن</p>
                    <p className="text-sm text-muted-foreground">سيتم إخبارك عند شحن طلبك</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                  <div className="flex-1">
                    <p className="font-semibold text-muted-foreground">تم التسليم</p>
                    <p className="text-sm text-muted-foreground">التسليم المتوقع: {estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-primary text-white hover:bg-primary/90 h-12 font-semibold">
                تتبع طلبك
              </Button>
              <Button variant="outline" className="flex-1 h-12 font-semibold">
                متابعة التسوق
              </Button>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 text-right">
              <h4 className="font-semibold mb-2 text-blue-900">معلومات مهمة</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• سيتم إرسال رابط التتبع إلى بريدك الإلكتروني</li>
                <li>• تأكد من رقم هاتفك للتواصل أثناء التسليم</li>
                <li>• الدفع عند الاستقبال متاح عند التسليم</li>
                <li>• في حالة أي استفسار، تواصل معنا عبر الدعم الفني</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
