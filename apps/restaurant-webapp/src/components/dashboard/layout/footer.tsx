import Link from 'next/link'
import { Separator } from '@restaurant-webapp/components/ui/separator'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-sm font-medium">Dinner Plate</p>
            <p className="text-xs text-muted-foreground">
              Empowering restaurants and virtual kitchens with smart meal delivery & planning
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link href="/support" className="hover:text-foreground transition-colors">
              Support
            </Link>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="text-center text-xs text-muted-foreground">
          © {currentYear} Dinner plate. All rights reserved.
        </div>
      </div>
    </footer>
  )
}