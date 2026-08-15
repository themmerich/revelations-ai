/* ============================================================
   News-Chronik — Daten & Seitenlogik
   Zusammengefasst nach dem Revelations-Archiv (clivebarker.info/news.html)
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
  } catch (e) { /* storage unavailable — stay with default */ }

  function t(key) {
    return (T[key] && T[key][lang]) || "";
  }

  var MONTHS = {
    de: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };

  /* ---------------- News data (newest first) ----------------
     d: "YYYY-MM" · de/en: summary · u: source link */
  var NEWS = [
    { d: "2026-08", de: "Clive erhält den World Fantasy Award für sein Lebenswerk — überreicht wird die Ehrung im Oktober auf der 52. World Fantasy Convention in Oakland; ebenfalls geehrt wird Joyce Carol Oates.", en: "Clive has been announced as a recipient later this year of the World Fantasy Award for Lifetime Achievement", u: "https://wfc2026.org/2026-world-fantasy-awards-final-ballot/" },
    { d: "2026-08", de: "Neue Details zum Hellraiser-Spukhaus der Halloween Horror Nights: Labyrinth-Eingang mit Lament-Box, Cenobiten aus den ersten beiden Filmen — und ein handschriftliches Lob von Clive.", en: "Updates on the Hellraiser haunted house at Halloween Horror Nights", u: "https://www.clivebarker.info/halloweenhorror.html#hhn2026" },

    { d: "2026-07", de: "Clive stellt eine Auswahl von Leinwandarbeiten und Skizzen zum Verkauf ins Archiv.", en: "Clive releases a selection of works on canvas and sketches for sale through the Archive", u: "https://www.clivebarkerarchive.com/store?category=Original+Art" },
    { d: "2026-07", de: "Bleeding Cool zeigt Cover und Innenseiten der kommenden Hellraiser-Comics von Boom! Studios.", en: "Covers and a selection of interior art from Boom! Studios's upcoming new Hellraiser comics at Bleeding Cool", u: "https://bleedingcool.com/comics/exclusive-boom-studios-official-september-2026-full-solicits-siktc50/" },

    { d: "2026-06", de: "Hellraiser-Spukhaus für die Halloween Horror Nights 2026 angekündigt — in Universal Orlando und Hollywood.", en: "Hellraiser haunted house announced for 2026's Halloween Horror Nights at Universal's Orlando Resort and at Universal Studios Hollywood", u: "https://www.universalorlando.com/hhn/en/us/haunted-houses" },
    { d: "2026-06", de: "Trick or Treat Studios startet Vorbestellungen für neue Masken und Figuren der Hellraiser-Kollektion.", en: "Trick or Treat Studios announces pre-orders for new masks, figures and more in its Hellraiser collection", u: "https://trickortreatstudios.com/collections/hellraiser" },
    { d: "2026-06", de: "Bloody Disgusting exklusiv: Fünf neue Hellraiser-One-Shots erscheinen bei Boom! Studios (»Resurrections«).", en: "Bloody Disgusting has exclusive news on five new Hellraiser one-shot comics from Boom! Studios", u: "https://bloody-disgusting.com/news/3955403/hellraiser-resurrections-boom-studios-event-unleashes-five-brand-new-one-shot-comics-exclusive/" },
    { d: "2026-06", de: "Entwickler-Präsentation von Hellraiser: Revival bei der Future Games Show Summer Showcase am 6. Juni.", en: "Catch a developer presentation of Hellraiser Revival at the Future Games Show Summer Showcase 6 June 2026", u: "https://www.futuregamesshow.com/" },

    { d: "2026-04", de: "Arrow Video (UK) veröffentlicht Nightbreed als 2-Disc-4K-UHD — Kinofassung und Director's Cut mit neuem Bonusmaterial.", en: "Arrow Video in the UK releases a new 2-disc 4K UHD Blu-ray of Nightbreed, both the Theatrical Cut and the Director's Cut, with new special features", u: "https://www.arrowfilms.com/p/4k/nightbreed-limited-edition-4k-ultra-hd/17748947/" },

    { d: "2026-02", de: "Pünktlich zum Valentinstag: Hellraiser: Revival bekommt einen »Love Story«-Trailer.", en: "Just in time for Valentine's Day, Hellraiser Revival has a new Love Story trailer...", u: "https://www.youtube.com/watch?v=n0lSTJtp1Vs" },
    { d: "2026-02", de: "Boom! Studios kündigt einen Kickstarter für Hellraiser: Leviathan's Vault an.", en: "Boom! Studios announces an imminent Kickstarter for Hellraiser: Leviathan's Vault", u: "https://www.kickstarter.com/projects/boom-studios/hellraiser-leviathans-library" },

    { d: "2025-12", de: "Suntup Editions veröffentlicht alle Details und Bestellinfos zu den neuen Ausgaben von The Hellbound Heart.", en: "Full details now released by Suntup Editions, including ordering details, for the new editions of The Hellbound Heart!", u: "https://suntup.press/the-hellbound-heart/" },
    { d: "2025-12", de: "Suntup Editions teasert die Ankündigung seiner Hellbound-Heart-Ausgaben an.", en: "Suntup Editions teases the announcement of its new editions of The Hellbound Heart", u: "https://suntup.press/news/teaser-for-december-18-2025-announcement/" },
    { d: "2025-12", de: "Neues Entwickler-Tagebuch »The Vision« zu Clive Barker's Hellraiser: Revival auf YouTube.", en: "A new Clive Barker's Hellraiser: Revival ‘The Vision’ Developer Diary is up now on YouTube", u: "https://www.youtube.com/watch?v=cH6RUE6OlxU" },

    { d: "2025-10", de: "Night of the Zoopocalypse startet am 10. Oktober in den britischen Kinos.", en: "Night of the Zoopocalypse hits UK cinemas from 10 October", u: "https://www.kazoofilms.co.uk/" },
    { d: "2025-10", de: "Grady Hendrix spricht im Instagram-Livestream mit vielen Beiträgern des neuen Nachworts über die Books of Blood.", en: "Grady Hendrix's Instagram livestream discussing Clive's Books of Blood with many of the contributors to the new edition's afterword is linked here", u: "https://www.instagram.com/reel/DPfGqnVjMbZ/" },

    { d: "2025-09", de: "Eine neue Inszenierung von Clives Stück Subtle Bodies kommt nach Pennsylvania.", en: "A new production of Clive's play, Subtle Bodies, comes to Pennsylvania", u: "https://www.clivebarker.info/playsindex.html" },
    { d: "2025-09", de: "Berkley (US) bringt die Books of Blood 1–3 als Sammel-Taschenbuch — mit neuem Nachwort von Grady Hendrix und Stimmen von Tremblay, LaValle, Katsu u. v. a.", en: "A new collected paperback edition of Clive's Books of Blood Volumes 1, 2 and 3 from Berkley in the US has a new afterword by Grady Hendrix including contributions from Mick Garris, Paul Tremblay, Eric LaRocca, Victor LaValle, Cynthia Pelayo, Sarah Langan, Hailey Piper, John Langan and Alma Katsu.", u: "https://www.clivebarker.info/bloodcompbib.html" },

    { d: "2025-07", de: "Saber Interactive kündigt Clive Barker's Hellraiser: Revival an — Single-Player für PC, PS5 und Xbox Series X|S.", en: "Saber Interactive announces new single-player game, Clive Barker's Hellraiser: Revival, coming to PC, PlayStation 5, and Xbox Series X|S", u: "https://hellraisergame.com" },

    { d: "2025-06", de: "Die Complete Collection von Next Testament erscheint zu Boom! Studios' 20-Jahre-Jubiläum am 16. September — jetzt vorbestellbar.", en: "The Complete Collection edition of Clive Barker's Next Testament is confirmed for release as part of Boom! Studios' 20 year celebrations. Available for pre-order from comic stores now ahead of a release date of 16 September 2025", u: "https://www.clivebarker.info/nexttest.html#2025" },

    { d: "2025-05", de: "Subterranean Press nimmt Bestellungen für die gesammelten Jump-Tribe-Geschichten und -Gedichte an.", en: "Subterranean Press's new collected edition of the Jump Tribe stories and poems is available for order", u: "https://subterraneanpress.com/barker-jt/" },

    { d: "2025-03", de: "Del Howisons Sammlung What Fresh Hell Is This? erscheint — mit einem Vorwort von Clive.", en: "Del Howison's newly-published collection of dark tales, What Fresh Hell Is This? contains a foreword by Clive", u: "https://www.amazon.com/What-Fresh-Hell-This-Tales/dp/1964398479/" },
    { d: "2025-03", de: "Die neue Hellraiser-Kollektion bei Fright-Rags ist erhältlich.", en: "The new Hellraiser Collection at Fright Rags is now available!", u: "https://www.fright-rags.com/collections/hellraiser" },

    { d: "2025-01", de: "Hellraiser kehrt 4K-restauriert für zwei Tage in die US-Kinos zurück — 5. und 6. Februar via Fathom.", en: "Hellraiser (in its 4K remastered form) is back in US cinemas for two days next month - 5 and 6 February - via Fathom Entertainment", u: "https://www.fathomevents.com/events/hellraiser-remastered/" },

    { d: "2024-12", de: "Rue Morgue #222 (Jan/Feb 2025) bringt ein Interview mit Clive — plus Kunst und Poesie.", en: "Clive is interviewed in the January / February 2025 issue of Rue Morgue, which also features his artwork and poetry", u: "https://rue-morgue.com/sneak-peek-spend-an-evening-with-clive-barker-in-rue-morgue-222-jan-feb-2025-xmas-issue/" },

    { d: "2024-11", de: "Ulule-Kampagne für die französische Ausgabe von Clive Barker's Dark Worlds ist gestartet (Livr'S / Faute de Frappe).", en: "Livr'S and Faute de Frappe's Ulule campaign for a French edition of Clive Barker's Dark Worlds is now live", u: "https://fr.ulule.com/anthologie-clive-barker-dark-worlds-version-francaise/" },
    { d: "2024-11", de: "Subterranean Press plant die gesammelte Jump Tribe für den 31. März 2025.", en: "Subterranean Press set to publish the collected Jump Tribe on 31 March 2025", u: "https://www.clivebarker.info/bookswip.html#jumptribe" },

    { d: "2024-10", de: "Clives Auftrittspläne aktualisiert: das verschobene Spooky Empire findet im November in Orlando statt.", en: "Clive's upcoming appearance plans updated for the rescheduled Spooky Empire event in November in Orlando", u: "https://www.clivebarker.info/newsaddress.html" },
    { d: "2024-10", de: "Night of the Zoopocalypse feiert Premiere auf dem Sitges Film Festival.", en: "Night of the Zoopocalypse premieres at the Sitges Film Festival", u: "https://sitgesfilmfestival.com/en/film/2024/night-zoopocalypse" },

    { d: "2024-09", de: "Harper Perennial bringt The Thief of Always als limitierte Olive Edition mit Cover von Milan Bozic.", en: "Harper Perennial releases a new edition of The Thief of Always in its 2024 suite of Olive Editions with cover art by Milan Bozic - limited time availability", u: "https://www.harpercollins.com/pages/oliveeditions" },
    { d: "2024-09", de: "Surge Licensing wird globaler Lizenzagent für Hellraiser — Fright-Rags- und Trick-or-Treat-Produkte folgen im Frühjahr 2025.", en: "Surge Licensing appointed Global Licensing Agent for Hellraiser with Fright-Rags and Trick or Treat releases set for spring 2025", u: "https://licensinginternational.org/news/surge-licensing-appointed-global-licensing-agent-for-iconic-hellraiser-horror-film-franchise/" },

    { d: "2024-08", de: "Auftrittspläne aktualisiert: ScareFest Weekend in Lexington im Oktober.", en: "Clive's upcoming appearance plans updated for the ScareFest Weekend in Lexington in October", u: "https://www.clivebarker.info/newsaddress.html" },
    { d: "2024-08", de: "Arrow Video kündigt die US-Ausgabe der 4K-Box »Quartet of Torment« (Hellraiser 1–4) für Oktober an — mit Pinhead- und Chatterer-Cover.", en: "Arrow Video announces an October 2024 US release of its 4K Blu-ray and ultra HD collections of the first four Hellraiser films - Quartet of Torment - pre-ordering now in both a Pinhead cover edition and a Chatterer cover edition", u: "https://www.arrowvideo.com/4k/hellraiser-quartet-of-torment-pinhead-slipcase-limited-edition-4k-uhd/15463701.html" },

    { d: "2024-05", de: "Spooky-Empire-Auftritt verschoben — Termin wird neu angesetzt.", en: "* EVENT POSTPONED * Clive's upcoming appearance plans updated for Spooky Empire in October * EVENT POSTPONED *", u: "https://www.clivebarker.info/newsaddress.html" },
    { d: "2024-05", de: "Clives Gedicht »Upon a Milk Warm Dawn« erscheint in The Mad Butterfly's Ball (PS Publishing).", en: "Clive has contributed his poem, Upon a Milk Warm Dawn, to Preston Grassmann and Chris Kelso's new collection, The Mad Butterfly's Ball - available for pre-order now from PS Publishing", u: "https://pspublishing.co.uk/the-mad-butterflys-ball-signed-hardcover-edited-by-preston-grassmann--chris-kelso-6260-p.asp" },

    { d: "2024-04", de: "Barbie Wildes Sammlung The Cilicium Quadra ist erschienen.", en: "Barbie Wilde's collection, The Cilicium Quadra, is available now", u: "https://www.amazon.com/CILICIUM-QUADRA-Barbie-Wilde/dp/1399981714/" },

    { d: "2024-03", de: "Clive gibt ein Update zu laufenden Projekten und Plänen.", en: "Clive's update on projects and plans", u: "https://www.clivebarker.info/ints24.html" },
    { d: "2024-03", de: "Clives Auftrittspläne aktualisiert.", en: "Clive's upcoming appearance plans", u: "https://www.clivebarker.info/newsaddress.html" },

    { d: "2024-01", de: "Ryan Danhauser und Jose Leitao veröffentlichen die gesammelten Interviews des Clive Barker Podcast als Buch.", en: "Ryan Danhauser and Jose Leitao release their volume of collected interviews for The Clive Barker Podcast - head over to their news page for details and order links", u: "https://clivebarkercast.com/2024/01/22/the-barkercast-interviews-occupy-midian-is-available-to-buy/" },

    { d: "2023-11", de: "Polymorphic Productions bringt The History of the Devil nach Brisbane — bis 16. Dezember.", en: "Polymorphic Productions stages The History of The Devil in Brisbane, Australia - running to 16 December 2023", u: "https://metroarts.com.au/event/the-history-of-the-devil/" },

    { d: "2023-10", de: "Earthling kündigt die lang erwartete Lettered Edition von Weaveworld für 2024 an.", en: "Earthling announces the 2024 release of its long-anticipated lettered edition of Weaveworld", u: "https://www.clivebarker.info/bookswip.html#neweditions" },

    { d: "2023-09", de: "Umbrella Entertainment kündigt eine Collector's-Edition-Blu-ray von Lord of Illusions mit Extras an.", en: "Umbrella Entertainment announces a Collector's Edition Blu-ray release of Lord of Illusions with additional extras - pre-ordering now", u: "https://shop.umbrellaent.com.au/products/clive-barkers-lord-of-illusions-2-disc-collectors-edition-blu-ray-book-rigid-case-slipcase-poster-artcards-1995" },
    { d: "2023-09", de: "Cemetery Dance legt Reading Stephen King neu auf — mit Clives »Stephen King Celebration« von 2007.", en: "Cemetery Dance announces a new trade paperback release of Reading Stephen King, which includes Clive's 'Stephen King Celebration' from 2007", u: "https://www.cemeterydance.com/readingsking" },

    { d: "2023-07", de: "Arrow Films kündigt die 4K-Box »Quartet of Torment« der ersten vier Hellraiser-Filme für Oktober an.", en: "Arrow Films announces an October release of a 4K ultra HD collection of the first four Hellraiser films - Quartet of Torment - pre-ordering now", u: "https://www.clivebarker.info/newsarrowhrquartet.html" },

    { d: "2023-04", de: "Zwei Gedichte von Clive erscheinen in Preston Grassmanns Anthologie Multiverses (Titan).", en: "Two of Clive's poems included in Preston Grassmann's new anthology, Multiverses - out now from Titan", u: "https://www.clivebarker.info/poems.html" },

    { d: "2023-01", de: "Clives Kunst ist in der aktuellen Ausgabe von Hi-Fructose zu sehen.", en: "Clive's artwork features in the latest issue of Hi Fructose", u: "https://store.hifructose.com/products/hi-fructose-volume-65-pre-order" },

    { d: "2022-12", de: "Gespräch mit Angel Melanson (Fangoria) über Clive Barker's Dark Worlds.", en: "Our conversation with Angel Melanson for Fangoria about Clive Barker's Dark Worlds", u: "https://www.youtube.com/watch?v=iS9nn0p8flU" },

    { d: "2022-10", de: "Clive Barker's Dark Worlds — die karriereumspannende Monografie — ist im Handel.", en: "Clive Barker's Dark Worlds, covering Clive's creative works to date in a career-spanning monograph, is now on sale!", u: "https://www.clivebarker.info/newsdark-worlds.html" },
    { d: "2022-10", de: "Phil & Sarah signieren Dark Worlds am 30. Oktober im BFI Southbank, London.", en: "Phil & Sarah will be signing copies of Dark Worlds at BFI Southbank, London on 30 October, 2022", u: "https://whatson.bfi.org.uk/Online/default.asp?doWork::WScontent::loadArticle=Load&BOparam::WScontent::loadArticle::article_id=B5A276AA-6410-4656-89C3-550108177AA6&BOparam::WScontent::loadArticle::context_id=D651C1AA-F2BF-4F3C-BB1B-588D98CB13D2" },

    { d: "2022-09", de: "Regisseur David Bruckner spricht mit Entertainment Weekly über seinen Hellraiser für Hulu.", en: "Director David Bruckner updates Entertainment Weekly on his upcoming Hellraiser release for Hulu", u: "https://www.clivebarker.info/filmswip.html#sept22" },

    { d: "2022-08", de: "Der visionäre Künstler Majo Pavlovic spricht mit Revelations über seine Arbeit mit Clive.", en: "Visionary artist Majo Pavlovic talks to Revelations about his work with Clive", u: "https://www.clivebarker.info/majopavlovic.html" },

    { d: "2022-06", de: "Neues Revelations-Interview mit Clive zu kommenden TV-Projekten.", en: "New Revelations interview with Clive updating on new television projects", u: "https://www.clivebarker.info/intsrevel37.html" },
    { d: "2022-06", de: "Ankündigung von Clive Barker's Dark Worlds — die Monografie erscheint im Oktober 2022.", en: "Announcing our new book, covering Clive's creative works to date in a career-spanning monograph, Clive Barker's Dark Worlds, coming October 2022 *UPDATED*", u: "https://www.clivebarker.info/newsdark-worlds.html" },
    { d: "2022-06", de: "Outfest ehrt Clive mit dem ersten Platinum Maverick Award.", en: "Outfest honours Clive with its inaugural Platinum Maverick Award!", u: "https://www.hollywoodreporter.com/movies/movie-news/outfest-screenings-billy-porter-directorial-debut-1235161543/" },

    { d: "2022-02", de: "Frankenstein in Love wird an der Northern State University aufgeführt — 17. bis 19. Februar.", en: "Production of Frankenstein in Love at Northern State University 17 - 19 February, 2022", u: "https://www.clivebarker.info/playsindex.html" },

    { d: "2021-10", de: "Neue Presse-Statements von Clive sowie Regie und Produktion zum kommenden Hellraiser-Film.", en: "New press release comments from Clive and from the director and producers of the upcoming Hellraiser movie.", u: "https://www.clivebarker.info/filmswip.html#sept21" },

    { d: "2021-09", de: "Frische Aussagen von David Bruckner zum kommenden Hellraiser-Film.", en: "Fresh comments from the director of the upcoming Hellraiser movie, David Bruckner.", u: "https://www.clivebarker.info/filmswip.html#sept21" },
    { d: "2021-09", de: "Archiv-Blog: Rückblick auf die Vorlage von The Forbidden und Bernard Roses Candyman.", en: "Archive blog: Looking back at the source material for The Forbidden and Bernard Rose's Candyman movie", u: "https://www.clivebarkerarchive.com/blog" },

    { d: "2021-08", de: "Candyman startet am 27. August — mit Einblicken von Nia DaCosta, Yahya Abdul-Mateen II, Teyonah Parris und Tony Todd.", en: "As Candyman arrives on the 27th of this month, new insights from Nia DaCosta, Yahya Abdul-Mateen II, Teyonah Parris and Tony Todd in SFX, Interview, GQ, Fangoria and Total Film", u: "https://www.clivebarker.info/candyman2020.html" },
    { d: "2021-08", de: "David Bruckner über Vorlage und Neuinterpretation beim neuen Hellraiser.", en: "David Bruckner talks of the underlying source material and a reimagining as he directs the new Hellraiser movie", u: "https://www.clivebarker.info/filmswip.html#hellraiser" },
    { d: "2021-08", de: "Clive steuert Coverkunst und das unveröffentlichte Gedicht »Fear Only« zum Chvrches-Fanzine Screen Violence bei.", en: "Clive contributes cover art and a previously unpublished poem, Fear Only, to Screen Violence, a fanzine by Chvrches", u: "https://www.clivebarker.info/artmags.html" },

    { d: "2021-07", de: "Zwei neu veröffentlichte Theaterstücke: Nightlives und Frankenstein in Love sind erhältlich.", en: "Two newly released plays: Nightlives and Frankenstein in Love now available!", u: "https://www.clivebarkerarchive.com/store?category=Playscripts" },

    { d: "2021-06", de: "Neuer Candyman-Trailer veröffentlicht.", en: "New Candyman trailer released", u: "https://www.clivebarker.info/candyman2020.html" },

    { d: "2021-05", de: "Weitere von Clive ausgewählte Gemälde stehen im Archiv zum Verkauf.", en: "Several more paintings selected by Clive for sale through the Archive", u: "https://www.clivebarkerarchive.com/blog/2021/5/1/original-art-release" },
    { d: "2021-05", de: "The Damnation Game erscheint in den USA mit frischem Look als Taschenbuch.", en: "The Damnation Game gets a fresh new look for its paperback release in the US this month", u: "https://www.penguinrandomhouse.com/books/290221/the-damnation-game-by-clive-barker/" },

    { d: "2021-04", de: "Suntup Editions bringt eine Jubiläumsausgabe von Imajica zum 30. — illustriert von Jody Fallon.", en: "New thirtieth anniversary edition of Imajica from Suntup Editions, illustrated by Jody Fallon", u: "https://suntup.press/imajica" },
    { d: "2021-04", de: "Details zum Theatre-of-Blood-TV-Projekt in Gesprächen mit Mick Garris und dem Clive Barker Podcast.", en: "Clive offers some detail on the Theatre of Blood TV project in conversation with Mick Garris and Clive Barker Podcast interviews", u: "https://www.clivebarker.info/tvwip.html#tob" },
    { d: "2021-04", de: "Clive bestätigt das geplante Theatre-of-Blood-Projekt und verrät Abarat-Handlungspunkte.", en: "Clive confirms planned Theatre of Blood TV project and some Abarat plot points", u: "https://www.clivebarker.info/intsrevel36.html" },
    { d: "2021-04", de: "Zwölf Papierarbeiten, von Clive ausgewählt, stehen im Archiv zum Verkauf.", en: "Twelve works on paper selected by Clive for sale through the Archive", u: "https://www.clivebarkerarchive.com/store?category=Original+Art" },
    { d: "2021-04", de: "Majo Pavlovics visuelle Adaption der Erzählung »Unrequited« erscheint in Bosona #10 — auf Bosnisch und Englisch.", en: "A visual adaptation of Clive's erotic short story, Unrequited, by artist Majo Pavlovic has been released in Bosona #10 this month in Bosnian and English", u: "https://www.facebook.com/Revija-Bosona-455611547926400/" },

    { d: "2021-03", de: "Neuigkeiten zu jüngsten Zugängen im Archiv.", en: "News of recent additions to the Archive", u: "https://www.clivebarkerarchive.com/blog" },
    { d: "2021-03", de: "Zwei Lieblingsromane bekommen im Frühjahr ein neues Gesicht — den Anfang macht Weaveworld.", en: "A refreshed look for a couple of favourite novels is coming this spring - first up is Weaveworld", u: "https://www.clivebarker.info/bookswip.html#weave2021" },

    { d: "2021-02", de: "Neue T-Shirt-Designs — Harvey und Lulu — im Threadless-Store.", en: "New T-shirt designs - Harvey and Lulu - available in Clive's Threadless merchandise store", u: "https://clivebarker.threadless.com/" },

    { d: "2021-01", de: "Neues Revelations-Interview mit Clive zu aktuellen Projekten.", en: "New Revelations interview with Clive updating on new projects", u: "https://www.clivebarker.info/intsrevel35.html" },
    { d: "2021-01", de: "25 neue Bilder in der Archiv-Galerie: Setfotos, VHS- und DVD-Cover, Anzeigen, Magazine, Manuskripte.", en: "Twenty five new images added to the Archive Gallery: behind the scenes photos, VHS and DVD covers, adverts, magazines, manuscripts and more!", u: "https://www.clivebarkerarchive.com/gallery" },

    { d: "2020-11", de: "Neue Poster-Prints sowie Geschenke und Karten zur Weihnachtszeit im Threadless-Store.", en: "New series of poster prints, and holiday gifts and cards available in Clive's Threadless merchandise store", u: "https://clivebarker.threadless.com/home/fine-art-print" },

    { d: "2020-10", de: "Clive stellt sich am 12. Oktober im Reddit-AMA mit Hulu den Fragen von r/horror — hier zum Nachlesen.", en: "Clive is set to do an AMA with @hulu over on reddit - head to Dreadit (r/horror) at 3pm PST / 6pm EST on Monday 12 October 2020 *UPDATE* Catch up with Clive's conversation here", u: "https://www.reddit.com/r/horror/comments/j9zgwb/im_clive_barker_an_author_artist_and_imaginer_my/" },
    { d: "2020-10", de: "Interviews mit Clive bei Den of Geek, ComingSoon.net, ComicBook.com, Daily Dead, Looper und mehr.", en: "Interviews with Clive for Den of Geek, ComingSoon.net *UPDATE* also ComicBook.com, Daily Dead, Looper and more", u: "https://www.clivebarker.info/ints20.html" },
    { d: "2020-10", de: "Cast-Interviews zur TV-Adaption der Books of Blood.", en: "Cast interviews for The Books of Blood TV adaptation", u: "https://www.clivebarker.info/bobtv.html" },
    { d: "2020-10", de: "Variety meldet: Candyman bekommt den neuen Kinostart 27. August 2021.", en: "Variety reports that Candyman has a new theatrical release date of 27 August 2021", u: "https://www.clivebarker.info/candyman2020.html" },

    { d: "2020-09", de: "Clive liest eine Reihe seiner Gedichte — hier anzuhören.", en: "Clive reads a number of his poems - listen here!", u: "https://www.clivebarker.info/bookswip.html#presencebreath" },
    { d: "2020-09", de: "Der vollständige Trailer zum Books-of-Blood-Film ist da.", en: "Full trailer for the Books of Blood movie released", u: "https://youtu.be/vj3sRzcvCJc" },
    { d: "2020-09", de: "Candyman-Kinostart auf 2021 verschoben.", en: "*UPDATE* Candyman theatrical release delayed to 2021", u: "https://www.clivebarker.info/candyman2020.html" },
    { d: "2020-09", de: "Hulu veröffentlicht einen Teaser zum Books-of-Blood-Film.", en: "Hulu releases teaser for the Books of Blood movie", u: "https://www.youtube.com/watch?v=qnLq8rV8Wfs" },

    { d: "2020-08", de: "Clive eröffnet einen Online-Store: Kleidung und Accessoires mit Motiven aus der Imaginer-Reihe und darüber hinaus.", en: "Clive is delighted to announce a new online store! Now taking orders for a range of clothes and accessories bearing his artwork from the Imaginer series of books and beyond.", u: "https://clivebarker.threadless.com/" }
  ];

  /* ---------------- Render ---------------- */
  var listEl = document.getElementById("newsList");

  function monthLabel(d) {
    var parts = d.split("-");
    return MONTHS[lang][parseInt(parts[1], 10) - 1] + " " + parts[0];
  }

  function render() {
    // Group items: years (in order) → months (in order) → items
    var years = [];
    var yearMap = {};
    NEWS.forEach(function (item) {
      var year = item.d.slice(0, 4);
      if (!yearMap[year]) {
        yearMap[year] = { months: [], monthMap: {} };
        years.push(year);
      }
      var y = yearMap[year];
      if (!y.monthMap[item.d]) {
        y.monthMap[item.d] = [];
        y.months.push(item.d);
      }
      y.monthMap[item.d].push(item);
    });

    var html = "";
    years.forEach(function (year) {
      html += '<div class="newsyear reveal-news" aria-hidden="true">' + year + "</div>";
      yearMap[year].months.forEach(function (month) {
        html += '<div class="newsgroup reveal-news">';
        html += '<p class="newsgroup__month mono">' + monthLabel(month) + "</p><ul>";
        yearMap[year].monthMap[month].forEach(function (item) {
          html +=
            '<li class="newsitem"><a href="' + item.u + '" target="_blank" rel="noopener">' +
            (lang === "en" ? item.en : item.de) +
            '&nbsp;<span class="newsitem__ext mono" aria-hidden="true">↗</span></a></li>';
        });
        html += "</ul></div>";
      });
    });
    listEl.innerHTML = html;
    bindItemCursor();
  }

  /* ---------------- Language ---------------- */
  var langToggle = document.getElementById("langToggle");

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.title = t("title.news");
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    render();
    langToggle.textContent = lang === "de" ? "EN" : "DE";
  }

  langToggle.addEventListener("click", function () {
    lang = lang === "de" ? "en" : "de";
    try { localStorage.setItem("imagineer-lang", lang); } catch (e) { /* ignore */ }
    applyLanguage();
    // render() replaced the list DOM: drop ScrollTriggers whose trigger node
    // is gone and show the fresh nodes immediately (no re-entrance animation).
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
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
    });
  }

  /* ---------------- Custom cursor ---------------- */
  var cursor = document.getElementById("cursor");
  var cursorLabel = document.getElementById("cursorLabel");
  var fineCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function bindItemCursor() {
    if (!fineCursor) return;
    document.querySelectorAll(".newsitem a").forEach(function (el) {
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

    document.querySelectorAll(".nav a, .nav__lang, .news-backlink").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hover"); cursorLabel.textContent = ""; });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hover"); });
    });
    bindItemCursor();
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
