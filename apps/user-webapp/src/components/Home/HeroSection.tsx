"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";

const slides = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
    title: "🔥 20% Off This Week!",
    subtitle: "On all meal plans above KES 2,500.",
    ctaText: "Browse Meal Plans",
    ctaLink: "/meal-plans",
    tag: "Limited Time",
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg",
    title: "🍰 SweetTreats: Party Catering",
    subtitle: "Elegant cakes and desserts for every event.",
    ctaText: "Book Now",
    ctaLink: "/events",
    tag: "Sponsored",
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
    title: "🎉 Festival Week Deals",
    subtitle: "Celebrate with exclusive chef-made meals.",
    ctaText: "Explore Deals",
    ctaLink: "/festivals",
    tag: "New",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const setSlide = (index: number) => setCurrent(index);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => nextSlide(), 8000);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);


  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={slide.id}
            className={clsx(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover brightness-50"
              priority
            />

            {/* Slide Tag */}
            {slide.tag && (
              <div className="absolute top-6 left-6 bg-destructive text-white px-4 py-1 rounded-full text-sm font-medium z-20 shadow-md">
                {slide.tag}
              </div>
            )}

            {/* Animated Text Content */}
            {isActive && (
              <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
                <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-4xl animate-fadeInUp delay-100">
                  {slide.title}
                </h1>
                <p className="mb-6 text-lg text-gray-200 max-w-xl animate-fadeInUp delay-300">
                  {slide.subtitle}
                </p>
                <div className="animate-fadeInUp delay-500">
                  <Button
                    size="lg"
                    className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm"
                    asChild
                  >
                    <Link href={slide.ctaLink}>{slide.ctaText}</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white backdrop-blur-md"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white backdrop-blur-md"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlide(index)}
            className={clsx(
              "h-2 w-2 rounded-full transition-all",
              index === current ? "bg-white scale-110" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
