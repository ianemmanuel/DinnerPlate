import { Star } from "lucide-react";

export const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        }
        if (i === fullStars && hasHalfStar) {
          return <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />;
        }
        return <Star key={i} className="w-4 h-4 fill-muted text-muted-foreground" />;
      })}
    </div>
  );
};