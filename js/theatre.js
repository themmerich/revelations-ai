/* ============================================================
   Theater — Seitenlogik (statische Seite: Sprache, Cursor,
   Reveals, Cover-Lightbox)
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

  var langToggle = document.getElementById("langToggle");

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.title = t("title.theatre");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    langToggle.textContent = lang === "de" ? "EN" : "DE";
  }

  langToggle.addEventListener("click", function () {
    lang = lang === "de" ? "en" : "de";
    try { localStorage.setItem("imagineer-lang", lang); } catch (e) { /* ignore */ }
    applyLanguage();
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

  /* ---------------- Cover lightbox ---------------- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxTitle = document.getElementById("lightboxTitle");
    var lightboxMeta = document.getElementById("lightboxMeta");
    var backdrop = document.getElementById("lightboxBackdrop");
    var closeBtn = document.getElementById("lightboxClose");

    function openLb(fig) {
      var img = fig.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = fig.getAttribute("data-title") || "";
      lightboxMeta.textContent = fig.querySelector("figcaption").textContent;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      gsap.to(backdrop, { opacity: 1, duration: 0.4 });
      gsap.fromTo(".lightbox__figure",
        { opacity: 0, y: 40, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 });
    }
    function closeLb() {
      gsap.to(".lightbox__figure", { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
      gsap.to(backdrop, {
        opacity: 0, duration: 0.35, delay: 0.1,
        onComplete: function () {
          lightbox.classList.remove("is-open");
          lightbox.setAttribute("aria-hidden", "true");
        }
      });
    }
    document.querySelectorAll(".coverfig").forEach(function (fig) {
      fig.addEventListener("click", function () { openLb(fig); });
    });
    backdrop.addEventListener("click", closeLb);
    closeBtn.addEventListener("click", closeLb);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLb();
    });
  }

  /* ---------------- Custom cursor ---------------- */
  var cursor = document.getElementById("cursor");
  var fineCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (fineCursor) {
    gsap.set(cursor, { x: -100, y: -100 });
    var cx = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" });
    var cy = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" });
    window.addEventListener("mousemove", function (e) {
      cx(e.clientX); cy(e.clientY);
    }, { passive: true });

    document.querySelectorAll(".nav a, .nav__lang, .coverfig, .news-backlink").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
    });
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
