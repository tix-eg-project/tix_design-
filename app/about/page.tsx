'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { CheckCircle, Users, Zap, Globe } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Users,
      title: 'العملاء أولاً',
      description: 'نضع احتياجات عملائنا في قلب كل ما نفعله'
    },
    {
      icon: Zap,
      title: 'التوصيل السريع',
      description: 'نضمن وصول طلبك بسرعة وأمان إلى باب منزلك'
    },
    {
      icon: Globe,
      title: 'جودة عالمية',
      description: 'نختار أفضل المنتجات من الماركات العالمية والمحلية'
    }
  ]

  const achievements = [
    { number: '10M+', label: 'عميل سعيد' },
    { number: '500K+', label: 'منتج متنوع' },
    { number: '24/7', label: 'خدمة عملاء' },
    { number: '15', label: 'سنة خبرة' },
  ]

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-l from-orange-400 to-orange-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">عن TIX</h1>
            <p className="text-xl text-orange-100">منصة التسوق الموثوقة للملايين من العملاء العرب</p>
          </div>
        </section>

        {/* Story Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-black mb-6">رحلتنا</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                بدأت TIX برؤية بسيطة: جعل التسوق الإلكتروني سهلاً وآمناً وممتعاً للجميع. منذ تأسيسنا عام 2009، نمونا من منصة صغيرة إلى واحدة من أكبر أسواق التجارة الإلكترونية في المنطقة.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                اليوم، نخدم ملايين العملاء يومياً، ونوفر لهم ملايين المنتجات من آلاف البائعين الموثوقين. تطورنا مستمر لتقديم أفضل التجارب.
              </p>
            </div>
            <div className="order-1 md:order-2 bg-orange-100 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-orange-500 mb-2">TIX</div>
                <p className="text-gray-600">منصة التسوق الرائدة</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-black text-center mb-12">إنجازاتنا</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">{item.number}</div>
                  <p className="text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-black text-center mb-12">قيمنا الأساسية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-black mb-8">فريقنا</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
              نحن فريق من المتخصصين الشغوفين بتقديم أفضل تجربة تسوق. كل عضو في فريقنا يعمل بجد لجعل TIX مكاناً آمناً وموثوقاً للتسوق.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white p-8 rounded-lg">
                  <div className="bg-gray-300 w-20 h-20 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold text-black mb-1">فريق TIX</h3>
                  <p className="text-gray-600 text-sm">متخصص في رضا العملاء</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-orange-500 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">اتصل بنا</h2>
            <p className="text-xl mb-8 opacity-90">هل لديك أي أسئلة؟ نحن هنا لمساعدتك</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="/contact" className="px-8 py-3 bg-white text-orange-500 rounded-lg hover:bg-gray-100 font-bold">
                تواصل معنا
              </a>
              <a href="/" className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-orange-600 font-bold">
                العودة للرئيسية
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
