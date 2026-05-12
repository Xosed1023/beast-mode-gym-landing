import heroImg from "@/assets/hero.jpg";

const stats = [
  { value: "24/7", label: "Energía Total" },
  { value: "1500+", label: "Atletas Activos" },
  { value: "50+", label: "Equipos Pro" },
  { value: "5★", label: "Calificación" },
];

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
      aria-label="Bienvenida"
    >
      {/* Animated grid */}
      <div
        className="absolute inset-0 bg-grid animate-grid-move opacity-60"
        aria-hidden="true"
      />
      {/* Hero image */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={heroImg}
          alt=""
          className="w-full h-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
      </div>

      {/* Glows */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[oklch(0.4_0.3_265)] blur-[120px] opacity-50"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[oklch(0.45_0.3_265)] blur-[120px] opacity-40"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.55_0.3_265/0.4)] bg-[oklch(0.55_0.3_265/0.1)] mb-6 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.25_142)] animate-pulse-neon" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Bogotá // San Cristóbal Sur
            </span>
          </div>

          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tight">
            <span className="block text-foreground">
              DESPIERTA
            </span>
            <span className="block text-neon-strong animate-flicker font-beast-b">
              LA BESTIA
            </span>
            <span className="block text-foreground/70 text-3xl sm:text-5xl lg:text-6xl mt-2 font-light tracking-widest">
              QUE LLEVAS DENTRO
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground font-body leading-relaxed">
            Más que un gimnasio. Una arena de transformación donde el sudor se
            convierte en poder y el límite se reescribe cada día.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#planes"
              className="group relative px-8 py-4 font-display font-bold uppercase tracking-wider bg-[oklch(0.38_0.28_265)] text-white rounded border border-[oklch(0.7_0.3_265)] glow-box hover:bg-[oklch(0.45_0.3_265)] transition-all"
            >
              Empieza Ahora
            </a>
            <a
              href="#ubicacion"
              className="px-8 py-4 font-display font-bold uppercase tracking-wider text-foreground rounded border border-border hover:border-[oklch(0.55_0.3_265)] hover:text-neon transition-all"
            >
              Visítanos
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-b border-[oklch(0.55_0.3_265/0.2)] bg-background/60 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[oklch(0.55_0.3_265/0.15)]">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`py-6 ${i === 0 ? "" : "pl-6"} pr-6`}
              >
                <dt className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display font-black text-3xl md:text-4xl text-neon">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
