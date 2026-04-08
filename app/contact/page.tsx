'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'الهاتف',
      content: '+966 11 234 5678',
      subtitle: 'من السبت للخميس، 9 صباحاً - 9 مساءً'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      content: 'support@tix.com',
      subtitle: 'نرد على رسائلك خلال 24 ساعة'
    },
    {
      icon: MapPin,
      title: 'العنوان',
      content: 'شارع العليا، الرياض',
      subtitle: 'المملكة العربية السعودية'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      content: 'مفتوح 24/7',
      subtitle: 'متوفر لمساعدتك في أي وقت'
    }
  ]

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-l from-orange-400 to-orange-600 text-white py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">اتصل بنا</h1>
            <p className="text-xl text-orange-100">نحن هنا للإجابة على جميع استفساراتك</p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <method.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-black mb-2">{method.title}</h3>
                <p className="text-black font-semibold mb-2">{method.content}</p>
                <p className="text-sm text-gray-600">{method.subtitle}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-black mb-6">أرسل لنا رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="أدخل اسمك"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="+966 5X XXX XXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الموضوع</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر الموضوع</option>
                      <option value="order">مشكلة في الطلب</option>
                      <option value="delivery">مشكلة في التوصيل</option>
                      <option value="product">شكوى عن منتج</option>
                      <option value="seller">شكوى عن بائع</option>
                      <option value="other">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">الرسالة</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="اكتب رسالتك هنا..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-bold text-lg"
                  >
                    إرسال الرسالة
                  </button>
                </form>
              </div>

              {/* Info */}
              <div className="flex flex-col justify-between">
                <div className="bg-white p-8 rounded-lg mb-6">
                  <h3 className="text-2xl font-bold text-black mb-4">معلومات إضافية</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-black mb-2">وقت الاستجابة</h4>
                      <p className="text-gray-600">نتعهد بالرد على جميع الاستفسارات خلال 24 ساعة من استلامها.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-2">دعم متعدد اللغات</h4>
                      <p className="text-gray-600">فريقنا متوفر باللغة العربية والإنجليزية وغيرها.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-2">الأسئلة الشائعة</h4>
                      <p className="text-gray-600">تفقد قسم الأسئلة الشائعة قد تجد إجابة سريعة لاستفسارك.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-8 rounded-lg border-2 border-orange-200">
                  <h3 className="text-xl font-bold text-black mb-3">هل تواجه مشكلة؟</h3>
                  <p className="text-gray-600 mb-4">يمكنك أيضاً تصفح مركز الدعم للعثور على حلول سريعة.</p>
                  <button className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-bold">
                    اذهب إلى مركز الدعم
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold text-black text-center mb-12">الأسئلة الشائعة</h2>
          <div className="space-y-6">
            {[
              {
                q: 'كيفية تتبع طلبي؟',
                a: 'يمكنك تتبع طلبك من خلال قسم "طلباتي" في حسابك الشخصي، أو استخدام رقم التتبع المرسل لك عبر البريد الإلكتروني.'
              },
              {
                q: 'ما سياسة الاسترجاع والاستبدال؟',
                a: 'نقبل المرتجعات والاستبدالات خلال 30 يوم من استقبال المنتج، شريطة أن يكون في حالة الجديد.'
              },
              {
                q: 'هل المنتجات مضمونة؟',
                a: 'نعم، جميع المنتجات لدينا مضمونة من قبل الشركات الصانعة، وتتمتع بضمان شامل.'
              },
            ].map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-black">
                  {faq.q}
                  <span className="transition group-open:rotate-180">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
