"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, Sun, Moon } from "lucide-react"

const schedules = [
  {
    id: 1,
    title: "Lunes a Viernes",
    hours: "5:00 AM - 10:00 PM",
    icon: Clock,
    description: "17 horas de entrenamiento continuo",
    days: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: "Sábados",
    hours: "8:00 AM - 4:00 PM",
    icon: Sun,
    description: "8 horas para tu fin de semana",
    days: [6],
  },
  {
    id: 3,
    title: "Domingos",
    hours: "8:00 AM - 2:00 PM",
    icon: Moon,
    description: "6 horas para mantener el ritmo",
    days: [0],
  },
]

function isOpenNow(schedule: typeof schedules[0]): boolean {
  const now = new Date()
  const day = now.getDay()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const currentTime = hours * 60 + minutes

  if (!schedule.days.includes(day)) return false

  // Parse hours
  const [openStr, closeStr] = schedule.hours.split(" - ")
  
  const parseTime = (timeStr: string) => {
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
    if (!match) return 0
    let [, h, m, period] = match
    let hour = parseInt(h)
    const minute = parseInt(m)
    if (period.toUpperCase() === "PM" && hour !== 12) hour += 12
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0
    return hour * 60 + minute
  }

  const openTime = parseTime(openStr)
  const closeTime = parseTime(closeStr)

  return currentTime >= openTime && currentTime < closeTime
}

function getTodaySchedule(): typeof schedules[0] | null {
  const day = new Date().getDay()
  return schedules.find(s => s.days.includes(day)) || null
}

export function Horarios() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const todaySchedule = getTodaySchedule()

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
      id="horarios"
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-[#0a0a0a] to-black overflow-hidden"
      aria-labelledby="horarios-title"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 animated-grid opacity-10" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            id="horarios-title"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4"
          >
            <span className="text-white">NUESTROS </span>
            <span className="neon-text text-[#0012d3]">HORARIOS</span>
          </h2>
          <p
            className="text-gray-400 text-lg max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            Abiertos cuando tú lo necesitas. Sin excusas, solo resultados.
          </p>
        </div>

        {/* Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {schedules.map((schedule) => {
            const isOpen = isOpenNow(schedule)
            const isToday = todaySchedule?.id === schedule.id

            return (
              <article
                key={schedule.id}
                data-id={schedule.id}
                className={`relative bg-[#111]/80 backdrop-blur-sm border border-[#0012d3]/20 rounded-xl p-6 md:p-8 card-neon-hover transition-all duration-500 ${
                  visibleCards.has(schedule.id)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                } ${isToday ? "border-[#0012d3]/50" : ""}`}
                style={{ transitionDelay: `${(schedule.id - 1) * 150}ms` }}
              >
                {/* Open indicator */}
                {isOpen && (
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 bg-[#0012d3] rounded-full pulse-neon"
                      aria-hidden="true"
                    />
                    <span className="text-xs text-[#0012d3] uppercase tracking-wider font-bold">
                      Abierto
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-[#0012d3]/10 border border-[#0012d3]/30 flex items-center justify-center mb-6">
                  <schedule.icon
                    className="w-7 h-7 text-[#0012d3]"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">
                  {schedule.title}
                </h3>
                <p className="text-2xl md:text-3xl font-bold neon-text text-[#0012d3] mb-3">
                  {schedule.hours}
                </p>
                <p
                  className="text-gray-400 text-sm"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {schedule.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
