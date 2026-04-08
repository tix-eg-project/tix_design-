'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Star, Heart, Shield, Truck, Clock, ChevronDown, Check, MessageCircle, HelpCircle, Package, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'


export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('black')
  const [selectedSize, setSelectedSize] = useState('M')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImageIdx, setSelectedImageIdx] = useState(0)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const product = {
    id: parseInt(params.id),
    storeName: 'متجر الإلكترونيات الموثوق',
    storeLink: '/store/electronics-trusted',
    name: 'سماعات لاسلكية بلوتوث احترافية - تقنية إلغاء الضوضاء',
    price: 299,
    originalPrice: 450,
    discount: 34,
    rating: 4.6,
    reviews: 2543,
    inStock: true,
    isBestseller: true,
    shortDescription: 'سماعات لاسلكية احترافية عالية الجودة مع تقنية إلغاء الضوضاء النشطة وبطارية طويلة الأمد.',
    fullDescription: 'سماعات لاسلكية عالية الجودة مع تقنية بلوتوث 5.0 وعمر بطارية يصل إلى 24 ساعة. مريحة جداً للاستخدام اليومي والرياضة والعمل. تتميز بتصميم عصري وأنيق يناسب جميع الأذواق. تحتوي على ميزة إلغاء الضوضاء النشطة لتوفير تجربة استماع نقية وخالية من الضوضاء الخارجية.',
    highlights: [
      'تقنية بلوتوث 5.0 لاتصال سريع وثابت',
      'بطارية تدوم حتى 24 ساعة من الاستخدام المتصل',
      'تقنية إلغاء الضوضاء النشطة (ANC)',
      'مقاومة الماء IPX5 للاستخدام في أي مكان',
      'تصميم مريح وخفيف الوزن للاستخدام طوال اليوم'
    ],
    technicalDescription: 'سماعات احترافية مع أحدث التقنيات في مجال الصوتيات. تدعم أحدث معايير الاتصال اللاسلكي وتتمتع بأداء عالي في بيئات مختلفة.',
    technicalSpecs: [
      { label: 'تقنية الاتصال', value: 'بلوتوث 5.0' },
      { label: 'عمر البطارية', value: '24 ساعة (الوضع العادي), 18 ساعة (مع ANC)' },
      { label: 'وقت الشحن', value: 'ساعتان بـ USB-C' },
      { label: 'الوزن', value: '180 جرام' },
      { label: 'نوع التوصيل', value: 'USB-C (شحن وتحديث البرامج)' },
      { label: 'مقاومة الماء', value: 'IPX5 (مقاومة الرش والعرق)' },
      { label: 'دعم الترددات', value: '20 Hz - 20 kHz' },
      { label: 'نطاق الاتصال', value: '10 متر (في الهواء الطلق)' },
      { label: 'المكونات المرفقة', value: 'كابل USB-C, جراب حماية, دليل المستخدم, ضمان سنة' },
    ],
    images: [
      '/wireless-bluetooth-headphones.jpg',
      '/smart-sports-watch.jpg',
      '/fast-wireless-charger.jpg',
      '/hd-webcam.jpg',
    ],
    colors: ['black', 'white', 'blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    reviews: [
      {
        id: 1,
        author: 'أحمد محمود',
        rating: 5,
        date: 'منذ أسبوع',
        text: 'منتج رائع جداً، الجودة عالية جداً والتوصيل سريع. أنصح به بشدة.',
        images: ['/wireless-bluetooth-headphones.jpg', '/smart-sports-watch.jpg'],
      },
      {
        id: 2,
        author: 'فاطمة علي',
        rating: 4,
        date: 'منذ أسبوعين',
        text: 'سماعات ممتازة وخفيفة الوزن، مريحة جداً طوال اليوم.',
        images: ['/fast-wireless-charger.jpg'],
      },
      {
        id: 3,
        author: 'محمد حسن',
        rating: 5,
        date: 'منذ شهر',
        text: 'أفضل سماعات استخدمتها، الصوت واضح جداً وإلغاء الضوضاء فعال جداً.',
        images: [],
      },
    ],
    faqs: [
      {
        question: 'هل تدعم السماعات شحن سريع؟',
        answer: 'نعم، السماعات تدعم شحن سريع عبر USB-C. تحتاج حوالي ساعتين فقط للشحن الكامل.',
        images: ['/fast-wireless-charger.jpg'],
      },
      {
        question: 'ما مدة ضمان المنتج؟',
        answer: 'المنتج مشمول بضمان سنة واحدة من تاريخ الشراء على جميع العيوب الصناعية.',
        images: ['/shield.svg'],
      },
      {
        question: 'هل يمكن استخدام السماعات تحت الماء؟',
        answer: 'السماعات بتصنيف IPX5، مما يعني أنها مقاومة للرش والعرق، لكن لا ينصح بالاستخدام تحت الماء مباشرة.',
        images: [],
      },
      {
        question: 'كم عدد الأجهزة التي يمكن توصيلها مرة واحدة؟',
        answer: 'يمكن توصيل السماعات بجهاز واحد في المرة، لكن يمكن حفظ اقتران مع أجهزة متعددة والتبديل بينها بسهولة.',
        images: [],
      },
    ],
    complementaryProducts: [
      { id: 101, name: 'كيس حماية السماعات الفاخر', price: 45, image: '/wireless-bluetooth-headphones.jpg', rating: 4.7, reviews: 320 },
      { id: 102, name: 'كابل USB-C إضافي (3 متر)', price: 25, image: '/smart-sports-watch.jpg', rating: 4.5, reviews: 180 },
      { id: 103, name: 'شاحن سريع 65W', price: 120, image: '/fast-wireless-charger.jpg', rating: 4.8, reviews: 520 },
      { id: 104, name: 'واقي شاشة مغناطيسي', price: 35, image: '/hd-webcam.jpg', rating: 4.6, reviews: 210 },
      { id: 105, name: 'حامل السماعات للمكتب', price: 55, image: '/wireless-bluetooth-headphones.jpg', rating: 4.4, reviews: 150 },
    ],
    similarProducts: [
      { id: 201, name: 'سماعات لاسلكية Pro Max', price: 599, originalPrice: 799, image: '/wireless-bluetooth-headphones.jpg', rating: 4.8, reviews: 1250, discount: 25 },
      { id: 202, name: 'سماعات بلوتوث ستيريو', price: 199, originalPrice: 299, image: '/smart-sports-watch.jpg', rating: 4.5, reviews: 850, discount: 33 },
      { id: 203, name: 'سماعات أذن لاسلكية صغيرة', price: 399, originalPrice: 499, image: '/fast-wireless-charger.jpg', rating: 4.7, reviews: 2100, discount: 20 },
      { id: 204, name: 'سماعات رياضية مقاومة للماء', price: 349, originalPrice: 549, image: '/hd-webcam.jpg', rating: 4.6, reviews: 1600, discount: 36 },
    ],
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', { quantity, color: selectedColor, size: selectedSize })
  }

  const handleBuyNow = () => {
    console.log('Buy now:', { quantity, color: selectedColor, size: selectedSize })
  }

  const toggleAccordion = (section: string) => {
    setExpandedAccordion(expandedAccordion === section ? null : section)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 justify-end">
            <Link href="/" className="hover:text-foreground">الرئيسية</Link>
            <span>/</span>
            <Link href="/category/electronics" className="hover:text-foreground">إلكترونيات</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          {/* Store Info - Above Product Title */}
          <div className="mb-2 text-sm text-muted-foreground flex items-center gap-1 justify-end">
            <span>يُباع بواسطة:</span>
            <Link href={product.storeLink} className="text-primary hover:underline font-semibold">
              {product.storeName}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Image Gallery */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="bg-gray-50 rounded-lg overflow-hidden mb-4 flex-shrink-0">
                <div className="w-full aspect-[4/5] lg:aspect-square flex items-center justify-center">
                  <img
                    src={product.images[selectedImageIdx]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`border-2 rounded-lg overflow-hidden transition-all aspect-square ${
                      selectedImageIdx === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`صورة ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div>
              {/* Product Title */}
              <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold">{product.rating}</span>
                <Link href="#reviews" className="text-primary hover:underline text-sm">
                  ({product.reviews.toLocaleString('ar-EG')} تقييم)
                </Link>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold">{product.price} ج.م</span>
                <span className="text-lg text-muted-foreground line-through">{product.originalPrice} ج.م</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-bold">-{product.discount}%</span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    متوفر في المخزون
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    غير متوفر
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">اللون:</label>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-3 transition-all ${
                        selectedColor === color ? 'border-black' : 'border-gray-300'
                      }`}
                      style={{
                        backgroundColor:
                          color === 'black' ? '#000' : color === 'white' ? '#fff' : '#3b82f6',
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">الحجم:</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded font-semibold transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">الكمية:</label>
                <div className="flex items-center gap-2 border border-gray-300 rounded w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center border-0 w-12"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 mb-6">
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-black text-white hover:bg-gray-800 h-12 font-bold text-base rounded-lg"
                >
                  اشتري الآن
                </Button>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-white text-black border-2 border-black hover:bg-gray-50 h-12 font-bold text-base rounded-lg"
                >
                  أضف للسلة
                </Button>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
                <span className="text-sm font-semibold">
                  {isWishlisted ? 'مضاف للمفضلة' : 'أضف للمفضلة'}
                </span>
              </button>

              {/* Trust Badges */}
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold text-sm mb-4">معلومات التوصيل والدفع</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* 1. Shipping Fast */}
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">شحن سريع</p>
                      <p className="text-xs text-muted-foreground">توصيل خلال 1-3 أيام</p>
                    </div>
                  </div>

                  {/* 2. Fast Delivery */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">توصيل سريع</p>
                      <p className="text-xs text-muted-foreground">خلال 1-3 أيام عمل</p>
                    </div>
                  </div>

                  {/* 3. Secure Payment */}
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">دفع آمن</p>
                      <p className="text-xs text-muted-foreground">معاملتك آمانة</p>
                    </div>
                  </div>

                  {/* 4. Free Shipping */}
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">شحن مجاني</p>
                      <p className="text-xs text-muted-foreground">للطلبات فوق 1500 ج.م</p>
                    </div>
                  </div>

                  {/* 5. Payment Methods */}
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">طرق الدفع</p>
                      <p className="text-xs text-muted-foreground">فيزا | محفظة | نقدي</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights - Always Visible */}
          <div className="mb-12 bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">المميزات الرئيسية</h2>
            <ul className="space-y-3">
              {product.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4 mb-12">
            {/* Description Accordion */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion('description')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-bold text-lg">وصف المنتج</h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedAccordion === 'description' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedAccordion === 'description' && (
                <div className="border-t border-gray-300 px-6 py-4 bg-gray-50">
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">الوصف العام</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{product.fullDescription}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">المواصفات التقنية</h4>
                    <p className="text-sm text-gray-700 mb-3">{product.technicalDescription}</p>
                    <div className="space-y-2">
                      {product.technicalSpecs.map((spec, idx) => (
                        <div key={idx} className="flex justify-between text-sm border-b border-gray-200 pb-2 last:border-0">
                          <span className="font-semibold text-gray-600">{spec.label}</span>
                          <span className="text-gray-700">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Accordion */}
            <div className="border border-gray-300 rounded-lg overflow-hidden" id="reviews">
              <button
                onClick={() => toggleAccordion('reviews')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  التعليقات والمراجعات
                </h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedAccordion === 'reviews' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedAccordion === 'reviews' && (
                <div className="border-t border-gray-300 px-6 py-4 bg-gray-50">
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm">{review.author}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{review.text}</p>
                        {review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`صورة ${idx + 1}`}
                                className="w-16 h-16 rounded object-cover border border-gray-300"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Q&A Accordion */}
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion('qa')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  الأسئلة والأجوبة
                </h3>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    expandedAccordion === 'qa' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedAccordion === 'qa' && (
                <div className="border-t border-gray-300 px-6 py-4 bg-gray-50">
                  <div className="space-y-4">
                    {product.faqs.map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <p className="font-semibold text-sm mb-2">س: {faq.question}</p>
                        <p className="text-sm text-gray-700 mb-3">ج: {faq.answer}</p>
                        {faq.images.length > 0 && (
                          <div className="flex gap-2">
                            {faq.images.map((img, imgIdx) => (
                              <img
                                key={imgIdx}
                                src={img}
                                alt={`صورة ${imgIdx + 1}`}
                                className="w-16 h-16 rounded object-cover border border-gray-300"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Complementary Products */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">اشتري معاها في سلة وحدة ووفر</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {product.complementaryProducts.map((prod) => (
                <Link key={prod.id} href={`/product/${prod.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img src={prod.image} alt={prod.name} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <h3 className="text-sm font-semibold line-clamp-2 mb-2">{prod.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(prod.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground">({prod.reviews})</span>
                      </div>
                      <p className="text-base font-bold">{prod.price} ج.م</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Similar Products */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">شاهد ايضا هذا قد يعجبك</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.similarProducts.map((prod) => (
                <Link key={prod.id} href={`/product/${prod.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative">
                      <img src={prod.image} alt={prod.name} className="w-full h-40 object-cover" />
                      {prod.discount > 0 && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                          -{prod.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-semibold line-clamp-2 mb-2">{prod.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.round(prod.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground">({prod.reviews})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-base font-bold">{prod.price} ج.م</p>
                        {prod.originalPrice && (
                          <p className="text-xs text-muted-foreground line-through">{prod.originalPrice} ج.م</p>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
