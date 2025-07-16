import Link from 'next/link'
import { Button } from '../ui/button'
import { UtensilsCrossed, Soup, CalendarCheck, ChartColumnStacked, DollarSign } from 'lucide-react'

export default function NavLinks() {
  return (
    <>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/meals" className="flex items-center gap-2">
          <Soup className="h-4 w-4" />
          <span>Meals</span>
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/meal-plans" className="flex items-center gap-2">
          <CalendarCheck className="h-4 w-4" />
          <span>Meal Plans</span>
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/restaurants" className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          <span>Restaurants</span>
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/restaurants" className="flex items-center gap-2">
          <ChartColumnStacked className="h-4 w-4" />
          <span>Categories</span>
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start" asChild>
        <Link href="/restaurants" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span>Deals</span>
        </Link>
      </Button>
    </>
  )
}