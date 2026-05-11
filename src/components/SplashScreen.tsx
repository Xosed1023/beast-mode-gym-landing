import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

type Phase = "init" | "beast" | "mode" | "controls" | "exit";

const PHASES: Phase[] = ["init", "beast", "mode", "controls", "exit"];

const SPEED = Math.max(
  0.1,
  parseFloat(import.meta.env.VITE_SPLASH_DURATION ?? "1") || 1,
);
const STAY = import.meta.env.VITE_SPLASH_STAY === "false";

const ms = (base: number) => Math.round(base * SPEED);

// Framer Motion keyframes que replican beast-appear sin letterSpacing
const beastEnterKeyframes = {
  opacity: [0, 0.7, 0.4, 0.9, 0.85, 1],
  filter: [
    "blur(12px)",
    "blur(6px)",
    "blur(8px)",
    "blur(2px)",
    "blur(0px)",
    "blur(0px)",
  ],
  x: [-8, 5, -3, 2, 0, 0],
  scaleX: [1.04, 0.98, 1.02, 1, 1, 1],
};

const beastEnterTimes = [0, 0.15, 0.3, 0.5, 0.7, 1];

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>("init");
  const [toggleOn, setToggleOn] = useState(false);

  const isVisible = (min: Phase) =>
    PHASES.indexOf(phase) >= PHASES.indexOf(min);

  // Secuencia principal de fases
  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      timers = [
        setTimeout(() => !cancelled && setPhase("beast"), ms(300)),
        setTimeout(() => !cancelled && setPhase("mode"), ms(700)),
        setTimeout(() => !cancelled && setPhase("controls"), ms(1000)),
        ...(!STAY
          ? [
              setTimeout(() => !cancelled && setPhase("exit"), ms(2800)),
              setTimeout(() => !cancelled && onComplete(), ms(3500)),
            ]
          : []),
      ];
    };

    const ready =
      "fonts" in document
        ? Promise.all([
            document.fonts.load('1em "Act of Rejection"'),
            document.fonts.load('1em "Another America"'),
          ])
        : Promise.resolve();

    const fallback = new Promise<void>((res) => setTimeout(res, 800));
    Promise.race([ready, fallback]).then(run);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  // Toggle automático cuando aparecen los controles
  useEffect(() => {
    if (phase === "controls") {
      const t = setTimeout(() => setToggleOn(true), ms(350));
      return () => clearTimeout(t);
    }
  }, [phase]);

  const isExit = phase === "exit";

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "oklch(0.04 0.01 264)" }}
      initial={{ opacity: 0 }}
      animate={
        isExit
          ? { opacity: 0, filter: "blur(8px)", scale: 1.04 }
          : { opacity: 1, filter: "blur(0px)", scale: 1 }
      }
      transition={
        isExit
          ? { duration: 0.7, ease: "easeIn" }
          : { duration: 0.6, ease: "easeOut" }
      }
    >
      {/* Viñeta */}
      <div className="absolute inset-0 splash-vignette pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute inset-0 splash-ambient-glow pointer-events-none" />

      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.35,
          background:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, oklch(0.55 0.3 265 / 0.025) 2px, oklch(0.55 0.3 265 / 0.025) 3px)",
        }}
      />

      {/* Contenido central — siempre en DOM para evitar layout shifts */}
      <div className="relative flex flex-col items-center select-none">
        {/* BEAST — reserva espacio desde el inicio, se revela con Framer Motion */}
        <motion.h1
          className="leading-none uppercase font-beast-b text-beast-glow-intense neon-flicker-beast"
          style={{ fontSize: "clamp(5rem, 18vw, 20rem)" }}
          initial={{ opacity: 0, filter: "blur(12px)", x: -8, scaleX: 1.04 }}
          animate={
            isVisible("beast")
              ? beastEnterKeyframes
              : { opacity: 0, filter: "blur(12px)", x: -8, scaleX: 1.04 }
          }
          transition={
            isVisible("beast")
              ? { duration: 0.9, ease: "easeOut", times: beastEnterTimes }
              : { duration: 0 }
          }
        >
          BEAST
        </motion.h1>

        {/* MODE — Bebas Neue, estilo neon tube como la referencia */}
        <motion.p
          className="neon-flicker-mode"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 11vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "0.12em",
            color: "oklch(0.97 0.06 240)",
            WebkitTextStroke: "1.5px oklch(0.88 0.14 255)",
            marginTop: "0.1em",
          }}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={
            isVisible("mode")
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 10, filter: "blur(4px)" }
          }
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
        >
          MODE
        </motion.p>

        {/* Toggle pill — reserva espacio, entra con fade */}
        <motion.div
          className="mt-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isVisible("controls") ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          {/* Track */}
          <motion.div
            style={{
              position: "relative",
              width: 200,
              height: 88,
              borderRadius: 44,
              backgroundColor: toggleOn
                ? "oklch(0.22 0.04 264)"
                : "oklch(0.07 0.02 264)",
              border: "2px solid",
              borderColor: toggleOn
                ? "oklch(0.88 0.04 240 / 0.9)"
                : "oklch(0.45 0.05 264 / 0.5)",
              transition:
                "background-color 500ms ease, border-color 500ms ease",
            }}
            animate={
              toggleOn
                ? {
                    boxShadow: [
                      "0 0 12px oklch(0.9 0.04 240 / 0.4), 0 0 28px oklch(0.8 0.06 250 / 0.2)",
                      "0 0 20px oklch(0.95 0.04 240 / 0.6), 0 0 44px oklch(0.85 0.06 250 / 0.3)",
                      "0 0 12px oklch(0.9 0.04 240 / 0.4), 0 0 28px oklch(0.8 0.06 250 / 0.2)",
                    ],
                  }
                : { boxShadow: "0 0 4px oklch(0.3 0.02 264 / 0.2)" }
            }
            transition={
              toggleOn
                ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.3 }
            }
          >
            {/* Glow fill — crece con el thumb */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 44,
                background:
                  "linear-gradient(90deg, transparent 40%, oklch(0.92 0.04 240 / 0.08) 100%)",
                pointerEvents: "none",
              }}
              animate={{ opacity: toggleOn ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Thumb */}
            <motion.div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                width: 68,
                height: 68,
                borderRadius: "50%",
                background: toggleOn
                  ? "radial-gradient(circle at 38% 36%, oklch(1 0 0), oklch(0.82 0.04 240))"
                  : "radial-gradient(circle at 38% 36%, oklch(0.42 0.04 264), oklch(0.26 0.03 264))",
                transition: "background 400ms ease",
              }}
              animate={{
                x: toggleOn ? 108 : 0,
                boxShadow: toggleOn
                  ? [
                      "0 0 10px oklch(0.95 0.04 240 / 0.7), 0 0 22px oklch(0.88 0.04 240 / 0.4)",
                      "0 0 16px oklch(1 0 0 / 0.8), 0 0 32px oklch(0.9 0.04 240 / 0.5)",
                      "0 0 10px oklch(0.95 0.04 240 / 0.7), 0 0 22px oklch(0.88 0.04 240 / 0.4)",
                    ]
                  : "0 0 0px transparent",
              }}
              transition={{
                x: { type: "spring", stiffness: 160, damping: 20 },
                boxShadow: toggleOn
                  ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.3 },
              }}
            />

            {/* Puntos indicadores OFF / ON */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingInline: 20,
                pointerEvents: "none",
              }}
            >
              {/* Punto izquierdo — visible cuando está OFF */}
              <motion.div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "oklch(0.5 0.03 264)",
                }}
                animate={{ opacity: toggleOn ? 0 : 0.5 }}
                transition={{ duration: 0.3 }}
              />
              {/* Punto derecho — brilla blanco cuando está ON */}
              <motion.div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "oklch(0.95 0.02 240)",
                }}
                animate={{
                  opacity: toggleOn ? 1 : 0.15,
                  boxShadow: toggleOn
                    ? "0 0 6px oklch(1 0 0 / 0.8), 0 0 12px oklch(0.9 0.04 240 / 0.5)"
                    : "none",
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
