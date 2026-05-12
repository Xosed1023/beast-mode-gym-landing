import { execSync } from "child_process";
import { cpSync, mkdirSync, rmSync, existsSync, renameSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PUBLIC = join(ROOT, "public");

function run(cmd, cwd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

function copyTo(src, dest) {
  if (existsSync(dest)) rmSync(dest, { recursive: true });
  mkdirSync(dest, { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log(`✓ Copiado → ${dest}`);
}

// ── V1: HTML/CSS/JS puro ──────────────────────────────────────────────────
console.log("\n=== V1 (estático) ===");
copyTo(join(ROOT, "v1-gp-ui-ux-pro-max"), join(PUBLIC, "v1"));

// ── V2: HTML/CSS/JS puro ──────────────────────────────────────────────────
console.log("\n=== V2 (estático) ===");
copyTo(join(ROOT, "v2-gym-page"), join(PUBLIC, "v2"));

// ── V3: Next.js → static export ───────────────────────────────────────────
console.log("\n=== V3 (Next.js export) ===");
run("npm install --include=dev", join(ROOT, "v3-v0App"));
run("npm run build", join(ROOT, "v3-v0App"));
copyTo(join(ROOT, "v3-v0App", "out"), join(PUBLIC, "v3"));

// ── V4: Vite SPA standalone ────────────────────────────────────────────────
console.log("\n=== V4 (Vite SPA) ===");
run("npm install --include=dev", join(ROOT, "v4-Lovable"));
run("npm run build:spa", join(ROOT, "v4-Lovable"));
copyTo(join(ROOT, "v4-Lovable", "dist-spa"), join(PUBLIC, "v4"));
// Renombrar index.spa.html → index.html para servicio estándar
const v4Spa = join(PUBLIC, "v4", "index.spa.html");
const v4Index = join(PUBLIC, "v4", "index.html");
if (existsSync(v4Spa)) renameSync(v4Spa, v4Index);

// ── V5: Vite + React ──────────────────────────────────────────────────────
console.log("\n=== V5 (Vite) ===");
run("npm install --include=dev", join(ROOT, "v5-bolt"));
run("npm run build", join(ROOT, "v5-bolt"));
copyTo(join(ROOT, "v5-bolt", "dist"), join(PUBLIC, "v5"));

console.log("\n✅ Todas las versiones construidas y copiadas a public/");
