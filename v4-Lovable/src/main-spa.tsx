import { StrictMode, useState, useCallback, useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Schedule } from "@/components/Schedule";
import { Plans } from "@/components/Plans";
import { Location } from "@/components/Location";
import { InstagramCTA } from "@/components/InstagramCTA";
import { Footer } from "@/components/Footer";
import { SplashScreen } from "@/components/SplashScreen";
import "./styles.css";

const SPLASH_EVERY_RELOAD = import.meta.env.VITE_SPLASH_EVERY_RELOAD === "true";

function App() {
  const [splashDone, setSplashDone] = useState(false);

  useLayoutEffect(() => {
    if (
      !SPLASH_EVERY_RELOAD &&
      sessionStorage.getItem("splashDone") === "true"
    ) {
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
    <div className="min-h-screen bg-background scanlines">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <main>
          <Hero />
          <Schedule />
          <Plans />
          <Location />
          <InstagramCTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
