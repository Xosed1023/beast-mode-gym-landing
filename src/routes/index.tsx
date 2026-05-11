import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Schedule } from "@/components/Schedule";
import { Plans } from "@/components/Plans";
import { Location } from "@/components/Location";
import { InstagramCTA } from "@/components/InstagramCTA";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BeastMode Gym — Despierta la bestia que llevas dentro" },
      {
        name: "description",
        content:
          "BeastMode Gym en San Cristóbal Sur, Bogotá. Entrenamiento, planes flexibles y la mejor energía. Despierta la bestia que llevas dentro.",
      },
      { property: "og:title", content: "BeastMode Gym — Despierta la bestia" },
      {
        property: "og:description",
        content: "Gimnasio en San Cristóbal Sur, Bogotá. Entrena con la mejor energía.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background scanlines">
      <Navbar />
      <main>
        <Hero />
        <Schedule />
        <Plans />
        <Location />
        <InstagramCTA />
      </main>
      <Footer />
    </div>
  );
}
