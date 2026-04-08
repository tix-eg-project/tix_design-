'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Eye, Download, ArrowRight, CheckCircle, Truck, Clock } from 'lucide-react'
import Link from 'next/link'
import { getAuthToken } from '@/lib/auth'

export default function OrdersPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const user = getAuthToken()
    if (!user) {
      router.push('/login')
    }
    setIsLoading(false)
  }, [router])

  const orders = [
    {
      id: '1001',
      date: '2024-03-15',
      status: 'delivered',
      items: 'سماعات لاسلكية',
      total: 299,
      image: '/wireless-bluetooth-headphones.jpg',
    },
    {
      id: '1002',
      date: '2024-03-18',
      status: 'shipping',
      items: 'ساعة ذكية',
      total: 899,
      image: '/smart-sports-watch.jpg',
    },
    {
      id: '1003',
      date: '2024-03-20',
      status: 'processing',
      items: 'شاحن لاسلكي',
      total: 149,
      image: '/fast-wireless-charger.jpg',
    },
  ]

  const statusLabels = {
    all: 'جميع الطلبات',
    processing: 'قيد المعالجة',
    shipping: 'قيد التوصيل',
    delivered: 'تم التوصيل',
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return { color: 'bg-green-50 text-green-700', label: 'تم التوصيل', icon: CheckCircle }
      case 'shipping':
        return { color: 'bg-blue-50 text-blue-700', label: 'قيد التوصيل', icon: Truck }
      case 'processing':
        return { color: 'bg-yellow-50 text-yellow-700', label: 'قيد المعالجة', icon: Clock }
      default:
        return { color: 'bg-gray-50 text-gray-700', label: 'غير معروف', icon: Clock }
    }
  }

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus)

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
          <div className="flex items-center gap-2 mb-6">
            <Link href="/account" className="text-primary hover:underline">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">المنتجات المشتراة</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
            {Object.entries(statusLabels).map(([status, label]) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded whitespace-nowrap font-semibold transition-all ${
                  filterStatus === status
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border text-muted-foreground hover:border-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status)
              const StatusIcon = statusInfo.icon
              return (
                <div key={order.id} className="bg-white rounded-lg border border-border p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    {/* Image */}
                    <div className="h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src={order.image} alt={order.items} className="w-full h-full object-contain p-2" />
                    </div>

                    {/* Order Info */}
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">طلب #{order.id}</p>
                      <h3 className="font-semibold mb-1">{order.items}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString('ar-EG')}</p>
                    </div>

                    {/* Price */}
                    <div className="text-right md:text-left">
                      <p className="text-sm text-muted-foreground mb-1">المبلغ</p>
                      <p className="font-bold text-lg">{order.total} ج.م</p>
                    </div>

                    {/* Status */}
                    <div className={`${statusInfo.color} rounded-lg p-3 text-center`}>
                      <div className="flex items-center justify-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className="text-xs font-semibold">{statusInfo.label}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end">
                      <Button className="bg-primary text-white hover:bg-primary/90 text-sm">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-border">
              <p className="text-muted-foreground mb-4">لا توجد طلبات</p>
              <Link href="/">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  تصفح المتجر
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
