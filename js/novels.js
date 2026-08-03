/* ============================================================
   Die Romane — Daten & Seitenlogik (Übersicht + Detail)
   Synopsen und Anmerkungen: eigene Zusammenfassungen nach dem
   Revelations-Archiv (clivebarker.info/booksindex.html)
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

  /* ---------------- Novels data (chronological) ---------------- */
  var NOVELS = [
    {
      slug: "damnation-game",
      title: "The Damnation Game",
      year: 1985,
      sub: null,
      lead: "damnatukh1.JPG",
      syn: {
        de: "Barkers Romandebüt: Der spielsüchtige Ex-Häftling Marty Strauss wird Leibwächter des Milliardärs Joseph Whitehead — der vor Jahrzehnten mit dem Kartenspieler Mamoulian einen Pakt schloss und nun den Einsatz schuldet. Ein Faust-Stoff im Nachkriegs-London, erzählt mit der Körperlichkeit der Books of Blood.",
        en: "Barker's debut novel: gambling-addicted ex-convict Marty Strauss becomes bodyguard to billionaire Joseph Whitehead — who struck a bargain with the card player Mamoulian decades ago and now owes his stake. A Faust story in post-war London, told with the physicality of the Books of Blood."
      },
      notes: [
        { de: "Barker beschrieb den Roman als Faust-Geschichte ohne Teufel: Mamoulian sei nur ein einsamer Mann mit wenigen besonderen Kräften — die eigentliche Pointe sei, dass jeder Mensch sein eigener Mephistopheles ist.", en: "Barker described the novel as a Faust story without the devil: Mamoulian is just a lonely man with a few special powers — the real point being that every man is his own Mephistopheles.", src: "The Fresno Bee, 1987" },
        { de: "Eindeutige Bösewichte gibt es bewusst keine: Alle Figuren sind moralisch gezeichnet, und als Quelle des Bösen bleibt am Ende Lieblosigkeit.", en: "There are deliberately no clear-cut villains: every character is morally tainted, and what remains as the source of malice is lovelessness.", src: "Interzone, Winter 1985/86" },
        { de: "Seine Lieblingsrezension kam von der BBC, die das Buch als Kreuzung aus Splatter-Trash und Graham Greene adelte — für Barker selbst sein schwärzestes Buch.", en: "His favourite review came from the BBC, which crowned the book a cross between splatter trash and Graham Greene — for Barker himself, his blackest book.", src: "Barker at UCLA, 1987" }
      ],
      covers: {
        ukus: [{ f: "damnatukh1.JPG", c: "Weidenfeld and Nicholson, London UK, 1985. Hardback, UK first edition" }, { f: "damnatukl1.JPG", c: "Weidenfeld and Nicholson, London UK, 1985. Hardback, UK limited edition" }, { f: "damnatukp1.JPG", c: "Sphere Books, London UK 1986. Paperback edition" }, { f: "damnatush1.jpg", c: "Ace/Putnam, New York USA, 1987. Hardback US first edition" }, { f: "damnatusp1.JPG", c: "Charter Books, New York USA, 1988. Paperback edition" }],
        world: [{ f: "dghb87-germ.jpg", c: "Germany, 1987" }, { f: "dgpb88-fr.jpg", c: "France, 1988" }, { f: "dgpb91-jp.jpg", c: "Japan, 1991" }, { f: "dgpb-it.jpg", c: "Italy" }, { f: "dgpb87-es.jpg", c: "Spain, 1987" }, { f: "dgpb89-nether.jpg", c: "Netherlands, 1989" }]
      }
    },
    {
      slug: "weaveworld",
      title: "Weaveworld",
      year: 1987,
      sub: null,
      lead: "weaveukh1.JPG",
      syn: {
        de: "Die Fugue — eine ganze Welt voller Wunder — wurde von den Seerkind in einen Teppich gewoben, um sie vor ihren Jägern zu verbergen. Als der Teppich auftaucht, geraten Cal Mooney und Suzanna Parrish zwischen Wächter, Hexen und den furchtbaren Scourge. Epische Fantasy über die Sehnsucht nach dem verlorenen Ort.",
        en: "The Fugue — an entire world of wonders — was woven into a carpet by the Seerkind to hide it from its hunters. When the carpet surfaces, Cal Mooney and Suzanna Parrish are caught between guardians, witches and the terrible Scourge. Epic fantasy about the longing for the lost place."
      },
      notes: [
        { de: "Der Ursprung war ein Teppich, den ihm sein ehemaliger Kunstlehrer schenkte: Wochenlang starrte Barker auf das Muster, sicher, dass darin etwas wartete — es war ein Roman.", en: "It began with a carpet his former art teacher gave him: Barker stared at its weave for weeks, certain something was waiting in it — it turned out to be a novel.", src: "USA Today online chat, 2000" },
        { de: "Die Fugue sollte visionär sein, nicht kitschig: Momente großer Zartheit stehen neben echter Bedrohung, und auch die Seerkind sind alles andere als eindeutig gut.", en: "The Fugue was meant to be visionary, not mawkish: moments of great delicacy sit beside real menace, and even the Seerkind are far from simply good.", src: "Skeleton Crew, 1988" },
        { de: "Für Barker verkörpert das Buch den Kern aller Fantasy: die Sehnsucht nach dem anderen Ort — die Ahnung eines Edens, das fundamentaler ist als jedes Geburtshaus.", en: "For Barker the book embodies the core of all fantasy: the longing for the other place — the intuition of an Eden more fundamental than any birthplace.", src: "Adventurer, 1987" }
      ],
      covers: {
        ukus: [{ f: "weaveukh1.JPG", c: "UK first edition" }, { f: "weaveukl1.JPG", c: "UK limited edition" }, { f: "weaveush1.JPG", c: "US first edition" }, { f: "weaveusl1.JPG", c: "US limited edition" }, { f: "weaveush2.JPG", c: "US Book Club edition" }],
        world: [{ f: "wwpb94-germ.jpg", c: "Germany, 1994" }, { f: "wwpb89-fr.jpg", c: "France, 1989" }, { f: "wwpb-jp.jpg", c: "Japan" }, { f: "wwpb94-it.jpg", c: "Italy, 1994" }, { f: "wwpb88-es.jpg", c: "Spain, 1988" }, { f: "wwpb88-nether.jpg", c: "Netherlands, 1988" }]
      }
    },
    {
      slug: "great-and-secret-show",
      title: "The Great and Secret Show",
      year: 1989,
      sub: "The First Book of The Art",
      lead: "gassukh1.JPG",
      syn: {
        de: "Im kalifornischen Nest Palomo Grove ringen zwei Männer um die Kunst — die Macht über Quiddity, das Traummeer der Menschheit: der Träumer Fletcher und der machthungrige Jaff. Ihr Krieg wird durch ihre Kinder ausgetragen und reißt die Wirklichkeit selbst auf.",
        en: "In the small Californian town of Palomo Grove two men battle for the Art — power over Quiddity, humanity's dream-sea: the dreamer Fletcher and the power-hungry Jaff. Their war is fought through their children and tears reality itself open."
      },
      notes: [
        { de: "Barkers eigene Kurzformel: Hollywood, Sex und Armageddon — der Versuch, für Amerika zu leisten, was Weaveworld für England war.", en: "Barker's own shorthand: Hollywood, sex and Armageddon — an attempt to do for America what Weaveworld did for England.", src: "Publishing News, 1989" },
        { de: "Die Grundidee: Zwei erschöpfte Mächte — eine für das große Gute, eine für das große Böse — können nicht mehr direkt kämpfen und führen ihren Krieg durch das fort, was aus uns kommt: unsere Träume.", en: "The core idea: two exhausted forces — one for great good, one for great evil — can no longer fight directly and wage their war through what comes out of us: our dreams.", src: "Good Morning America, 1990" },
        { de: "Kein Horrorroman, sondern dunkle Fantasy, so Barker — 720 Seiten, die eine Woche nach Erscheinen auf den Bestsellerlisten standen.", en: "Not a horror novel but dark fantasy, Barker insisted — 720 pages that hit the bestseller lists a week after publication.", src: "The Fantasy Man Has No Illusions, 1990" }
      ],
      covers: {
        ukus: [{ f: "gassukh1.JPG", c: "UK first edition" }, { f: "gassukl1.JPG", c: "UK limited edition" }, { f: "gassush1.JPG", c: "US first edition" }, { f: "gassukp1.jpg", c: "UK Continental export edition" }, { f: "gassukp2.JPG", c: "UK paperback edition" }],
        world: [{ f: "gasspb93-germ.jpg", c: "Germany, 1993" }, { f: "gasspb91-fr.jpg", c: "France, 1993" }, { f: "gasspb89-jp.jpg", c: "Japan, 1989" }, { f: "gasshb90-it.jpg", c: "Italy, 1990" }, { f: "gasspb12-spain.jpg", c: "Spain, 2012" }, { f: "gasspb90-nether.jpg", c: "Netherlands, 1990" }]
      }
    },
    {
      slug: "imajica",
      title: "Imajica",
      year: 1991,
      sub: null,
      lead: "imajicaukh1.JPG",
      syn: {
        de: "Fünf Dominions bilden die Imajica — und die Erde ist das abgetrennte, vergessene Fünfte. Der Kunstfälscher Gentle, das Attentäter-Wesen Pie'oh'pah und Judith Odell werden in den Versuch verstrickt, die Welten wieder zu versöhnen. Barkers größter metaphysischer Wurf.",
        en: "Five Dominions form the Imajica — and Earth is the severed, forgotten Fifth. Art forger Gentle, the assassin-being Pie'oh'pah and Judith Odell are drawn into the attempt to reconcile the worlds. Barker's grandest metaphysical work."
      },
      notes: [
        { de: "Vierzehn Monate schrieb Barker sieben Tage die Woche daran, gegen Ende sechzehn Stunden täglich — ein Buch, das ihn von der ersten Zeile an besessen hielt.", en: "Barker wrote it over fourteen months, seven days a week, sixteen hours a day towards the end — a book that obsessed him from the first line.", src: "Fangoria, 1992" },
        { de: "Direkt nach Fertigstellung nannte er es enorm, hochfantastisch, sehr sexuell und durchaus pervers — und war selten so glücklich mit einem Buch.", en: "Right after finishing it he called it enormous, deeply fantastical, very sexual and quite perverse — and was rarely so happy with a book.", src: "The Dark Side, 1991" },
        { de: "Sein Anspruch: Literatur, die etwas mitzuteilen hat — das Gegenteil des Flughafenromans, den man ungelesen im Flieger liegen lässt.", en: "His ambition: fiction that has something to say — the opposite of the airport novel you leave on the plane unfinished.", src: "Loveline, 1997" }
      ],
      covers: {
        ukus: [{ f: "imajicaukh1.JPG", c: "UK first edition" }, { f: "imajicaush1.jpg", c: "US first edition" }, { f: "imajicausl1.JPG", c: "US limited edition" }, { f: "imajicaukh2.JPG", c: "UK Book Club edition" }, { f: "imajicaukp1.JPG", c: "UK paperback edition" }],
        world: [{ f: "imajicapb94-germ.jpg", c: "Germany, 1994" }, { f: "imajica1pb96-fr.jpg", c: "Volume One, France, 1996" }, { f: "imajica1pb-jp.jpg", c: "Volume One, Japan" }, { f: "imajicapb97-it.jpg", c: "Italy, 1997" }, { f: "imajica1pb-esp.jpg", c: "Volume One, Spain" }, { f: "imajicapb91-nether.jpg", c: "Netherlands, 1991" }]
      }
    },
    {
      slug: "thief-of-always",
      title: "The Thief of Always",
      year: 1992,
      sub: "A Fable",
      lead: "thiefukh1.JPG",
      syn: {
        de: "Der zehnjährige Harvey Swick langweilt sich durchs graue Februar-Leben, als ihn ein grinsender Fremder ins Holiday House einlädt: ein Ort, an dem jeder Tag alle vier Jahreszeiten enthält und jeder Wunsch erfüllt wird. Doch das Haus nimmt mehr, als es gibt — eine Fabel für Kinder und Erwachsene, von Barker selbst illustriert.",
        en: "Ten-year-old Harvey Swick is bored through his grey February life when a grinning stranger invites him to the Holiday House: a place where every day holds all four seasons and every wish is granted. But the house takes more than it gives — a fable for children and adults, illustrated by Barker himself."
      },
      notes: [
        { de: "Die Sprache hielt Barker bewusst schlicht: Zehnjährige sollten es lesen können, Vierzigjährige es lieben — so wie C. S. Lewis für ihn selbst nie an Reiz verlor.", en: "Barker kept the language deliberately plain: ten-year-olds should be able to read it, forty-year-olds should love it — the way C. S. Lewis never lost his appeal for Barker himself.", src: "Cinefantastique, 1995" },
        { de: "Er verstand das Buch als Rückkehr zu den Fantasien seiner Kindheitslektüre — zu einer Reinheit von Gut und Böse, die auch sein Erwachsenenwerk grundiert.", en: "He saw the book as a return to the fantasies of his childhood reading — to a purity of good and evil that also underpins his adult work.", src: "Barker Looks Back, 1992" },
        { de: "Nie habe er sich als Horrorautor definiert, sondern als Imaginer — und der Thief sei schlicht das nächste Stück Imagination.", en: "He never defined himself as a horror author but as an imaginer — and the Thief was simply the next piece of imagining.", src: "Scotland on Sunday, 1992" }
      ],
      covers: {
        ukus: [{ f: "thiefukh1.JPG", c: "UK first edition" }, { f: "thiefush1.JPG", c: "US first edition" }, { f: "thiefusl1.JPG", c: "US limited edition" }, { f: "thiefukpr1.JPG", c: "UK advance reading copy" }, { f: "thiefuspr1.JPG", c: "US advance reading copy" }],
        world: [{ f: "thiefhb94-germ.jpg", c: "Germany, 1994" }, { f: "thiefpb94-fr.jpg", c: "France, 1994" }, { f: "thiefpbb-it.jpg", c: "Italy" }, { f: "thiefpb95-nether.jpg", c: "Netherlands, 1995" }, { f: "thiefpb01a-greece.jpg", c: "Greece, 1996" }, { f: "thiefpb01-turkey.jpg", c: "Turkey, 2001" }]
      }
    },
    {
      slug: "everville",
      title: "Everville",
      year: 1994,
      sub: "The Second Book of The Art",
      lead: "evervilleukh1.JPG",
      syn: {
        de: "1848 wird am Oregon Trail die Stadt Everville gegründet — auf einem Riss zwischen den Welten. Generationen später öffnet sich dort erneut die Schwelle zum Traummeer Quiddity, und die Überlebenden von Palomo Grove werden zurück in den Krieg um die Kunst gezogen.",
        en: "In 1848 the town of Everville is founded on the Oregon Trail — atop a crack between worlds. Generations later the threshold to the dream-sea Quiddity opens there again, and the survivors of Palomo Grove are pulled back into the war for the Art.",
      },
      notes: [
        { de: "Barker beschrieb den Band als Traumreise ins kollektive Unbewusste der Menschheit — metaphysische Fantasy als das Feld, das ihn mehr reizte als reiner Horror.", en: "Barker described the book as a dream quest into humanity's collective unconscious — metaphysical fantasy being the field that drew him more than straight horror.", src: "Sci-Fi Entertainment, 1995" },
        { de: "Die Fortsetzung beginnt 1848 mit der Stadtgründung, schlägt dann eine neue Richtung ein — und holt eine ganze Gruppe von Figuren zurück, die man für tot hielt.", en: "The sequel opens in 1848 with the founding of the town, then heads in a fresh direction — folding back in a whole group of characters readers thought were dead.", src: "Fangoria, 1994" },
        { de: "Der erste Band habe metaphysische Türen geöffnet, so Barker — Everville sollte diese Elemente bewusst auf die Spitze treiben und wurde ein großes, forderndes Buch.", en: "The first volume opened metaphysical doors, Barker said — Everville was meant to push those elements to new extremes and became a big, challenging book.", src: "Dread, 1993" }
      ],
      covers: {
        ukus: [{ f: "evervilleukh1.JPG", c: "UK first edition" }, { f: "evervilleukl1.JPG", c: "UK limited edition" }, { f: "evervilleush1.JPG", c: "US first edition" }, { f: "evervilleslip.JPG", c: "US limited edition" }, { f: "evervilleusp1.JPG", c: "US Book Club edition" }],
        world: [{ f: "evpb97-fr.jpg", c: "France, 1997" }, { f: "evpb-it.jpg", c: "Italy" }, { f: "evpb95-nether.jpg", c: "Netherlands, 1995" }, { f: "evpb-rom.jpg", c: "Russia" }, { f: "evpb98-poland.jpg", c: "Poland, 1998" }, { f: "evpb96-greece.jpg", c: "Greece, 1996" }]
      }
    },
    {
      slug: "sacrament",
      title: "Sacrament",
      year: 1996,
      sub: null,
      lead: "sacramentush1.JPG",
      syn: {
        de: "Der Tierfotograf Will Rabjohns dokumentiert aussterbende Arten, bis ihn ein Eisbär ins Koma schlägt. Dort kehrt er in seine Kindheit in Yorkshire zurück — zu Jacob Steep und Rosa McGee, die ihn einst das Töten lehrten. Ein Roman über Aussterben, Begehren und das, was uns formt.",
        en: "Wildlife photographer Will Rabjohns documents species on the edge of extinction until a polar bear leaves him in a coma. There he returns to his Yorkshire childhood — to Jacob Steep and Rosa McGee, who once taught him about killing. A novel about extinction, desire and what shapes us."
      },
      notes: [
        { de: "Im Kern ein Buch über Tiere und Ausrottung: Als Tierfreund wollte Barker mit Leidenschaft über das Unrecht schreiben, das der Tierwelt angetan wird.", en: "At its heart a book about animals and extinction: an animal lover, Barker wanted to write with passion about the injustices visited on the animal world.", src: "Cinefantastique, 1995" },
        { de: "Den schwulen Helden verteidigte er gegen seinen Verlag, der das Pronomen des Liebhabers ändern wollte — Barker weigerte sich; der Skeptiker verließ später das Haus.", en: "He defended the gay hero against his publisher, who wanted the lover's pronoun changed — Barker refused; the sceptic later left the company.", src: "LA Times Festival of Books, 1998" },
        { de: "Die Schauplätze spannen sich von Yorkshire über San Francisco bis zur Hudson Bay — und Wills Obsession mit dem Aussterben wurzelt in seiner Kindheit.", en: "The settings stretch from Yorkshire to San Francisco to Hudson Bay — and Will's obsession with extinction is rooted in his childhood.", src: "Lost Souls" }
      ],
      covers: {
        ukus: [{ f: "sacramentush1.JPG", c: "US first edition" }, { f: "sacramentusp2.JPG", c: "US Book Club edition" }, { f: "sacramentusp1.JPG", c: "US paperback edition" }, { f: "sacramentukp1.JPG", c: "UK paperback edition" }, { f: "sacramentukp2.JPG", c: "UK paperback edition, 2000" }],
        world: [{ f: "sacpb99-germ.jpg", c: "Germany, 1999" }, { f: "sacpb01-fr.jpg", c: "France, 2001" }, { f: "sachb98-it.jpg", c: "Italy, 1998" }, { f: "sacpb97-nether.jpg", c: "Netherlands, 1997" }, { f: "sachb11-russia.jpg", c: "Russia, 2011" }, { f: "sacpb98-brazil.jpg", c: "Brazil, 1998" }]
      }
    },
    {
      slug: "galilee",
      title: "Galilee",
      year: 1998,
      sub: "A Romance",
      lead: "galileeush1.JPG",
      syn: {
        de: "Zwei Dynastien, ineinander verhakt über Jahrhunderte: die göttergleichen Barbarossas und die Gearys, Amerikas heimliche Herrscherfamilie. Zwischen ihnen der rastlose Galilee, der sich in Rachel Pallenberg verliebt — eine Familiensaga zwischen Bürgerkriegs-Süden und Hawaii.",
        en: "Two dynasties locked together across centuries: the god-like Barbarossas and the Gearys, America's secret ruling family. Between them the restless Galilee, who falls in love with Rachel Pallenberg — a family saga spanning the Civil War South and Hawaii."
      },
      notes: [
        { de: "Barker nannte Galilee sein Meisterwerk und sein eigenes Romeo und Julia — geschrieben, während er selbst frisch verliebt war, und milder als sein Vollbluthorror.", en: "Barker called Galilee his masterpiece and his own Romeo and Juliet — written while he was newly in love, and mellower than his full-blooded horror.", src: "SFX, 2010" },
        { de: "Seine Methode: den kompletten ersten Entwurf — hier rund 3.000 handgeschriebene Seiten — ohne einen Blick zurück durchschreiben und erst nach dem Schlusspunkt lesen.", en: "His method: write the entire first draft — here some 3,000 handwritten pages — without looking back, reading it only once the ending is on the page.", src: "LA Times Festival of Books, 1998" },
        { de: "Angelegt war das Ganze als romantische Saga im Geist des 19. Jahrhunderts, inklusive intensiver Recherche zum amerikanischen Bürgerkrieg.", en: "It was conceived as a romantic saga in the spirit of the nineteenth century, complete with deep research into the American Civil War.", src: "Lost Souls, 1996" }
      ],
      covers: {
        ukus: [{ f: "galileeush1.JPG", c: "US first edition" }, { f: "galileeukh1.JPG", c: "UK first edition" }, { f: "galileeusl1.JPG", c: "US numbered edition" }, { f: "galileeusl2.JPG", c: "US lettered edition" }, { f: "galileeukh2.jpg", c: "UK Book Club edition" }],
        world: [{ f: "galileepb00-germ.jpg", c: "Germany, 2000" }, { f: "galilee1pb00-fr.jpg", c: "France, 2000" }, { f: "galileepb00-it.jpg", c: "Italy, 2000" }, { f: "galileepb99-nether.jpg", c: "Netherlands, 1999" }, { f: "galileehb03-russia.jpg", c: "Russia, 2003" }, { f: "galileepb03-poland.jpg", c: "Poland, 2003" }]
      }
    },
    {
      slug: "coldheart-canyon",
      title: "Coldheart Canyon",
      year: 2001,
      sub: "A Hollywood Ghost Story",
      lead: "coldheartukh1.JPG",
      syn: {
        de: "Nach einer verpfuschten Schönheits-OP versteckt sich Filmstar Todd Pickett in einem abgelegenen Anwesen in den Hollywood Hills — dem Reich der Stummfilm-Diva Katya Lupi, in dem die Geister des alten Hollywood ihre Feste feiern. Barkers Abrechnung mit der Traumfabrik.",
        en: "After a botched cosmetic surgery, movie star Todd Pickett hides out in a secluded estate in the Hollywood hills — the realm of silent-film diva Katya Lupi, where the ghosts of old Hollywood still hold their revels. Barker's reckoning with the dream factory."
      },
      notes: [
        { de: "Nach fast zehn Jahren in Los Angeles wollte Barker seine Gefühle für die Stadt bilanzieren — gut wie schlecht: ein weitgehend realistisches Buch mit nur einem Hauch des Übernatürlichen.", en: "After nearly ten years in Los Angeles, Barker wanted to take stock of his feelings for the town — good and bad: a largely reality-based book with just a touch of the supernatural.", src: "IGN, 1999" },
        { de: "Vorab versprach er ein Hollywood beider Epochen — Gegenwart und Goldenes Zeitalter — samt einer Erotik, die selbst Kenner seines Werks überraschen würde.", en: "In advance he promised a Hollywood of both eras — the present and the Golden Age — plus an eroticism that would startle even readers familiar with his work.", src: "Barnes & Noble online, 1999" }
      ],
      covers: {
        ukus: [{ f: "coldheartukh1.JPG", c: "UK first edition" }, { f: "coldheartush1.JPG", c: "US first edition" }, { f: "coldheartusl1.JPG", c: "US numbered edition" }, { f: "coldheartusl2.JPG", c: "US lettered edition" }, { f: "coldheartuspr1.JPG", c: "US advance reading copy" }],
        world: [{ f: "coldpb04-germ.jpg", c: "Germany, 2004" }, { f: "cold1pb04-fr.jpg", c: "France, 2004" }, { f: "cold1pb03-japan.jpg", c: "Japan, 2003" }, { f: "coldhb02-it.jpg", c: "Italy, 2002" }, { f: "coldpb02-nether.jpg", c: "Netherlands, 2002" }, { f: "coldhb04-russia.jpg", c: "Russia, 2004" }]
      }
    },
    {
      slug: "abarat",
      title: "Abarat",
      year: 2002,
      sub: null,
      lead: "abaratush1.JPG",
      syn: {
        de: "Candy Quackenbush flieht aus Chickentown, Minnesota — mitten hinein ins Meer von Izabella und den Abarat: ein Archipel aus 25 Inseln, eine für jede Stunde des Tages, plus die geheimnisvolle 25. Stunde. Begleitet von hunderten Ölgemälden aus Barkers eigener Hand.",
        en: "Candy Quackenbush flees Chickentown, Minnesota — straight into the Sea of Izabella and the Abarat: an archipelago of 25 islands, one for every hour of the day, plus the mysterious 25th Hour. Accompanied by hundreds of oil paintings from Barker's own hand."
      },
      notes: [
        { de: "Die Keimzelle war die Idee eines Stundenbuchs: die Gefühle der Tageszeiten, übersetzt in eine Inselwelt.", en: "The seed was the idea of a Book of Hours: the feelings of the hours of the day, translated into an island world.", src: "San Francisco Chronicle, 1999" },
        { de: "Barker verstand sich als Demokrat der Kunst: Die Visionen sollten als erschwingliches Buch in möglichst viele Köpfe — nicht als elitäres Objekt in wenige Sammlungen.", en: "Barker saw himself as a democrat of art: the visions belonged in as many heads as possible via an affordable book — not in a few collections as an elite object.", src: "Axcess, 1995" },
        { de: "Geplant war ursprünglich ein Mammutprojekt mit rund 25 Geschichten und 200 Ölgemälden für HarperCollins' Kinderbuchsparte — die Bilder entstanden vor dem Text.", en: "Originally planned as a mammoth project of some 25 stories and 200 oil paintings for HarperCollins' children's division — the paintings came before the text.", src: "People Online, 1998" }
      ],
      covers: {
        ukus: [{ f: "abaratush1.JPG", c: "US first edition" }, { f: "abaratukh1.JPG", c: "UK first edition" }, { f: "abaratuspb1.jpg", c: "US paperback edition" }, { f: "abaratusl1.JPG", c: "US numbered edition" }, { f: "abaratuspr1.JPG", c: "US advance reading copy" }],
        world: []
      }
    },
    {
      slug: "abarat-days-of-magic",
      title: "Abarat: Days of Magic, Nights of War",
      year: 2004,
      sub: null,
      lead: "abarat2ush1.jpg",
      syn: {
        de: "Band zwei des Zyklus: Candy und ihr Gefährte Malingo sind auf der Flucht quer durch die Inseln, gejagt von Christopher Carrion und dem Industriellen Rojo Pixler — während sich über der Mitternachtsinsel Gorgossium ein Krieg zusammenbraut.",
        en: "Book two of the cycle: Candy and her companion Malingo are on the run across the islands, hunted by Christopher Carrion and the industrialist Rojo Pixler — while over the midnight island of Gorgossium a war is brewing."
      },
      notes: [
        { de: "Das zweite Buch machte ihm mehr Freude als das erste: Stil und Rhythmus waren gefunden, die Rückkehr in Welt und Figuren pures Vergnügen — bei Buch Nummer zwanzig keine Selbstverständlichkeit.", en: "The second book was more fun than the first: the style and rhythm were found, returning to the world and its characters pure pleasure — no small thing on book number twenty.", src: "Children's Advance, 2002" },
        { de: "Ein Novum seiner Karriere: Die komplette erste Fassung — rund 600 Seiten — verwarf er nach dem Lesen und begann noch einmal von vorn; kaum mehr als die Namen überlebten.", en: "A first in his career: he threw away the entire first draft — some 600 pages — after reading it and started again; little more than the names survived.", src: "Revelations interview, 2003" },
        { de: "Die Reaktion seines Umfelds auf das fertige Manuskript nannte er die glücklichste, die je ein Buch von ihm ausgelöst hat — ausgerechnet beim zweiten Band einer Serie.", en: "He called the response to the finished manuscript the happiest any of his books had ever received — remarkably, for the second volume of a series.", src: "Lost Souls, 2003" }
      ],
      covers: {
        ukus: [{ f: "abarat2ush1.jpg", c: "US first edition" }, { f: "abarat2ukh1.jpg", c: "UK first edition" }, { f: "abarat2usl1b.jpg", c: "deluxe edition" }, { f: "abarat2uspb2.jpg", c: "US mass-market paperback" }, { f: "abarat2ukpb1.jpg", c: "UK paperback edition" }],
        world: []
      }
    },
    {
      slug: "mister-b-gone",
      title: "Mister B. Gone",
      year: 2007,
      sub: null,
      lead: "mbgukhb1.jpg",
      syn: {
        de: "»Verbrenn dieses Buch.« Der niedere Dämon Jakabok Botch spricht den Leser direkt aus den Seiten an — und erzählt, bettelt und droht sich durch seine Lebensbeichte, die in den Anfangsjahren des Buchdrucks spielt. Barkers Rückkehr zum Horror: intim, listig, brutal.",
        en: "'Burn this book.' The minor demon Jakabok Botch addresses the reader straight from the pages — begging, threatening and storytelling his way through a confession set in the early years of the printing press. Barker's return to horror: intimate, sly, brutal."
      },
      notes: [
        { de: "Entstanden als bewusste Atempause: Mitten in der Mammutarbeit an den Scarlet Gospels schrieb Barker den kurzen Roman als Gegengewicht.", en: "It began as a deliberate breather: in the middle of the marathon work on The Scarlet Gospels, Barker wrote the short novel as a counterweight.", src: "Revelations interview, 2007" },
        { de: "Seine Ankündigung: eine Rückkehr zum Horror nach langer Zeit — eine andere Art von Schrecken, sehr brutal und sehr intim.", en: "His billing: a return to horror after a long absence — a different kind of scare, very brutal and very intimate.", src: "Fangoria Weekend of Horrors, 2007" },
        { de: "Botch sei seine dunkle Hälfte, sagte Barker — dass der Dämon das »B.« im Namen trägt, sei kein Zufall.", en: "Botch is his dark half, Barker said — the demon carrying the 'B.' in his name is no coincidence.", src: "Revelations interview, 2007" }
      ],
      covers: {
        ukus: [{ f: "mbgukhb1.jpg", c: "Harper Voyager, London UK, 2007. Hardback, UK first edition" }, { f: "mbgukl1.jpg", c: "Harper Voyager, London UK, 2007. Hardback, UK limited edition" }, { f: "mbgushb1.jpg", c: "HarperCollins, New York US, 2007. Hardback, US first edition" }, { f: "mbgukp1.jpg", c: "Harper Voyager, London UK, 2008. UK paperback edition" }, { f: "mbgusp1.jpg", c: "Harper Paperbacks, New York US, 2008. US paperback edition" }],
        world: [{ f: "mbgpb14-germ.jpg", c: "Germany, 2014" }, { f: "mbgpb10-fr.jpg", c: "France, 2010" }, { f: "mbgpb17-italy.jpg", c: "Italy, 2017" }, { f: "mbgpb09-es.jpg", c: "Spain, 2009" }, { f: "mbghb08-nether.jpg", c: "Netherlands, 2008" }, { f: "mbghb10-russia.jpg", c: "Russia, 2010" }]
      }
    },
    {
      slug: "abarat-absolute-midnight",
      title: "Abarat: Absolute Midnight",
      year: 2011,
      sub: null,
      lead: "abarat3ush1.jpg",
      syn: {
        de: "Band drei: Mater Motley greift nach der Herrschaft über den Archipel — ihr Plan ist die absolute Mitternacht, das Auslöschen jeden Lichts über allen 25 Inseln. Candy muss sich ihrer eigenen verborgenen Geschichte stellen, während die Dunkelheit steigt.",
        en: "Book three: Mater Motley reaches for dominion over the archipelago — her plan is absolute midnight, the extinguishing of every light above all 25 islands. Candy must face her own hidden history as the darkness rises."
      },
      notes: [
        { de: "Schon Jahre vor Erscheinen kündigte Barker den Band als Apokalypse an — im großen Maßstab erzählt und zugleich ganz privat und intim.", en: "Years before publication Barker billed the volume as an apocalypse — played out on a grand scale and at the same time utterly private and intimate.", src: "LA Festival of Books, 2004" },
        { de: "Als Fundus dienten rund 270 noch unverwendete Gemälde; die Erzählung, bislang ein unruhiger Hengst, müsse nun gezähmt werden, um zum Höhepunkt zu finden.", en: "Some 270 as-yet-unused paintings served as the well; the narrative, an unruly stallion so far, now had to be broken to reach its climax.", src: "Fantasy Worlds, 2005" },
        { de: "In dieser Zeit schrieb Barker tagsüber an Hellraiser-Projekten und malte nachts an Abarat 3 und 4 — nach eigener Auskunft völlig ausgelastet und glücklich dabei.", en: "In that period Barker wrote Hellraiser material by day and painted Abarat 3 and 4 by night — fully consumed, and by his own account blissfully happy.", src: "Revelations interview, 2005" }
      ],
      covers: {
        ukus: [{ f: "abarat3ush1.jpg", c: "US first edition" }, { f: "abarat3ukpb1.jpg", c: "UK paperback" }, { f: "abarat3uspb1.jpg", c: "US paperback" }],
        world: []
      }
    },
    {
      slug: "scarlet-gospels",
      title: "The Scarlet Gospels",
      year: 2015,
      sub: null,
      lead: "scarletukhb1a.jpg",
      syn: {
        de: "Der Höllenpriester, den die Welt Pinhead nennt, vernichtet die letzten Magier der Erde und greift nach der Herrschaft über die Hölle selbst. Nur der okkulte Detektiv Harry D'Amour stellt sich ihm entgegen. Barkers erklärter Schlussstrich unter seinen berühmtesten Mythos.",
        en: "The hell priest the world calls Pinhead destroys Earth's last magicians and reaches for dominion over Hell itself. Only occult detective Harry D'Amour stands in his way. Barker's declared final line under his most famous mythology."
      },
      notes: [
        { de: "Die Wurzeln reichen bis in die Neunziger: Barker plante früh eine Fortsetzung der Hellbound-Heart-Novelle — Pinheads erster echter Auftritt auf dem Papier, denn im Original trägt er nicht einmal einen Namen.", en: "Its roots go back to the nineties: Barker planned a sequel to The Hellbound Heart early on — Pinhead's first true appearance on the page, since he isn't even named in the original novella.", src: "Imagi-Movies, 1993/94" },
        { de: "Von Anfang an war die Geschichte als Ende der Figur gedacht: das letzte, was Barker je über Pinhead schreiben wollte.", en: "From the start the story was conceived as the character's ending: the last thing Barker ever intended to write about Pinhead.", src: "Lost Souls, 2000" },
        { de: "Die Rückkehr zum Horror weckte gemischte Gefühle — zugleich reizte ihn das Wiedersehen mit seinen alten Monstern sichtlich.", en: "Returning to horror stirred mixed feelings — yet revisiting his old monsters clearly appealed to him.", src: "LA Times Festival of Books, 1998" }
      ],
      covers: {
        ukus: [{ f: "scarletukhb1a.jpg", c: "Macmillan, London UK, 2015. Hardback, UK first edition" }, { f: "scarletushb1.jpg", c: "St Martin's Press, New York US, 2015. Hardback, US first edition" }, { f: "scarletusl1.jpg", c: "Earthling Publications, US, 2015. Hardback, US limited edition" }, { f: "scarletusl2.jpg", c: "Earthling Publications, US, 2015. Hardback, US limited edition" }, { f: "scarletuspb1a.jpg", c: "St Martin's Press, New York US, 2016. US paperback" }],
        world: [{ f: "scarletpb15-germany.jpg", c: "Germany, 2015" }, { f: "scarlethb16-france.jpg", c: "France, 2016" }, { f: "scarletpb17-italy.jpg", c: "Italy, 2017" }, { f: "scarlet16-brazil2.jpg", c: "Brazil, 2016" }, { f: "scarletpb15-greece.jpg", c: "Greece, 2015" }, { f: "scarlethb16-turkey.jpg", c: "Turkey, 2016" }]
      }
    }
  ];

  function coverPath(novel, file) {
    return "assets/covers/" + novel.slug + "/" + file;
  }

  /* ---------------- Overview rendering ---------------- */
  var grid = document.getElementById("novelsGrid");

  function renderGrid() {
    var html = "";
    NOVELS.forEach(function (n, i) {
      html +=
        '<a class="novelcard reveal-news" href="novel.html?b=' + n.slug + '">' +
        '<span class="novelcard__num mono">' + String(i + 1).padStart(2, "0") + "</span>" +
        '<span class="novelcard__coverwrap"><img src="' + coverPath(n, n.lead) + '" alt="' + n.title + ' — Cover" loading="lazy" /></span>' +
        '<span class="novelcard__title">' + n.title + "</span>" +
        (n.sub ? '<span class="novelcard__sub">' + n.sub + "</span>" : "") +
        '<span class="novelcard__year mono">' + n.year + "</span>" +
        "</a>";
    });
    grid.innerHTML = html;
    bindHoverCursor(".novelcard");
  }

  /* ---------------- Detail rendering ---------------- */
  var detail = document.getElementById("novelDetail");
  var currentNovel = null;

  function coverFigure(novel, img) {
    return (
      '<figure class="coverfig" data-file="' + img.f + '">' +
      '<img src="' + coverPath(novel, img.f) + '" alt="' + novel.title + " — " + img.c + '" loading="lazy" />' +
      '<figcaption class="mono">' + img.c + "</figcaption>" +
      "</figure>"
    );
  }

  function renderDetail() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("b");
    var idx = NOVELS.findIndex(function (n) { return n.slug === slug; });
    if (idx === -1) idx = 0;
    var n = NOVELS[idx];
    currentNovel = n;

    document.title = n.title + " — Revelations · Clive Barker";

    var notesHtml = n.notes.map(function (note) {
      return (
        '<li class="novelnote reveal-news"><p>' + pick(note) + "</p>" +
        '<p class="novelnote__src mono">' + note.src + "</p></li>"
      );
    }).join("");

    var prev = NOVELS[(idx - 1 + NOVELS.length) % NOVELS.length];
    var next = NOVELS[(idx + 1) % NOVELS.length];

    detail.innerHTML =
      '<section class="newshero novelhero">' +
      '<p class="hero__eyebrow mono">' + t("novel.eyebrow") + " · " + n.year + "</p>" +
      '<h1 class="novelhero__title">' + n.title + "</h1>" +
      (n.sub ? '<p class="hero__subtitle">' + n.sub + "</p>" : "") +
      "</section>" +

      '<section class="noveldetail">' +
      '<div class="noveldetail__grid">' +
      '<figure class="noveldetail__leadwrap"><div class="bio__imgwrap"><img src="' + coverPath(n, n.lead) + '" alt="' + n.title + ' — Cover" /></div>' +
      '<figcaption class="mono">' + n.covers.ukus[0].c + "</figcaption></figure>" +
      '<div class="noveldetail__text">' +
      '<h2 class="noveldetail__h mono">' + t("novel.synopsis") + "</h2>" +
      '<p class="noveldetail__syn">' + pick(n.syn) + "</p>" +
      '<h2 class="noveldetail__h mono">' + t("novel.cliveOn") + "</h2>" +
      '<ul class="novelnotes">' + notesHtml + "</ul>" +
      "</div></div>" +

      '<div class="coversection">' +
      '<div class="coversection__head"><h2 class="section__title section__title--small">' + t("novel.coversUkus") + '</h2><p class="mono coversection__hint">' + t("novel.coverHint") + "</p></div>" +
      '<div class="coverrow">' + n.covers.ukus.map(function (img) { return coverFigure(n, img); }).join("") + "</div>" +
      "</div>" +

      (n.covers.world.length
        ? '<div class="coversection">' +
          '<div class="coversection__head"><h2 class="section__title section__title--small">' + t("novel.coversWorld") + "</h2></div>" +
          '<div class="coverrow">' + n.covers.world.map(function (img) { return coverFigure(n, img); }).join("") + "</div>" +
          "</div>"
        : "") +

      '<p class="coversection__credit mono">Cover-Abbildungen: Revelations-Archiv (clivebarker.info) · Artwork teils © Clive Barker, teils © der jeweiligen Verlage</p>' +

      '<nav class="novelpager">' +
      '<a class="novelpager__link mono" href="novel.html?b=' + prev.slug + '">' + t("novel.prev") + " · " + prev.title + "</a>" +
      '<a class="novelpager__link mono" href="novels.html">' + t("novel.backToList") + "</a>" +
      '<a class="novelpager__link mono" href="novel.html?b=' + next.slug + '">' + next.title + " · " + t("novel.next") + "</a>" +
      "</nav>" +
      "</section>";

    bindHoverCursor(".coverfig");
    bindHoverCursor(".novelpager__link");
    bindLightbox();
  }

  /* ---------------- Cover lightbox (detail page) ---------------- */
  function bindLightbox() {
    var lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    var lightboxImg = document.getElementById("lightboxImg");
    var lightboxTitle = document.getElementById("lightboxTitle");
    var lightboxMeta = document.getElementById("lightboxMeta");
    var backdrop = document.getElementById("lightboxBackdrop");
    var closeBtn = document.getElementById("lightboxClose");

    function open(fig) {
      var img = fig.querySelector("img");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxTitle.textContent = currentNovel.title;
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

  /* ---------------- Language ---------------- */
  var langToggle = document.getElementById("langToggle");

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var html = t(el.getAttribute("data-i18n"));
      if (html) el.innerHTML = html;
    });
    if (grid) {
      document.title = t("title.novels");
      renderGrid();
    }
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
    gsap.fromTo(".newshero .reveal-line, .novelhero, .noveldetail__grid",
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

    gsap.utils.toArray(".coversection").forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" }
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
