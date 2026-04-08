'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [userType, setUserType] = useState('buyer')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('كلمات المرور غير متطابقة')
      return
    }
    console.log('Register attempt:', { userType, ...formData })
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

            <h1 className="text-3xl font-bold text-center mb-2">إنشاء حساب جديد</h1>
            <p className="text-center text-muted-foreground mb-8">
              سجل الآن وتمتع بمميزات حصرية
            </p>

            {/* User Type Toggle */}
            <div className="flex gap-2 mb-6 bg-secondary p-1 rounded-lg">
              <button
                onClick={() => setUserType('buyer')}
                className={`flex-1 py-2 rounded font-semibold text-sm transition-all ${
                  userType === 'buyer'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                مشتري
              </button>
              <button
                onClick={() => setUserType('seller')}
                className={`flex-1 py-2 rounded font-semibold text-sm transition-all ${
                  userType === 'seller'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                بائع
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">الاسم الكامل</label>
                <Input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="أدخل اسمك الكامل"
                  className="text-sm"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">البريد الإلكتروني</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className="text-sm"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">رقم الهاتف</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+20 1XX XXX XXXX"
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
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
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
                <p className="text-xs text-muted-foreground mt-1">
                  يجب أن تكون كلمة المرور 8 أحرف على الأقل
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="أدخل كلمة المرور مرة أخرى"
                    className="text-sm pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-2 cursor-pointer">
                <Checkbox 
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeTerms', checked)}
                />
                <span className="text-xs text-muted-foreground">
                  أوافق على{' '}
                  <a href="#" className="text-primary hover:underline">
                    شروط الاستخدام
                  </a>
                  {' '}و{' '}
                  <a href="#" className="text-primary hover:underline">
                    سياسة الخصوصية
                  </a>
                </span>
              </label>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={!formData.agreeTerms}
                className="w-full bg-primary text-white hover:bg-primary/90 h-12 font-semibold mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                إنشاء الحساب
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-muted-foreground mt-8">
              هل لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-primary hover:underline font-semibold">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
