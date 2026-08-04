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
    { slug: "fear-love-story-and-time", title: "Fear, Love, Story... and Time", ext: "intsrevel37.html", date: { de: "Frühjahr 2022", en: "Spring 2022" } },
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

  /* ---------------- Rendering ---------------- */
  var list = document.getElementById("interviewList");
  var yearGrid = document.getElementById("yearGrid");

  function renderList() {
    var html = "";
    INTERVIEWS.forEach(function (iv, i) {
      var num = String(INTERVIEWS.length - i).padStart(2, "0");
      var inner =
        '<span class="introw__num mono">' + num + "</span>" +
        '<span class="introw__title">' + iv.title + "</span>" +
        '<span class="introw__date mono">' + pick(iv.date) +
        (iv.ext ? " · " + t("interviews.archiveTag") : "") + "</span>";
      if (iv.ext) {
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
    document.title = t("title.interviews");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    renderList();
    renderYears();
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
