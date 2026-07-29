/* ============================================================
   Motion & Interaktion — GSAP-Choreografie
   Claude Fable 5 (Anthropic)
   ============================================================ */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  /* ---------------- Gallery data ---------------- */
  var ARTWORKS = [
    { file: "patriarch",       title: "Patriarch",                      medium: "Öl auf Leinwand · 48 × 60″" },
    { file: "suspension",      title: "Suspension",                     medium: "Tusche auf Papier · 22 × 30″" },
    { file: "thebeliever",     title: "The Believer",                   medium: "Öl auf Papier · 41 × 30″" },
    { file: "ouroborous",      title: "Ouroborous",                     medium: "Öl auf Leinwand · 30 × 24″" },
    { file: "daemon",          title: "Daemon",                         medium: "Tusche auf Papier · 11,5 × 8,25″" },
    { file: "deathmaiden",     title: "Death and the Maiden",           medium: "Tusche auf Papier · 14 × 17″" },
    { file: "stitchling",      title: "A Stitchling",                   medium: "Acryl & Tusche auf Papier · 30 × 22″" },
    { file: "wolfskin",        title: "A Man in the Skin of a Wolf",    medium: "Tusche auf Papier · 17 × 11″" },
    { file: "demon10",         title: "Demon",                          medium: "Papier · 23,25 × 16,5″" },
    { file: "mementomori",     title: "Memento Mori",                   medium: "Tusche auf Papier · 24 × 18″" },
    { file: "sorcerers",       title: "Sorcerers",                      medium: "Tusche auf Papier · 24 × 18″" },
    { file: "belial",          title: "Belial",                         medium: "Tusche auf Papier · 11,75 × 8,5″" },
    { file: "starfalling",     title: "Star Falling",                   medium: "Tusche auf Papier · 14 × 10,5″" },
    { file: "immacolata",      title: "Immacolata",                     medium: "Tusche auf Papier · Weaveworld" },
    { file: "shadwellunmasks", title: "Shadwell Unmasks Himself",       medium: "Tusche auf Papier · Weaveworld" },
    { file: "joelsghost",      title: "Joel's Ghost",                   medium: "Öl auf Leinwand · 37 × 37″" }
  ];

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
      '<span class="artitem__meta mono">' + art.medium + "<br />© Clive Barker</span>" +
      "</figcaption>";
    track.appendChild(item);
  });
  var endCard = document.createElement("div");
  endCard.className = "gallery__end";
  endCard.innerHTML = "Tausende weitere Werke schlummern im Archiv &mdash; dies ist nur ein Spalt in der Tür.";
  track.appendChild(endCard);

  /* ---------------- Loader ---------------- */
  var loader = document.getElementById("loader");
  var counter = { v: 0 };
  var countEl = document.getElementById("loaderCount");

  var introTl = gsap.timeline({
    onComplete: function () { loader.style.display = "none"; initScroll(); }
  });

  introTl
    .to(".loader__word", { opacity: 1, letterSpacing: "0.75em", duration: 1.1, ease: "power2.out" })
    .to(counter, {
      v: 100, duration: 0.9, ease: "power1.inOut",
      onUpdate: function () { countEl.textContent = String(Math.round(counter.v)).padStart(2, "0"); }
    }, "<")
    .to(".loader__inner", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, "+=0.15")
    .to(loader, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });

  /* ---------------- Hero text ---------------- */
  document.querySelectorAll("[data-split]").forEach(function (el) {
    var chars = el.textContent.split("");
    el.textContent = "";
    chars.forEach(function (ch) {
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

  /* ---------------- Work row hover preview ---------------- */
  var preview = document.getElementById("workPreview");
  var previewImg = document.getElementById("workPreviewImg");
  gsap.set(preview, { x: -600, y: -600 });
  var previewX = gsap.quickTo(preview, "x", { duration: 0.45, ease: "power3" });
  var previewY = gsap.quickTo(preview, "y", { duration: 0.45, ease: "power3" });

  document.querySelectorAll(".workrow").forEach(function (row) {
    row.addEventListener("mouseenter", function () {
      previewImg.src = row.getAttribute("data-img");
      gsap.to(preview, { opacity: 1, rotate: gsap.utils.random(-4, 4), duration: 0.35 });
    });
    row.addEventListener("mouseleave", function () {
      gsap.to(preview, { opacity: 0, duration: 0.3 });
    });
  });
  window.addEventListener("mousemove", function (e) {
    previewX(e.clientX);
    previewY(e.clientY);
  }, { passive: true });

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

    function bindCursor(selector, label) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("is-hover");
          cursorLabel.textContent = label;
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("is-hover");
          cursorLabel.textContent = "";
        });
      });
    }
    bindCursor("a", "");
    bindCursor(".artitem", "Öffnen");
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
    lightboxMeta.textContent = art.medium;
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
