# DER IMAGINEER — Clive Barker × Fable 5

Eine interaktive One-Page-Website über das Universum von Clive Barker —
Konzept, Text, Code und Motion-Design: **Claude Fable 5 (Anthropic)**.

## Starten

Statische Seite, braucht nur einen lokalen Webserver (CDN-Zugriff für Three.js/GSAP/Fonts vorausgesetzt):

```bash
python -m http.server 4173
```

Dann `http://localhost:4173` öffnen.

## Stack

- **Three.js** (r158) — fixe 3D-Bühne: Partikelnebel, driftende Glut, Wireframe-Geometrien, Maus-Parallaxe, scrollgekoppelte Kamera
- **GSAP 3.12** + ScrollTrigger + ScrollToPlugin — Loader-Sequenz, Char-Split-Hero, Scroll-Reveals, gepinnte Horizontal-Galerie, Hover-Preview, Lightbox
- **Zweisprachig (DE/EN)** — Umschalter in der Navigation, Dictionary in `js/i18n.js`, Auswahl wird in `localStorage` gemerkt
- Kein Build-Schritt, kein Framework — HTML/CSS/Vanilla JS

## Inhalte & Rechte

- Alle Gemälde und Zeichnungen in `assets/art/` sind **© Clive Barker**.
  Quelle: Revelations-Archiv, [clivebarker.info](https://www.clivebarker.info).
  Jede Darstellung auf der Seite trägt eine ©-Kennzeichnung.
- Inoffizielles Fan-/Demo-Projekt, nicht mit Clive Barker oder Revelations affiliiert.
- Texte sind Originaltexte (Deutsch), verfasst von Claude Fable 5.

## Struktur

```
index.html        Markup & Sektionen (Hero, Biografie, Werke, Film, Galerie, Fable 5)
css/style.css     Design-System: Ink/Bone/Blood/Gold, Cormorant Garamond + IBM Plex Mono
js/i18n.js        Übersetzungs-Dictionary DE/EN
js/scene.js       Three.js-Bühne
js/main.js        GSAP-Choreografie, Galerie-Daten, Lightbox, Custom Cursor, Sprachumschaltung
assets/art/       17 Werke von Clive Barker (© Clive Barker)
```
