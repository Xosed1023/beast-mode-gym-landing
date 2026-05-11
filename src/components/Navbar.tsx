import { useEffect, useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import logo from "@/assets/logo.jpg";

const links = [
  { href: "#inicio", label: "Inicio" },
  { href: "#horarios", label: "Horarios" },
  { href: "#planes", label: "Planes" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-[oklch(0.55_0.3_265/0.25)]"
          : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 md:h-20"
        aria-label="Navegación principal"
      >
        <a href="#inicio" className="flex items-center gap-3 group" aria-label="BeastMode Gym - Inicio">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[oklch(0.55_0.3_265)] blur-md opacity-60 group-hover:opacity-90 transition-opacity" />
            <img
              src={logo}
              alt="Logo BeastMode Gym"
              className="relative h-10 w-10 rounded-full object-cover border border-[oklch(0.55_0.3_265/0.5)]"
              width={40}
              height={40}
            />
          </div>
          <span className="font-display font-black text-lg md:text-xl tracking-widest text-neon">
            BEAST<span className="text-foreground">MODE</span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {links.map((l) => {
            const id = l.href.slice(1);
            const isActive = active === id;
            return (
              <li key={l.href} role="none">
                <a
                  href={l.href}
                  role="menuitem"
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded ${
                    isActive ? "text-neon" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px w-8 bg-[oklch(0.7_0.3_265)] shadow-[0_0_10px_oklch(0.6_0.3_265)]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://instagram.com/beast_mode_colombia"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram BeastMode"
            className="p-2 rounded text-muted-foreground hover:text-neon transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="#planes"
            className="px-5 py-2.5 font-display font-bold text-sm uppercase tracking-wider bg-[oklch(0.38_0.28_265)] text-white rounded border border-[oklch(0.6_0.3_265)] glow-box hover:bg-[oklch(0.45_0.3_265)] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Únete
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-foreground rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-[oklch(0.55_0.3_265/0.25)]" : "max-h-0"
        }`}
      >
        <ul className="bg-background/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-medium uppercase tracking-wide text-muted-foreground hover:text-neon hover:bg-[oklch(0.55_0.3_265/0.08)] rounded transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#planes"
              onClick={() => setOpen(false)}
              className="block mt-2 mx-4 px-4 py-3 text-center font-display font-bold uppercase tracking-wider bg-[oklch(0.38_0.28_265)] text-white rounded border border-[oklch(0.6_0.3_265)]"
            >
              Únete Ahora
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
