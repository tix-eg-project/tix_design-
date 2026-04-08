'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Check } from 'lucide-react'
import type { Address } from '@/lib/types'

async function createOrder(
  items: any[],
  shippingAddress: Address,
  paymentMethod: string,
  total: number
) {
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'x-user-id': '1',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items,
      shippingAddress,
      paymentMethod,
      total,
      subtotal: total,
      shipping: 0,
      discount: 0,
    }),
  })
  return res.json()
}

export default function CheckoutPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    governorate: '',
    city: '',
    address: '',
    paymentMethod: 'cod',
  })

  const governorates = [
    'القاهرة', 'الجيزة', 'الإسكندرية', 'الإسماعيلية', 'الشرقية',
    'الدقهلية', 'الغربية', 'المنوفية', 'البحيرة', 'كفر الشيخ',
    'الفيوم', 'الوادي الجديد', 'المنيا', 'أسيوط', 'سوهاج',
    'قنا', 'الأقصر', 'أسوان', 'جنوب سيناء', 'شمال سيناء', 'البحر الأحمر'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const cartItems = [
    { id: 1, name: 'سماعات لاسلكية بلوتوث', price: 299, quantity: 1 },
    { id: 2, name: 'قميص رجالي قطن', price: 199, quantity: 2 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 50
  const total = subtotal + shipping

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">الدفع والتسليم</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-2 ${
                        step <= currentStep ? 'bg-primary' : 'bg-gray-300'
                      }`}>
                        {step < currentStep ? <Check className="w-6 h-6" /> : step}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {step === 1 && 'بيانات الشحن'}
                          {step === 2 && 'طريقة الدفع'}
                          {step === 3 && 'مراجعة الطلب'}
                        </p>
                      </div>
                      {step < 3 && (
                        <div className={`h-1 flex-1 mr-2 ${step < currentStep ? 'bg-primary' : 'bg-gray-300'}`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 1: Shipping Info */}
              {currentStep === 1 && (
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6">بيانات الشحن</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">الاسم الكامل *</label>
                        <Input 
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="أدخل اسمك الكامل"
                          className="text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">البريد الإلكتروني *</label>
                        <Input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your@email.com"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">رقم الهاتف *</label>
                      <Input 
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+20 1XX XXX XXXX"
                        className="text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">المحافظة *</label>
                        <select 
                          value={formData.governorate}
                          onChange={(e) => handleInputChange('governorate', e.target.value)}
                          className="w-full border border-border rounded px-3 py-2 text-sm bg-white"
                        >
                          <option value="">اختر المحافظة</option>
                          {governorates.map(gov => (
                            <option key={gov} value={gov}>{gov}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">المدينة *</label>
                        <Input 
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="أدخل المدينة"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">العنوان *</label>
                      <Input 
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="أدخل العنوان بالتفصيل (الشارع والرقم والبناء)"
                        className="text-sm"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleNextStep}
                    className="w-full bg-primary text-white hover:bg-primary/90 h-12 mt-6 font-semibold"
                  >
                    التالي: اختر طريقة الدفع
                  </Button>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6">طريقة الدفع</h2>

                  <div className="space-y-3 mb-6">
                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                           style={{ borderColor: formData.paymentMethod === 'cod' ? '#FF8C00' : '' }}>
                      <RadioGroupItem value="cod" checked={formData.paymentMethod === 'cod'} />
                      <div className="mr-4">
                        <p className="font-semibold">الدفع عند الاستقبال</p>
                        <p className="text-sm text-muted-foreground">ادفع عند استقبال طلبك</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                           style={{ borderColor: formData.paymentMethod === 'credit' ? '#FF8C00' : '' }}>
                      <RadioGroupItem value="credit" checked={formData.paymentMethod === 'credit'} />
                      <div className="mr-4">
                        <p className="font-semibold">بطاقة ائتمان/خصم</p>
                        <p className="text-sm text-muted-foreground">فيزا أو ماستركارد</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                           style={{ borderColor: formData.paymentMethod === 'vodafone' ? '#FF8C00' : '' }}>
                      <RadioGroupItem value="vodafone" checked={formData.paymentMethod === 'vodafone'} />
                      <div className="mr-4">
                        <p className="font-semibold">محفظة فودافون كاش</p>
                        <p className="text-sm text-muted-foreground">ادفع من رصيد فودافون</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                           style={{ borderColor: formData.paymentMethod === 'fawry' ? '#FF8C00' : '' }}>
                      <RadioGroupItem value="fawry" checked={formData.paymentMethod === 'fawry'} />
                      <div className="mr-4">
                        <p className="font-semibold">فوري</p>
                        <p className="text-sm text-muted-foreground">ادفع عن طريق فوري</p>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handlePreviousStep}
                      variant="outline"
                      className="flex-1 h-12 font-semibold"
                    >
                      السابق
                    </Button>
                    <Button 
                      onClick={handleNextStep}
                      className="flex-1 bg-primary text-white hover:bg-primary/90 h-12 font-semibold"
                    >
                      التالي: مراجعة الطلب
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {currentStep === 3 && (
                <div className="bg-white rounded-lg border border-border p-6 mb-6">
                  <h2 className="text-2xl font-bold mb-6">مراجعة الطلب</h2>

                  <div className="space-y-6 mb-6">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="font-semibold mb-2">عنوان الشحن</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.fullName} • {formData.phone}<br/>
                        {formData.address}, {formData.city}, {formData.governorate}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-semibold mb-2">طريقة الدفع</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.paymentMethod === 'cod' && 'الدفع عند الاستقبال'}
                        {formData.paymentMethod === 'credit' && 'بطاقة ائتمان/خصم'}
                        {formData.paymentMethod === 'vodafone' && 'محفظة فودافون كاش'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={handlePreviousStep}
                      variant="outline"
                      className="flex-1 h-12 font-semibold"
                    >
                      السابق
                    </Button>
                    <Button 
                      className="flex-1 bg-green-600 text-white hover:bg-green-700 h-12 font-semibold"
                    >
                      تأكيد الطلب
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
                <h2 className="text-lg font-bold mb-4">ملخص الطلب</h2>

                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name}
                        {item.quantity > 1 && ` x${item.quantity}`}
                      </span>
                      <span className="font-semibold">{item.price * item.quantity} ج.م</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">السعر الفرعي</span>
                    <span className="font-semibold">{subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التوصيل</span>
                    <span className="font-semibold">{shipping} ج.م</span>
                  </div>
                </div>

                <div className="flex justify-between mb-4 pb-4 border-b border-border">
                  <span className="font-bold">الإجمالي</span>
                  <span className="text-2xl font-bold text-primary">{total} ج.م</span>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  سيتم تسليم طلبك خلال 1-3 أيام عمل
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
