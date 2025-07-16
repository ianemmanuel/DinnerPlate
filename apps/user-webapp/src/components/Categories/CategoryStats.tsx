import { Card, CardContent, CardHeader, CardTitle } from "@user-webapp/components/ui/card";
import { Badge } from "@user-webapp/components/ui/badge";

interface CategoryStatsProps {
  category: {
    itemCount: number;
    createdBy: string;
    createdAt: string;
    tags: string[];
  };
}

export function CategoryStats({ category }: CategoryStatsProps) {
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
            <span className="font-medium">{category.createdBy}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Since</span>
            <span className="font-medium">{category.createdAt}</span>
          </div>
          
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-2">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {category.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}