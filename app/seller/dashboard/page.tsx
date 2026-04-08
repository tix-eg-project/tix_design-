'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Heart, MessageSquare, Package, TrendingUp, DollarSign, Users } from 'lucide-react'

const salesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 221 },
  { month: 'Mar', sales: 2000, orders: 229 },
  { month: 'Apr', sales: 2780, orders: 200 },
  { month: 'May', sales: 1890, orders: 229 },
  { month: 'Jun', sales: 2390, orders: 200 },
  { month: 'Jul', sales: 3490, orders: 310 },
]

const productPerformance = [
  { name: 'Best Sellers', value: 40 },
  { name: 'Average', value: 35 },
  { name: 'Low Sellers', value: 25 },
]

const COLORS = ['#F59E0B', '#D1D5DB', '#9CA3AF']

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Total Sales', value: '₩125,400', icon: DollarSign, color: 'bg-orange-100' },
    { label: 'Total Orders', value: '1,850', icon: Package, color: 'bg-blue-100' },
    { label: 'Total Customers', value: '3,200', icon: Users, color: 'bg-green-100' },
    { label: 'Growth Rate', value: '+24.5%', icon: TrendingUp, color: 'bg-purple-100' },
  ]

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">لوحة تحكم البائع</h1>
          <p className="text-gray-600">أهلاً وسهلاً بك في لوحة تحكمك</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-gray-800" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {['overview', 'products', 'orders', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'text-orange-500 border-orange-500'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'products' && 'المنتجات'}
                {tab === 'orders' && 'الطلبات'}
                {tab === 'messages' && 'الرسائل'}
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-6">المبيعات والطلبات</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#F59E0B" name="المبيعات" />
                  <Line type="monotone" dataKey="orders" stroke="#3B82F6" name="الطلبات" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-black mb-6">أداء المنتجات</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productPerformance}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productPerformance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-black mb-6">منتجاتك</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                      <p className="font-bold text-black">منتج #{item}</p>
                      <p className="text-sm text-gray-600">المبيعات: {1250 * item}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50">
                    تعديل
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-black mb-6">الطلبات الحديثة</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 text-sm font-bold text-black">رقم الطلب</th>
                    <th className="text-right py-3 text-sm font-bold text-black">العميل</th>
                    <th className="text-right py-3 text-sm font-bold text-black">المبلغ</th>
                    <th className="text-right py-3 text-sm font-bold text-black">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {['#ORD001', '#ORD002', '#ORD003'].map((order) => (
                    <tr key={order} className="border-b border-gray-200">
                      <td className="py-3 text-sm text-black font-medium">{order}</td>
                      <td className="py-3 text-sm text-gray-600">أحمد محمد</td>
                      <td className="py-3 text-sm text-black font-medium">₩1,250</td>
                      <td className="py-3">
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">مكتمل</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-black mb-6">الرسائل من العملاء</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((msg) => (
                <div key={msg} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-black">علي أحمد</p>
                    <p className="text-sm text-gray-600 mt-1">هل هذا المنتج متوفر الآن؟</p>
                    <p className="text-xs text-gray-500 mt-2">منذ ساعة</p>
                  </div>
                  <button className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50">
                    رد
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
