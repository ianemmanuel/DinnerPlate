export function SupportCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center gap-10">
        {/* Image - smaller and neatly styled */}
        <div className="w-full md:w-1/2 max-w-sm rounded-xl overflow-hidden shadow-md border mx-auto md:mx-0">
          <img
            src="https://images.pexels.com/photos/8867481/pexels-photo-8867481.jpeg"
            alt="Support team"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text + Contact Info */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Need Help? We’re here for you.
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Our friendly support team is ready to assist you. Get in touch anytime.
          </p>

          <div className="mb-6 space-y-2">
            <p className="flex items-center justify-center md:justify-start gap-2 text-base text-gray-700">
              📧 <span>Email:</span>
              <a href="mailto:support@spicyapp.com" className="text-primary underline hover:text-primary/80">
                support@spicyapp.com
              </a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2 text-base text-gray-700">
              📞 <span>Phone:</span>
              <a href="tel:+254712345678" className="text-primary underline hover:text-primary/80">
                +254 712 345 678
              </a>
            </p>
          </div>

          <a
            href="mailto:support@spicyapp.com"
            className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow hover:shadow-lg transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
