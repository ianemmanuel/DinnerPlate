// components/HowItWorks.tsx
export function HowItWorks() {
  const steps = [
    {
      icon: "📝",
      title: "Sign Up",
      description: "Create your partner account in just a few clicks.",
    },
    {
      icon: "🍳",
      title: "Set Up Your Kitchen",
      description: "Add your meals, set availability, and configure delivery.",
    },
    {
      icon: "📦",
      title: "Start Receiving Orders",
      description: "We’ll handle the logistics so you can focus on cooking.",
    },
  ];

  return (
    <section className="bg-muted py-20 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          How It Works
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg">
          Partnering with Spicy is as easy as 1, 2, 3. Here’s what the journey looks like:
        </p>

        <div className="grid md:grid-cols-3 gap-10 text-left">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
