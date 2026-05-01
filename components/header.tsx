'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Search, ShoppingCart, Heart, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAuthToken, clearAuthToken, LoggedInUser } from "@/lib/auth"

export function Header() {
  const [user, setUser] = useState<LoggedInUser | null>(null)
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        const authData = JSON.parse(token)
        setUser(authData)
      } catch {
        // Invalid token
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="bg-white text-black border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4 gap-4">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image 
              src="/tix-logo.png" 
              alt="TIX Logo" 
              width={80} 
              height={80}
              className="h-14 w-auto"
            />
          </Link>

          {/* Search Bar in the middle */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-black border-black text-white placeholder:text-gray-400 pr-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-semibold hidden sm:inline">{user.name}</span>
                </button>
                {showMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-48">
                    <Link href="/account" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      حسابي
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      طلباتي
                    </Link>
                    <Link href="/account/returns" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      الإرجاع
                    </Link>
                    <Link href="/account/reviews" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      التقييمات
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-right px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-500"
                    >
                      <LogOut className="h-4 w-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-black hover:bg-gray-100 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
