# هيكل ملفات الموقع الكامل

```
الموقع/
│
├── app/
│   ├── layout.tsx                      # Layout الرئيسي
│   ├── page.tsx                        # الصفحة الرئيسية
│   ├── globals.css                     # الأنماط العامة
│   │
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx               # صفحة تفاصيل المنتج
│   │
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx               # صفحة الفئة
│   │
│   ├── search/
│   │   ├── page.tsx                   # صفحة البحث
│   │   ├── search-content.tsx         # محتوى البحث (client component)
│   │   └── loading.tsx                # حالة التحميل
│   │
│   ├── cart/
│   │   └── page.tsx                   # صفحة السلة
│   │
│   ├── checkout/
│   │   └── page.tsx                   # صفحة الدفع
│   │
│   ├── login/
│   │   └── page.tsx                   # صفحة تسجيل الدخول
│   │
│   ├── register/
│   │   └── page.tsx                   # صفحة التسجيل
│   │
│   ├── account/
│   │   ├── page.tsx                   # لوحة الحساب الرئيسية
│   │   ├── orders/
│   │   │   ├── page.tsx               # صفحة الطلبات
│   │   │   └── [id]/
│   │   │       └── page.tsx           # تفاصيل الطلب
│   │   ├── returns/
│   │   │   └── page.tsx               # صفحة الإرجاع
│   │   └── reviews/
│   │       └── page.tsx               # صفحة التقييمات
│   │
│   ├── order/
│   │   └── success/
│   │       └── page.tsx               # صفحة تأكيد الطلب
│   │
│   ├── about/
│   │   └── page.tsx                   # صفحة من نحن
│   │
│   ├── contact/
│   │   └── page.tsx                   # صفحة التواصل
│   │
│   ├── wishlist/
│   │   └── page.tsx                   # صفحة المفضلة
│   │
│   ├── store/
│   │   └── [slug]/
│   │       └── page.tsx               # صفحة متجر البائع
│   │
│   ├── seller/
│   │   └── dashboard/
│   │       └── page.tsx               # لوحة تحكم البائع
│   │
│   └── offers/
│       └── [slug]/
│           └── page.tsx               # صفحة العروض
│
├── components/
│   ├── header.tsx                      # شريط العنوان
│   ├── footer.tsx                      # الـ Footer
│   ├── hero.tsx                        # قسم البطل
│   ├── category-nav.tsx                # شريط الفئات
│   ├── category-showcase.tsx           # عرض الفئات
│   ├── product-carousel.tsx            # كاروسيل المنتجات
│   ├── product-grid.tsx                # شبكة المنتجات
│   ├── features.tsx                    # قسم المميزات
│   │
│   └── ui/                             # مكونات shadcn/ui
│       ├── button.tsx
│       ├── input.tsx
│       ├── checkbox.tsx
│       ├── card.tsx
│       ├── tabs.tsx
│       ├── accordion.tsx
│       ├── textarea.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── dropdown-menu.tsx
│       └── [وغيرها...]
│
├── lib/
│   ├── auth.ts                         # نظام المصادقة
│   └── utils.ts                        # دوال مساعدة
│
├── public/
│   ├── wireless-bluetooth-headphones.jpg
│   ├── smart-sports-watch.jpg
│   ├── fast-wireless-charger.jpg
│   ├── hd-webcam.jpg
│   ├── mechanical-keyboard-rgb.jpg
│   ├── gaming-mouse-rgb.jpg
│   ├── gaming-headset.png
│   ├── usb-c-fast-charging-cable.jpg
│   ├── car-phone-holder.jpg
│   ├── power-bank-20000mah.jpg
│   ├── mens-cotton-shirt.jpg
│   ├── womens-summer-dress.jpg
│   ├── running-sports-shoes.jpg
│   ├── womens-handbag.jpg
│   ├── trendy-sunglasses.jpg
│   ├── mens-wristwatch.jpg
│   └── [وغيرها...]
│
├── next.config.mjs                     # إعدادات Next.js
├── tailwind.config.js                  # إعدادات Tailwind
├── tsconfig.json                       # إعدادات TypeScript
├── package.json                        # التبعيات
├── package-lock.json                   # قفل التبعيات
└── .env.local                          # متغيرات البيئة (إن وجدت)
```

## شرح المكونات الرئيسية:

### 1. صفحات المنتجات (Product Pages)
- **`/product/[id]`**: تعرض تفاصيل المنتج كاملة مع معرض صور وأسئلة وأجوبة

### 2. صفحات الحساب (Account Pages)
- **`/account`**: لوحة تحكم المستخدم الرئيسية
- **`/account/orders`**: قائمة الطلبات السابقة
- **`/account/returns`**: إدارة المرتجعات
- **`/account/reviews`**: نظام التقييمات

### 3. صفحات الدفع (Checkout Pages)
- **`/cart`**: سلة التسوق مع اقتراحات
- **`/checkout`**: صفحة الدفع مع طرق الدفع
- **`/order/success`**: تأكيد الطلب

### 4. صفحات البحث والفئات
- **`/search`**: صفحة البحث المتقدمة
- **`/category/[slug]`**: عرض المنتجات حسب الفئة

### 5. مكونات مشتركة (Shared Components)
- **`header.tsx`**: شريط العنوان مع المستخدم والسلة والبحث
- **`footer.tsx`**: الـ Footer مع الروابط المهمة
- **`product-carousel.tsx`**: عرض منتجات في شريط
- **`product-grid.tsx`**: عرض منتجات في شبكة

### 6. مكتبات مساعدة (Utilities)
- **`auth.ts`**: إدارة المصادقة والحسابات
- **`utils.ts`**: دوال مساعدة عامة

## بيانات المنتجات:

يوجد 100 منتج في الموقع موزعة على الفئات:
- الإلكترونيات (30 منتج)
- الملابس (25 منتج)
- الأحذية (20 منتج)
- الإكسسوارات (15 منتج)
- الساعات والحقائب (10 منتج)

كل منتج يحتوي على:
- صورة عالية الجودة
- عنوان وصف
- سعر وسعر مخفض
- تقييم وعدد تقييمات
- معلومات بائع
- خيارات اللون والحجم
