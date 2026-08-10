/* ============================================================
   Galerie — Werkschau, Portfolios & Archiv-Wegweiser
   Auswahl und Bilder nach dem Revelations-Archiv
   (clivebarker.info, Art Archive I–IX und Portfolios)
   Claude Fable 5 (Anthropic)
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger);

  /* ---------------- Language state ---------------- */
  var T = window.TRANSLATIONS || {};
  var lang = "en";
  try {
    var stored = localStorage.getItem("imagineer-lang");
    if (stored === "en" || stored === "de") lang = stored;
  } catch (e) { /* storage unavailable */ }

  function t(key) {
    return (T[key] && T[key][lang]) || "";
  }
  function pick(obj) {
    return lang === "en" ? obj.en : obj.de;
  }

  /* ---------------- Werkschau ----------------
     group: "free" = freie Arbeit · "abarat" = Abarat-Zyklus ·
            "books" = zu Büchern & Filmen entstanden
     meta: Technik/Maße nur, wo das Archiv sie überliefert —
           sonst der Werkzusammenhang. */
  var WORKS = [
    { file: "father",          title: "The Father Of Us All",         group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "patriarch",       title: "Patriarch",                    group: "free",   meta: { de: "Öl auf Leinwand · 48 × 60″", en: "Oil on canvas · 48 × 60″" } },
    { file: "kingnomads",      title: "The King Of The Nomads",       group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "suspension",      title: "Suspension",                   group: "free",   meta: { de: "Tusche auf Papier · 22 × 30″", en: "Ink on paper · 22 × 30″" } },
    { file: "shunasassi",      title: "Shuna Sassi",                  group: "books",  meta: { de: "Zu Nightbreed", en: "For Nightbreed" } },
    { file: "thebeliever",     title: "The Believer",                 group: "free",   meta: { de: "Öl auf Papier · 41 × 30″", en: "Oil on paper · 41 × 30″" } },
    { file: "mater1",          title: "Mater Motley",                 group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "ouroborous",      title: "Ouroborous",                   group: "free",   meta: { de: "Öl auf Leinwand · 30 × 24″", en: "Oil on canvas · 30 × 24″" } },
    { file: "mephistopheles",  title: "Mephistopheles",               group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "malingo3",        title: "Malingo",                      group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "daemon",          title: "Daemon",                       group: "free",   meta: { de: "Tusche auf Papier · 11,5 × 8,25″", en: "Ink on paper · 11.5 × 8.25″" } },
    { file: "twilightdancers", title: "The Twilight Dancers",         group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "deathmaiden",     title: "Death and the Maiden",         group: "free",   meta: { de: "Tusche auf Papier · 14 × 17″", en: "Ink on paper · 14 × 17″" } },
    { file: "rojopixler",      title: "Rojo Pixler",                  group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "frank1",          title: "Frank",                        group: "books",  meta: { de: "Zu Hellraiser", en: "For Hellraiser" } },
    { file: "stitchling",      title: "A Stitchling",                 group: "free",   meta: { de: "Acryl & Tusche auf Papier · 30 × 22″", en: "Acrylic & ink on paper · 30 × 22″" } },
    { file: "angeldeath",      title: "Angel Of Death",               group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "commexokid",      title: "Commexo Kid",                  group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "wolfskin",        title: "A Man in the Skin of a Wolf",  group: "free",   meta: { de: "Tusche auf Papier · 17 × 11″", en: "Ink on paper · 17 × 11″" } },
    { file: "gass1",           title: "The Great And Secret Show",    group: "books",  meta: { de: "Zu The Great and Secret Show", en: "For The Great and Secret Show" } },
    { file: "icarus",          title: "Icarus",                       group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "demon10",         title: "Demon",                        group: "free",   meta: { de: "Papier · 23,25 × 16,5″", en: "Paper · 23.25 × 16.5″" } },
    { file: "abrahamhollow",   title: "Abraham Hollow",               group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "mementomori",     title: "Memento Mori",                 group: "free",   meta: { de: "Tusche auf Papier · 24 × 18″", en: "Ink on paper · 24 × 18″" } },
    { file: "pinheadoil",      title: "Pinhead",                      group: "books",  meta: { de: "Zu Hellraiser · Öl", en: "For Hellraiser · oil" } },
    { file: "fallenangel",     title: "The Fallen Angel",             group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "sorcerers",       title: "Sorcerers",                    group: "free",   meta: { de: "Tusche auf Papier · 24 × 18″", en: "Ink on paper · 24 × 18″" } },
    { file: "vespersrock",     title: "On Vespers Rock",              group: "abarat", meta: { de: "Abarat-Zyklus", en: "The Abarat cycle" } },
    { file: "hoodresurrected", title: "Hood Resurrected",             group: "books",  meta: { de: "Zu The Thief of Always", en: "For The Thief of Always" } },
    { file: "belial",          title: "Belial",                       group: "free",   meta: { de: "Tusche auf Papier · 11,75 × 8,5″", en: "Ink on paper · 11.75 × 8.5″" } },
    { file: "deathzebra",      title: "Death On A Zebra",             group: "free",   meta: { de: "Art Archive", en: "Art Archive" } },
    { file: "starfalling",     title: "Star Falling",                 group: "free",   meta: { de: "Tusche auf Papier · 14 × 10,5″", en: "Ink on paper · 14 × 10.5″" } },
    { file: "immacolata",      title: "Immacolata",                   group: "books",  meta: { de: "Zu Weaveworld", en: "For Weaveworld" } },
    { file: "rictus",          title: "Rictus",                       group: "books",  meta: { de: "Zu The Thief of Always", en: "For The Thief of Always" } },
    { file: "shadwellunmasks", title: "Shadwell Unmasks Himself",     group: "books",  meta: { de: "Zu Weaveworld", en: "For Weaveworld" } },
    { file: "weaveworld",      title: "Weaveworld",                   group: "books",  meta: { de: "Zu Weaveworld", en: "For Weaveworld" } },
    { file: "joelsghost",      title: "Joel's Ghost",                 group: "free",   meta: { de: "Öl auf Leinwand · 37 × 37″", en: "Oil on canvas · 37 × 37″" } }
  ];

  var GROUPS = [
    { key: "all",    label: { de: "Alle", en: "All" } },
    { key: "free",   label: { de: "Freie Arbeiten", en: "Standalone works" } },
    { key: "abarat", label: { de: "Abarat", en: "Abarat" } },
    { key: "books",  label: { de: "Zu Büchern & Filmen", en: "From books & films" } }
  ];

  /* ---------------- Portfolios (Archivseiten) ---------------- */
  var ARCHIVE_BASE = "https://www.clivebarker.info/";
  var PORTFOLIOS = [
    { num: "P–01", title: "Weaveworld",               ext: "galleryweave.html",  meta: { de: "21 Blätter · Archiv ↗", en: "21 works · archive ↗" } },
    { num: "P–02", title: "Cabal / Nightbreed",       ext: "gallerycabal.html",  meta: { de: "45 Blätter · Archiv ↗", en: "45 works · archive ↗" } },
    { num: "P–03", title: "The Great & Secret Show",  ext: "gallerygass.html",   meta: { de: "11 Blätter · Archiv ↗", en: "11 works · archive ↗" } },
    { num: "P–04", title: "The Thief of Always",      ext: "gallerythief.html",  meta: { de: "69 Blätter · Archiv ↗", en: "69 works · archive ↗" } },
    { num: "P–05", title: "Abarat I–III",             ext: "galleryabarat.html", meta: { de: "324 Werke auf drei Seiten · Archiv ↗", en: "324 works across three pages · archive ↗" } }
  ];

  var ARCHIVE_LINKS = [
    { num: "A–01", title: { de: "Das Art Archive", en: "The Art Archive" },                     ext: "galleryarchive1.html", meta: { de: "≈ 2.000 Werke auf neun Seiten · Archiv ↗", en: "≈ 2,000 works across nine pages · archive ↗" } },
    { num: "A–02", title: { de: "The Illustration Room", en: "The Illustration Room" },          ext: "galleryir1.html",      meta: { de: "≈ 380 Zeichnungen auf zwei Seiten · Archiv ↗", en: "≈ 380 drawings across two pages · archive ↗" } },
    { num: "A–03", title: { de: "Abarat: Die Evolution", en: "Abarat: the evolution" },          ext: "abaratevolution.html", meta: { de: "Werkanalyse · Archiv ↗", en: "Analysis · archive ↗" } },
    { num: "A–04", title: { de: "Vom Entwurf zum Bild", en: "Rough to final" },                  ext: "gallerycomp.html",     meta: { de: "Werkanalyse · Archiv ↗", en: "Analysis · archive ↗" } },
    { num: "A–05", title: { de: "Die Ausstellungen", en: "The exhibitions" },                    ext: "artindex.html",        meta: { de: "25 Stationen · Bess Cutler bis Copro · 1993–2016 ↗", en: "25 shows · Bess Cutler to Copro · 1993–2016 ↗" } },
    { num: "A–06", title: { de: "Kunst im Verkauf", en: "Art for sale" },                        ext: "artnews.html",         meta: { de: "Originale & Reproduktionen · Archiv ↗", en: "Originals & reproductions · archive ↗" } }
  ];

  /* ---------------- Rendering ---------------- */
  var wall = document.getElementById("galleryWall");
  var filterBar = document.getElementById("galleryFilter");
  var pfList = document.getElementById("portfolioList");
  var arList = document.getElementById("archiveList");
  var activeGroup = "all";

  function renderFilter() {
    var html = "";
    GROUPS.forEach(function (g) {
      var count = g.key === "all" ? WORKS.length : WORKS.filter(function (w) { return w.group === g.key; }).length;
      html +=
        '<button class="gfilter__chip' + (activeGroup === g.key ? " is-on" : "") + '" data-group="' + g.key + '">' +
        pick(g.label) + ' <span class="gfilter__count">' + count + "</span></button>";
    });
    filterBar.innerHTML = html;
  }

  function renderWall() {
    var html = "";
    WORKS.forEach(function (w, i) {
      var hidden = activeGroup !== "all" && w.group !== activeGroup;
      html +=
        '<figure class="gwork' + (hidden ? " gwork--hidden" : "") + '" data-idx="' + i + '" data-title="' + w.title + '">' +
        '<img src="assets/art/' + w.file + '.jpg" alt="Clive Barker — ' + w.title + '" loading="lazy" />' +
        '<figcaption class="gwork__cap">' +
        '<span class="gwork__title">' + w.title + "</span>" +
        '<span class="gwork__meta mono">' + pick(w.meta) + "</span>" +
        "</figcaption></figure>";
    });
    wall.innerHTML = html;
    bindHoverCursor(".gwork");
  }

  function renderRows(el, rows) {
    var html = "";
    rows.forEach(function (r) {
      html +=
        '<li class="workrow reveal-news"><a class="workrow__inner" href="' + ARCHIVE_BASE + r.ext + '" target="_blank" rel="noopener">' +
        '<span class="workrow__num mono">' + r.num + "</span>" +
        '<span class="workrow__title">' + (typeof r.title === "string" ? r.title : pick(r.title)) + "</span>" +
        '<span class="workrow__meta mono">' + pick(r.meta) + "</span>" +
        "</a></li>";
    });
    el.innerHTML = html;
    bindHoverCursor(".workrow a");
  }

  filterBar.addEventListener("click", function (e) {
    var chip = e.target.closest(".gfilter__chip");
    if (!chip) return;
    activeGroup = chip.getAttribute("data-group");
    renderFilter();
    renderWall();
  });

  /* ---------------- Lightbox ---------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxMeta = document.getElementById("lightboxMeta");
  var backdrop = document.getElementById("lightboxBackdrop");
  var closeBtn = document.getElementById("lightboxClose");

  function openLightbox(fig) {
    var w = WORKS[parseInt(fig.getAttribute("data-idx"), 10)];
    lightboxImg.src = "assets/art/" + w.file + ".jpg";
    lightboxImg.alt = "Clive Barker — " + w.title;
    lightboxTitle.textContent = w.title;
    lightboxMeta.textContent = pick(w.meta);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    gsap.to(backdrop, { opacity: 1, duration: 0.4 });
    gsap.fromTo(".lightbox__figure",
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 });
  }
  function closeLightbox() {
    gsap.to(".lightbox__figure", { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
    gsap.to(backdrop, {
      opacity: 0, duration: 0.35, delay: 0.1,
      onComplete: function () {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
      }
    });
  }
  wall.addEventListener("click", function (e) {
    var fig = e.target.closest(".gwork");
    if (fig) openLightbox(fig);
  });
  backdrop.addEventListener("click", closeLightbox);
  closeBtn.addEventListener("click", closeLightbox);
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------------- Language ---------------- */
  var langToggle = document.getElementById("langToggle");

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.title = t("title.gallery");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    renderFilter();
    renderWall();
    renderRows(pfList, PORTFOLIOS);
    renderRows(arList, ARCHIVE_LINKS);
    langToggle.textContent = lang === "de" ? "EN" : "DE";
  }

  langToggle.addEventListener("click", function () {
    lang = lang === "de" ? "en" : "de";
    try { localStorage.setItem("imagineer-lang", lang); } catch (e) { /* ignore */ }
    applyLanguage();
    ScrollTrigger.getAll().forEach(function (st) {
      if (st.trigger && !document.body.contains(st.trigger)) st.kill();
    });
    gsap.set(".reveal-news", { opacity: 1 });
    ScrollTrigger.refresh();
  });

  applyLanguage();

  /* ---------------- Entrance & reveals ---------------- */
  if (reduceMotion) {
    gsap.set(".reveal-line, .reveal-news", { opacity: 1 });
  } else {
    gsap.fromTo(".newshero .reveal-line",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.12, delay: 0.15 });

    gsap.utils.toArray(".reveal-news").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" }
        });
    });
  }

  /* ---------------- Custom cursor ---------------- */
  var cursor = document.getElementById("cursor");
  var cursorLabel = document.getElementById("cursorLabel");
  var fineCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function bindHoverCursor(selector, labelKey) {
    if (!fineCursor) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        cursor.classList.add("is-hover");
        if (labelKey) cursorLabel.textContent = t(labelKey);
      });
      el.addEventListener("mouseleave", function () {
        cursor.classList.remove("is-hover");
        cursorLabel.textContent = "";
      });
    });
  }

  if (fineCursor) {
    gsap.set(cursor, { x: -100, y: -100 });
    var cx = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    var cy = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    window.addEventListener("mousemove", function (e) {
      cx(e.clientX); cy(e.clientY);
    }, { passive: true });
    bindHoverCursor(".nav a");
    bindHoverCursor(".nav__lang");
    bindHoverCursor(".news-backlink");
    bindHoverCursor(".gfilter__chip");
  }

  /* ---------------- Nav hide on scroll ---------------- */
  var nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: "top -80",
    onUpdate: function (self) {
      gsap.to(nav, { y: self.direction === 1 ? -100 : 0, duration: 0.4, ease: "power2.out" });
    }
  });
})();
