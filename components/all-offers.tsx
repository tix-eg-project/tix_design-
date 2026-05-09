'use client'

import { Package } from 'lucide-react'

export default function AllOffers() {
  const offers = [
    {
      id: 1,
      name: 'عروض المدارس',
      icon: '🎓'
    },
    {
      id: 2,
      name: 'الجمعة البيضاء',
      icon: '💰'
    },
    {
      id: 3,
      name: 'عروض حصرية',
      icon: '⭐'
    },
    {
      id: 4,
      name: 'عروض يومية',
      icon: '🔥'
    },
    {
      id: 5,
      name: 'عروض الموضة',
      icon: '👗'
    },
    {
      id: 6,
      name: 'عروض الهواتف',
      icon: '📱'
    },
    {
      id: 7,
      name: 'عروض نوفمبر',
      icon: '🎉'
    },
    {
      id: 8,
      name: 'عروض الإلكترونيات',
      icon: '💻'
    },
    {
      id: 9,
      name: 'عروض الرياضة',
      icon: '⚽'
    }
  ]

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">كل العروض</h2>
        
        {/* Offers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col items-center text-center p-3 rounded-lg hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 hover:bg-gray-200 transition-colors">
                <div className="text-3xl">{offer.icon}</div>
              </div>
              
              {/* Name */}
              <h3 className="text-gray-700 font-semibold text-sm">{offer.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
