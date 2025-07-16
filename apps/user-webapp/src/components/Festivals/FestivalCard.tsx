import Link from "next/link"
import Image from "next/image"
import { Card } from "@user-webapp/components/ui/card"
import { Badge } from "@user-webapp/components/ui/badge"
import { Button } from "@user-webapp/components/ui/button"
import { Calendar, Clock, Ticket, MapPin, Star, Zap, AlertTriangle } from "lucide-react"
import { Festival } from "@user-webapp/types/festival"

interface FestivalCardProps {
  festival: Festival;
}

export function FestivalCard({ festival }: FestivalCardProps) {
  const slug = festival.name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="group relative">
      <Card className="overflow-hidden h-full transition-shadow hover:shadow-lg">
        {/* Invisible overlay link */}
        <Link 
          href={`/festivals/${slug}`}
          className="absolute inset-0 z-0"
          aria-hidden="true"
        />
        
        <div className="aspect-[4/3] relative">
          <Image
            src={festival.image}
            alt={festival.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Creative Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
            {festival.isPlatformEvent && (
              <Badge className="bg-green-500 text-white">
                Dinner Plate
              </Badge>
            )}
            {festival.isFeatured && (
              <Badge className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            )}
            {festival.isSponsored && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                <Star className="w-3 h-3 mr-1" />
                Sponsored
              </Badge>
            )}
            {festival.isAlmostSoldOut && (
              <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Almost Sold Out
              </Badge>
            )}
            {festival.isHappeningSoon && (
              <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Happening Soon
              </Badge>
            )}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <h3 className="font-semibold text-lg">{festival.name}</h3>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Calendar className="h-4 w-4" />
              <span>{festival.date}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-3 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{festival.location}</span>
            </div>
            <Badge variant="outline" className="text-sm">
              {festival.price === "Free" ? "Free Entry" : `From ${festival.price}`}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `/restaurants/${festival.organizerSlug}`;
              }}
              className="text-sm text-muted-foreground hover:underline line-clamp-1 text-left"
            >
              By {festival.organizer}
            </button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{festival.time}</span>
            </div>
          </div>
          
          {/* Always render this div to maintain consistent spacing */}
          <div className="h-6">
            {festival.ticketsLeft && festival.ticketsLeft < 50 && (
              <div className="flex items-center gap-2 text-sm">
                <Ticket className="h-4 w-4 text-orange-500" />
                <span className="text-orange-500">
                  Only {festival.ticketsLeft} tickets left
                </span>
              </div>
            )}
          </div>
          
          {festival.tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {festival.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs bg-gray-100/80 backdrop-blur-sm"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <Button className="w-full mt-3" size="sm" onClick={(e) => e.preventDefault()}>
            {festival.price === "Free" ? "Get Tickets" : "Book Now"}
          </Button>
        </div>
      </Card>
    </div>
  );
}