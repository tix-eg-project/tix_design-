'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { getAuthToken } from '@/lib/auth'

interface ReturnRequest {
  id: string
  orderId: string
  product: string
  reason: string
  status: 'pending' | 'accepted' | 'received' | 'refunded'
  date: string
  refundAmount: number
}

const DEMO_RETURNS: ReturnRequest[] = [
  {
    id: 'RET-001',
    orderId: '1001',
    product: 'سماعات لاسلكية',
    reason: 'المنتج لا يعمل بشكل صحيح',
    status: 'refunded',
    date: '2024-03-17',
    refundAmount: 299,
  },
]

const getStatusInfo = (status: string) => {
  switch (status) {
    case 'pending':
      return { color: 'bg-yellow-50 text-yellow-700', label: 'قيد الانتظار', icon: Clock }
    case 'accepted':
      return { color: 'bg-blue-50 text-blue-700', label: 'تم القبول', icon: CheckCircle }
    case 'received':
      return { color: 'bg-green-50 text-green-700', label: 'تم استلام المنتج', icon: CheckCircle }
    case 'refunded':
      return { color: 'bg-green-50 text-green-700', label: 'تم رد المبلغ', icon: CheckCircle }
    default:
      return { color: 'bg-gray-50 text-gray-700', label: 'غير معروف', icon: Clock }
  }
}

export default function ReturnsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    orderId: '',
    reason: '',
  })

  useEffect(() => {
    const user = getAuthToken()
    if (!user) {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Return request submitted:', formData)
    setShowForm(false)
    setFormData({ orderId: '', reason: '' })
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
            <h1 className="text-2xl font-bold">إرجاع المنتجات</h1>
          </div>

          {/* Returns List */}
          <div className="space-y-4 mb-8">
            {DEMO_RETURNS.map((returnReq) => {
              const statusInfo = getStatusInfo(returnReq.status)
              const StatusIcon = statusInfo.icon
              return (
                <div key={returnReq.id} className="bg-white rounded-lg border border-border p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                    {/* Return Info */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">طلب الإرجاع #{returnReq.id}</p>
                      <h3 className="font-semibold mb-1">{returnReq.product}</h3>
                      <p className="text-xs text-muted-foreground">من طلب #{returnReq.orderId}</p>
                    </div>

                    {/* Reason */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">السبب</p>
                      <p className="font-semibold text-sm">{returnReq.reason}</p>
                    </div>

                    {/* Refund */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">مبلغ الاسترجاع</p>
                      <p className="font-bold text-lg">{returnReq.refundAmount} ج.م</p>
                    </div>

                    {/* Status */}
                    <div className={`${statusInfo.color} rounded-lg p-3 text-center`}>
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-semibold">{statusInfo.label}</span>
                      </div>
                    </div>
                  </div>

                  {returnReq.status === 'received' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-700">تم استلام المنتج - جاري رد المبلغ</p>
                    </div>
                  )}

                  {returnReq.status === 'refunded' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-700">تم رد المبلغ {returnReq.refundAmount} ج.م إلى محفظتك</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* New Return Request Form */}
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">طلب إرجاع جديد</h2>
              <Button
                onClick={() => setShowForm(!showForm)}
                className="bg-primary text-white hover:bg-primary/90"
              >
                {showForm ? 'إلغاء' : '+ إضافة طلب إرجاع'}
              </Button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-4 border-t pt-6">
                {/* Select Order */}
                <div>
                  <label className="block text-sm font-semibold mb-2">اختر الطلب</label>
                  <select
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm"
                    required
                  >
                    <option value="">-- اختر طلباً --</option>
                    <option value="1001">طلب #1001 - سماعات لاسلكية (299 ج.م)</option>
                    <option value="1002">طلب #1002 - ساعة ذكية (899 ج.م)</option>
                    <option value="1003">طلب #1003 - شاحن لاسلكي (149 ج.م)</option>
                  </select>
                </div>

                {/* Return Reason */}
                <div>
                  <label className="block text-sm font-semibold mb-2">سبب الإرجاع</label>
                  <select
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full border border-border rounded-lg px-4 py-2 text-sm"
                    required
                  >
                    <option value="">-- اختر السبب --</option>
                    <option value="المنتج لا يعمل بشكل صحيح">المنتج لا يعمل بشكل صحيح</option>
                    <option value="المنتج مختلف عن الوصف">المنتج مختلف عن الوصف</option>
                    <option value="المنتج معيب">المنتج معيب</option>
                    <option value="تغيير الرأي">تغيير الرأي</option>
                    <option value="آخر">آخر</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button
                    type="submit"
                    className="flex-1 bg-primary text-white hover:bg-primary/90"
                  >
                    إرسال طلب الإرجاع
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
