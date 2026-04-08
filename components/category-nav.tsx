import Link from "next/link"

export default function CategoryNav() {
  const categories = [
    { name: "الإلكترونيات", nameEn: "Electronics" },
    { name: "الأزياء", nameEn: "Fashion" },
    { name: "المنزل والمطبخ", nameEn: "Home & Kitchen" },
    { name: "الكتب", nameEn: "Books" },
    { name: "الألعاب", nameEn: "Toys" },
    { name: "الرياضة", nameEn: "Sports" },
    { name: "الجمال", nameEn: "Beauty" },
    { name: "الأطفال", nameEn: "Baby" },
    { name: "الأثاث", nameEn: "Furniture" },
    { name: "البقالة", nameEn: "Grocery" },
    { name: "السيارات", nameEn: "Automotive" },
    { name: "الحدائق", nameEn: "Garden" },
  ]

  return (
    <section className="bg-muted/30 border-b">
      <div className="container mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto py-3 scrollbar-hide">
          <Link href="/offers/promotions" className="text-sm font-bold whitespace-nowrap text-primary hover:text-primary/80 transition-colors">
            عروضنا
          </Link>
          {categories.map((category) => (
            <Link
              key={category.nameEn}
              href={`/category/${category.nameEn.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium whitespace-nowrap hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
