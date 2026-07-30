/* ============================================================
   Motion & Interaktion — GSAP-Choreografie + i18n
   Claude Fable 5 (Anthropic)
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ---------------- Language state ---------------- */
  var T = window.TRANSLATIONS || {};
  var lang = "de";
  try {
    var stored = localStorage.getItem("imagineer-lang");
    if (stored === "en" || stored === "de") lang = stored;
  } catch (e) { /* storage unavailable — stay with default */ }

  function t(key) {
    return (T[key] && T[key][lang]) || "";
  }

  /* ---------------- Gallery data ---------------- */
  var ARTWORKS = [
    { file: "patriarch",       title: "Patriarch",                   mediumDe: "Öl auf Leinwand · 48 × 60″",                mediumEn: "Oil on canvas · 48 × 60″" },
    { file: "suspension",      title: "Suspension",                  mediumDe: "Tusche auf Papier · 22 × 30″",              mediumEn: "Ink on paper · 22 × 30″" },
    { file: "thebeliever",     title: "The Believer",                mediumDe: "Öl auf Papier · 41 × 30″",                  mediumEn: "Oil on paper · 41 × 30″" },
    { file: "ouroborous",      title: "Ouroborous",                  mediumDe: "Öl auf Leinwand · 30 × 24″",                mediumEn: "Oil on canvas · 30 × 24″" },
    { file: "daemon",          title: "Daemon",                      mediumDe: "Tusche auf Papier · 11,5 × 8,25″",          mediumEn: "Ink on paper · 11.5 × 8.25″" },
    { file: "deathmaiden",     title: "Death and the Maiden",        mediumDe: "Tusche auf Papier · 14 × 17″",              mediumEn: "Ink on paper · 14 × 17″" },
    { file: "stitchling",      title: "A Stitchling",                mediumDe: "Acryl & Tusche auf Papier · 30 × 22″",      mediumEn: "Acrylic & ink on paper · 30 × 22″" },
    { file: "wolfskin",        title: "A Man in the Skin of a Wolf", mediumDe: "Tusche auf Papier · 17 × 11″",              mediumEn: "Ink on paper · 17 × 11″" },
    { file: "demon10",         title: "Demon",                       mediumDe: "Papier · 23,25 × 16,5″",                    mediumEn: "Paper · 23.25 × 16.5″" },
    { file: "mementomori",     title: "Memento Mori",                mediumDe: "Tusche auf Papier · 24 × 18″",              mediumEn: "Ink on paper · 24 × 18″" },
    { file: "sorcerers",       title: "Sorcerers",                   mediumDe: "Tusche auf Papier · 24 × 18″",              mediumEn: "Ink on paper · 24 × 18″" },
    { file: "belial",          title: "Belial",                      mediumDe: "Tusche auf Papier · 11,75 × 8,5″",          mediumEn: "Ink on paper · 11.75 × 8.5″" },
    { file: "starfalling",     title: "Star Falling",                mediumDe: "Tusche auf Papier · 14 × 10,5″",            mediumEn: "Ink on paper · 14 × 10.5″" },
    { file: "immacolata",      title: "Immacolata",                  mediumDe: "Tusche auf Papier · Weaveworld",            mediumEn: "Ink on paper · Weaveworld" },
    { file: "shadwellunmasks", title: "Shadwell Unmasks Himself",    mediumDe: "Tusche auf Papier · Weaveworld",            mediumEn: "Ink on paper · Weaveworld" },
    { file: "joelsghost",      title: "Joel's Ghost",                mediumDe: "Öl auf Leinwand · 37 × 37″",                mediumEn: "Oil on canvas · 37 × 37″" }
  ];

  function artMedium(art) {
    return lang === "en" ? art.mediumEn : art.mediumDe;
  }

  var track = document.getElementById("galleryTrack");
  ARTWORKS.forEach(function (art, i) {
    var item = document.createElement("figure");
    item.className = "artitem";
    item.setAttribute("data-idx", i);
    item.innerHTML =
      '<span class="artitem__idx">' + String(i + 1).padStart(2, "0") + " / " + ARTWORKS.length + "</span>" +
      '<div class="artitem__frame"><img src="assets/art/' + art.file + '.jpg" alt="Clive Barker — ' + art.title + '" loading="lazy" /></div>' +
      '<figcaption class="artitem__caption">' +
      '<span class="artitem__title">' + art.title + "</span>" +
      '<span class="artitem__meta mono">' + artMedium(art) + "<br />© Clive Barker</span>" +
      "</figcaption>";
    track.appendChild(item);
  });
  var endCard = document.createElement("div");
  endCard.className = "gallery__end";
  endCard.setAttribute("data-i18n", "galerie.end");
  track.appendChild(endCard);

  /* ---------------- Apply language ---------------- */
  var langToggle = document.getElementById("langToggle");

  function setHeroWord(el, text) {
    el.innerHTML = "";
    text.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      span.style.transform = "translateY(0)";
      el.appendChild(span);
    });
  }

  function applyLanguage(rebuildHero) {
    document.documentElement.lang = lang;
    document.title = t("title.page");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    document.querySelectorAll(".artitem").forEach(function (item) {
      var art = ARTWORKS[parseInt(item.getAttribute("data-idx"), 10)];
      item.querySelector(".artitem__meta").innerHTML = artMedium(art) + "<br />© Clive Barker";
    });
    if (rebuildHero) {
      setHeroWord(document.getElementById("heroWord1"), t("hero.word1"));
    }
    langToggle.textContent = lang === "de" ? "EN" : "DE";
  }

  langToggle.addEventListener("click", function () {
    lang = lang === "de" ? "en" : "de";
    try { localStorage.setItem("imagineer-lang", lang); } catch (e) { /* ignore */ }
    applyLanguage(true);
    ScrollTrigger.refresh();
  });

  // Initial pass: translate static content; hero chars are built below for the
  // intro animation, so only rebuild them here if a non-default language loads.
  applyLanguage(false);

  /* ---------------- Loader ---------------- */
  var loader = document.getElementById("loader");
  var counter = { v: 0 };
  var countEl = document.getElementById("loaderCount");

  var introTl = gsap.timeline({
    onComplete: function () { loader.style.display = "none"; initScroll(); }
  });

  introTl
    .to(".loader__word", { opacity: 1, letterSpacing: "0.16em", duration: 1.1, ease: "power2.out" })
    .to(".loader__credit", { opacity: 1, duration: 0.7, ease: "power2.out" }, "-=0.5")
    .to(counter, {
      v: 100, duration: 0.9, ease: "power1.inOut",
      onUpdate: function () { countEl.textContent = String(Math.round(counter.v)).padStart(2, "0"); }
    }, "<")
    .to(".loader__inner", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, "+=0.15")
    .to(loader, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });

  /* ---------------- Hero text ---------------- */
  document.querySelectorAll("[data-split]").forEach(function (el) {
    var word = el.id === "heroWord1" ? t("hero.word1") : el.textContent;
    el.textContent = "";
    word.split("").forEach(function (ch) {
      var span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      el.appendChild(span);
    });
  });

  introTl
    .to(".hero__word .char", {
      y: 0, duration: 1.1, ease: "power4.out", stagger: 0.045
    }, "-=0.55")
    .to(".hero .reveal-line", {
      opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.12
    }, "-=0.6");

  gsap.set(".hero .reveal-line", { y: 24 });

  /* ---------------- Scroll choreography ---------------- */
  function initScroll() {
    if (reduceMotion) {
      gsap.set(".reveal, .reveal-line, .reveal-img", { opacity: 1 });
      return;
    }

    // Generic reveals
    gsap.utils.toArray(".reveal").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
    });

    gsap.utils.toArray(".reveal-img").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, clipPath: "inset(12% 12% 12% 12%)" },
        {
          opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
    });

    // Parallax inside image frames
    gsap.utils.toArray("[data-parallax]").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -6 }, {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: img.parentElement, scrub: 0.6, start: "top bottom", end: "bottom top" }
      });
    });

    // Work rows cascade
    gsap.fromTo(".workrow",
      { opacity: 0, y: 34 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: ".worklist", start: "top 82%" }
      });

    // Section titles drift in
    gsap.utils.toArray(".section__head").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, x: -36 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" }
        });
    });

    // Horizontal gallery
    var pin = document.getElementById("galleryPin");
    var getScroll = function () { return track.scrollWidth - window.innerWidth; };

    gsap.to(track, {
      x: function () { return -getScroll(); },
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: function () { return "+=" + getScroll(); },
        pin: true,
        scrub: 0.85,
        invalidateOnRefresh: true
      }
    });

    // Slight vertical stagger of art items while scrubbing
    gsap.utils.toArray(".artitem").forEach(function (item, i) {
      gsap.fromTo(item,
        { y: i % 2 === 0 ? 18 : -18 },
        {
          y: i % 2 === 0 ? -18 : 18, ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: "bottom top", scrub: 1.2 }
        });
    });

    ScrollTrigger.refresh();
  }

  /* ---------------- Smooth anchor scroll ---------------- */
  document.querySelectorAll("[data-scroll]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var target = link.getAttribute("href");
      gsap.to(window, {
        scrollTo: { y: target === "#top" ? 0 : target, autoKill: true },
        duration: 1.3, ease: "power3.inOut"
      });
    });
  });

  /* ---------------- Custom cursor ---------------- */
  var cursor = document.getElementById("cursor");
  var cursorLabel = document.getElementById("cursorLabel");
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    gsap.set(cursor, { x: -100, y: -100 });
    var cx = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    var cy = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    window.addEventListener("mousemove", function (e) {
      cx(e.clientX); cy(e.clientY);
    }, { passive: true });

    function bindCursor(selector, labelKey) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("is-hover");
          cursorLabel.textContent = labelKey ? t(labelKey) : "";
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-hover");
          cursorLabel.textContent = "";
        });
      });
    }
    bindCursor("a", "");
    bindCursor(".nav__lang", "");
    bindCursor(".artitem", "cursor.open");
    bindCursor(".workrow", "");
  }

  /* ---------------- Lightbox ---------------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lightboxMeta = document.getElementById("lightboxMeta");
  var backdrop = document.getElementById("lightboxBackdrop");
  var closeBtn = document.getElementById("lightboxClose");

  function openLightbox(idx) {
    var art = ARTWORKS[idx];
    lightboxImg.src = "assets/art/" + art.file + ".jpg";
    lightboxImg.alt = "Clive Barker — " + art.title;
    lightboxTitle.textContent = art.title;
    lightboxMeta.textContent = artMedium(art);
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

  track.addEventListener("click", function (e) {
    var item = e.target.closest(".artitem");
    if (item) openLightbox(parseInt(item.getAttribute("data-idx"), 10));
  });
  backdrop.addEventListener("click", closeLightbox);
  closeBtn.addEventListener("click", closeLightbox);
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  /* ---------------- Nav shrink on scroll ---------------- */
  var nav = document.getElementById("nav");
  ScrollTrigger.create({
    start: "top -80",
    onUpdate: function (self) {
      gsap.to(nav, { y: self.direction === 1 ? -100 : 0, duration: 0.4, ease: "power2.out" });
    }
  });
})();
