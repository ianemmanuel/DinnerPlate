import { howItWorksSteps } from "@user-webapp/lib/data"

export default function HowItWorks() {
  return (
    <section className="container py-12">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
        How It Works
      </h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorksSteps.map((step, i) => (
          <div key={i} className="text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mx-auto">
              {i + 1}
            </div>
            <h3 className="mb-2 font-semibold">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}