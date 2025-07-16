import { CheckCircle } from "lucide-react";

export function WhatYouGet() {
  const benefits = [
    {
      title: "Easy Order Management",
      description: "Manage incoming orders effortlessly with our intuitive dashboard.",
    },
    {
      title: "Real-Time Delivery Tracking",
      description: "Track your deliveries in real-time and keep customers informed.",
    },
    {
      title: "Reach New Customers",
      description: "Increase your restaurant’s visibility and attract new diners.",
    },
    {
      title: "Fast & Transparent Payouts",
      description: "Get paid quickly with full visibility into your earnings.",
    },
    {
      title: "24/7 Partner Support",
      description: "We're here for you anytime, with dedicated partner assistance.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
          What You Get with Spicy 🍽️
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto text-lg">
          We give you the tools to grow your kitchen, serve more customers, and succeed faster.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/40 transition"
            >
              <CheckCircle className="text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
