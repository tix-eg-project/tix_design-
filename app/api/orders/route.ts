import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, Order } from '@/lib/types'

// Mock orders storage
const orders: Record<string, Order[]> = {
  '1': [
    {
      id: '1001',
      userId: '1',
      items: [],
      subtotal: 299,
      shipping: 0,
      discount: 0,
      total: 299,
      status: 'delivered',
      shippingAddress: {
        street: 'شارع النيل',
        city: 'القاهرة',
        state: 'مصر',
        zipCode: '11111',
        country: 'مصر',
        fullName: 'أحمد محمد',
        phoneNumber: '01012345678',
      },
      paymentMethod: 'card',
      createdAt: new Date('2024-03-15'),
      updatedAt: new Date('2024-03-20'),
    },
  ],
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<Order[]>>> {
  try {
    const userId = request.headers.get('x-user-id') || '1'
    const userOrders = orders[userId] || []

    return NextResponse.json(
      {
        success: true,
        data: userOrders,
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch orders',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<Order>>> {
  try {
    const userId = request.headers.get('x-user-id') || '1'
    const body = await request.json()

    const newOrder: Order = {
      id: String(Date.now()),
      userId,
      items: body.items,
      subtotal: body.subtotal,
      shipping: body.shipping,
      discount: body.discount,
      total: body.total,
      status: 'processing',
      shippingAddress: body.shippingAddress,
      paymentMethod: body.paymentMethod,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (!orders[userId]) {
      orders[userId] = []
    }

    orders[userId].push(newOrder)

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create order',
      },
      { status: 500 }
    )
  }
}
