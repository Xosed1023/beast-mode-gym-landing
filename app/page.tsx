"use client";

import { useState } from "react";

const VERSIONS = [
  {
    id: "v1",
    label: "V1",
    name: "BEAST Mode Gym V1",
    path: "/v1/",
    tags: ["HTML / CSS / JS", "Minimalista", "Dark Mode"],
    color: "#6366f1",
    glow: "rgba(99,102,241,0.3)",
  },
  {
    id: "v2",
    label: "V2",
    name: "BEAST Mode Gym V2",
    path: "/v2/",
    tags: ["HTML / CSS / JS", "Bold", "Animaciones"],
    color: "#ec4899",
    glow: "rgba(236,72,153,0.3)",
  },
  {
    id: "v3",
    label: "V3",
    name: "BEAST Mode Gym V3",
    path: "/v3/",
    tags: ["Next.js", "shadcn/ui", "Moderno"],
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.3)",
  },
  {
    id: "v4",
    label: "V4",
    name: "BEAST Mode Gym V4",
    path: "/v4/",
    tags: ["React", "TanStack", "Cyberpunk / Neón"],
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    id: "v5",
    label: "V5",
    name: "BEAST Mode Gym V5",
    path: "/v5/",
    tags: ["React", "Vite", "Premium"],
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
  },
];

function VersionCard({ version, onExpand }: { version: (typeof VERSIONS)[0]; onExpand: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hovered ? version.color + "55" : "var(--border)"}`,
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 60px ${version.glow}, 0 0 0 1px ${version.color}33`
          : "0 4px 24px rgba(0,0,0,0.4)",
        cursor: "pointer",
      }}
      onClick={onExpand}
    >
      {/* Preview iframe */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "62.5%",
          background: "#000",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* Gradient overlay that disappears on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            background: hovered
              ? "linear-gradient(to bottom, transparent 60%, rgba(13,13,20,0.7) 100%)"
              : "linear-gradient(to bottom, transparent 50%, rgba(13,13,20,0.95) 100%)",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />
        {/* Version badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            zIndex: 3,
            background: version.color,
            color: "#fff",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "0.1em",
            padding: "4px 10px",
            borderRadius: "6px",
            textTransform: "uppercase",
          }}
        >
          {version.label}
        </div>
        <iframe
          src={version.path}
          title={version.name}
          scrolling="no"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200%",
            height: "200%",
            border: "none",
            transform: "scale(0.5)",
            transformOrigin: "top left",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              color: "var(--text)",
              marginBottom: 8,
            }}
          >
            {version.name}
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {version.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  color: version.color,
                  background: version.color + "18",
                  border: `1px solid ${version.color}33`,
                  padding: "3px 9px",
                  borderRadius: "20px",
                  letterSpacing: "0.03em",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "11px 20px",
            background: hovered ? version.color : "transparent",
            border: `1px solid ${version.color}`,
            borderRadius: "10px",
            color: hovered ? "#fff" : version.color,
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
            transition: "all 0.25s ease",
            letterSpacing: "0.02em",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Ver diseño completo
        </button>
      </div>
    </div>
  );
}

function ExpandedModal({
  version,
  onClose,
}: {
  version: (typeof VERSIONS)[0];
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        background: "rgba(5,5,8,0.96)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: "1px solid var(--border)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              background: version.color,
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {version.label}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              color: "var(--text)",
            }}
          >
            {version.name}
          </span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href={version.path}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: version.color,
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              textDecoration: "none",
              letterSpacing: "0.02em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Abrir en nueva pestaña
          </a>
          <button
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--muted)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Cerrar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Full iframe */}
      <iframe
        src={version.path}
        title={version.name}
        style={{
          flex: 1,
          border: "none",
          width: "100%",
        }}
      />
    </div>
  );
}

export default function CatalogPage() {
  const [expanded, setExpanded] = useState<(typeof VERSIONS)[0] | null>(null);

  return (
    <>
      {expanded && (
        <ExpandedModal version={expanded} onClose={() => setExpanded(null)} />
      )}

      <main style={{ minHeight: "100vh", padding: "0 0 80px" }}>
        {/* Hero header */}
        <header
          style={{
            textAlign: "center",
            padding: "72px 24px 56px",
            borderBottom: "1px solid var(--border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 600,
              height: 300,
              background: "radial-gradient(ellipse, rgba(79,70,229,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(79,70,229,0.1)",
              border: "1px solid rgba(79,70,229,0.3)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#4f46e5",
                boxShadow: "0 0 8px #4f46e5",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                color: "#818cf8",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Catálogo de diseños
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 5vw, 56px)",
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: 18,
              letterSpacing: "-0.02em",
            }}
          >
            BEAST Mode Gym
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "var(--muted)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            5 propuestas de diseño para tu página web. Haz clic en cualquier versión para verla completa.
          </p>
        </header>

        {/* Grid */}
        <section
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "56px 24px 0",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 28,
            }}
          >
            {VERSIONS.map((v) => (
              <VersionCard key={v.id} version={v} onExpand={() => setExpanded(v)} />
            ))}
          </div>
        </section>

        {/* Footer note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 64,
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          Cada versión fue construida con una herramienta de IA diferente para mostrarte el abanico de posibilidades.
        </p>
      </main>
    </>
  );
}
