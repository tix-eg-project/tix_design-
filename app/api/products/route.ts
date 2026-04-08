import { NextRequest, NextResponse } from 'next/server'
import type { Product, ApiResponse } from '@/lib/types'

// Mock database - في الإنتاج استخدم قاعدة بيانات حقيقية
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'سماعات لاسلكية بلوتوث احترافية',
    description: 'سماعات لاسلكية عالية الجودة مع تقنية بلوتوث 5.0',
    price: 299,
    originalPrice: 450,
    discount: 34,
    rating: 4.8,
    reviews: 1250,
    images: ['/wireless-bluetooth-headphones.jpg'],
    category: 'electronics',
    inStock: true,
    colors: ['black', 'white', 'blue'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'ساعة ذكية رياضية',
    description: 'ساعة ذكية مع مراقب ضربات القلب وGPS',
    price: 899,
    originalPrice: 1200,
    discount: 25,
    rating: 4.6,
    reviews: 856,
    images: ['/smart-sports-watch.jpg'],
    category: 'electronics',
    inStock: true,
  },
]

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Product[]>>> {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    let filtered = PRODUCTS

    if (category) {
      filtered = PRODUCTS.filter((p) => p.category === category)
    }

    if (limit) {
      filtered = filtered.slice(0, parseInt(limit))
    }

    return NextResponse.json(
      {
        success: true,
        data: filtered,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const body = await request.json()

    const newProduct: Product = {
      id: String(PRODUCTS.length + 1),
      name: body.name,
      description: body.description,
      price: body.price,
      originalPrice: body.originalPrice,
      discount: body.discount,
      rating: 0,
      reviews: 0,
      images: body.images || [],
      category: body.category,
      inStock: body.inStock ?? true,
    }

    PRODUCTS.push(newProduct)

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    )
  }
}
