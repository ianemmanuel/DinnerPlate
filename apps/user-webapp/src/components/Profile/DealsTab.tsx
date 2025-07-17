import { DealGrid } from "@user-webapp/components/Deals/DealGrid"
import { Tag } from "lucide-react"
import { Card } from "@user-webapp/components/ui/card"
import { Button } from "@user-webapp/components/ui/button"
import { Deal } from "@user-webapp/types/deal"


type DealsTabProps = {
  deals: Deal[]
}

export function DealsTab({ deals }: DealsTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Tag className="h-5 w-5 text-emerald-500" /> Saved Deals ({deals.length})
        </h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <DealGrid deals={deals} />
    </Card>
  )
}
