import Link from "next/link"
import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import { Badge } from "@user-webapp/components/ui/badge"
import { Button } from "@user-webapp/components/ui/button"
import { Tag, Calendar, Flame, Star, Zap } from "lucide-react"
import { toast } from "sonner"
import { Deal } from "@user-webapp/types/deal"

interface DealCardProps {
  deal: Deal
}

export function DealCard({ deal }: DealCardProps) {
  let linkUrl = '';
  let linkText = '';
  
  switch(deal.type) {
    case 'meal':
      linkUrl = `/meals/${deal.applicableToSlug}`;
      linkText = 'View Meals';
      break;
    case 'meal-plan':
      linkUrl = '/meal-plans'
      linkText = 'View Plans'
      break;
    case 'restaurant':
      linkUrl = `/restaurants/${deal.applicableToSlug}`;
      linkText = 'Visit Restaurant';
      break;
    case 'category':
      linkUrl = `/categories/${deal.applicableToSlug}`;
      linkText = 'Browse Category';
      break;
    case 'festival':
      linkUrl = '/festivals';
      linkText = 'View Festivals';
      break;
  }

  return (
    <div className="group relative">
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg border-2 border-primary/20 flex flex-col">
        <div className="aspect-[5/3] relative">
          <Image
            src={deal.image}
            alt={deal.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            <Badge className="bg-primary text-white">
              {deal.discount}
            </Badge>
            {deal.isFeatured && (
              <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {deal.isNew && (
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                New
              </Badge>
            )}
            {deal.isAlmostExpired && (
              <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white">
                <Flame className="w-3 h-3 mr-1" />
                Ending Soon
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h3 className="font-semibold text-lg">{deal.title}</h3>
          </div>
        </div>
        
        <div className="p-4 flex-grow flex flex-col">
          <div className="space-y-3 flex-grow">
            <p className="text-muted-foreground">{deal.description}</p>
            
            {deal.applicableTo && (
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Applies to: {deal.applicableTo}
                </span>
              </div>
            )}
            
            {deal.expires && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Expires: {new Date(deal.expires).toLocaleDateString()}
                </span>
              </div>
            )}
            
            {/* Always render promo code section to maintain spacing */}
            <div className="mt-2">
              {deal.code ? (
                <>
                  <p className="text-sm font-medium">Promo Code:</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-sm font-mono">
                      {deal.code}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(deal.code || '');
                        toast.success('Code copied to clipboard!');
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                </>
              ) : (
                <div className="h-[42px]"></div> // Maintains same height as promo code section
              )}
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button className="flex-1" size="sm" asChild>
              <Link href={linkUrl}>
                {linkText}
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => toast.success('Deal applied to your account!')}
            >
              Save Deal
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}