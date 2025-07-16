"use client";

import { useRef, useState, useEffect } from 'react'
import { Button } from "@user-webapp/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CategoryCard from "@user-webapp/components/cards/CategoryCard"
import MealCard from "@user-webapp/components/cards/MealCard"
import RestaurantCard from "@user-webapp/components/cards/RestaurantCard"
import MealPlanCard from "@user-webapp/components/cards/MealPlanCard"

interface SliderProps {
  title: string;
  items: any[];
  viewAllHref: string;
  itemType: "category" | "meal" | "restaurant" | "mealPlan";
}

export default function Slider({ title, items, viewAllHref, itemType }: SliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const checkScrollable = () => {
      if (!sliderRef.current) return;
      const { scrollWidth, clientWidth, scrollLeft } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    };

    checkScrollable();
    const observer = new ResizeObserver(checkScrollable);
    observer.observe(sliderRef.current);
    sliderRef.current.addEventListener('scroll', checkScrollable);
    
    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener('scroll', checkScrollable);
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollTo({
      left: direction === 'left' ? sliderRef.current.scrollLeft - scrollAmount : sliderRef.current.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

const renderItem = (item: any, i: number) => {
  let card;
  switch (itemType) {
    case "category":
      card = <CategoryCard key={i} category={item} />;
      break;
    case "meal":
      card = <MealCard key={i} meal={item} />;
      break;
    case "restaurant":
      card = <RestaurantCard key={i} restaurant={item} />;
      break;
    case "mealPlan":
      card = <MealPlanCard key={i} plan={item} />;
      break;
    default:
      return null;
  }

  return (
    <div key={i} className="min-w-[280px] max-w-[320px] w-full flex-shrink-0">
      {card}
    </div>
  );
};


  return (
    <section className="container py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <Button variant="outline" asChild>
          <Link href={viewAllHref}>View All</Link>
        </Button>
      </div>
      <div className="relative">
        {showLeftArrow && (
          <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-inherit rounded-full p-2 shadow-md z-10" aria-label="Scroll left">
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {showRightArrow && (
          <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-inherit rounded-full p-2 shadow-md z-10" aria-label="Scroll right">
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
        <div ref={sliderRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {items.map((item, i) => renderItem(item, i))}
        </div>
      </div>
    </section>
  );
}
