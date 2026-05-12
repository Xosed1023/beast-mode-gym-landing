"use client"

import { useEffect, useRef, useState } from "react"
import { Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function InstagramCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="instagram"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black to-[#0a0a0a] overflow-hidden"
      aria-labelledby="instagram-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 animated-grid opacity-5" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Instagram Gradient Background */}
          <div className="instagram-gradient p-[2px] rounded-2xl">
            <div className="bg-[#0a0a0a] rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Glow effect */}
              <div
                className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full blur-[100px] opacity-30"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Instagram Icon */}
                <div className="w-20 h-20 mx-auto rounded-full instagram-gradient flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
                  <div className="w-[72px] h-[72px] bg-[#0a0a0a] rounded-full flex items-center justify-center">
                    <Instagram className="w-10 h-10 text-white" aria-hidden="true" />
                  </div>
                </div>

                {/* Title */}
                <h2
                  id="instagram-title"
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                  Síguenos en Instagram
                </h2>

                {/* Description */}
                <p
                  className="text-gray-400 text-lg mb-8 max-w-xl mx-auto"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  Únete a la comunidad BeastMode. Rutinas, tips, transformaciones y mucha motivación para alcanzar tus metas.
                </p>

                {/* Handle */}
                <p className="text-xl md:text-2xl font-bold text-transparent bg-clip-text instagram-gradient mb-8">
                  @beast_mode_colombia
                </p>

                {/* CTA Button */}
                <Button
                  asChild
                  size="lg"
                  className="instagram-gradient text-white font-bold tracking-wide uppercase px-8 py-6 text-lg hover:opacity-90 transition-opacity"
                >
                  <Link
                    href="https://instagram.com/beast_mode_colombia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3"
                  >
                    <Instagram className="w-5 h-5" aria-hidden="true" />
                    Seguir Ahora
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
