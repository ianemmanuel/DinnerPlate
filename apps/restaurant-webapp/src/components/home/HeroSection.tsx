import Link from "next/link";
import { Button } from "../ui/button";

export default function Home() {


  return (
    <main>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between">
          {/* Left Hero Text */}
            <div className="max-w-2xl text-white animate-fade-in pt-10 md:pt-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Become a food merchant and grow your revenue
            </h1>
            <p className="text-lg md:text-xl mb-8">
                Join thousands of successful restaurants delivering amazing food experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary text-white">
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button
                variant="outline"
                size="lg"
                className="text-black bg-white border-white"
                >
                Learn More
                </Button>
            </div>
            </div>
          {/* right card */}
            <div className="hidden md:flex w-full md:w-[480px] mt-12 md:mt-0">
            <div className="bg-white/95 shadow-2xl rounded-xl p-8 space-y-8 animate-slide-in-right backdrop-blur-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                Partner with Spicy 🌶️
                </h2>

                <div className="space-y-6">
                {/* Login */}
                <div>
                    <p className="text-base text-gray-600 mb-2">Already a partner?</p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full shadow-md text-gray-800 hover:text-black"
                      size="lg"
                    >
                      <Link href="/login">Login</Link>
                    </Button>
                </div>

                {/* Register */}
                <div>
                    <p className="text-base text-gray-600 mb-2">New here?</p>
                    <Button
                      asChild
                      className="w-full bg-primary text-white text-md hover:bg-primary/90"
                      size="lg"
                    >
                      <Link href="/register">Register your business</Link>
                    </Button>
                </div>

                {/* Become a Courier */}
                <div>
                    <p className="text-base text-gray-600 mb-2">Want to deliver with us?</p>
                    <Button
                      variant="ghost"
                      className="w-full text-primary text-md hover:bg-primary/10"
                      size="lg"
                    >
                    Become a Courier 🚴‍♂️
                    </Button>
                </div>
                </div>
            </div>
            </div>
        </div>
      </section>
    </main>
  );
}
