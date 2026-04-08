import { Truck, Shield, Headphones } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Fast and secure delivery across all of Egypt",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "Money back guarantee",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Customer service available around the clock",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
