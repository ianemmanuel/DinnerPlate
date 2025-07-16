export function FinalCTA() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Ready to grow with <span className="text-primary">Spicy</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join hundreds of commercial kitchens and restaurants already thriving with our platform. Let’s build something delicious together!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="#"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition duration-300"
          >
            Get Started
          </a>
          <a
            href="#"
            className="text-primary font-medium hover:underline text-base"
          >
            Learn more about becoming a partner →
          </a>
        </div>
      </div>
    </section>
  );
}
