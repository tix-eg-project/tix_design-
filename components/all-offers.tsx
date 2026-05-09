'use client'

import { Package } from 'lucide-react'

export default function AllOffers() {
  const offers = [
    {
      id: 1,
      name: 'عرض خاصي',
      icon: '🎁'
    },
    {
      id: 2,
      name: 'Tatum Reese',
      icon: '📦'
    },
    {
      id: 3,
      name: 'عرض المدرعين',
      icon: '🛡️'
    }
  ]

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">كل العروض</h2>
        
        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 hover:bg-gray-200 transition-colors">
                <div className="text-4xl">{offer.icon}</div>
              </div>
              
              {/* Name */}
              <h3 className="text-gray-700 font-semibold text-base">{offer.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
