"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Zap, Crown, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    id: 1,
    name: "Básico",
    icon: Dumbbell,
    price: "Por confirmar",
    period: "/mes",
    description: "Perfecto para comenzar tu transformación",
    features: [
      "Acceso en horario completo",
      "Equipos de última generación",
      "Vestidores y duchas",
      "Locker personal",
    ],
    popular: false,
    ctaText: "Elegir Plan",
  },
  {
    id: 2,
    name: "Pro",
    icon: Zap,
    price: "Por confirmar",
    period: "/mes",
    description: "El plan más elegido por nuestros miembros",
    features: [
      "Todo lo del plan Básico",
      "Evaluación física inicial",
      "Rutina personalizada",
      "Seguimiento mensual",
      "Acceso a clases grupales",
    ],
    popular: true,
    ctaText: "Elegir Plan Pro",
  },
  {
    id: 3,
    name: "Elite",
    icon: Crown,
    price: "Por confirmar",
    period: "/mes",
    description: "Para los que buscan resultados extremos",
    features: [
      "Todo lo del plan Pro",
      "Entrenador personal",
      "Plan nutricional",
      "Acceso VIP 24/7",
      "Suplementación incluida",
      "Toalla y amenities",
    ],
    popular: false,
    ctaText: "Ir Elite",
  },
]

export function Planes() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute("data-id") || "0")
            setVisibleCards((prev) => new Set([...prev, id]))
          }
        })
      },
      { threshold: 0.2 }
    )

    const cards = sectionRef.current?.querySelectorAll("[data-id]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="planes"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-[#050510] to-black overflow-hidden"
      aria-labelledby="planes-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 animated-grid opacity-10" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#0012d3]/10 rounded-full blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="planes-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            <span className="text-white">ELIGE TU </span>
            <span className="neon-text text-[#0012d3]">PLAN</span>
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Invierte en ti mismo. Cada plan está diseñado para llevarte al siguiente nivel.
          </p>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan) => (
            <article
              key={plan.id}
              data-id={plan.id}
              className={`relative bg-[#111]/80 backdrop-blur-sm border rounded-xl p-6 md:p-8 card-neon-hover transition-all duration-500 ${
                visibleCards.has(plan.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              } ${
                plan.popular
                  ? "border-[#0012d3] neon-border md:scale-105"
                  : "border-[#0012d3]/20"
              }`}
              style={{ transitionDelay: `${(plan.id - 1) * 150}ms` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#0012d3] text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-[0_0_20px_#0012d3]">
                    Más Popular
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                  plan.popular
                    ? "bg-[#0012d3] shadow-[0_0_30px_#0012d3]"
                    : "bg-[#0012d3]/10 border border-[#0012d3]/30"
                }`}
              >
                <plan.icon
                  className={`w-7 h-7 ${plan.popular ? "text-white" : "text-[#0012d3]"}`}
                  aria-hidden="true"
                />
              </div>

              {/* Plan Name */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-3xl md:text-4xl font-bold text-[#0012d3]">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>

              {/* Description */}
              <p
                className="text-gray-400 text-sm mb-6"
                style={{ fontFamily: "var(--font-inter), sans-serif" }}
              >
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8" role="list" aria-label={`Características del plan ${plan.name}`}>
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-300"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    <Check
                      className="w-5 h-5 text-[#0012d3] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                asChild
                className={`w-full font-bold tracking-wide uppercase transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#0012d3] hover:bg-[#0012d3]/80 text-white hover:shadow-[0_0_30px_#0012d3]"
                    : "bg-transparent border border-[#0012d3] text-[#0012d3] hover:bg-[#0012d3] hover:text-white"
                }`}
              >
                <Link href="#ubicacion">{plan.ctaText}</Link>
              </Button>
            </article>
          ))}
        </div>

        {/* Note about prices */}
        <p
          className="text-center text-gray-500 text-sm mt-8"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          * Precios pendientes de actualización. Contáctanos para más información.
        </p>
      </div>
    </section>
  )
}
