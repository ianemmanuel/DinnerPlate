// components/FAQSection.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@restaurant-webapp/lib/utils";

const faqs = [
  {
    question: "What is Spicy and how does it work?",
    answer:
      "Spicy connects restaurants and commercial kitchens with customers for seamless meal distribution. We handle the platform, you handle the food.",
  },
  {
    question: "How do I become a partner?",
    answer:
      "Click the 'Register' button above, fill out your business details, and we’ll review your application within 24-48 hours.",
  },
  {
    question: "What are the costs involved?",
    answer:
      "There are no upfront costs. We operate on a small commission for each successful order placed through the platform.",
  },
  {
    question: "Can I manage my orders and menu?",
    answer:
      "Absolutely. Our partner dashboard allows you to manage your meals, availability, and see real-time order analytics.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">FAQs</h2>
        <p className="mb-10 text-muted-foreground">
          Everything you need to know about partnering with Spicy.
        </p>

        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-muted hover:shadow-md transition"
            >
              <button
                onClick={() => toggleIndex(index)}
                className="flex justify-between w-full text-left items-center font-medium text-lg text-gray-800"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "transition-transform duration-300",
                    activeIndex === index && "rotate-180 text-primary"
                  )}
                />
              </button>
              {activeIndex === index && (
                <p className="mt-3 text-muted-foreground">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
