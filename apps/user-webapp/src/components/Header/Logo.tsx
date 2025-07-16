import Link from 'next/link'
import { ChefHat } from 'lucide-react'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <ChefHat className="h-8 w-8 text-primary" />
      <span className="hidden lg:flex text-2xl font-bold text-primary">Spicy</span>
    </Link>
  )
}