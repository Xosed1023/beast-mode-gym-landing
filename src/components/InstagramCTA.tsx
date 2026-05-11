import { Instagram } from "lucide-react";
import { Reveal } from "./Reveal";

export function InstagramCTA() {
  return (
    <section
      id="contacto"
      className="relative py-24 md:py-32"
      aria-labelledby="ig-title"
    >
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/2 h-112 w-md -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-30"
        style={{
          background:
            "radial-gradient(circle, oklch(0.52 0.3 320 / 0.75) 0%, oklch(0.42 0.3 265 / 0.45) 45%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <a
            href="https://instagram.com/beast_mode_colombia"
            target="_blank"
            rel="noopener noreferrer"
            className="group neon-top-border relative block overflow-hidden rounded-2xl border border-[oklch(0.55_0.3_265/0.35)] bg-[linear-gradient(135deg,oklch(0.16_0.07_264/0.96)_0%,oklch(0.14_0.08_290/0.96)_40%,oklch(0.12_0.08_320/0.92)_100%)] p-10 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[oklch(0.7_0.28_320/0.7)] glow-box md:p-16"
            style={{
              boxShadow:
                "0 0 24px oklch(0.5 0.3 265 / 0.3), 0 0 60px oklch(0.48 0.3 320 / 0.18), inset 0 0 24px oklch(0.55 0.3 265 / 0.08)",
            }}
            aria-labelledby="ig-title"
          >
            <div
              className="absolute inset-0 bg-grid opacity-25 mix-blend-screen"
              aria-hidden="true"
            />
            <div
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-60"
              style={{ background: "oklch(0.58 0.3 320 / 0.28)" }}
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 left-10 h-48 w-48 rounded-full blur-3xl opacity-50"
              style={{ background: "oklch(0.5 0.28 265 / 0.2)" }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-x-0 top-0 h-px opacity-70"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, oklch(0.78 0.25 320) 20%, oklch(0.7 0.3 265) 50%, oklch(0.78 0.25 320) 80%, transparent 100%)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-6 md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[oklch(0.72_0.24_320/0.5)] bg-[linear-gradient(180deg,oklch(0.24_0.1_300/0.9),oklch(0.18_0.08_265/0.95))] shadow-[0_0_30px_oklch(0.56_0.3_320/0.35)] md:h-24 md:w-24">
                <Instagram className="h-8 w-8 text-white drop-shadow-[0_0_12px_oklch(0.8_0.18_320)] md:h-12 md:w-12" />
              </div>
              <div className="min-w-0">
                <h2
                  id="ig-title"
                  className="font-display font-black text-foreground leading-tight"
                >
                  <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                    SIGUE A
                  </span>
                  <span className="block text-neon-strong text-xl sm:text-2xl md:text-4xl lg:text-5xl break-all font-beast-b">
                    @BEAST_MODE_COLOMBIA
                  </span>
                </h2>
                <p className="mt-3 max-w-md text-sm md:text-base leading-relaxed text-muted-foreground">
                  Rutinas, transformaciones y descargas diarias de energía. El
                  feed también entrena fuerte.
                </p>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
