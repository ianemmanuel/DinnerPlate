import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { DealCard } from "@user-webapp/components/Deals/DealCard";
import { Deal } from "@user-webapp/types/deal";

interface CategoryDealsProps {
  deals: Deal[];
}

export function CategoryDeals({ deals }: CategoryDealsProps) {
  return (
    <section className="mb-16 animate-fadeInUp delay-500">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Special Offers</h2>
        <Link href="/deals" className="text-primary flex items-center text-sm font-medium">
          View all deals <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}