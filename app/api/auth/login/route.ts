import { NextRequest, NextResponse } from 'next/server'
import type { ApiResponse, User } from '@/lib/types'

const DEMO_USER = {
  id: '1',
  email: 'demo@tix-eg.com',
  name: 'أحمد محمد',
  password: 'demo1234',
  createdAt: new Date(),
  updatedAt: new Date(),
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<User & { token: string }>>> {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 }
      )
    }

    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const { password: _, ...user } = DEMO_USER
      return NextResponse.json(
        {
          success: true,
          data: {
            ...user,
            token: 'demo-token-12345',
          },
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid email or password',
      },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Login failed',
      },
      { status: 500 }
    )
  }
}
