import { useState, useCallback, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Schedule } from "@/components/Schedule";
import { Plans } from "@/components/Plans";
import { Location } from "@/components/Location";
import { InstagramCTA } from "@/components/InstagramCTA";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";

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

const SPLASH_EVERY_RELOAD = import.meta.env.VITE_SPLASH_EVERY_RELOAD === "true";

function Index() {
  // Empieza siempre en false (server y cliente igual) → sin hydration mismatch.
  // useLayoutEffect salta el splash antes del primer paint si ya fue visto.
  const [splashDone, setSplashDone] = useState(false);

  useLayoutEffect(() => {
    if (!SPLASH_EVERY_RELOAD && sessionStorage.getItem("splashDone") === "true") {
      setSplashDone(true);
    }
  }, []);

  const handleSplashComplete = useCallback(() => {
    if (!SPLASH_EVERY_RELOAD) {
      sessionStorage.setItem("splashDone", "true");
    }
    setSplashDone(true);
  }, []);

  if (!splashDone) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <motion.div
      className="min-h-screen bg-background scanlines"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Navbar />
      <main>
        <Hero />
        <Schedule />
        <Plans />
        <Location />
        <InstagramCTA />
      </main>
      <Footer />
    </motion.div>
  );
}
