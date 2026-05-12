import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#horarios", label: "Horarios" },
  { href: "#planes", label: "Planes" },
  { href: "#ubicacion", label: "Ubicación" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative bg-[#050505] border-t border-[#0012d3]/20"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#0012d3]/50">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE ?? ""}/images/logo.jpg`}
                alt="BeastMode Gym Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold tracking-wider text-white">
              BEASTMODE
            </span>
          </div>

          {/* Navigation */}
          <nav aria-label="Navegación del pie de página">
            <ul className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-[#0012d3] transition-colors uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <Link
            href="https://instagram.com/beast_mode_colombia"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-[#0012d3] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded p-1"
            aria-label="Síguenos en Instagram"
          >
            <Instagram className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">@beast_mode_colombia</span>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-[#0012d3]/10 mt-8 pt-8">
          <p
            className="text-center text-xs text-gray-500"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            © {currentYear} BeastMode Gym. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
