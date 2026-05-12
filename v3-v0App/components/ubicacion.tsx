"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Clock, Phone, Instagram } from "lucide-react"
import Link from "next/link"

const contactInfo = [
  {
    icon: MapPin,
    title: "Dirección",
    content: "Cll 11 Sur # 1 b 39 Este",
    subtitle: "San Cristobal Sur, Bogotá",
    link: "https://maps.app.goo.gl/QwfLKq4GPdfSsbFU8",
    linkText: "Ver en Google Maps",
  },
  {
    icon: Clock,
    title: "Horarios",
    content: "Lun-Vie: 5AM - 10PM",
    subtitle: "Sáb: 8AM-4PM | Dom: 8AM-2PM",
  },
  {
    icon: Instagram,
    title: "Síguenos",
    content: "@beast_mode_colombia",
    link: "https://instagram.com/beast_mode_colombia",
    linkText: "Ir a Instagram",
  },
]

export function Ubicacion() {
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="ubicacion"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden"
      aria-labelledby="ubicacion-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 animated-grid opacity-10" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="ubicacion-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            <span className="text-white">ENCUÉNTRANOS </span>
            <span className="neon-text text-[#0012d3]">AQUÍ</span>
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Visítanos y conoce las instalaciones. Tu transformación comienza aquí.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-[#111]/80 backdrop-blur-sm border border-[#0012d3]/20 rounded-xl p-6 card-neon-hover transition-all duration-500"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0012d3]/10 border border-[#0012d3]/30 flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-[#0012d3]" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-1">
                      {info.title}
                    </h3>
                    <p
                      className="text-lg md:text-xl font-bold text-white"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {info.content}
                    </p>
                    {info.subtitle && (
                      <p
                        className="text-sm text-gray-500 mt-1"
                        style={{ fontFamily: "var(--font-inter), sans-serif" }}
                      >
                        {info.subtitle}
                      </p>
                    )}
                    {info.link && (
                      <Link
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0012d3] text-sm mt-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0012d3] rounded"
                      >
                        {info.linkText}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Embed */}
          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative rounded-xl overflow-hidden border border-[#0012d3]/30 neon-border h-[300px] md:h-full min-h-[400px]">
              {/* Dark overlay for the map */}
              <div
                className="absolute inset-0 bg-[#0012d3]/5 mix-blend-multiply pointer-events-none z-10"
                aria-hidden="true"
              />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.7073726561396!2d-74.08543892426627!3d4.578392143256644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f992be79a2bbf%3A0x6a7b21c6f5f1c6c0!2sCl.%2011%20Sur%20%231b-39%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1703000000000!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(90%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de BeastMode Gym en Google Maps"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
