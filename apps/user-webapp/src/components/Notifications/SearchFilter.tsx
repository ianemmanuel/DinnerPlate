"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@user-webapp/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@user-webapp/components/ui/dropdown-menu";
import { Button } from "@user-webapp/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", searchInput);
    router.push(`?${params.toString()}`);
  };

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("filter", filter);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9 pr-4 py-2 h-9 w-[180px]"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 px-3">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleFilter("all")}>
            All
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter("order")}>
            Orders
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter("promotion")}>
            Promotions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter("support")}>
            Support
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}