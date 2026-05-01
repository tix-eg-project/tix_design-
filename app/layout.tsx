import type { Metadata, Viewport } from 'next'
import { Montserrat, Tajawal } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '500', '700'], variable: '--font-tajwal' })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: {
    default: 'TIX - متجر التسوق الإلكتروني',
    template: '%s | TIX',
  },
  description: 'متجر إلكتروني متكامل - تسوق أفضل المنتجات بأسعار منافسة وسهولة الدفع',
  keywords: ['تسوق أونلاين', 'متجر إلكتروني', 'منتجات', 'عروض'],
  authors: [{ name: 'TIX Store' }],
  creator: 'TIX',
  publisher: 'TIX',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_EG',
    url: 'https://tix-eg.com',
    siteName: 'TIX Store',
    title: 'TIX - متجر التسوق الإلكتروني',
    description: 'متجر إلكتروني متكامل - تسوق أفضل المنتجات',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className={`${tajawal.variable} ${montserrat.variable}`}>
      <head />
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
