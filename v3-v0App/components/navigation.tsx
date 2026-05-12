"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#horarios", label: "Horarios" },
  { href: "#planes", label: "Planes" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#instagram", label: "Instagram" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navLinks.map((link) => link.href.replace("#", ""))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-[#0012d3]/30" : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="#inicio"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded-lg"
            aria-label="BeastMode Gym - Ir al inicio"
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#0012d3] neon-border">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE ?? ""}/images/logo.jpg`}
                alt="BeastMode Gym Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-wider neon-text">
              BEASTMODE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm tracking-wide uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded px-2 py-1 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#0012d3] neon-text"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0012d3] shadow-[0_0_10px_#0012d3]" />
                )}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#0012d3] hover:bg-[#0012d3]/80 text-white font-bold tracking-wide uppercase neon-border transition-all duration-300 hover:shadow-[0_0_20px_#0012d3]"
            >
              <Link href="#planes">Únete Ahora</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded-lg"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
          role="menu"
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-[#0012d3]/30">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm tracking-wide uppercase py-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded px-2 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#0012d3] neon-text"
                    : "text-gray-300"
                }`}
                role="menuitem"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#0012d3] hover:bg-[#0012d3]/80 text-white font-bold tracking-wide uppercase mt-2"
            >
              <Link href="#planes" onClick={() => setIsOpen(false)}>
                Únete Ahora
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
