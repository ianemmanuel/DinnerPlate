import { Card } from "@user-webapp/components/ui/card";
import { Button } from "@user-webapp/components/ui/button";
import { Utensils } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Restaurant } from "@user-webapp/types/restaurant";


type FollowingTabProps = {
  restaurants: Restaurant[]
}

export function FollowingTab({ restaurants }: FollowingTabProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Utensils className="h-5 w-5 text-indigo-500" /> Following ({restaurants.length})
        </h2>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div className="space-y-4">
        {restaurants.map((r) => (
          <div key={r.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={r.image}
                alt={r.name}
                width={48}
                height={48}
                className="rounded-md object-cover"
              />
              <div>
                <h3 className="font-medium">{r.name}</h3>
                <p className="text-sm text-muted-foreground">{r.cuisine}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.success(`Unfollowed ${r.name}`)}
            >
              Unfollow
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
