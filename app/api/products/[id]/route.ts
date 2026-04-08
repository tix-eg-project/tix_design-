import { NextRequest, NextResponse } from 'next/server'
import type { Product, ApiResponse } from '@/lib/types'

// Mock products data
const mockProduct: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'سماعات لاسلكية بلوتوث احترافية',
    description: 'سماعات لاسلكية عالية الجودة مع تقنية بلوتوث 5.0 وعمر بطارية يصل إلى 24 ساعة',
    price: 299,
    originalPrice: 450,
    discount: 34,
    rating: 4.8,
    reviews: 1250,
    images: ['/wireless-bluetooth-headphones.jpg', '/wireless-bluetooth-headphones.jpg'],
    category: 'electronics',
    inStock: true,
    colors: ['black', 'white', 'blue'],
    sizes: ['S', 'M', 'L', 'XL'],
    specs: {
      'تقنية الاتصال': 'Bluetooth 5.0',
      'عمر البطارية': '24 ساعة',
      'الوزن': '250 جرام',
      'الضمان': 'سنة واحدة',
    },
  },
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const product = mockProduct[params.id]

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch product',
      },
      { status: 500 }
    )
  }
}
