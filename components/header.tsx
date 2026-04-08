'use client'

import Link from "next/link"
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
    <header className="bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span className="text-sm font-semibold hidden sm:inline">{user.name}</span>
                </button>
                {showMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-black border border-white/10 rounded-lg shadow-lg z-50 min-w-48">
                    <Link href="/account" className="block px-4 py-2 text-sm hover:bg-white/10">
                      حسابي
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm hover:bg-white/10">
                      طلباتي
                    </Link>
                    <Link href="/account/returns" className="block px-4 py-2 text-sm hover:bg-white/10">
                      الإرجاع
                    </Link>
                    <Link href="/account/reviews" className="block px-4 py-2 text-sm hover:bg-white/10">
                      التقييمات
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-right px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2 text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      تسجيل الخروج
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-white border-gray-300 text-black placeholder:text-gray-500 pr-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <div className="bg-white rounded-full p-2">
              <div className="text-black font-bold text-xl">TIX</div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
