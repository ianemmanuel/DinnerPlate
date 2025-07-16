// components/SuccessStories.tsx
export function SuccessStories() {
  const testimonials = [
    {
      name: "Chef Amina",
      role: "Owner, Nairobi Bites",
      image: "/images/chef-amina.jpg",
      quote: "Joining Spicy has transformed our business. We've seen a 40% increase in orders!",
    },
    {
      name: "Chef Kamau",
      role: "Head Chef, Mombasa Delights",
      image: "/images/chef-kamau.jpg",
      quote: "Spicy's platform is user-friendly and has expanded our customer base significantly.",
    },
    {
      name: "Chef Wanjiku",
      role: "Manager, Kisumu Eats",
      image: "/images/chef-wanjiku.jpg",
      quote: "The support from Spicy is exceptional. They truly care about our success.",
    },
  ];

  return (
    <section className="bg-muted py-20 px-4 md:px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Success Stories from Our Partners
        </h2>
        <p className="text-muted-foreground mb-12 max-w-xl mx-auto text-lg">
          Hear from some of our partners who have grown their businesses with Spicy.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {testimonial.name}
              </h3>
              <p className="text-primary mb-2">{testimonial.role}</p>
              <p className="text-muted-foreground text-sm">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
