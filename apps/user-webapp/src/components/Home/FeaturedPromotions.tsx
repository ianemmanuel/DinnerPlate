"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockAds = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg",
    title: "BonApp: Wedding Packages 💍",
    subtitle: "Elegant catering for special moments",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/10508207/pexels-photo-10508207.jpeg",
    title: "SushiGo: Weekend Combo 🍣",
    subtitle: "Fresh rolls every Friday",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/2664216/pexels-photo-2664216.jpeg",
    title: "SweetTreats: Custom Cakes 🧁",
    subtitle: "Birthdays, weddings, and more",
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/2116094/pexels-photo-2116094.jpeg",
    title: "TacoFest: Fiesta Meals 🌮",
    subtitle: "Street tacos and more for events!",
  },
];

export default function FeaturedPromotions() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (!sliderRef.current) return;

    const checkScrollable = () => {
      const { scrollWidth, clientWidth, scrollLeft } = sliderRef.current!;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    };

    checkScrollable();

    const observer = new ResizeObserver(checkScrollable);
    observer.observe(sliderRef.current);
    sliderRef.current.addEventListener("scroll", checkScrollable);

    return () => {
      if (sliderRef.current) {
        sliderRef.current.removeEventListener("scroll", checkScrollable);
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollTo({
      left:
        direction === "left"
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-muted/20 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          🎯 Featured Promotions
        </h2>
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-inherit rounded-full p-2 shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-inherit rounded-full p-2 shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mockAds.map((ad, index) => (
              <div
                key={`${ad.id}-${index}`}
                className="min-w-[260px] bg-card rounded-lg shadow-sm border hover:shadow-md transition-all"
              >
                <Image
                  src={ad.image}
                  alt={ad.title}
                  width={260}
                  height={150}
                  className="w-full h-36 object-cover rounded-t-lg"
                />
                <div className="p-3 text-foreground">
                  <h3 className="font-medium">{ad.title}</h3>
                  <p className="text-sm text-muted-foreground">{ad.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
