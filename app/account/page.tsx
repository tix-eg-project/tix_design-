'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { LogOut, ShoppingBag, RotateCcw, Star } from 'lucide-react'
import { getAuthToken, clearAuthToken, LoggedInUser } from '@/lib/auth'

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<LoggedInUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      router.push('/login')
    } else {
      try {
        const authData = JSON.parse(token)
        setUser(authData)
      } catch {
        router.push('/login')
      }
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    router.push('/')
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

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* User Header */}
          <div className="bg-white rounded-lg border border-border p-6 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              className="bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Orders Card */}
            <Link href="/account/orders">
              <div className="bg-white rounded-lg border border-border p-6 cursor-pointer hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">3 طلبات</span>
                </div>
                <h2 className="text-lg font-bold mb-2">المنتجات المشتراة</h2>
                <p className="text-sm text-muted-foreground">اعرض الطلبات السابقة والحالية</p>
              </div>
            </Link>

            {/* Returns Card */}
            <Link href="/account/returns">
              <div className="bg-white rounded-lg border border-border p-6 cursor-pointer hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center justify-between mb-4">
                  <RotateCcw className="w-8 h-8 text-orange-600" />
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">1 طلب إرجاع</span>
                </div>
                <h2 className="text-lg font-bold mb-2">إرجاع المنتجات</h2>
                <p className="text-sm text-muted-foreground">أرجع المنتجات وتتبع حالة الإرجاع</p>
              </div>
            </Link>

            {/* Reviews Card */}
            <Link href="/account/reviews">
              <div className="bg-white rounded-lg border border-border p-6 cursor-pointer hover:shadow-lg transition-shadow h-full">
                <div className="flex items-center justify-between mb-4">
                  <Star className="w-8 h-8 text-yellow-500" />
                  <span className="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">1 تقييم</span>
                </div>
                <h2 className="text-lg font-bold mb-2">تقييم المنتجات</h2>
                <p className="text-sm text-muted-foreground">قيّم المنتجات التي اشتريتها</p>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
