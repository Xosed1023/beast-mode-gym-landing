import logo from "@/assets/logo.jpg";
import { Instagram, MapPin } from "lucide-react";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#horarios", label: "Horarios" },
  { href: "#planes", label: "Planes" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[oklch(0.55_0.3_265/0.2)] bg-background/80 backdrop-blur-sm" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo BeastMode Gym" className="h-12 w-12 rounded-full object-cover border border-[oklch(0.55_0.3_265/0.5)]" width={48} height={48} />
            <div>
              <p className="font-display font-black text-lg tracking-widest text-neon">
                BEAST<span className="text-foreground">MODE</span>
              </p>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Gym // Bogotá
              </p>
            </div>
          </div>

          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap justify-start md:justify-center gap-x-6 gap-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm uppercase tracking-wider text-muted-foreground hover:text-neon transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex md:justify-end items-center gap-3">
            <a
              href="https://maps.app.goo.gl/QwfLKq4GPdfSsbFU8"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded border border-border text-muted-foreground hover:text-neon hover:border-[oklch(0.55_0.3_265/0.5)] transition-colors"
              aria-label="Ubicación en Google Maps"
            >
              <MapPin className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com/beast_mode_colombia"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded border border-border text-muted-foreground hover:text-neon hover:border-[oklch(0.55_0.3_265/0.5)] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} BeastMode Gym.
          </p>
          <p className="text-xs font-mono text-muted-foreground/70">
            Despierta. Entrena. Domina.
          </p>
        </div>
      </div>
    </footer>
  );
}
