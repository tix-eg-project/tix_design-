"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Product {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
}

interface ProductCarouselProps {
  title: string
  products: Product[]
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  return (
    <section className="container mx-auto px-4 py-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full">
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}%
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-600 font-bold">{product.price} EGP</span>
                <span className="text-gray-400 line-through text-sm">{product.originalPrice} EGP</span>
              </div>
            </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
