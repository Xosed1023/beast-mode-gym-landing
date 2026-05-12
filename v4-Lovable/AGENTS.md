# CLAUDE.md — BeastMode Gym Landing Page

Guía para Claude Code al trabajar en este proyecto.

---

## Proyecto

Landing page para **BeastMode Gym**, gimnasio ubicado en San Cristóbal Sur, Bogotá, Colombia. Diseño premium dark-mode con estética cyberpunk/neón. Incluye un splash screen cinematográfico antes de la landing.

Instagram del gym: `@beast_mode_colombia`

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TanStack Start |
| Router | TanStack Router v1.168 |
| Bundler | Vite 7.3.1 |
| CSS | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Animaciones | Framer Motion 12.38.0 |
| UI base | shadcn/ui (style: new-york) + Radix UI |
| Formularios | React Hook Form + Zod |
| Despliegue | Cloudflare Workers |
| Package manager | Bun (también compatible con npm) |
| TypeScript | 5.8.3 strict mode |

---

## Comandos

```bash
npm run dev        # Servidor de desarrollo (Vite)
npm run build      # Build de producción
npm run lint       # ESLint
npm run format     # Prettier
npx tsc --noEmit   # Type check sin compilar
```

---

## Estructura del proyecto

```
src/
├── assets/
│   ├── fonts/
│   │   ├── act-of-rejection/Act_Of_Rejection.ttf
│   │   └── another-america/Another_America(RUS BY LYAJKA).otf
│   ├── hero.jpg
│   └── logo.jpg
├── components/
│   ├── ui/                  # shadcn/ui (no editar manualmente)
│   ├── SplashScreen.tsx     # Intro animada (ver sección dedicada)
│   ├── Navbar.tsx           # Header fijo con active detection
│   ├── Hero.tsx             # Sección hero fullscreen
│   ├── Schedule.tsx         # Horarios del gym
│   ├── Plans.tsx            # Planes de membresía (3 tiers)
│   ├── Location.tsx         # Contacto + Google Maps embed
│   ├── InstagramCTA.tsx     # Banner de Instagram
│   ├── Footer.tsx           # Footer con links y social
│   └── Reveal.tsx           # Wrapper de animación scroll
├── routes/
│   ├── __root.tsx           # Root con HTML, meta tags, preload de fuentes
│   └── index.tsx            # Única página (landing)
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   └── utils.ts             # cn() helper (clsx + tailwind-merge)
└── styles.css               # Tailwind v4 + tema + keyframes custom
```

---

## Sistema de colores (OKLCH)

Todos los colores usan el espacio `oklch`. El hue neón es `265` (azul eléctrico).

```css
--background:   oklch(0.08 0.02 264)   /* Fondo principal ultra oscuro */
--foreground:   oklch(0.98 0.01 240)   /* Texto principal */
--primary:      oklch(0.38 0.28 265)   /* Azul vibrante (#0012d3 equiv.) */
--accent:       oklch(0.55 0.32 265)   /* Azul más claro */
--neon:         oklch(0.62 0.28 265)   /* Neón principal */
--neon-soft:    oklch(0.45 0.3 265)    /* Neón suavizado */
```

Para efectos de glow, usar capas de `text-shadow` o `box-shadow` con el mismo hue 265.

---

## Tipografía

| Variable CSS | Fuente | Uso |
|---|---|---|
| `--font-display` | Orbitron (Google) | Títulos y UI principal |
| `--font-body` | Rajdhani (Google) | Texto corrido |
| `--font-mono` | JetBrains Mono (Google) | Código/mono |
| `--font-beast-a` | Act of Rejection (local) | Alternativa BEAST |
| `--font-beast-b` | Another America (local) | BEAST en splash (activa) |
| — | Bebas Neue (Google) | MODE en splash |

Las fuentes locales se precargan en `__root.tsx` con `<link rel="preload">`.

---

## Tailwind v4 — reglas importantes

- **No existe `tailwind.config.ts`**. La configuración está en `src/styles.css` con `@theme inline`.
- Para agregar nuevas variables de color o fuentes, editarlas en `styles.css` bajo `@theme inline`.
- Las clases custom (`.text-neon`, `.glow-box`, `.scanlines`, etc.) están en `@layer utilities` dentro de `styles.css`.
- Las clases shadcn/ui se generan con el alias `@/components/ui`.

---

## Convenciones de código

- **Path alias:** `@/` apunta a `src/`
- **Componentes:** PascalCase, un componente por archivo
- **Tipos:** TypeScript estricto, sin `any`
- **Estilos inline:** Permitidos para valores dinámicos (neón condicional, Framer Motion). Tailwind para todo lo estático.
- **Comentarios:** Solo cuando el WHY no es obvio. No comentar el QUÉ.
- **Framer Motion:** Usar `motion.*` directamente. Para animaciones que compiten con CSS en las mismas propiedades (ej. `opacity`), usar solo Framer Motion — no mezclar.

---

## SplashScreen — descripción técnica

**Archivo:** `src/components/SplashScreen.tsx`

### Fases (state machine)
```
"init" → "beast" → "mode" → "controls" → "exit"
```

### Timers (ms base, escalados por SPEED)
| Fase | Tiempo |
|---|---|
| init → beast | 300ms |
| beast → mode | 700ms |
| mode → controls | 1000ms |
| controls → exit | 2800ms |
| exit → onComplete | 3500ms |

### Variables de entorno para desarrollo
```bash
VITE_SPLASH_DURATION=0.5    # Multiplicador velocidad (<1 = más rápido)
VITE_SPLASH_STAY=true       # Congela el splash sin navegar
VITE_SPLASH_EVERY_RELOAD=true  # Muestra splash en cada recarga
```

### Elementos visuales
- **BEAST:** `font-beast-b` (Another America), animación de glitch/blur/flicker en entrada, flicker de neón CSS continuo (`neon-flicker-beast`)
- **MODE:** Bebas Neue + WebkitTextStroke, spring animation, flicker CSS (`neon-flicker-mode`)
- **Toggle:** Pill automático que se activa 350ms después de aparecer. El thumb se desliza de izquierda a derecha con spring (stiffness 160, damping 20). Colores blancos/grises.
- **Ambiente:** viñeta (`.splash-vignette`), glow ambient (`.splash-ambient-glow`), scanlines

### Regla crítica — layout stability
Los tres elementos (BEAST, MODE, toggle) siempre están en el DOM desde el inicio. La visibilidad se controla con `animate={{ opacity }}` de Framer Motion, **nunca** con montaje condicional (`AnimatePresence` + `{condition && ...}`). Esto evita layout shifts cuando aparecen elementos en el flexbox.

### Flicker de neón — separación de responsabilidades
- Framer Motion controla: `opacity`, `filter`, `x`, `scaleX` (transformaciones)
- CSS animation controla: `text-shadow` (clases `.neon-flicker-beast` y `.neon-flicker-mode`)
- **Nunca** usar CSS animation y Framer Motion en la misma propiedad CSS del mismo elemento.

---

## Animaciones — guía rápida

### Para nuevos elementos que aparecen en scroll
Usar el componente `<Reveal>` que ya existe:
```tsx
<Reveal delay={0.2}>
  <MiComponente />
</Reveal>
```

### Para nuevos efectos de neón en texto
```css
/* En styles.css @layer utilities */
.mi-clase-neon {
  color: oklch(0.85 0.2 265);
  text-shadow:
    0 0 8px oklch(0.7 0.3 265),
    0 0 20px oklch(0.6 0.3 265 / 0.8),
    0 0 40px oklch(0.5 0.3 265 / 0.5);
}
```

### Para animaciones de entrada con Framer Motion
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 280, damping: 18 }}
/>
```

---

## Secciones de la landing

| Componente | ID de ancla | Descripción |
|---|---|---|
| `<Hero>` | `#inicio` | Fullscreen con imagen, stats bar, CTA |
| `<Schedule>` | `#horarios` | 3 horarios (L-V, Sáb, Dom) con indicador "abierto" |
| `<Plans>` | `#planes` | Básico / Pro (★ Popular) / Elite |
| `<Location>` | `#ubicacion` | Dirección, contacto, Maps embed con filtro dark |
| `<InstagramCTA>` | — | Banner externo a Instagram |

El Navbar usa `IntersectionObserver` para detectar cuál sección está activa y resaltar el link correspondiente.

---

## Despliegue

- **Target:** Cloudflare Workers (SSR con TanStack Start)
- **Config:** `wrangler.jsonc`
- **Compatibilidad:** `nodejs_compat` flag activado
- El build genera un Worker compatible con el runtime de Cloudflare

---

## Lo que falta / TODO conocido

- Precios de planes: actualmente muestran `$ —` (placeholder)
- Formulario de contacto: no implementado
