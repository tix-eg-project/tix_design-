# دليل البدء السريع - Quick Start Guide

## الخطوات الأساسية للدمج على 3 دقائق:

### 1️⃣ النسخ الأساسي (Copy Files)
```bash
# انسخ من هذا الموقع:
- كل ملفات /app
- كل ملفات /components
- /lib/auth.ts و /lib/utils.ts
- كل ملفات /public

# ألصق في موقعك الموجود في نفس الهيكل
```

### 2️⃣ تثبيت المتطلبات (Install Dependencies)
```bash
cd your-project
npm install lucide-react
npm run dev
```

### 3️⃣ اختبار الموقع (Test the Site)
```
http://localhost:3000              # الصفحة الرئيسية
http://localhost:3000/login        # صفحة التسجيل
http://localhost:3000/product/1    # صفحة منتج
http://localhost:3000/cart         # سلة التسوق
```

---

## البيانات التجريبية (Demo Data):

### حساب التجربة:
```
📧 البريد: demo@tix-eg.com
🔑 كلمة المرور: demo1234
```

### المنتجات المتاحة:
- 100 منتج في الموقع
- صور عالية الجودة لكل منتج
- تقييمات وتعليقات

### الطلبات التجريبية:
- 3 طلبات في حساب التجربة
- حالات مختلفة (قيد المعالجة، قيد التوصيل، تم التوصيل)

---

## الملفات المهمة:

| الملف | الوصف |
|------|-------|
| `/lib/auth.ts` | نظام المصادقة |
| `/app/page.tsx` | الصفحة الرئيسية |
| `/app/product/[id]/page.tsx` | صفحة المنتج |
| `/components/header.tsx` | شريط العنوان |
| `/app/account/page.tsx` | حساب المستخدم |

---

## المشاكل الشائعة والحلول:

### ❌ خطأ: "Cannot find module 'lucide-react'"
```bash
✅ الحل:
npm install lucide-react
npm run dev
```

### ❌ خطأ: "Unbalanced tags"
```bash
✅ الحل:
- تأكد من نسخ الملفات كاملة
- تحقق من عدم وجود أخطاء في التحرير
```

### ❌ الصور لا تظهر
```bash
✅ الحل:
- تأكد من نسخ جميع الصور من /public
- تحقق من المسارات في الكود
```

### ❌ المصادقة لا تعمل
```bash
✅ الحل:
- تأكد من /lib/auth.ts موجود
- امسح localStorage وجرب مرة أخرى
```

---

## التخصيص الأساسي:

### تغيير الألوان:
في `/app/globals.css`:
```css
:root {
  --primary: #FF8C00;      /* اللون الأساسي */
  --background: #FFFFFF;
  --foreground: #000000;
}
```

### تغيير بيانات التجربة:
في `/lib/auth.ts`:
```javascript
export const DEMO_USER = {
  name: 'اسمك',
  email: 'بريدك@example.com',
  password: 'كلمة المرور'
}
```

---

## الخطوات التالية (Next Steps):

1. **استبدال المصادقة**: استخدم NextAuth.js أو Firebase
2. **إضافة Database**: ربط مع Supabase أو Neon
3. **إضافة API**: إنشاء API routes للبيانات
4. **تحسين الصور**: استخدام Next.js Image component
5. **الإطلاق**: نشر على Vercel أو موقعك الخاص

---

## روابط مفيدة:

- [Next.js الوثائق](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [lucide-react الأيقونات](https://lucide.dev)
- [shadcn/ui المكونات](https://ui.shadcn.com)

---

## الدعم:

إذا واجهت مشاكل:
1. تحقق من قائمة المشاكل الشائعة أعلاه
2. راجع ملف `MIGRATION_CHECKLIST.md`
3. تحقق من `FILE_STRUCTURE.md` للبنية الصحيحة

---

**جاهز للبدء؟ ابدأ الآن! 🚀**
