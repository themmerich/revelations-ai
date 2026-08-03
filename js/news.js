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
    { d: "2026-07", de: "Clive stellt eine Auswahl von Leinwandarbeiten und Skizzen zum Verkauf ins Archiv.", en: "Clive releases a selection of canvases and sketches for sale through the Archive.", u: "https://www.clivebarkerarchive.com/store?category=Original+Art" },
    { d: "2026-07", de: "Bleeding Cool zeigt Cover und Innenseiten der kommenden Hellraiser-Comics von Boom! Studios.", en: "Bleeding Cool previews covers and interior art from Boom! Studios' upcoming Hellraiser comics.", u: "https://bleedingcool.com/comics/exclusive-boom-studios-official-september-2026-full-solicits-siktc50/" },

    { d: "2026-06", de: "Hellraiser-Spukhaus für die Halloween Horror Nights 2026 angekündigt — in Universal Orlando und Hollywood.", en: "A Hellraiser haunted house is announced for 2026's Halloween Horror Nights at Universal Orlando and Hollywood.", u: "https://www.universalorlando.com/hhn/en/us/haunted-houses" },
    { d: "2026-06", de: "Trick or Treat Studios startet Vorbestellungen für neue Masken und Figuren der Hellraiser-Kollektion.", en: "Trick or Treat Studios opens pre-orders for new masks and figures in its Hellraiser collection.", u: "https://trickortreatstudios.com/collections/hellraiser" },
    { d: "2026-06", de: "Bloody Disgusting exklusiv: Fünf neue Hellraiser-One-Shots erscheinen bei Boom! Studios (»Resurrections«).", en: "Bloody Disgusting exclusive: five brand-new Hellraiser one-shot comics coming from Boom! Studios ('Resurrections').", u: "https://bloody-disgusting.com/news/3955403/hellraiser-resurrections-boom-studios-event-unleashes-five-brand-new-one-shot-comics-exclusive/" },
    { d: "2026-06", de: "Entwickler-Präsentation von Hellraiser: Revival bei der Future Games Show Summer Showcase am 6. Juni.", en: "A developer presentation of Hellraiser: Revival airs at the Future Games Show Summer Showcase on 6 June.", u: "https://www.futuregamesshow.com/" },

    { d: "2026-04", de: "Arrow Video (UK) veröffentlicht Nightbreed als 2-Disc-4K-UHD — Kinofassung und Director's Cut mit neuem Bonusmaterial.", en: "Arrow Video (UK) releases a 2-disc 4K UHD of Nightbreed — theatrical and director's cut with new special features.", u: "https://www.arrowfilms.com/p/4k/nightbreed-limited-edition-4k-ultra-hd/17748947/" },

    { d: "2026-02", de: "Pünktlich zum Valentinstag: Hellraiser: Revival bekommt einen »Love Story«-Trailer.", en: "Just in time for Valentine's Day, Hellraiser: Revival gets a 'Love Story' trailer.", u: "https://www.youtube.com/watch?v=n0lSTJtp1Vs" },
    { d: "2026-02", de: "Boom! Studios kündigt einen Kickstarter für Hellraiser: Leviathan's Vault an.", en: "Boom! Studios announces an imminent Kickstarter for Hellraiser: Leviathan's Vault.", u: "https://www.kickstarter.com/projects/boom-studios/hellraiser-leviathans-library" },

    { d: "2025-12", de: "Suntup Editions veröffentlicht alle Details und Bestellinfos zu den neuen Ausgaben von The Hellbound Heart.", en: "Suntup Editions releases full details and ordering info for its new editions of The Hellbound Heart.", u: "https://suntup.press/the-hellbound-heart/" },
    { d: "2025-12", de: "Suntup Editions teasert die Ankündigung seiner Hellbound-Heart-Ausgaben an.", en: "Suntup Editions teases the announcement of its Hellbound Heart editions.", u: "https://suntup.press/news/teaser-for-december-18-2025-announcement/" },
    { d: "2025-12", de: "Neues Entwickler-Tagebuch »The Vision« zu Clive Barker's Hellraiser: Revival auf YouTube.", en: "A new Clive Barker's Hellraiser: Revival developer diary, 'The Vision', is up on YouTube.", u: "https://www.youtube.com/watch?v=cH6RUE6OlxU" },

    { d: "2025-10", de: "Night of the Zoopocalypse startet am 10. Oktober in den britischen Kinos.", en: "Night of the Zoopocalypse hits UK cinemas from 10 October.", u: "https://www.kazoofilms.co.uk/" },
    { d: "2025-10", de: "Grady Hendrix spricht im Instagram-Livestream mit vielen Beiträgern des neuen Nachworts über die Books of Blood.", en: "Grady Hendrix hosts an Instagram livestream on the Books of Blood with many contributors to the new edition's afterword.", u: "https://www.instagram.com/reel/DPfGqnVjMbZ/" },

    { d: "2025-09", de: "Eine neue Inszenierung von Clives Stück Subtle Bodies kommt nach Pennsylvania.", en: "A new production of Clive's play Subtle Bodies comes to Pennsylvania.", u: "https://www.clivebarker.info/playsindex.html" },
    { d: "2025-09", de: "Berkley (US) bringt die Books of Blood 1–3 als Sammel-Taschenbuch — mit neuem Nachwort von Grady Hendrix und Stimmen von Tremblay, LaValle, Katsu u. v. a.", en: "Berkley (US) collects Books of Blood volumes 1–3 in paperback — with a new afterword by Grady Hendrix and contributions from Tremblay, LaValle, Katsu and more.", u: "https://www.clivebarker.info/bloodcompbib.html" },

    { d: "2025-07", de: "Saber Interactive kündigt Clive Barker's Hellraiser: Revival an — Single-Player für PC, PS5 und Xbox Series X|S.", en: "Saber Interactive announces Clive Barker's Hellraiser: Revival — a single-player game for PC, PS5 and Xbox Series X|S.", u: "https://hellraisergame.com" },

    { d: "2025-06", de: "Die Complete Collection von Next Testament erscheint zu Boom! Studios' 20-Jahre-Jubiläum am 16. September — jetzt vorbestellbar.", en: "The Next Testament Complete Collection is confirmed for Boom! Studios' 20-year celebrations, out 16 September — pre-orders open.", u: "https://www.clivebarker.info/nexttest.html#2025" },

    { d: "2025-05", de: "Subterranean Press nimmt Bestellungen für die gesammelten Jump-Tribe-Geschichten und -Gedichte an.", en: "Subterranean Press opens orders for its collected edition of the Jump Tribe stories and poems.", u: "https://subterraneanpress.com/barker-jt/" },

    { d: "2025-03", de: "Del Howisons Sammlung What Fresh Hell Is This? erscheint — mit einem Vorwort von Clive.", en: "Del Howison's collection What Fresh Hell Is This? is published — with a foreword by Clive.", u: "https://www.amazon.com/What-Fresh-Hell-This-Tales/dp/1964398479/" },
    { d: "2025-03", de: "Die neue Hellraiser-Kollektion bei Fright-Rags ist erhältlich.", en: "The new Hellraiser collection at Fright-Rags is now available.", u: "https://www.fright-rags.com/collections/hellraiser" },

    { d: "2025-01", de: "Hellraiser kehrt 4K-restauriert für zwei Tage in die US-Kinos zurück — 5. und 6. Februar via Fathom.", en: "The 4K-remastered Hellraiser returns to US cinemas for two days — 5 and 6 February via Fathom.", u: "https://www.fathomevents.com/events/hellraiser-remastered/" },

    { d: "2024-12", de: "Rue Morgue #222 (Jan/Feb 2025) bringt ein Interview mit Clive — plus Kunst und Poesie.", en: "Rue Morgue #222 (Jan/Feb 2025) interviews Clive — featuring his artwork and poetry too.", u: "https://rue-morgue.com/sneak-peek-spend-an-evening-with-clive-barker-in-rue-morgue-222-jan-feb-2025-xmas-issue/" },

    { d: "2024-11", de: "Ulule-Kampagne für die französische Ausgabe von Clive Barker's Dark Worlds ist gestartet (Livr'S / Faute de Frappe).", en: "The Ulule campaign for a French edition of Clive Barker's Dark Worlds goes live (Livr'S / Faute de Frappe).", u: "https://fr.ulule.com/anthologie-clive-barker-dark-worlds-version-francaise/" },
    { d: "2024-11", de: "Subterranean Press plant die gesammelte Jump Tribe für den 31. März 2025.", en: "Subterranean Press sets the collected Jump Tribe for 31 March 2025.", u: "https://www.clivebarker.info/bookswip.html#jumptribe" },

    { d: "2024-10", de: "Clives Auftrittspläne aktualisiert: das verschobene Spooky Empire findet im November in Orlando statt.", en: "Clive's appearance plans updated for the rescheduled Spooky Empire event in Orlando in November.", u: "https://www.clivebarker.info/newsaddress.html" },
    { d: "2024-10", de: "Night of the Zoopocalypse feiert Premiere auf dem Sitges Film Festival.", en: "Night of the Zoopocalypse premieres at the Sitges Film Festival.", u: "https://sitgesfilmfestival.com/en/film/2024/night-zoopocalypse" },

    { d: "2024-09", de: "Harper Perennial bringt The Thief of Always als limitierte Olive Edition mit Cover von Milan Bozic.", en: "Harper Perennial issues The Thief of Always as a limited Olive Edition with cover art by Milan Bozic.", u: "https://www.harpercollins.com/pages/oliveeditions" },
    { d: "2024-09", de: "Surge Licensing wird globaler Lizenzagent für Hellraiser — Fright-Rags- und Trick-or-Treat-Produkte folgen im Frühjahr 2025.", en: "Surge Licensing becomes Hellraiser's global licensing agent — Fright-Rags and Trick or Treat releases set for spring 2025.", u: "https://licensinginternational.org/news/surge-licensing-appointed-global-licensing-agent-for-iconic-hellraiser-horror-film-franchise/" },

    { d: "2024-08", de: "Auftrittspläne aktualisiert: ScareFest Weekend in Lexington im Oktober.", en: "Appearance plans updated for the ScareFest Weekend in Lexington in October.", u: "https://www.clivebarker.info/newsaddress.html" },
    { d: "2024-08", de: "Arrow Video kündigt die US-Ausgabe der 4K-Box »Quartet of Torment« (Hellraiser 1–4) für Oktober an — mit Pinhead- und Chatterer-Cover.", en: "Arrow Video announces an October US release of its Quartet of Torment 4K set (Hellraiser 1–4) — Pinhead and Chatterer cover editions.", u: "https://www.arrowvideo.com/4k/hellraiser-quartet-of-torment-pinhead-slipcase-limited-edition-4k-uhd/15463701.html" },

    { d: "2024-05", de: "Spooky-Empire-Auftritt verschoben — Termin wird neu angesetzt.", en: "Spooky Empire appearance postponed — to be rescheduled.", u: "https://www.clivebarker.info/newsaddress.html" },
    { d: "2024-05", de: "Clives Gedicht »Upon a Milk Warm Dawn« erscheint in The Mad Butterfly's Ball (PS Publishing).", en: "Clive's poem 'Upon a Milk Warm Dawn' appears in The Mad Butterfly's Ball (PS Publishing).", u: "https://pspublishing.co.uk/the-mad-butterflys-ball-signed-hardcover-edited-by-preston-grassmann--chris-kelso-6260-p.asp" },

    { d: "2024-04", de: "Barbie Wildes Sammlung The Cilicium Quadra ist erschienen.", en: "Barbie Wilde's collection The Cilicium Quadra is out now.", u: "https://www.amazon.com/CILICIUM-QUADRA-Barbie-Wilde/dp/1399981714/" },

    { d: "2024-03", de: "Clive gibt ein Update zu laufenden Projekten und Plänen.", en: "Clive shares an update on current projects and plans.", u: "https://www.clivebarker.info/ints24.html" },
    { d: "2024-03", de: "Clives Auftrittspläne aktualisiert.", en: "Clive's upcoming appearance plans updated.", u: "https://www.clivebarker.info/newsaddress.html" },

    { d: "2024-01", de: "Ryan Danhauser und Jose Leitao veröffentlichen die gesammelten Interviews des Clive Barker Podcast als Buch.", en: "Ryan Danhauser and Jose Leitao publish their collected interview volume from The Clive Barker Podcast.", u: "https://clivebarkercast.com/2024/01/22/the-barkercast-interviews-occupy-midian-is-available-to-buy/" },

    { d: "2023-11", de: "Polymorphic Productions bringt The History of the Devil nach Brisbane — bis 16. Dezember.", en: "Polymorphic Productions stages The History of the Devil in Brisbane — running to 16 December.", u: "https://metroarts.com.au/event/the-history-of-the-devil/" },

    { d: "2023-10", de: "Earthling kündigt die lang erwartete Lettered Edition von Weaveworld für 2024 an.", en: "Earthling announces the long-anticipated lettered edition of Weaveworld for 2024.", u: "https://www.clivebarker.info/bookswip.html#neweditions" },

    { d: "2023-09", de: "Umbrella Entertainment kündigt eine Collector's-Edition-Blu-ray von Lord of Illusions mit Extras an.", en: "Umbrella Entertainment announces a Collector's Edition Blu-ray of Lord of Illusions with additional extras.", u: "https://shop.umbrellaent.com.au/products/clive-barkers-lord-of-illusions-2-disc-collectors-edition-blu-ray-book-rigid-case-slipcase-poster-artcards-1995" },
    { d: "2023-09", de: "Cemetery Dance legt Reading Stephen King neu auf — mit Clives »Stephen King Celebration« von 2007.", en: "Cemetery Dance reissues Reading Stephen King — including Clive's 2007 'Stephen King Celebration'.", u: "https://www.cemeterydance.com/readingsking" },

    { d: "2023-07", de: "Arrow Films kündigt die 4K-Box »Quartet of Torment« der ersten vier Hellraiser-Filme für Oktober an.", en: "Arrow Films announces an October release of the Quartet of Torment 4K set of the first four Hellraiser films.", u: "https://www.clivebarker.info/newsarrowhrquartet.html" },

    { d: "2023-04", de: "Zwei Gedichte von Clive erscheinen in Preston Grassmanns Anthologie Multiverses (Titan).", en: "Two of Clive's poems appear in Preston Grassmann's anthology Multiverses (Titan).", u: "https://www.clivebarker.info/poems.html" },

    { d: "2023-01", de: "Clives Kunst ist in der aktuellen Ausgabe von Hi-Fructose zu sehen.", en: "Clive's artwork features in the latest issue of Hi-Fructose.", u: "https://store.hifructose.com/products/hi-fructose-volume-65-pre-order" },

    { d: "2022-12", de: "Gespräch mit Angel Melanson (Fangoria) über Clive Barker's Dark Worlds.", en: "A conversation with Fangoria's Angel Melanson about Clive Barker's Dark Worlds.", u: "https://www.youtube.com/watch?v=iS9nn0p8flU" },

    { d: "2022-10", de: "Clive Barker's Dark Worlds — die karriereumspannende Monografie — ist im Handel.", en: "Clive Barker's Dark Worlds — the career-spanning monograph — goes on sale.", u: "https://www.clivebarker.info/newsdark-worlds.html" },
    { d: "2022-10", de: "Phil & Sarah signieren Dark Worlds am 30. Oktober im BFI Southbank, London.", en: "Phil & Sarah sign copies of Dark Worlds at BFI Southbank, London, on 30 October.", u: "https://whatson.bfi.org.uk/Online/default.asp?doWork::WScontent::loadArticle=Load&BOparam::WScontent::loadArticle::article_id=B5A276AA-6410-4656-89C3-550108177AA6&BOparam::WScontent::loadArticle::context_id=D651C1AA-F2BF-4F3C-BB1B-588D98CB13D2" },

    { d: "2022-09", de: "Regisseur David Bruckner spricht mit Entertainment Weekly über seinen Hellraiser für Hulu.", en: "Director David Bruckner updates Entertainment Weekly on his upcoming Hellraiser for Hulu.", u: "https://www.clivebarker.info/filmswip.html#sept22" },

    { d: "2022-08", de: "Der visionäre Künstler Majo Pavlovic spricht mit Revelations über seine Arbeit mit Clive.", en: "Visionary artist Majo Pavlovic talks to Revelations about his work with Clive.", u: "https://www.clivebarker.info/majopavlovic.html" },

    { d: "2022-06", de: "Neues Revelations-Interview mit Clive zu kommenden TV-Projekten.", en: "A new Revelations interview with Clive on upcoming television projects.", u: "https://www.clivebarker.info/intsrevel37.html" },
    { d: "2022-06", de: "Ankündigung von Clive Barker's Dark Worlds — die Monografie erscheint im Oktober 2022.", en: "Clive Barker's Dark Worlds is announced — the monograph arrives October 2022.", u: "https://www.clivebarker.info/newsdark-worlds.html" },
    { d: "2022-06", de: "Outfest ehrt Clive mit dem ersten Platinum Maverick Award.", en: "Outfest honours Clive with its inaugural Platinum Maverick Award.", u: "https://www.hollywoodreporter.com/movies/movie-news/outfest-screenings-billy-porter-directorial-debut-1235161543/" },

    { d: "2022-02", de: "Frankenstein in Love wird an der Northern State University aufgeführt — 17. bis 19. Februar.", en: "Frankenstein in Love is staged at Northern State University — 17 to 19 February.", u: "https://www.clivebarker.info/playsindex.html" },

    { d: "2021-10", de: "Neue Presse-Statements von Clive sowie Regie und Produktion zum kommenden Hellraiser-Film.", en: "New press release comments from Clive and from the director and producers of the upcoming Hellraiser movie.", u: "https://www.clivebarker.info/filmswip.html#sept21" },

    { d: "2021-09", de: "Frische Aussagen von David Bruckner zum kommenden Hellraiser-Film.", en: "Fresh comments from David Bruckner, director of the upcoming Hellraiser movie.", u: "https://www.clivebarker.info/filmswip.html#sept21" },
    { d: "2021-09", de: "Archiv-Blog: Rückblick auf die Vorlage von The Forbidden und Bernard Roses Candyman.", en: "Archive blog: looking back at the source material for The Forbidden and Bernard Rose's Candyman.", u: "https://www.clivebarkerarchive.com/blog" },

    { d: "2021-08", de: "Candyman startet am 27. August — mit Einblicken von Nia DaCosta, Yahya Abdul-Mateen II, Teyonah Parris und Tony Todd.", en: "Candyman arrives on the 27th — with insights from Nia DaCosta, Yahya Abdul-Mateen II, Teyonah Parris and Tony Todd.", u: "https://www.clivebarker.info/candyman2020.html" },
    { d: "2021-08", de: "David Bruckner über Vorlage und Neuinterpretation beim neuen Hellraiser.", en: "David Bruckner on the source material and his reimagining of the new Hellraiser.", u: "https://www.clivebarker.info/filmswip.html#hellraiser" },
    { d: "2021-08", de: "Clive steuert Coverkunst und das unveröffentlichte Gedicht »Fear Only« zum Chvrches-Fanzine Screen Violence bei.", en: "Clive contributes cover art and the previously unpublished poem 'Fear Only' to Screen Violence, a fanzine by Chvrches.", u: "https://www.clivebarker.info/artmags.html" },

    { d: "2021-07", de: "Zwei neu veröffentlichte Theaterstücke: Nightlives und Frankenstein in Love sind erhältlich.", en: "Two newly released plays: Nightlives and Frankenstein in Love are now available.", u: "https://www.clivebarkerarchive.com/store?category=Playscripts" },

    { d: "2021-06", de: "Neuer Candyman-Trailer veröffentlicht.", en: "A new Candyman trailer is released.", u: "https://www.clivebarker.info/candyman2020.html" },

    { d: "2021-05", de: "Weitere von Clive ausgewählte Gemälde stehen im Archiv zum Verkauf.", en: "Several more paintings selected by Clive go on sale through the Archive.", u: "https://www.clivebarkerarchive.com/blog/2021/5/1/original-art-release" },
    { d: "2021-05", de: "The Damnation Game erscheint in den USA mit frischem Look als Taschenbuch.", en: "The Damnation Game gets a fresh new look for its US paperback release.", u: "https://www.penguinrandomhouse.com/books/290221/the-damnation-game-by-clive-barker/" },

    { d: "2021-04", de: "Suntup Editions bringt eine Jubiläumsausgabe von Imajica zum 30. — illustriert von Jody Fallon.", en: "Suntup Editions issues a thirtieth-anniversary edition of Imajica, illustrated by Jody Fallon.", u: "https://suntup.press/imajica" },
    { d: "2021-04", de: "Details zum Theatre-of-Blood-TV-Projekt in Gesprächen mit Mick Garris und dem Clive Barker Podcast.", en: "Clive details the Theatre of Blood TV project in conversations with Mick Garris and the Clive Barker Podcast.", u: "https://www.clivebarker.info/tvwip.html#tob" },
    { d: "2021-04", de: "Clive bestätigt das geplante Theatre-of-Blood-Projekt und verrät Abarat-Handlungspunkte.", en: "Clive confirms the planned Theatre of Blood TV project and some Abarat plot points.", u: "https://www.clivebarker.info/intsrevel36.html" },
    { d: "2021-04", de: "Zwölf Papierarbeiten, von Clive ausgewählt, stehen im Archiv zum Verkauf.", en: "Twelve works on paper selected by Clive go on sale through the Archive.", u: "https://www.clivebarkerarchive.com/store?category=Original+Art" },
    { d: "2021-04", de: "Majo Pavlovics visuelle Adaption der Erzählung »Unrequited« erscheint in Bosona #10 — auf Bosnisch und Englisch.", en: "Majo Pavlovic's visual adaptation of the story 'Unrequited' appears in Bosona #10 — in Bosnian and English.", u: "https://www.facebook.com/Revija-Bosona-455611547926400/" },

    { d: "2021-03", de: "Neuigkeiten zu jüngsten Zugängen im Archiv.", en: "News of recent additions to the Archive.", u: "https://www.clivebarkerarchive.com/blog" },
    { d: "2021-03", de: "Zwei Lieblingsromane bekommen im Frühjahr ein neues Gesicht — den Anfang macht Weaveworld.", en: "A refreshed look for a couple of favourite novels this spring — first up is Weaveworld.", u: "https://www.clivebarker.info/bookswip.html#weave2021" },

    { d: "2021-02", de: "Neue T-Shirt-Designs — Harvey und Lulu — im Threadless-Store.", en: "New T-shirt designs — Harvey and Lulu — land in the Threadless store.", u: "https://clivebarker.threadless.com/" },

    { d: "2021-01", de: "Neues Revelations-Interview mit Clive zu aktuellen Projekten.", en: "A new Revelations interview with Clive on current projects.", u: "https://www.clivebarker.info/intsrevel35.html" },
    { d: "2021-01", de: "25 neue Bilder in der Archiv-Galerie: Setfotos, VHS- und DVD-Cover, Anzeigen, Magazine, Manuskripte.", en: "Twenty-five new images join the Archive gallery: behind-the-scenes photos, VHS and DVD covers, adverts, magazines, manuscripts.", u: "https://www.clivebarkerarchive.com/gallery" },

    { d: "2020-11", de: "Neue Poster-Prints sowie Geschenke und Karten zur Weihnachtszeit im Threadless-Store.", en: "A new series of poster prints plus holiday gifts and cards arrive in the Threadless store.", u: "https://clivebarker.threadless.com/home/fine-art-print" },

    { d: "2020-10", de: "Clive stellt sich am 12. Oktober im Reddit-AMA mit Hulu den Fragen von r/horror — hier zum Nachlesen.", en: "Clive does a Reddit AMA with Hulu over on r/horror on 12 October — catch up on the conversation here.", u: "https://www.reddit.com/r/horror/comments/j9zgwb/im_clive_barker_an_author_artist_and_imaginer_my/" },
    { d: "2020-10", de: "Interviews mit Clive bei Den of Geek, ComingSoon.net, ComicBook.com, Daily Dead, Looper und mehr.", en: "Interviews with Clive at Den of Geek, ComingSoon.net, ComicBook.com, Daily Dead, Looper and more.", u: "https://www.clivebarker.info/ints20.html" },
    { d: "2020-10", de: "Cast-Interviews zur TV-Adaption der Books of Blood.", en: "Cast interviews for the Books of Blood TV adaptation.", u: "https://www.clivebarker.info/bobtv.html" },
    { d: "2020-10", de: "Variety meldet: Candyman bekommt den neuen Kinostart 27. August 2021.", en: "Variety reports Candyman's new theatrical release date: 27 August 2021.", u: "https://www.clivebarker.info/candyman2020.html" },

    { d: "2020-09", de: "Clive liest eine Reihe seiner Gedichte — hier anzuhören.", en: "Clive reads a number of his poems — listen here.", u: "https://www.clivebarker.info/bookswip.html#presencebreath" },
    { d: "2020-09", de: "Der vollständige Trailer zum Books-of-Blood-Film ist da.", en: "The full trailer for the Books of Blood movie is released.", u: "https://youtu.be/vj3sRzcvCJc" },
    { d: "2020-09", de: "Candyman-Kinostart auf 2021 verschoben.", en: "Candyman's theatrical release is delayed to 2021.", u: "https://www.clivebarker.info/candyman2020.html" },
    { d: "2020-09", de: "Hulu veröffentlicht einen Teaser zum Books-of-Blood-Film.", en: "Hulu releases a teaser for the Books of Blood movie.", u: "https://www.youtube.com/watch?v=qnLq8rV8Wfs" },

    { d: "2020-08", de: "Clive eröffnet einen Online-Store: Kleidung und Accessoires mit Motiven aus der Imaginer-Reihe und darüber hinaus.", en: "Clive opens an online store: clothes and accessories bearing artwork from the Imaginer series and beyond.", u: "https://clivebarker.threadless.com/" }
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
