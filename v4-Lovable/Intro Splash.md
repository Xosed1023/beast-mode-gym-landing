# Mejorar Landing Page — Intro Splash Screen “BEAST Mode”

Quiero agregar una experiencia de entrada cinematográfica y moderna a la landing page usando un splash screen animado antes de mostrar el contenido principal.

---

# Objetivo General

Crear un splash screen fullscreen con estética oscura, cyberpunk/neón y animaciones fluidas, inspirado en la referencia visual:

- Referencia: `@"references/Splash Screen.png"`

La experiencia debe sentirse premium, energética y profesional, como la introducción de una marca fitness/gaming/high-performance.

---

# Requerimientos Visuales

## Fondo

- Usar el tono oscuro actual de la landing page como base.
- El splash screen debe cubrir toda la pantalla (`100vw x 100vh`).
- Agregar una atmósfera sutil:
  - glow ambiental
  - ruido/grain ligero
  - viñeta suave
  - humo o blur tenue opcional

---

# Tipografía

## Texto principal

Mostrar el texto:

```txt
BEAST
MODE
```

En dos líneas separadas.

# Fuente para “BEAST”

Usar una de estas fuentes locales:

- @src/assets/fonts/act-of-refection/
- @src/assets/fonts/another-america/

Nota: corregir typo de assests → assets si aplica.

Esta fuente también debe usarse posteriormente en:

- títulos principales
- headings importantes
- elementos hero

# Toggle para comparar fuentes

Agregar un switch toggle visual durante el splash screen que permita alternar dinámicamente entre ambas fuentes para “BEAST”.

## Comportamiento:
- inicia apagado (izquierda)
- luego se activa automáticamente
- al activarse:
  - cambia a la segunda fuente
  - el toggle se mueve suavemente a la derecha
  - el efecto neón aumenta de intensidad
  - el texto queda “encendido”

La transición debe sentirse elegante y satisfactoria.

# Fuente para “MODE”

Usar:

- Nunito o una alternativa similar a la referencia visual.

Debe contrastar con “BEAST”:

- más limpia
- moderna
- minimalista

# Animaciones

## Secuencia de entrada

1. Pantalla oscura inicial
- Fade in desde negro
- Ambiente sutil ya visible

## Aparición de “BEAST”

Animación cinematográfica:

- glitch ligero
- flicker tipo neón
- blur/sharpen rápido
- pequeña distorsión horizontal
- aparición progresiva

Sensación:

- agresiva
- energética
- tecnológica

3. Aparición de “MODE”

Debe aparecer después de “BEAST”:

- fade + upward motion
- glow neón suave
- sincronizado con el estilo general

4. Activación del toggle

El switch:

- comienza a la izquierda
- se mueve automáticamente a la derecha
- activa el cambio de fuente
- intensifica el glow

Al finalizar:

- el neón queda estable y encendido
- pequeño efecto eléctrico/glitch final

5. Transición hacia la landing page

Después de la animación:

- hacer fade/blur transition hacia la página principal
- el splash screen desaparece suavemente
- no debe sentirse abrupto

Duración total aproximada:

- entre 3 y 5 segundos

# Dirección de Arte

La animación debe transmitir:

- “high performance”
- “locked in”
- “beast mode activated”
- estética gaming premium
- energía deportiva moderna
- estilo cyberpunk minimalista

Evitar:

- animaciones caricaturescas
- efectos exagerados
- exceso de partículas
- glitches demasiado agresivos

# Calidad Técnica
Las animaciones deben:
- correr fluidamente a 60fps
- usar transform y opacity
- evitar layout shifts
- ser responsive
- verse bien en mobile y desktop

# Tecnologías sugeridas

Preferiblemente usar:

-Framer Motion
-CSS animations
-GSAP (si hace falta mayor control)
-TailwindCSS para estilos

# Extras opcionales (si aportan calidad)
- sonido sutil de activación
- chromatic aberration ligera
- scanlines muy suaves
- bloom/glow dinámico
- letter spacing animation
- microinteracciones del toggle

# Resultado esperado

El splash screen debe sentirse como una activación premium de “BEAST MODE”, con una experiencia visual moderna, fluida e impactante antes de entrar a la landing page principal.