import { MapPin, Phone, Mail, Navigation } from "lucide-react";
import { Reveal } from "./Reveal";

export function Location() {
  return (
    <section id="ubicacion" className="relative py-24 md:py-32" aria-labelledby="ubicacion-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-neon mb-4">
              // 03 — Ubicación
            </p>
            <h2
              id="ubicacion-title"
              className="font-display font-black text-4xl md:text-6xl text-foreground"
            >
              ENCUÉNTRA<span className="text-neon-strong">NOS</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="h-full p-8 md:p-10 bg-card/50 backdrop-blur-sm border border-border rounded-lg space-y-8">
              <div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-6">
                  Información de contacto
                </h3>

                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 h-10 w-10 rounded border border-[oklch(0.55_0.3_265/0.4)] bg-[oklch(0.55_0.3_265/0.08)] flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-neon" />
                    </span>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Dirección
                      </p>
                      <p className="text-foreground mt-1">
                        Cll 11 Sur # 1 b 39 Este
                        <br />
                        San Cristóbal Sur, Bogotá
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 h-10 w-10 rounded border border-[oklch(0.55_0.3_265/0.4)] bg-[oklch(0.55_0.3_265/0.08)] flex items-center justify-center">
                      <Phone className="h-5 w-5 text-neon" />
                    </span>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Atención
                      </p>
                      <p className="text-foreground mt-1">Visítanos en horarios de apertura</p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <span className="flex-shrink-0 h-10 w-10 rounded border border-[oklch(0.55_0.3_265/0.4)] bg-[oklch(0.55_0.3_265/0.08)] flex items-center justify-center">
                      <Mail className="h-5 w-5 text-neon" />
                    </span>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                        Redes
                      </p>
                      <a
                        href="https://instagram.com/beast_mode_colombia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground mt-1 hover:text-neon transition-colors block"
                      >
                        @beast_mode_colombia
                      </a>
                    </div>
                  </li>
                </ul>
              </div>

              <a
                href="https://maps.app.goo.gl/wU2kdn1RBEz8Hk1Z8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 font-display font-bold uppercase tracking-wider bg-[oklch(0.38_0.28_265)] text-white rounded border border-[oklch(0.7_0.3_265)] glow-box hover:bg-[oklch(0.45_0.3_265)] transition-all"
              >
                <Navigation className="h-4 w-4" />
                Cómo llegar
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden border border-[oklch(0.55_0.3_265/0.3)] glow-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498!2d-74.0812!3d4.5741185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f995b98785e13%3A0xbb9e4d0e01befe1d!2sBeastMode%20Gym!5e0!3m2!1ses!2sco!4v1715000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación BeastMode Gym"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[oklch(0.55_0.3_265/0.3)]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
