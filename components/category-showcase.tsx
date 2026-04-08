import { Card } from "@/components/ui/card"

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Yolando Sawyer",
      image: "/power-drill-icon.jpg",
    },
    {
      name: "offer now",
      image: "/discount-tag-icon.png",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">كل العروض</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-semibold text-center">{category.name}</h3>
          </Card>
        ))}
      </div>
    </section>
  )
}
