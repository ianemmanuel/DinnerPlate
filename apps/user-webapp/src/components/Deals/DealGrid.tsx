import { DealCard } from "./DealCard"
import { DealGridProps } from "@user-webapp/types/deal"

export function DealGrid({ deals }: DealGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}