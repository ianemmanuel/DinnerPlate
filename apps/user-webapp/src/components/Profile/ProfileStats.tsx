import { Card } from "@user-webapp/components/ui/card"
import { Heart, Tag, ScrollText, Utensils, MapPin } from "lucide-react"

interface Stats {
  wishlist: number
  savedDeals: number
  orders: number
  following: number
  preferredCategories: number
}

export function ProfileStats({ stats }: { stats: Stats }) {
  const items = [
    { icon: <Heart className="h-6 w-6 text-rose-500" />, label: "Wishlist", value: stats.wishlist },
    { icon: <Tag className="h-6 w-6 text-emerald-500" />, label: "Saved Deals", value: stats.savedDeals },
    { icon: <ScrollText className="h-6 w-6 text-amber-500" />, label: "Orders", value: stats.orders },
    { icon: <Utensils className="h-6 w-6 text-indigo-500" />, label: "Following", value: stats.following },
    { icon: <MapPin className="h-6 w-6 text-blue-500" />, label: "Categories", value: stats.preferredCategories },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {items.map((item) => (
        <Card key={item.label} className="p-4 text-center hover:shadow-md transition-shadow">
          <div className="flex justify-center mb-2">{item.icon}</div>
          <p className="text-2xl font-bold">{item.value}</p>
          <p className="text-sm text-muted-foreground">{item.label}</p>
        </Card>
      ))}
    </div>
  );
}
