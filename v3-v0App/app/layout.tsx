import type { Metadata, Viewport } from 'next'
import { Orbitron, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  display: 'swap'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'BeastMode Gym | Transforma tu cuerpo, desata la bestia',
  description: 'BeastMode Gym - El gimnasio más futurista de San Cristobal Sur. Equipos de última generación, entrenadores certificados y ambiente único. Únete a la manada.',
  keywords: ['gym', 'gimnasio', 'BeastMode', 'San Cristobal Sur', 'fitness', 'entrenamiento', 'Colombia'],
  authors: [{ name: 'BeastMode Gym' }],
  openGraph: {
    title: 'BeastMode Gym',
    description: 'Transforma tu cuerpo, desata la bestia interior',
    type: 'website',
  },
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0012d3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth bg-[#0a0a0a]">
      <body className={`${orbitron.variable} ${inter.variable} font-sans antialiased bg-[#0a0a0a] text-white`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
