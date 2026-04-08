# TIX - متجر التسوق الإلكتروني

متجر إلكتروني متكامل بناءً على Next.js 15+ مع أفضل الممارسات والتقنيات الحديثة.

## المميزات

✅ **Next.js App Router** - توجيه حديث وفعال
✅ **Server Components & Client Components** - أداء محسّن
✅ **API Routes** - endpoints قوية للبيانات
✅ **TypeScript** - أمان الأنواع الكامل
✅ **Tailwind CSS** - تصميم متقدم
✅ **RTL Support** - دعم اللغة العربية الكامل
✅ **Responsive Design** - تصميم متجاوب
✅ **Database Schema** - هيكل قاعدة بيانات متكامل

## البنية

```
project/
├── app/
│   ├── api/                    # API Routes
│   │   ├── products/          # منتجات API
│   │   ├── auth/              # مصادقة API
│   │   ├── cart/              # سلة API
│   │   └── orders/            # طلبات API
│   ├── product/[id]/          # صفحة المنتج
│   ├── cart/                  # صفحة السلة
│   ├── checkout/              # صفحة الدفع
│   ├── account/               # صفحات الحساب
│   ├── login/                 # تسجيل الدخول
│   └── page.tsx               # الصفحة الرئيسية
├── components/                # React Components
├── lib/
│   ├── types.ts              # TypeScript Types
│   ├── db/
│   │   ├── schema.sql        # قاعدة البيانات
│   │   └── migrations/       # التحديثات
│   └── auth.ts               # المصادقة
├── public/                    # ملفات ثابتة
└── package.json
```

## البدء السريع

### المتطلبات
- Node.js 18+
- npm أو yarn
- PostgreSQL (اختياري للبيانات الحقيقية)

### التثبيت

```bash
# 1. نسخ المشروع
git clone <repository-url>
cd project

# 2. تثبيت المكتبات
npm install

# 3. إعداد متغيرات البيئة
cp .env.example .env.local

# 4. تشغيل خادم التطوير
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## قاعدة البيانات

### إنشاء قاعدة البيانات

```bash
# استخدم PostgreSQL
psql -U postgres -d postgres -a -f lib/db/schema.sql
```

أو استخدم أي خدمة:
- **Supabase** - PostgreSQL مستضاف
- **Neon** - Serverless Postgres
- **Railway** - قاعدة بيانات مدارة

### جداول البيانات

- **users** - بيانات المستخدمين
- **products** - المنتجات
- **cart_items** - عناصر السلة
- **orders** - الطلبات
- **order_items** - عناصر الطلب
- **reviews** - التقييمات
- **returns** - المرتجعات
- **wishlist** - قائمة المفضلة

## API Endpoints

### المنتجات
```
GET /api/products              # جميع المنتجات
GET /api/products/[id]        # منتج واحد
POST /api/products            # إنشاء منتج
```

### المصادقة
```
POST /api/auth/login          # تسجيل الدخول
POST /api/auth/register       # التسجيل
POST /api/auth/logout         # تسجيل الخروج
```

### السلة
```
GET /api/cart                 # الحصول على السلة
POST /api/cart                # إضافة عنصر
DELETE /api/cart              # حذف عنصر
```

### الطلبات
```
GET /api/orders               # جميع الطلبات
GET /api/orders/[id]         # طلب واحد
POST /api/orders             # إنشاء طلب
```

## حساب تجريبي

```
البريد: demo@tix-eg.com
كلمة المرور: demo1234
```

## الصفحات الرئيسية

- `/` - الصفحة الرئيسية
- `/product/[id]` - تفاصيل المنتج
- `/cart` - سلة التسوق
- `/checkout` - صفحة الدفع
- `/account` - لوحة الحساب
- `/account/orders` - الطلبات
- `/account/returns` - المرتجعات
- `/account/reviews` - التقييمات
- `/login` - تسجيل الدخول

## البدء في التطوير

### إضافة صفحة جديدة

```typescript
// app/new-page/page.tsx
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'صفحتي الجديدة - TIX',
  description: 'وصف الصفحة',
}

export default function NewPage() {
  return (
    <div dir="rtl">
      <Header />
      <main>محتوى الصفحة</main>
      <Footer />
    </div>
  )
}
```

### إضافة API Endpoint

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const data = { message: 'Hello World' }
    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error message' }, { status: 500 })
  }
}
```

## الأداء والتحسينات

- Server-side Rendering للصفحات الثابتة
- Static Generation مع ISR للمنتجات
- Image Optimization مع Next.js Image
- Code Splitting و Lazy Loading
- Caching Strategies

## الأمان

- Input Validation
- CORS Protection
- Rate Limiting (يمكن إضافته)
- HTTPS في الإنتاج
- JWT Tokens للمصادقة

## النشر

### Vercel (الموصى بها)

```bash
# ربط المشروع
vercel link

# نشر
vercel deploy --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## الدعم والمساعدة

للأسئلة والدعم:
- 📧 البريد الإلكتروني: support@tix-eg.com
- 🐙 GitHub Issues: [رابط المشروع]
- 💬 Discord Community: [رابط الخادم]

## الترخيص

MIT License - راجع ملف LICENSE للتفاصيل.

---

**تم إنشاؤه بـ Next.js 15+ و TypeScript و Tailwind CSS**
