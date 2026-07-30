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
- **News-Chronik** (`news.html`) — 83 Meldungen von August 2020 bis Juli 2026, in eigenen Worten zusammengefasst nach dem News-Archiv auf clivebarker.info; jeder Eintrag verlinkt auf die Original-Quelle
- **Die Romane** (`novels.html` + `novel.html?b=<slug>`) — alle 14 Romane (1985–2015) mit eigener Synopsis (DE/EN), paraphrasierten Barker-Anmerkungen samt Quellenangabe und 134 Buchcovern (UK/US-Ausgaben + internationale Ausgaben) aus dem Revelations-Archiv
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
news.html         News-Chronik 2020–2026 (Daten & Rendering in js/news.js)
novels.html       Romane-Übersicht (14 Romane, 1985–2015)
novel.html        Roman-Detailseite (per ?b=<slug>, Rendering in js/novels.js)
css/style.css     Design-System: Ink/Bone/Blood/Gold, Cormorant Garamond + IBM Plex Mono
js/i18n.js        Übersetzungs-Dictionary DE/EN
js/news.js        News-Daten (DE/EN) & Rendering der Chronik-Seite
js/novels.js      Romane-Daten (DE/EN) & Rendering von Übersicht + Detailseite
assets/covers/    134 Buchcover, je Roman ein Ordner (Quelle: clivebarker.info)
js/scene.js       Three.js-Bühne
js/main.js        GSAP-Choreografie, Galerie-Daten, Lightbox, Custom Cursor, Sprachumschaltung
assets/art/       17 Werke von Clive Barker (© Clive Barker)
```
