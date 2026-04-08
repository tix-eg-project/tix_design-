'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { validateLogin, setAuthToken, DEMO_USER } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const { success, data, error: apiError } = await res.json()

      if (success) {
        localStorage.setItem('auth_token', JSON.stringify(data))
        router.push('/account')
      } else {
        setError(apiError || 'فشل تسجيل الدخول')
        setIsLoading(false)
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول')
      setIsLoading(false)
    }
  }

  const handleDemoLogin = () => {
    setEmail(DEMO_USER.email)
    setPassword(DEMO_USER.password)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background" dir="rtl">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-border p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="bg-primary rounded-full p-3 w-16 h-16 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">TIX</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-2">تسجيل الدخول</h1>
            <p className="text-center text-muted-foreground mb-6">
              أدخل بيانات حسابك للمتابعة
            </p>

            {/* Demo Account Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-xs text-blue-700 font-semibold mb-3">حساب تجريبي للاختبار:</p>
              <p className="text-xs text-blue-600 mb-1"><span className="font-semibold">البريد:</span> demo@tix-eg.com</p>
              <p className="text-xs text-blue-600 mb-3"><span className="font-semibold">كلمة المرور:</span> demo1234</p>
              <Button
                type="button"
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full text-xs h-8 border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                ملء البيانات التجريبية
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="text-sm"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">كلمة المرور</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <span className="text-sm">تذكرني</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">
                  هل نسيت كلمة المرور؟
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-white hover:bg-primary/90 h-11 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'جاري المعالجة...' : 'تسجيل الدخول'}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border"></div>
              <span className="text-xs text-muted-foreground">أو</span>
              <div className="flex-1 h-px bg-border"></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-10 font-semibold">
                تسجيل الدخول عبر جوجل
              </Button>
              <Button variant="outline" className="w-full h-10 font-semibold">
                تسجيل الدخول عبر فيسبوك
              </Button>
            </div>

            {/* Register Link */}
            <p className="text-center text-muted-foreground mt-8">
              ليس لديك حساب؟{' '}
              <Link href="/register" className="text-primary hover:underline font-semibold">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
