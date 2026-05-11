import { Clock } from "lucide-react";
import { Reveal } from "./Reveal";

const schedule = [
  {
    day: "LUN — VIE",
    hours: "5:00 AM — 10:00 PM",
    note: "Jornada completa",
    todayIndex: [1, 2, 3, 4, 5],
  },
  {
    day: "SÁBADO",
    hours: "8:00 AM — 4:00 PM",
    note: "Energía de fin de semana",
    todayIndex: [6],
  },
  {
    day: "DOMINGO",
    hours: "8:00 AM — 2:00 PM",
    note: "Recovery & training",
    todayIndex: [0],
  },
];

export function Schedule() {
  const today = new Date().getDay();

  return (
    <section
      id="horarios"
      className="relative py-24 md:py-32"
      aria-labelledby="horarios-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
              // 01 — Horarios
            </p>
            <h2
              id="horarios-title"
              className="font-display font-black text-4xl md:text-6xl text-foreground flex items-end justify-center gap-3 flex-wrap"
            >
              <span>SIEMPRE</span>
              <span className="text-neon-strong font-beast-b leading-none">ACTIVOS</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Cuando tú estás listo, nosotros también. Encuéntranos abiertos casi cada hora del día.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {schedule.map((s, i) => {
            const isToday = s.todayIndex.includes(today);
            return (
              <Reveal key={s.day} delay={i * 100}>
                <article
                  className="group neon-top-border relative h-full p-8 bg-card/50 backdrop-blur-sm border border-border rounded-lg hover:border-[oklch(0.55_0.3_265/0.5)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-6">
                    <Clock className="h-8 w-8 text-neon opacity-60 group-hover:opacity-100 transition-opacity" />
                    {isToday && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[oklch(0.7_0.25_142/0.4)] bg-[oklch(0.7_0.25_142/0.08)]">
                        <span className="h-2 w-2 rounded-full bg-[oklch(0.7_0.25_142)] animate-pulse-neon" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[oklch(0.85_0.18_142)]">
                          Abierto hoy
                        </span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-xl tracking-wider text-foreground mb-2">
                    {s.day}
                  </h3>
                  <p className="font-mono text-2xl text-neon mb-3">{s.hours}</p>
                  <p className="text-sm text-muted-foreground">{s.note}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
