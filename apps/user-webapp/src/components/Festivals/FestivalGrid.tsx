import { FestivalCard } from "./FestivalCard"
import { FestivalGridProps } from "@user-webapp/types/festival"

export function FestivalGrid({ festivals }: FestivalGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {festivals.map((festival) => (
        <FestivalCard key={festival.id} festival={festival} />
      ))}
    </div>
  );
}