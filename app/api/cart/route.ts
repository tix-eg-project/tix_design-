import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, CartItem } from '@/lib/types'

// Mock cart storage - في الإنتاج استخدم database
const carts: Record<string, CartItem[]> = {}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<CartItem[]>>> {
  try {
    const userId = request.headers.get('x-user-id') || 'guest'
    const cart = carts[userId] || []

    return NextResponse.json(
      {
        success: true,
        data: cart,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch cart',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<CartItem[]>>> {
  try {
    const userId = request.headers.get('x-user-id') || 'guest'
    const body = await request.json()
    const { productId, name, price, quantity, image } = body

    if (!carts[userId]) {
      carts[userId] = []
    }

    const existingItem = carts[userId].find((item) => item.productId === productId)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      carts[userId].push({
        id: String(Date.now()),
        productId,
        name,
        price,
        quantity,
        image,
      })
    }

    return NextResponse.json(
      {
        success: true,
        data: carts[userId],
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to add to cart',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse<ApiResponse<CartItem[]>>> {
  try {
    const userId = request.headers.get('x-user-id') || 'guest'
    const body = await request.json()
    const { itemId } = body

    if (!carts[userId]) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cart not found',
        },
        { status: 404 }
      )
    }

    carts[userId] = carts[userId].filter((item) => item.id !== itemId)

    return NextResponse.json(
      {
        success: true,
        data: carts[userId],
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to remove item from cart',
      },
      { status: 500 }
    )
  }
}
