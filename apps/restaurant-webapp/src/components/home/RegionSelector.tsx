"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@restaurant-webapp/components/ui/dialog";
import { Input } from "@restaurant-webapp/components/ui/input";
import { Search } from "lucide-react";

const regions = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
  "Thika", "Malindi", "Kitale", "Garissa", "Kakamega"
];

export function RegionSelector({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRegions = regions.filter(region => 
    region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select your region</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search regions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {filteredRegions.map((region) => (
            <button
              key={region}
              className="p-3 text-left hover:bg-accent rounded-md transition-colors"
              onClick={() => onOpenChange(false)}
            >
              {region}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}