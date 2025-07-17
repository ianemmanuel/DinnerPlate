import { Card, CardContent, CardHeader, CardTitle } from "@user-webapp/components/ui/card"
import { Badge } from "@user-webapp/components/ui/badge"
import { Category } from "@user-webapp/types/category"

interface CategoryStatsProps {
  category: Category;
}

export function CategoryStats({ category }: CategoryStatsProps) {
  const createdBy = category.restaurant
  const createdAt = "2024-01-01"

  return (
    <div>
      <Card className="sticky top-4">
        <CardHeader className="border-b">
          <CardTitle className="text-lg">Category Stats</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Items</span>
            <span className="font-medium">{category.itemCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Created By</span>
            <span className="font-medium">{createdBy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Since</span>
            <span className="font-medium">{createdAt}</span>
          </div>

          {category.tags?.length ? (
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Popular Tags</h4>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
