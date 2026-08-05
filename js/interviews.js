/* ============================================================
   Interviews — Daten & Seitenlogik (Übersicht)
   Liste nach dem Revelations-Archiv (clivebarker.info/interviewsindex.html)
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

  /* ---------------- Revelations interviews (newest first) ----------------
     slug: künftige Detailseite · ext: Seite im Revelations-Archiv */
  var ARCHIVE_BASE = "https://www.clivebarker.info/";
  var INTERVIEWS = [
    { slug: "fear-love-story-and-time", title: "Fear, Love, Story... and Time", ext: "intsrevel37.html", local: true, date: { de: "Frühjahr 2022", en: "Spring 2022" } },
    { slug: "talking-of-the-painting-of-the-abarat", title: "Talking Of The Painting Of The Abarat", ext: "intsrevel36.html", date: { de: "März 2021", en: "March 2021" } },
    { slug: "on-the-way-to-heaven", title: "On The Way To Heaven, We Had A Picnic Of Ideas...", ext: "intsrevel35.html", date: { de: "November 2020", en: "November 2020" } },
    { slug: "plucking-apples-of-silver-and-gold", title: "Plucking Apples Of Silver And Gold", ext: "intsrevel34.html", date: { de: "April 2020", en: "April 2020" } },
    { slug: "out-of-the-depths", title: "Out Of The Depths", ext: "intsrevel33.html", date: { de: "Januar 2019", en: "January 2019" } },
    { slug: "artist-and-imaginer", title: "Artist And Imaginer", ext: "intsrevel32.html", date: { de: "September 2017", en: "September 2017" } },
    { slug: "beautiful-monsters", title: "Beautiful Monsters", ext: "intsrevel31.html", date: { de: "Mai/Juni 2014", en: "May–June 2014" } },
    { slug: "clive-rising", title: "Clive Rising", ext: "intsrevel30.html", date: { de: "September 2013", en: "September 2013" } },
    { slug: "a-light-hidden", title: "A Light, Hidden", ext: "intsrevel29.html", date: { de: "März 2012", en: "March 2012" } },
    { slug: "more-candy-sweetness-and-night", title: "More Candy: Sweetness And Night", ext: "intsrevel28.html", date: { de: "August 2011", en: "August 2011" } },
    { slug: "prevailing-against-the-perfect-storm", title: "Prevailing Against The Perfect Storm", ext: null, date: { de: "August 2010", en: "August 2010" } },
    { slug: "now-and-in-time-to-be", title: "Now And In Time To Be", ext: "intsrevel26.html", date: { de: "Januar 2010", en: "January 2010" } },
    { slug: "only-connect", title: "Only Connect", ext: "intsrevel25.html", date: { de: "August 2009", en: "August 2009" } },
    { slug: "the-bleed-between-the-apprentice-and-the-master", title: "The Bleed Between The Apprentice And The Master", ext: "intsrevel24.html", date: { de: "März 2009", en: "March 2009" } },
    { slug: "we-are-all-imaginary-animals", title: "We Are All Imaginary Animals...", ext: "intsrevel23.html", date: { de: "Oktober 2008", en: "October 2008" } },
    { slug: "a-skein-a-train", title: "A Skein, A Train: Connections Made, Connections Missed...", ext: "intsrevel22.html", date: { de: "Juli 2008", en: "July 2008" } },
    { slug: "pivotal-voices", title: "Pivotal Voices: Was, Is And Will Be", ext: "intsrevel21.html", date: { de: "April 2008", en: "April 2008" } },
    { slug: "working-in-the-midnight-hours", title: "Working In The Midnight Hours...", ext: "intsrevel20.html", date: { de: "Dezember 2007", en: "December 2007" } },
    { slug: "hellfire-and-the-demonation", title: "Hellfire And The Demonation", ext: "intsrevel19.html", date: { de: "September 2007", en: "September 2007" } },
    { slug: "mister-b", title: "Mister B.", ext: "intsrevel18.html", date: { de: "Juni 2007", en: "June 2007" } },
    { slug: "a-spiritual-retreat", title: "A Spiritual Retreat", ext: "intsrevel17.html", date: { de: "März 2007", en: "March 2007" } },
    { slug: "pinheads-progress", title: "Pinhead's Progress", ext: "intsrevel16.html", date: { de: "Dezember 2006", en: "December 2006" } },
    { slug: "its-yours-it-always-was", title: "'It's Yours - It Always Was...'", ext: "intsrevel15.html", date: { de: "Oktober 2006", en: "October 2006" } },
    { slug: "sowing-the-seeds-of-the-story-tree", title: "Sowing The Seeds Of The Story Tree", ext: "intsrevel14.html", date: { de: "September 2006", en: "September 2006" } },
    { slug: "you-called-he-came", title: "You Called, He Came...", ext: "intsrevel13.html", date: { de: "Juni 2006", en: "June 2006" } },
    { slug: "abarat-abarat-abarat-abarat-abarat", title: "Abarat. Abarat. Abarat. Abarat... Abarat!", ext: "intsrevel12.html", date: { de: "März 2006", en: "March 2006" } },
    { slug: "heaven-hell-and-the-dreaming-space-between", title: "Heaven, Hell And The Dreaming Space Between", ext: "intsrevel11.html", date: { de: "Dezember 2005", en: "December 2005" } },
    { slug: "rummaging-through-the-toybox", title: "Rummaging Through The Toybox: Plushes, Plagues and Plaudits", ext: "intsrevel10.html", date: { de: "August 2005", en: "August 2005" } },
    { slug: "the-lazarus-muse", title: "The Lazarus Muse: Nights Of Magic, Days Of Gore", ext: "intsrevel9a.html", date: { de: "Juni 2005", en: "June 2005" } },
    { slug: "the-hellbound-art", title: "The Hellbound Art: Memory, Fantasy And Filigree", ext: "intsrevel8.html", date: { de: "Februar 2005", en: "February 2005" } },
    { slug: "there-and-back-again-touring-the-abarat", title: "There And Back Again: Touring The Abarat", ext: "intsrevel7a.html", date: { de: "November 2004", en: "November 2004" } },
    { slug: "in-anticipation-of-the-deluge", title: "In Anticipation Of The Deluge: A Moment At The River's Edge", ext: "intsrevel6.html", date: { de: "Juli 2004", en: "July 2004" } },
    { slug: "abarat-2b-or-not-2a", title: "Abarat: 2B (Or Not 2A)...", ext: "intsrevel5.html", date: { de: "Juli 2003", en: "July 2003" } },
    { slug: "open-roads-what-price-wonderland", title: "Open Roads... What Price Wonderland?", ext: "intsrevel4.html", date: { de: "April 2002", en: "April 2002" } },
    { slug: "nips-and-tucks", title: "Nips And Tucks, Tits And Fucks", ext: "intsrevel3.html", date: { de: "Juli 2001", en: "July 2001" } },
    { slug: "leitmotifs-and-dark-beliefs", title: "Leitmotifs And Dark Beliefs", ext: "intsrevel2.html", date: { de: "September 1999", en: "September 1999" } },
    { slug: "the-good-the-bad-and-the-light-in-the-dark", title: "The Good, The Bad And The Light In The Dark", ext: "intsrevel1.html", date: { de: "November 1998", en: "November 1998" } }
  ];

  /* ---------------- Archived interviews by year ----------------
     Jahresseiten im Revelations-Archiv (2016 existiert dort nicht) */
  var YEARS = [
    { label: { de: "bis 1985", en: "to 1985" }, ext: "ints85.html" },
    { label: "1986", ext: "ints86.html" }, { label: "1987", ext: "ints87.html" },
    { label: "1988", ext: "ints88.html" }, { label: "1989", ext: "ints89.html" },
    { label: "1990", ext: "ints90.html" }, { label: "1991", ext: "ints91.html" },
    { label: "1992", ext: "ints92.html" }, { label: "1993", ext: "ints93.html" },
    { label: "1994", ext: "ints94.html" }, { label: "1995", ext: "ints95.html" },
    { label: "1996", ext: "ints96.html" }, { label: "1997", ext: "ints97.html" },
    { label: "1998", ext: "ints98.html" }, { label: "1999", ext: "ints99.html" },
    { label: "2000", ext: "ints00.html" }, { label: "2001", ext: "ints01.html" },
    { label: "2002", ext: "ints02.html" }, { label: "2003", ext: "ints03.html" },
    { label: "2004", ext: "ints04.html" }, { label: "2005", ext: "ints05.html" },
    { label: "2006", ext: "ints06.html" }, { label: "2007", ext: "ints07.html" },
    { label: "2008", ext: "ints08.html" }, { label: "2009", ext: "ints09.html" },
    { label: "2010", ext: "ints10.html" }, { label: "2011", ext: "ints11.html" },
    { label: "2012", ext: "ints12.html" }, { label: "2013", ext: "ints13.html" },
    { label: "2014", ext: "ints14.html" }, { label: "2015", ext: "ints15.html" },
    { label: "2017", ext: "ints17.html" }, { label: "2018", ext: "ints18.html" },
    { label: "2019", ext: "ints19.html" }, { label: "2020", ext: "ints20.html" },
    { label: "2021", ext: "ints21.html" }, { label: "2022", ext: "ints22.html" },
    { label: "2023", ext: "ints23.html" }, { label: "2024", ext: "ints24.html" },
    { label: "2025", ext: "ints25.html" }, { label: "2026", ext: "ints26.html" }
  ];

  /* ---------------- Interview-Detail: Bilder & Anker ----------------
     Die Volltexte liegen in js/interview-texts.js (manuell gepflegt).
     Bilder werden nach dem Absatz eingesetzt, der den Anker enthält —
     Positionen und Bildfolge wie auf der Archivseite. */
  var DETAILS = {
    "fear-love-story-and-time": {
      placements: [
        { anchor: "preposterous", pos: "center", imgs: [{ f: "cbdarkworlds.jpg", t: "Clive Barker's Dark Worlds", c: "Abrams/Cernunnos, 2022" }] },
        { anchor: "taught to be impartial", pos: "left", imgs: [{ f: "tunnel.jpg", t: "The Tunnel", c: "© Clive Barker" }] },
        { anchor: "part of everything else", pos: "right", imgs: [{ f: "harvey4.jpg", t: "What Do You Dream? (version)", c: "© Clive Barker" }] },
        { anchor: "argue about that one", pos: "left", imgs: [{ f: "lulutransformed2.jpg", t: "Lulu Transformed", c: "© Clive Barker" }] },
        { anchor: "variety of storytelling styles", pos: "right", imgs: [{ f: "bob3cover.jpg", t: "Books of Blood, Volume 3", c: "© Clive Barker" }] },
        { anchor: "another project in another medium", pos: "left", imgs: [{ f: "quietmen2.jpg", t: "Quiet Men", c: "© Clive Barker" }] },
        { anchor: "presents itself as a form of narrative", pos: "right", imgs: [{ f: "img9551.jpg", t: "Untitled", c: "© Clive Barker" }] },
        { anchor: "doing something twice", pos: "right", imgs: [{ f: "self_portrait_clive_web.jpg", t: "Self Portrait", c: "© Clive Barker" }] },
        { anchor: "needs to go away and think", pos: "center", imgs: [{ f: "lightmorning.jpg", t: "The Light of Morning", c: "© Clive Barker" }] },
        {
          anchor: "mystery of the womb", pos: "row",
          imgs: [
            { f: "axis10.jpg", t: "Axis (Primal Goddess)", c: "© Clive Barker" },
            { f: "axis11.jpg", t: "Axis (Christ Condition)", c: "© Clive Barker" },
            { f: "axis12.jpg", t: "Axis (Modern Man)", c: "© Clive Barker" }
          ]
        }
      ]
    }
  };

  function imgPath(slug, file) {
    return "assets/interviews/" + slug + "/" + file;
  }

  /* ---------------- Rendering ---------------- */
  var list = document.getElementById("interviewList");
  var yearGrid = document.getElementById("yearGrid");
  var detail = document.getElementById("interviewDetail");

  function renderList() {
    var html = "";
    INTERVIEWS.forEach(function (iv, i) {
      var num = String(INTERVIEWS.length - i).padStart(2, "0");
      var inner =
        '<span class="introw__num mono">' + num + "</span>" +
        '<span class="introw__title">' + iv.title + "</span>" +
        '<span class="introw__date mono">' + pick(iv.date) +
        (iv.local ? " · " + t("interviews.ownTag") : iv.ext ? " · " + t("interviews.archiveTag") : "") + "</span>";
      if (iv.local) {
        html +=
          '<li class="introw reveal-news"><a class="introw__inner" href="interview.html?i=' + iv.slug + '">' +
          inner + "</a></li>";
      } else if (iv.ext) {
        html +=
          '<li class="introw reveal-news"><a class="introw__inner" href="' + ARCHIVE_BASE + iv.ext +
          '" target="_blank" rel="noopener">' + inner + "</a></li>";
      } else {
        html += '<li class="introw reveal-news"><span class="introw__inner introw__inner--static">' + inner + "</span></li>";
      }
    });
    list.innerHTML = html;
    bindHoverCursor(".introw a");
  }

  /* ---------------- Detail: Text-Parser ---------------- */
  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function normalize(s) {
    return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').toLowerCase();
  }

  function parseTurns(raw, title) {
    var text = raw.replace(/\r/g, "");
    text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, "");          // Markdown-Bilder entfernen
    text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");        // Links auf Linktext reduzieren
    text = text.replace(/\[\]\([^)]*\)/g, "");                  // leere Link-Reste entfernen
    var turns = [];
    text.split(/\n\s*\n/).forEach(function (para) {
      var p = para.replace(/^#+\s*/, "").replace(/\s*\n\s*/g, " ").trim();
      if (!p) return;
      if (normalize(p) === normalize(title)) return;            // Titelzeile überspringen
      var m = p.match(/^(Revelations|Clive)\s*:\s*/);
      if (m) {
        turns.push({ who: m[1] === "Clive" ? "clive" : "rev", text: p.slice(m[0].length) });
      } else if (/^[“"]/.test(p)) {
        turns.push({ who: "cont", text: p });                   // Fortsetzung von Clives Antwort
      } else {
        turns.push({ who: "narr", text: p });                   // erzählender Zwischentext
      }
    });
    return turns;
  }

  function figureMarkup(slug, img, cls) {
    return (
      '<figure class="coverfig ivfig' + (cls ? " " + cls : "") + '" data-title="' + img.t + '">' +
      '<img src="' + imgPath(slug, img.f) + '" alt="' + img.t + '" loading="lazy" />' +
      '<figcaption class="mono">' + img.t + " · " + img.c + "</figcaption>" +
      "</figure>"
    );
  }

  function placementMarkup(slug, pl) {
    if (pl.pos === "row") {
      return '<div class="ivrow">' + pl.imgs.map(function (img) { return figureMarkup(slug, img, ""); }).join("") + "</div>";
    }
    var cls = pl.pos === "left" ? "ivfig--left" : pl.pos === "right" ? "ivfig--right" : "ivfig--center";
    return figureMarkup(slug, pl.imgs[0], cls);
  }

  /* ---------------- Detail: Rendering ---------------- */
  function renderDetail() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("i");
    var idx = INTERVIEWS.findIndex(function (iv) { return iv.slug === slug && iv.local; });
    if (idx === -1) idx = INTERVIEWS.findIndex(function (iv) { return iv.local; });
    var iv = INTERVIEWS[idx];
    var cfg = DETAILS[iv.slug] || { placements: [] };
    var no = INTERVIEWS.length - idx;
    var raw = (window.INTERVIEW_TEXTS && window.INTERVIEW_TEXTS[iv.slug]) || "";

    document.title = iv.title + " — Revelations · Clive Barker";

    var body = "";
    if (raw.trim()) {
      var turns = parseTurns(raw, iv.title);
      // Bilder nach Anker-Absätzen einsetzen
      var used = [];
      var html = "";
      turns.forEach(function (turn) {
        var safe = escapeHtml(turn.text);
        if (turn.who === "rev") {
          html += '<div class="ivturn ivturn--rev"><span class="ivturn__who mono">Revelations</span><p>' + safe + "</p></div>";
        } else if (turn.who === "clive") {
          html += '<div class="ivturn ivturn--clive"><span class="ivturn__who mono">Clive Barker</span><p>' + safe + "</p></div>";
        } else if (turn.who === "cont") {
          html += '<div class="ivturn ivturn--clive ivturn--cont"><p>' + safe + "</p></div>";
        } else {
          html += '<p class="ivnarr">' + safe + "</p>";
        }
        var np = normalize(turn.text);
        cfg.placements.forEach(function (pl, pi) {
          if (used.indexOf(pi) === -1 && np.indexOf(normalize(pl.anchor)) !== -1) {
            used.push(pi);
            html += placementMarkup(iv.slug, pl);
          }
        });
      });
      // Nicht verankerte Bilder ans Ende
      cfg.placements.forEach(function (pl, pi) {
        if (used.indexOf(pi) === -1) html += placementMarkup(iv.slug, pl);
      });
      body =
        '<p class="ivnote mono">' + t("interview.langNote") + "</p>" +
        '<div class="ivtext">' + html + "</div>";
    } else {
      // Volltext noch nicht eingepflegt: Hinweis + Bildergalerie
      var gallery = cfg.placements.map(function (pl) {
        return pl.imgs.map(function (img) { return figureMarkup(iv.slug, img, ""); }).join("");
      }).join("");
      body =
        '<div class="ivpending">' +
        '<p class="noveldetail__syn">' + t("interview.pending1") + "</p>" +
        '<p class="ivnote mono">' + t("interview.pending2") + "</p>" +
        '<p class="ivnote mono"><a href="' + ARCHIVE_BASE + iv.ext + '" target="_blank" rel="noopener">' + t("interview.readOrig") + "</a></p>" +
        "</div>" +
        '<div class="coverrow">' + gallery + "</div>";
    }

    detail.innerHTML =
      '<section class="newshero novelhero">' +
      '<p class="hero__eyebrow mono">' + t("interview.kind") + " " + no + " · " + pick(iv.date) + " · Phil &amp; Sarah Stokes</p>" +
      '<h1 class="novelhero__title">' + iv.title + "</h1>" +
      "</section>" +
      '<section class="noveldetail ivdetail">' +
      body +
      '<p class="coversection__credit mono">' + t("interview.credit") + "</p>" +
      '<nav class="novelpager">' +
      '<a class="novelpager__link mono" href="interviews.html">' + t("interview.backToList") + "</a>" +
      '<a class="novelpager__link mono" href="' + ARCHIVE_BASE + iv.ext + '" target="_blank" rel="noopener">' + t("interview.readOrig") + "</a>" +
      "</nav>" +
      "</section>";

    bindHoverCursor(".novelpager__link");
    bindHoverCursor(".coverfig");
    bindLightbox();
  }

  /* ---------------- Lightbox (Detailseite) ---------------- */
  function bindLightbox() {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox || lightbox.dataset.bound) return;
    lightbox.dataset.bound = "1";
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxTitle = document.getElementById("lightboxTitle");
    var lightboxMeta = document.getElementById("lightboxMeta");
    var backdrop = document.getElementById("lightboxBackdrop");
    var closeBtn = document.getElementById("lightboxClose");

    function open(fig) {
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
    function close() {
      gsap.to(".lightbox__figure", { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" });
      gsap.to(backdrop, {
        opacity: 0, duration: 0.35, delay: 0.1,
        onComplete: function () {
          lightbox.classList.remove("is-open");
          lightbox.setAttribute("aria-hidden", "true");
        }
      });
    }
    detail.addEventListener("click", function (e) {
      var fig = e.target.closest(".coverfig");
      if (fig) open(fig);
    });
    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function renderYears() {
    var html = "";
    YEARS.forEach(function (y) {
      var label = typeof y.label === "string" ? y.label : pick(y.label);
      html +=
        '<a class="yearlink mono" href="' + ARCHIVE_BASE + y.ext + '" target="_blank" rel="noopener">' +
        label + "</a>";
    });
    yearGrid.innerHTML = html;
    bindHoverCursor(".yearlink");
  }

  /* ---------------- Language ---------------- */
  var langToggle = document.getElementById("langToggle");

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    if (list) {
      document.title = t("title.interviews");
      renderList();
    }
    if (yearGrid) renderYears();
    if (detail) renderDetail();
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
  var fineCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function bindHoverCursor(selector) {
    if (!fineCursor) return;
    document.querySelectorAll(selector).forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
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
