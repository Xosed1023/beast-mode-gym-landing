import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Horarios } from "@/components/horarios"
import { Planes } from "@/components/planes"
import { Ubicacion } from "@/components/ubicacion"
import { InstagramCTA } from "@/components/instagram-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] scanlines">
      <Navigation />
      <Hero />
      <Horarios />
      <Planes />
      <Ubicacion />
      <InstagramCTA />
      <Footer />
    </main>
  )
}
