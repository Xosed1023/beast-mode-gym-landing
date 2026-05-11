import { Check } from "lucide-react";
import { Reveal } from "./Reveal";

const plans = [
  {
    name: "Básico",
    tagline: "Empieza tu camino",
    features: ["Acceso a sala de pesas", "Cardio ilimitado", "Vestidores", "Asesoría inicial"],
    popular: false,
  },
  {
    name: "Pro",
    tagline: "Lleva tu nivel arriba",
    features: [
      "Todo lo del Básico",
      "Clases grupales",
      "Plan nutricional básico",
      "Evaluación mensual",
      "Acceso 24/7",
    ],
    popular: true,
  },
  {
    name: "Elite",
    tagline: "Transformación total",
    features: [
      "Todo lo del Pro",
      "Entrenador personal",
      "Plan nutricional avanzado",
      "Suplementación guiada",
      "Acceso VIP",
    ],
    popular: false,
  },
];

export function Plans() {
  return (
    <section id="planes" className="relative py-24 md:py-32" aria-labelledby="planes-title">
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.4_0.3_265)] blur-[150px] opacity-30" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
              // 02 — Membresías
            </p>
            <h2
              id="planes-title"
              className="font-display font-black text-4xl md:text-6xl text-foreground"
            >
              ELIGE TU <span className="text-neon-strong">ARMA</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Tres caminos. Un solo objetivo: convertirte en la mejor versión de ti.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article
                className={`relative h-full flex flex-col p-8 rounded-lg border backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${
                  p.popular
                    ? "bg-[oklch(0.18_0.1_265/0.6)] border-[oklch(0.6_0.3_265)] glow-box lg:scale-105"
                    : "bg-card/50 border-border hover:border-[oklch(0.55_0.3_265/0.4)]"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[oklch(0.5_0.3_265)] border border-[oklch(0.7_0.3_265)] glow-box">
                    <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white">
                      ★ Más Popular
                    </span>
                  </div>
                )}

                <h3 className="font-display font-black text-3xl tracking-wider text-foreground">
                  {p.name.toUpperCase()}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.tagline}</p>

                <div className="my-8 py-6 border-y border-border/50">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-black text-5xl text-neon">$ —</span>
                    <span className="text-sm text-muted-foreground font-mono">/ mes</span>
                  </div>
                  <p className="mt-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground/70">
                    Precio por confirmar
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8" role="list">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground/90">
                      <Check className="h-5 w-5 flex-shrink-0 text-neon mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#ubicacion"
                  className={`block w-full py-3 text-center font-display font-bold uppercase tracking-wider rounded border transition-all ${
                    p.popular
                      ? "bg-[oklch(0.5_0.3_265)] border-[oklch(0.7_0.3_265)] text-white hover:bg-[oklch(0.55_0.3_265)]"
                      : "border-border text-foreground hover:border-[oklch(0.55_0.3_265)] hover:text-neon"
                  }`}
                >
                  Inscribirme
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
