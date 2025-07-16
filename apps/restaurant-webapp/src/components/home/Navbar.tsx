"use client";

import { useEffect, useState } from "react";
import { Button } from "@restaurant-webapp/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@restaurant-webapp/components/ui/sheet";
import { cn } from "@restaurant-webapp/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { RegionSelector } from "./RegionSelector";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTextColor = scrolled ? "text-black" : "text-white";
  const borderColor = scrolled ? "border-black" : "border-white";

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className={cn("font-bold text-2xl", navTextColor)}>
            Spicy 🌶️
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className={cn("hover:text-primary", navTextColor)}
              onClick={() => setIsRegionSelectorOpen(true)}
            >
              Regions
            </Button>
            <Button variant="ghost" className={cn("hover:text-primary", navTextColor)}>
              Support
            </Button>

            <Button asChild variant="default" className={cn("hover:text-white")}>
              <Link href="/register">Sign Up</Link>
            </Button>

            <Button
              variant="outline"
              className={cn(
                "bg-transparent hover:bg-white hover:text-black",
                navTextColor,
                borderColor
              )}
            >
              <Menu className="w-9 h-9" />
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className={cn("bg-transparent", navTextColor)}
              >
                <Menu className="w-7 h-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 pt-6">
                <Button
                  variant="ghost"
                  className={cn("justify-start", navTextColor)}
                  onClick={() => setIsRegionSelectorOpen(true)}
                >
                  Regions
                </Button>
                <Button
                  variant="ghost"
                  className={cn("justify-start", navTextColor)}
                >
                  Support
                </Button>
                <Button asChild variant="default" className="justify-start">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      <RegionSelector
        open={isRegionSelectorOpen}
        onOpenChange={setIsRegionSelectorOpen}
      />
    </>
  );
}