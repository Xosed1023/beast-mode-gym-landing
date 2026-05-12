"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, Users, Clock, Trophy } from "lucide-react"

const stats = [
  { icon: Dumbbell, value: "50+", label: "Equipos" },
  { icon: Users, value: "500+", label: "Miembros" },
  { icon: Clock, value: "17h", label: "Al día" },
  { icon: Trophy, value: "5+", label: "Años" },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero - Bienvenida"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE ?? ""}/images/hero-bg.jpg`}
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 animated-grid opacity-30" aria-hidden="true" />

      {/* Scanlines */}
      <div className="absolute inset-0 scanlines pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Main Title */}
          <h1
            className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="block text-white">DESATA TU</span>
            <span className="block neon-text neon-flicker text-[#0012d3] drop-shadow-[0_0_30px_#0012d3]">
              BEAST MODE
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-light tracking-wide transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Transforma tu cuerpo. Supera tus límites. Únete a la manada más fuerte de{" "}
            <span className="text-[#0012d3]">San Cristobal Sur</span>.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-[#0012d3] hover:bg-[#0012d3]/80 text-white text-lg font-bold tracking-wide uppercase px-8 py-6 neon-border transition-all duration-300 hover:shadow-[0_0_30px_#0012d3]"
            >
              <Link href="#planes">Comienza Hoy</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-[#0012d3] text-white hover:bg-[#0012d3]/20 text-lg font-bold tracking-wide uppercase px-8 py-6 transition-all duration-300"
            >
              <Link href="#horarios">Ver Horarios</Link>
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div
          className={`absolute bottom-8 left-4 right-4 md:left-8 md:right-8 transition-all duration-1000 delay-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-md border border-[#0012d3]/30 rounded-xl p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-[#0012d3] mb-2" aria-hidden="true" />
                  <span className="text-2xl md:text-3xl font-bold text-white">{stat.value}</span>
                  <span className="text-xs md:text-sm text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          mounted ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="w-6 h-10 border-2 border-[#0012d3]/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#0012d3] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
