import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { MapPin } from "lucide-react"
import { CategoryGrid } from "@user-webapp/components/Categories/CategoryGrid"
import { Category } from "@user-webapp/types/category"



type CategoriesTabProps = {
  categories: Category[]
}

export function CategoriesTab({ categories }: CategoriesTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-500" /> Preferred Categories ({categories.length})
        </h2>
        <Button variant="outline" size="sm">Update Preferences</Button>
      </div>
      <CategoryGrid categories={categories} />
    </Card>
  )
}
