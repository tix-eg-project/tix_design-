import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - TIX',
  description: 'سياسة الخصوصية والبيانات الشخصية لمتجر TIX',
  openGraph: {
    title: 'سياسة الخصوصية - TIX',
    description: 'سياسة الخصوصية والبيانات الشخصية لمتجر TIX',
  },
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <h1 className="text-4xl font-bold mb-4">سياسة الخصوصية</h1>
          <p className="text-muted-foreground">آخر تحديث: مارس 2024</p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 1. مقدمة */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">1. مقدمة</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              نحن في متجر TIX نلتزم بحماية خصوصيتك وأماناً بياناتك الشخصية. تشرح هذه السياسة كيفية جمعنا واستخدامنا وحماية معلوماتك.
            </p>
            <p className="text-gray-700 leading-relaxed">
              من خلال استخدام موقعنا الإلكتروني وتطبيقنا، فإنك توافق على سياسة الخصوصية هذه وتفهم ممارسات معالجة البيانات الخاصة بنا.
            </p>
          </section>

          {/* 2. البيانات التي نجمعها */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">2. البيانات التي نجمعها</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">البيانات الشخصية:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>الاسم الكامل والبريد الإلكتروني</li>
                  <li>رقم الهاتف والعنوان</li>
                  <li>تاريخ الميلاد ونوع الجنس (اختياري)</li>
                  <li>بيانات الدفع والفاتورة</li>
                  <li>كلمة المرور المشفرة</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">بيانات الاستخدام:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>سجل الأنشطة والطلبات</li>
                  <li>معلومات المتصفح والجهاز</li>
                  <li>عناوين IP وملفات تعريف الارتباط</li>
                  <li>إحصائيات الزيارات والنقرات</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. كيفية استخدام البيانات */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">3. كيفية استخدام البيانات</h2>
            <p className="text-gray-700 leading-relaxed mb-4">نستخدم بياناتك الشخصية للأغراض التالية:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>معالجة طلباتك والشحنات</li>
              <li>تقديم الدعم والخدمات العملاء</li>
              <li>تحسين تجربتك على الموقع</li>
              <li>إرسال الإشعارات والعروض (مع موافقتك)</li>
              <li>منع الاحتيال والأمان السيبراني</li>
              <li>الامتثال للقوانين واللوائح</li>
            </ul>
          </section>

          {/* 4. حماية البيانات */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">4. حماية البيانات</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              نستخدم تقنيات التشفير المتقدمة (SSL/TLS) لحماية بيانات الدفع والمعلومات الحساسة. تُخزّن جميع البيانات على خوادم آمنة مع نسخ احتياطية دورية.
            </p>
            <p className="text-gray-700 leading-relaxed">
              يتم الوصول إلى بياناتك الشخصية من قبل موظفين مفوضين فقط الذين يتعهدون بالسرية والحفاظ على الخصوصية.
            </p>
          </section>

          {/* 5. المشاركة مع أطراف ثالثة */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">5. المشاركة مع أطراف ثالثة</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              قد نشارك بياناتك مع الأطراف الثالثة التالية فقط:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>شركات الشحن لتسليم الطلبات</li>
              <li>بوابات الدفع الآمنة والموثوقة</li>
              <li>الخدمات التحليلية (Google Analytics)</li>
              <li>الجهات الحكومية عند الضرورة القانونية</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              لن نبيع أو نؤجر بياناتك الشخصية لأطراف ثالثة دون موافقتك الصريحة.
            </p>
          </section>

          {/* 6. حقوقك */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">6. حقوقك</h2>
            <p className="text-gray-700 leading-relaxed mb-4">لديك الحق في:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>الوصول إلى بياناتك الشخصية</li>
              <li>تصحيح أو تحديث المعلومات غير الدقيقة</li>
              <li>طلب حذف بياناتك (الحق في النسيان)</li>
              <li>الاعتراض على معالجة بياناتك</li>
              <li>نقل بياناتك إلى جهة أخرى</li>
              <li>سحب الموافقة على معالجة البيانات</li>
            </ul>
          </section>

          {/* 7. ملفات تعريف الارتباط */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">7. ملفات تعريف الارتباط</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربتك. يمكنك التحكم في القبول من خلال إعدادات المتصفح الخاص بك.
            </p>
          </section>

          {/* 8. الاتصال بنا */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-black">8. الاتصال بنا</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية أو ممارسات البيانات، يرجى الاتصال بنا:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>البريد الإلكتروني:</strong> privacy@tix-eg.com</p>
              <p className="text-gray-700"><strong>الهاتف:</strong> +20 100 123 4567</p>
              <p className="text-gray-700"><strong>العنوان:</strong> القاهرة، مصر</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
