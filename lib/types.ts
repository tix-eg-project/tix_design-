// Product Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  images: string[]
  category: string
  inStock: boolean
  colors?: string[]
  sizes?: string[]
  specs?: Record<string, string>
}

// Cart Types
export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
}

// Order Types
export interface Order {
  id: string
  userId: string
  items: CartItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

// User Types
export interface User {
  id: string
  email: string
  name: string
  password?: string
  phone?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

// Address Type
export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  fullName: string
  phoneNumber: string
}

// Review Type
export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title: string
  comment: string
  images?: string[]
  createdAt: Date
  helpful: number
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
