// components/WhyPartner.tsx
export function WhyPartner() {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Partner with <span className="text-primary">Spicy</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            We make it easy for restaurants and commercial kitchens to thrive with powerful tools, seamless logistics, and unmatched visibility.
          </p>

          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-semibold text-gray-900">Grow Your Reach</p>
                <p className="text-muted-foreground">Access a wide base of customers looking for quality meals & meal plans.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl">🛠️</span>
              <div>
                <p className="font-semibold text-gray-900">Tools That Work for You</p>
                <p className="text-muted-foreground">Manage orders, track earnings, and update menus with ease using our Partner Dashboard.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-semibold text-gray-900">We Handle the Heavy Lifting</p>
                <p className="text-muted-foreground">From deliveries to customer support, Spicy has your back.</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Image */}
        <div className="w-full max-w-md mx-auto md:max-w-full">
          <img
            src="https://illustrations.popsy.co/gray/chef-serving-food.svg"
            alt="Partner with Spicy"
            className="w-full h-auto object-contain animate-fade-in"
          />
        </div>
      </div>
    </section>
  );
}
