/* ============================================================
   Erzählungen & Novellen — Daten & Seitenlogik (Übersicht + Detail)
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

  /* ---------------- Stories data (chronological) ---------------- */
  var STORIES = [
    {
      slug: "books-of-blood",
      title: "The Books of Blood",
      year: "1984–85",
      kind: { de: "Erzählungen · 6 Bände", en: "Stories · 6 volumes" },
      lead: "bob1ukp1.JPG",
      syn: {
        de: "Sechs Bände, dreißig Erzählungen — die Sammlung, die Barker über Nacht zur neuen Stimme des Horrors machte: von den Untoten der Midnight Meat Train über Jacqueline Ess bis zu den Candyman-Wurzeln von The Forbidden. Fleisch wird hier nicht nur verletzt, sondern verwandelt.",
        en: "Six volumes, thirty stories — the collection that made Barker the new voice of horror overnight: from the undead of the Midnight Meat Train via Jacqueline Ess to the Candyman roots of The Forbidden. Flesh here is not merely wounded, it is transformed."
      },
      notes: [
        { de: "Barker verglich das Schreiben der Erzählungen mit dem Neunjährigen, der seinen Freunden Geschichten weitererzählt: Er sei vor allem eines — ein Geschichtenerzähler.", en: "Barker compared writing the stories to the nine-year-old retelling tales to his friends: above all, he said, he is a storyteller.", src: "Monsterland, 1987" },
        { de: "Ihn interessierten gewöhnliche Menschen, die im Außergewöhnlichen neue Bedeutung finden — wie Jacqueline Ess, deren Kräfte erst am Rand des Selbstmords erwachen.", en: "What interested him were ordinary people finding new meaning in the extraordinary — like Jacqueline Ess, whose powers only wake at the brink of suicide.", src: "Samhain, 1987" },
        { de: "Von »Körperekel« wollte er nichts wissen: Die Umordnung des Fleisches werde in den Books of Blood geradezu gefeiert — eine eigene Form von Erotik.", en: "He rejected the idea of 'body disgust' in the stories: the rearrangement of flesh in the Books of Blood is all but celebrated — an eroticism of its own.", src: "Graffiti, 1988" }
      ],
      covers: {
        ukus: [{ f: "bob1ukp1.JPG", c: "Books of Blood 1, Sphere, 1984" }, { f: "bob1ukh1.JPG", c: "Books of Blood 1, Weidenfeld & Nicolson, 1985" }, { f: "bob1usp1.JPG", c: "Books of Blood 1, Berkley, 1986" }, { f: "bob4ukp1.JPG", c: "Books of Blood 4, Sphere, 1985" }, { f: "bob4ukh1.JPG", c: "Books of Blood 4, Weidenfeld & Nicolson, 1985" }, { f: "bob12ukh1.JPG", c: "Books of Blood 1 & 2, Sphere" }, { f: "bob123ush1.JPG", c: "Books of Blood 1–3, Scream Press, limited" }],
        world: [{ f: "bob1pr86-germ.jpg", c: "Volume One, Germany, 1986" }, { f: "bob1pb87-fr.jpg", c: "Volume One, France, 1987" }, { f: "bob4hb93-it.jpg", c: "Volume Four, Italy, 1993" }, { f: "bob1pb12-bg.jpg", c: "Volume One, Bulgaria, 2012" }, { f: "bob1pb87-jp.jpg", c: "Volume One, Japan, 1987" }, { f: "bob1pb89-fin.jpg", c: "Volume One, Finland, 1989" }]
      }
    },
    {
      slug: "lost-souls",
      title: "Lost Souls",
      year: "1985",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "lostsoulsush1.jpg",
      syn: {
        de: "Der okkulte Detektiv Harry D'Amour jagt kurz vor Weihnachten einen Dämon durch New York — sein erster Prosa-Auftritt überhaupt, Jahre vor Everville und den Scarlet Gospels. Zuerst in Time Out erschienen, später in der Anthologie Cutting Edge gesammelt.",
        en: "Occult detective Harry D'Amour hunts a demon through New York just before Christmas — his first prose appearance ever, years before Everville and The Scarlet Gospels. First published in Time Out, later collected in the anthology Cutting Edge."
      },
      notes: [
        { de: "Die Kritik der Zeit las Lost Souls als Verwandten von The Yattering and Jack — ein diebisches Vergnügen unter den namhaften Beiträgen der Anthologie Cutting Edge.", en: "Critics of the day read Lost Souls as kin to The Yattering and Jack — a sly pleasure among the big names of the Cutting Edge anthology.", src: "Terror Australis, 1988" }
      ],
      covers: {
        ukus: [{ f: "timeout800.jpg", c: "Time Out No 800/801, 1985" }, { f: "lostsoulsush1.jpg", c: "Cutting Edge, US first edition" }, { f: "lostsoulsuspb1.jpg", c: "Cutting Edge, US paperback" }, { f: "lostsoulsukp1.JPG", c: "Cutting Edge, UK paperback" }],
        world: []
      }
    },
    {
      slug: "hellbound-heart",
      title: "The Hellbound Heart",
      year: "1986",
      kind: { de: "Novelle", en: "Novella" },
      lead: "hellboundhush1.JPG",
      syn: {
        de: "Frank Cotton öffnet die Puzzlebox des Spielzeugmachers Lemarchand und ruft die Zenobiten — Wesen, für die Schmerz und Lust dasselbe Experiment sind. Die Novelle, aus der Hellraiser wurde: Julia, Kirsty und ein Haus, das Blut verlangt.",
        en: "Frank Cotton opens the toymaker Lemarchand's puzzle box and summons the Cenobites — beings for whom pain and pleasure are the same experiment. The novella that became Hellraiser: Julia, Kirsty and a house that demands blood."
      },
      notes: [
        { de: "Die Urzeichnung Pinheads fand sich in Barkers Skizzen aus der Zeit der Novelle — woher die Figur kam, konnte er selbst nicht sagen: nicht aus einem Traum, sondern irgendwo aus der Psyche.", en: "The original drawing of Pinhead sits in Barker's sketches from the novella's time — where the figure came from he couldn't say: not from a dream, but from somewhere in the psyche.", src: "Scare Tactics, 1992" },
        { de: "Die Novelle entstand mit klarem Hintergedanken: eine Vorlage, die sich mit kleinem Budget verfilmen ließe und ihm den Sprung auf den Regiestuhl ermöglichen würde.", en: "The novella was written with intent: source material filmable on a small budget, giving him his shot at the director's chair.", src: "Starburst, 1987 / AOL, 1997" },
        { de: "Barker zählte sie zu seinen bewussten Faust-Variationen — neben The Damnation Game und The Last Illusion ein Versuch, den alten Pakt für das späte 20. Jahrhundert neu zu erzählen.", en: "Barker counted it among his conscious Faust variations — alongside The Damnation Game and The Last Illusion, retelling the old bargain for the late twentieth century.", src: "Horror: 100 Best Books, 1988" }
      ],
      covers: {
        ukus: [{ f: "hellboundhush1.JPG", c: "US first edition" }, { f: "hellboundhukh1.JPG", c: "UK first edition" }, { f: "hellboundhusp1a.jpg", c: "US first paperback edition" }, { f: "hellboundhmanu.jpg", c: "Manuscript page" }],
        world: [{ f: "hbhpb92-germ.jpg", c: "Germany, 1992" }, { f: "hbhpb06-germ.jpg", c: "Germany, 2006" }, { f: "hbhpb98-greece.jpg", c: "Greece, 1998" }, { f: "hbhpb05-greece.jpg", c: "Greece, 2005" }, { f: "hbhpb06-greece.jpg", c: "Greece, 2006" }, { f: "hbhpb08-spain.jpg", c: "Spain, 2008" }]
      }
    },
    {
      slug: "cabal",
      title: "Cabal",
      year: "1988",
      kind: { de: "Kurzroman", en: "Short novel" },
      lead: "cabalush1.JPG",
      syn: {
        de: "Boone glaubt, ein Mörder zu sein — sein Therapeut Decker weiß es besser. Auf der Flucht findet Boone Midian, die unterirdische Zuflucht der Nightbreed: Monster als Verfolgte, Menschen als eigentliche Bestien. Barkers Vorlage für Nightbreed.",
        en: "Boone believes he is a murderer — his therapist Decker knows better. On the run, Boone finds Midian, the underground refuge of the Nightbreed: monsters as the persecuted, humans as the true beasts. Barker's source for Nightbreed."
      },
      notes: [
        { de: "Nach Weaveworld entdeckte Barker mit Cabal eine neue Länge um 250 Seiten — Geschichten sollten den Raum bekommen, den sie brauchen, nicht mehr.", en: "After Weaveworld, Cabal gave Barker a new length of about 250 pages — stories should occupy the space they need, no more.", src: "Skeleton Crew, 1988" },
        { de: "Im Kern sah er den Zusammenprall zweier Monster-Epochen: der seelenlose Serienmörder des 20. Jahrhunderts gegen die weltmüden, mythischen Ungeheuer des 19.", en: "At its core he saw two monster eras colliding: the soulless twentieth-century serial killer against the world-weary, mythic creatures of the nineteenth.", src: "San Gabriel Valley Tribune, 1988" },
        { de: "Er nannte das Buch eine Romanze für die Toten — seine Liebeserklärung an das Monströse, erzählt als quecksilbriges Abenteuer statt ausbuchstabierter Psychologie.", en: "He called the book a romance for the dead — his love letter to the monstrous, told as quicksilver adventure rather than spelled-out psychology.", src: "Fear, 1988" }
      ],
      covers: {
        ukus: [{ f: "cabalush1.JPG", c: "US first edition" }, { f: "cabalusl1.JPG", c: "US limited edition" }, { f: "cabalukh1.JPG", c: "UK hardback edition" }, { f: "cabalukp1.JPG", c: "UK paperback edition" }],
        world: [{ f: "cabalhb90-it.jpg", c: "Italy, 1990" }, { f: "cabalhb90cde-it.jpg", c: "Italy, 1990 (book club)" }, { f: "cabalhb95-czech.jpg", c: "Czech Republic, 1995" }, { f: "cabalpb12-czech.jpg", c: "Czech Republic, 2012" }, { f: "cabalpb04-romania.jpg", c: "Romania, 2004" }, { f: "cabalpb10-serb.jpg", c: "Serbia, 2010" }]
      }
    },
    {
      slug: "coming-to-grief",
      title: "Coming to Grief",
      year: "1988",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "comingtoush1.JPG",
      syn: {
        de: "Miriam Blessed kehrt zum Begräbnis ihrer Mutter in die Heimat zurück — und zum Bogey-Walk ihrer Kindheit, an dessen Steinbruch etwas wartet. Eine leise, fast blutlose Geschichte über Trauer, geschrieben für Douglas E. Winters Anthologie Prime Evil.",
        en: "Miriam Blessed returns home for her mother's funeral — and to the Bogey-Walk of her childhood, where something waits by the quarry. A quiet, nearly bloodless story about grief, written for Douglas E. Winter's anthology Prime Evil."
      },
      notes: [
        { de: "Die zeitgenössische Kritik hob hervor, wie untypisch still die Geschichte ist: keine Splatter-Bilder, das Monster bleibt Nebensache — im Zentrum steht eine Frau und ihre Kindheitsangst.", en: "Contemporary critics noted how untypically quiet the story is: no gore, the monster secondary — at its centre a woman and her childhood fear.", src: "IAFA Newsletter / Fangoria, 1988" }
      ],
      covers: {
        ukus: [{ f: "comingtoush1.JPG", c: "Prime Evil, US first edition" }, { f: "comingtoltd.JPG", c: "Prime Evil, US limited edition" }, { f: "comingtoukh2.JPG", c: "Prime Evil, UK first edition" }, { f: "ghoct88.jpg", c: "Good Housekeeping, London, October 1988" }],
        world: []
      }
    },
    {
      slug: "whose-line",
      title: "Whose Line is it Anyway?",
      year: "1988",
      kind: { de: "Kurzvignette", en: "Short vignette" },
      lead: "timeout956.jpg",
      syn: {
        de: "Eine kurze Weihnachts-Vignette, geschrieben für das Londoner Stadtmagazin Time Out — eine der raresten Barker-Veröffentlichungen, seither kaum je nachgedruckt.",
        en: "A brief Christmas vignette written for London listings magazine Time Out — one of the rarest Barker publications, hardly ever reprinted since."
      },
      notes: [
        { de: "Erschienen in Time Out No 956 (Dezember 1988); im Revelations-Archiv als Sammlerstück ohne spätere Ausgaben geführt.", en: "Published in Time Out No 956 (December 1988); listed in the Revelations archive as a collector's piece with no later editions.", src: "Revelations-Archiv" }
      ],
      covers: {
        ukus: [{ f: "timeout956.jpg", c: "Time Out No 956, 28 December 1988" }],
        world: []
      }
    },
    {
      slug: "on-amens-shore",
      title: "On Amen's Shore",
      year: "1992",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "demonsdeviants1.JPG",
      syn: {
        de: "Zwei Händler landen an der Küste einer Stadt am Traummeer Quiddity — Barkers erster Ausflug zurück in die Metaphysik von The Great and Secret Show, geschrieben für die Anthologie Demons & Deviants.",
        en: "Two traders make landfall on the shore of a city on the dream-sea Quiddity — Barker's first trip back into the metaphysics of The Great and Secret Show, written for the anthology Demons & Deviants."
      },
      notes: [
        { de: "In seinem Vorwort stellte Barker klar: Dies sei nicht das versprochene Sequel zur Great and Secret Show, sondern eine erste, tastende Erkundung der Territorien rund um Quiddity — inklusive der Iad Ouroboros.", en: "In his foreword Barker was clear: this was not the promised Great and Secret Show sequel but a first, tentative investigation of the territories around Quiddity — Iad Ouroboros included.", src: "Foreword, 1992" },
        { de: "Die Arbeit an der Geschichte erinnerte ihn daran, wie viel Vergnügen Quiddity bereitet — ein Funke, der den Weg zu Everville mit ebnete.", en: "Working on the story reminded him how much fun Quiddity was — a spark that helped clear the road to Everville.", src: "Dread / World of Fandom, 1993" }
      ],
      covers: {
        ukus: [{ f: "demonsdeviants1.JPG", c: "Demons & Deviants" }, { f: "onamenukh1.JPG", c: "UK first edition" }, { f: "onamenhb.JPG", c: "UK hardback edition" }, { f: "onamenuspb1.jpg", c: "US paperback edition" }],
        world: []
      }
    },
    {
      slug: "the-departed",
      title: "The Departed",
      year: "1992",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "hermionenyt.jpg",
      syn: {
        de: "Eine tote Mutter erhält für eine Halloween-Nacht die Erlaubnis, zurückzukehren — und begegnet ihrem Sohn als Geist unter Geistern. Eine zarte Geistergeschichte, geschrieben für die Op-Ed-Seite der New York Times.",
        en: "A dead mother is granted one Halloween night to return — and meets her son as one ghost among many. A tender ghost story, written for the New York Times op-ed page."
      },
      notes: [
        { de: "Eine seiner wenigen Auftragsgeschichten: Die New York Times bestellte sie für Halloween — und benannte sie kurzerhand in »Hermione and the Moon« um, weil ihr der Originaltitel zu deprimierend war.", en: "One of his few commissioned stories: the New York Times ordered it for Halloween — and promptly retitled it 'Hermione and the Moon', finding the original too depressing.", src: "The Essential Clive Barker, 1999" },
        { de: "Barker führte sie gern als Beleg gegen das Etikett des reinen Schreckensautors an: eine Geschichte fast ganz ohne das Groteske.", en: "Barker liked citing it against the pure-horror label: a story almost entirely free of the grotesque.", src: "Cemetery Dance, 1993" }
      ],
      covers: {
        ukus: [{ f: "hermionenyt.jpg", c: "New York Times, 30 October 1992 (as 'Hermione and the Moon')" }, { f: "fanthorror.jpg", c: "Anthology hardback, 1993" }, { f: "besthorror4.JPG", c: "Best New Horror 4" }, { f: "besthorror4pb.jpg", c: "Best New Horror 4, paperback" }],
        world: []
      }
    },
    {
      slug: "pidgin-and-theresa",
      title: "Pidgin and Theresa",
      year: "1993",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "pidgenukp1.JPG",
      syn: {
        de: "Eine kurze, kuriose Geschichte, zuerst in Time Out erschienen und später im Band Secret City gesammelt — eine der versteckteren Ecken von Barkers Kurzprosa.",
        en: "A short, curious tale first published in Time Out and later collected in Secret City — one of the more hidden corners of Barker's short fiction."
      },
      notes: [
        { de: "Erstveröffentlichung in Time Out 1993, danach in Secret City (limitierte Ausgabe 1994, Softcover 1997) — so verzeichnet es das Revelations-Archiv.", en: "First published in Time Out in 1993, then in Secret City (limited edition 1994, softcover 1997) — as recorded by the Revelations archive.", src: "Revelations-Archiv" }
      ],
      covers: {
        ukus: [{ f: "pidgenukp1.JPG", c: "Time Out, 1993" }, { f: "pidgenukh2.jpg", c: "Time Out, Book Club, 1994" }, { f: "pidgenukh1.JPG", c: "Secret City, limited edition" }, { f: "secretcityukpb.JPG", c: "Secret City, softback, 1997" }],
        world: []
      }
    },
    {
      slug: "alas-poor-yorock",
      title: "Alas, Poor Yorock",
      year: "1994",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "entweekly224.jpg",
      syn: {
        de: "Eine kurze Satire für Entertainment Weekly — Barker in seltener, spielerischer Magazinform, nie in einer eigenen Buchausgabe erschienen.",
        en: "A short piece of playful satire for Entertainment Weekly — Barker in rare magazine form, never issued in a book of its own."
      },
      notes: [
        { de: "Einziger Erscheinungsort laut Revelations-Archiv: Entertainment Weekly No 224 vom 27. Mai 1994.", en: "Sole appearance per the Revelations archive: Entertainment Weekly No 224, 27 May 1994.", src: "Revelations-Archiv" }
      ],
      covers: {
        ukus: [{ f: "entweekly224.jpg", c: "Entertainment Weekly No 224, 27 May 1994" }],
        world: []
      }
    },
    {
      slug: "animal-life",
      title: "Animal Life",
      year: "1994",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "animallifeukh1.JPG",
      syn: {
        de: "Nach einem Beben in Los Angeles verschwimmt für einen Moment die Grenze zwischen Mensch und Tier. Zuerst im USA Weekend Supplement erschienen, später in Dark Terrors 2 gesammelt.",
        en: "After an earthquake in Los Angeles, the line between human and animal blurs for a moment. First published in the USA Weekend supplement, later collected in Dark Terrors 2."
      },
      notes: [
        { de: "Die Geschichte entstand unter dem Eindruck des Northridge-Erdbebens vom Januar 1994 — und lässt sich, so Barker, auf zwei Arten lesen.", en: "The story grew out of the January 1994 Northridge earthquake — and can, Barker suggested, be read two ways.", src: "Dark Terrors 2, 1996" },
        { de: "Dahinter steht ein Lieblingsgedanke: Fantasy als Versuch, sich imaginativ in den Kopf des Tieres zurückzuträumen — bei Barker bevorzugt in den des Hundes.", en: "Behind it sits a favourite idea: fantasy as an attempt to dream one's way back into the animal's head — for Barker, preferably a dog's.", src: "Shadows in Eden, 1988" }
      ],
      covers: {
        ukus: [{ f: "usaweekend.JPG", c: "USA Weekend supplement" }, { f: "animallife2.JPG", c: "Dark Carnival Books edition" }, { f: "animallifeukh1.JPG", c: "Dark Terrors 2, 1996" }, { f: "animallifeukp1.JPG", c: "Dark Terrors 2, paperback, 1997" }],
        world: []
      }
    },
    {
      slug: "street-no-name",
      title: "A Story With No Title, A Street With No Name",
      year: "1995",
      kind: { de: "Online-Fragment", en: "Online fragment" },
      lead: null,
      syn: {
        de: "Ein bewusst offener Anfang, geschrieben 1995 für die Online-Plattform Kaleidospace: Wer sich berufen fühlte, durfte die Geschichte fortsetzen. Mehrere Autorinnen und Autoren nahmen die Einladung an — bis die Seite 2001 aus dem Netz verschwand.",
        en: "A deliberately open beginning, written in 1995 for the online platform Kaleidospace: anyone who felt moved could continue the story. Several writers took up the invitation — until the site vanished from the web in 2001."
      },
      notes: [
        { de: "Ein frühes Experiment in kollaborativem Netz-Erzählen — heute existiert der Text nur noch als Archiv-Erinnerung ohne Druckausgabe.", en: "An early experiment in collaborative online storytelling — today the text survives only as an archive memory, never printed.", src: "Revelations-Archiv" }
      ],
      covers: { ukus: [], world: [] }
    },
    {
      slug: "chiliad",
      title: "Chiliad: A Meditation",
      year: "1997",
      kind: { de: "Novelle in zwei Teilen", en: "Novella in two parts" },
      lead: "chiliadush1.JPG",
      syn: {
        de: "Zwei Erzählungen, tausend Jahre auseinander, verbunden durch einen Fluss und ein Verbrechen: Chiliad meditiert über Gewalt, Zeit und Vergebung — geschrieben für die Millenniums-Anthologie Revelations.",
        en: "Two tales a thousand years apart, joined by a river and a crime: Chiliad meditates on violence, time and forgiveness — written for the millennium anthology Revelations."
      },
      notes: [
        { de: "Barker beschrieb die beiden Novellen als Versuch, das apokalyptische Gefühl der Jahrtausendwende zu heilen — mit dem Blick auf Generationen, die nach uns weiterleben.", en: "Barker described the two novellas as an attempt to heal the apocalyptic mood of the millennium — looking to the generations living on after us.", src: "Philadelphia Gay News, 1997" },
        { de: "Schreiben sei für ihn die Flucht aus dem »Korall des Selbst« ins Grenzenlose — Chiliad nannte er als Beispiel für diesen mystischen Herzschlag seiner Arbeit.", en: "Writing, he said, is escape from the coral of the self into the boundless — Chiliad being an example of that mystical heartbeat of his work.", src: "DragonCon / Lost Souls, 1997" }
      ],
      covers: {
        ukus: [{ f: "chiliadush1.JPG", c: "Revelations, US, 1997" }, { f: "chiliadukh1.jpg", c: "Millennium, UK, 1997" }, { f: "chiliadusl.JPG", c: "Revelations, numbered edition" }, { f: "chiliadusla.JPG", c: "Revelations, lettered edition" }],
        world: []
      }
    },
    {
      slug: "tortured-souls",
      title: "Tortured Souls: Six Destinies",
      year: "2001",
      kind: { de: "Novelle in sechs Teilen", en: "Novella in six parts" },
      lead: "6destinies1.JPG",
      syn: {
        de: "Sechs Schicksale aus der Stadt Primordium, geschrieben als Begleittexte zu Todd McFarlanes Tortured-Souls-Figuren: Agonistes, der Bittsteller in Fleisch verwandelt — Barkers Mythologie im Miniaturformat.",
        en: "Six destinies from the city of Primordium, written to accompany Todd McFarlane's Tortured Souls figures: Agonistes remaking supplicants in flesh — Barker mythology in miniature."
      },
      notes: [
        { de: "Barker verstand die Texte als freie Geschichten zu Objekten, die nach Erklärung verlangten — die Figuren nannte er keine Spielzeuge, sondern Gegenstände der Verehrung mit eigener Geschichte.", en: "Barker saw the texts as free stories for objects that demanded explanation — the figures, he said, weren't toys but objects of veneration carrying their own history.", src: "International Toy Fair, 2001" },
        { de: "Nie als eigenständige Publikation geplant, zog die Novelle Leser an, die mit Sammelfiguren sonst nichts anfangen konnten — und wurde so zum Kultstück.", en: "Never planned as a standalone publication, the novella drew readers who'd never have touched collectible figures — becoming a cult piece.", src: "Revelations-Archiv" }
      ],
      covers: {
        ukus: [{ f: "6destinies1.JPG", c: "The Secret Face of Genesis" }, { f: "6destinies2.JPG", c: "The Assassin Transformed" }, { f: "6destinies3.JPG", c: "The Avenger" }, { f: "6destinies4.JPG", c: "The Surgeon of the Sacred Heart" }],
        world: []
      }
    },
    {
      slug: "wood-on-the-hill",
      title: "The Wood on the Hill",
      year: "2001",
      kind: { de: "Frühwerk · Erzählung", en: "Early work · story" },
      lead: "darkukh1.JPG",
      syn: {
        de: "Eine Frau intrigiert gegen die Natur — und die Natur antwortet. Barkers erste ambitionierte Geschichte, mit elf oder zwölf Jahren geschrieben und selbst illustriert; erst 2001 in Douglas E. Winters Biografie The Dark Fantastic veröffentlicht.",
        en: "A woman plots against nature — and nature answers. Barker's first ambitious story, written and illustrated at eleven or twelve; first published in 2001 in Douglas E. Winter's biography The Dark Fantastic."
      },
      notes: [
        { de: "Barker erinnerte sich an den Ursprung: Der Umzug in ein Haus mit Baum — und die Wut, als der Baum fiel. Daraus wuchs die Geschichte einer Frau, die sich an der Natur vergeht.", en: "Barker recalled the origin: moving to a house with a tree — and the fury when the tree came down. From that grew the story of a woman who wrongs nature.", src: "The Dark Fantastic, 2001" },
        { de: "Gezeigt hat er das illustrierte Frühwerk damals niemandem — wie viele junge Künstler hielt er es lieber verborgen, statt es Verlagen anzubieten.", en: "He showed the illustrated early work to no one at the time — like many young artists, he kept it hidden rather than offering it to publishers.", src: "Introduction to The Thief of Always, 2001" }
      ],
      covers: {
        ukus: [{ f: "darkukh1.JPG", c: "The Dark Fantastic, UK trade edition" }, { f: "darkfanush1.JPG", c: "The Dark Fantastic, US trade edition" }, { f: "firsttalesush1.jpg", c: "First Tales, US trade edition" }, { f: "revelationsclimatehb1.jpg", c: "Revelations, UK hardback edition" }],
        world: []
      }
    },
    {
      slug: "infernal-parade",
      title: "The Infernal Parade",
      year: "2004",
      kind: { de: "Novelle in sechs Teilen", en: "Novella in six parts" },
      lead: "iptom.jpg",
      syn: {
        de: "Tom Requiem, Bethany Bled, der Golem Elijah: sechs kleine Fabeln über die Mitglieder einer höllischen Parade, geschrieben zu McFarlanes zweiter Barker-Figurenserie.",
        en: "Tom Requiem, Bethany Bled, the golem Elijah: six small fables about the members of an infernal parade, written for McFarlane's second series of Barker figures."
      },
      notes: [
        { de: "Anders als bei Tortured Souls beschrieb Barker hier keinen Ort, sondern erzählte in sich geschlossene kleine Fabeln — die Geschichten dahinter, wer diese Wesen sind.", en: "Unlike Tortured Souls, Barker described no location here but told self-contained little fables — the stories of who these beings are.", src: "Revelations-Interview, 2004" }
      ],
      covers: {
        ukus: [{ f: "iptom.jpg", c: "Tom Requiem" }, { f: "ipbethany.jpg", c: "Bethany Bled" }, { f: "ipgolem.jpg", c: "The Golem Elijah" }, { f: "ipsabbaticus.jpg", c: "The Sabbaticus" }],
        world: []
      }
    },
    {
      slug: "jump-tribe",
      title: "Jump Tribe",
      year: "2005",
      kind: { de: "Geschichten & Gedichte", en: "Stories & poems" },
      lead: "yabootext.jpg",
      syn: {
        de: "Wesen, die durch Löcher zwischen den Dimensionen springen: Zu seinen Jump-Tribe-Plüschfiguren (mit Art Asylum) schrieb Barker Geschichten und Verse — 2025 von Subterranean Press erstmals gesammelt.",
        en: "Creatures that jump through holes between dimensions: for his Jump Tribe plush figures (with Art Asylum) Barker wrote stories and verse — first collected by Subterranean Press in 2025."
      },
      notes: [
        { de: "Die Grundlage waren 240 Figuren, die Barker auf fünf Leinwänden malte — die Geschichten von Gut, Böse und Hässlich folgten den Bildern.", en: "It began with 240 characters Barker painted across five canvases — the stories of the good, the bad and the ugly followed the paintings.", src: "Revelations-Interview, 2005" }
      ],
      covers: {
        ukus: [{ f: "yabootext.jpg", c: "Yaboo's Tale, 2005" }, { f: "twothtext.jpg", c: "Twoth's Tale, 2005" }, { f: "billumtext.jpg", c: "Billum's Tale, 2005" }, { f: "kungunahtext.jpg", c: "Kungu Nah's Tale, 2005" }],
        world: []
      }
    },
    {
      slug: "haeckels-tale",
      title: "Haeckel's Tale",
      year: "2005",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "haeckelushb1.jpg",
      syn: {
        de: "Ein junger Rationalist wird Zeuge einer Nacht auf dem Friedhof, die seine Wissenschaft nicht erklären kann. Geschrieben für die Anthologie Dark Delicacies; 2006 von Mick Garris' Masters of Horror verfilmt.",
        en: "A young rationalist witnesses a night in the graveyard his science cannot explain. Written for the anthology Dark Delicacies; filmed in 2006 for Mick Garris' Masters of Horror."
      },
      notes: [
        { de: "Barker beschrieb die Geschichte als bewussten Rückbesuch beim »alten Clive« — ein Test, ob der frühe Horror-Ton noch trägt.", en: "Barker described the story as a deliberate revisit to 'old Clive' — testing whether the early horror voice still held.", src: "Revelations-Interview, 2005" },
        { de: "Herausgeber Del Howison kündigte sie als grotesk-erotisches Schlussstück von Dark Delicacies an — Liebe unter Toten, wörtlich genommen.", en: "Editor Del Howison billed it as the grotesque, erotic closer of Dark Delicacies — love among the dead, taken literally.", src: "Fangoria, 2005" }
      ],
      covers: {
        ukus: [{ f: "haeckelushb1.jpg", c: "Dark Delicacies, hardback first edition, 2005" }, { f: "haeckeluspb1.jpg", c: "Dark Delicacies, paperback, 2005" }, { f: "haeckeluspb2.jpg", c: "The Best of the Year, 2006" }, { f: "haeckeluspb3.jpg", c: "Best New Horror 17, US edition, 2006" }],
        world: []
      }
    },
    {
      slug: "maximillian-bacchus",
      title: "The Adventures of Mr. Maximillian Bacchus and His Travelling Circus",
      year: "2009",
      kind: { de: "Frühwerk · Novelle", en: "Early work · novella" },
      lead: "bacchuscover1.jpg",
      syn: {
        de: "Vier Episoden um einen wandernden Wunderzirkus — geschrieben in Barkers frühen Zwanzigern, im Geist von Lord Dunsany, und erst 2009 bei Bad Moon Books veröffentlicht, illustriert von Richard A. Kirk.",
        en: "Four episodes of a travelling circus of wonders — written in Barker's early twenties in the spirit of Lord Dunsany, first published by Bad Moon Books in 2009 with illustrations by Richard A. Kirk."
      },
      notes: [
        { de: "Barker bekannte sich zum Einfluss Lord Dunsanys samt Freude an fantastischen Namen; einzig die Ballerina Ophelia trug Züge einer Freundin aus Liverpooler Tagen.", en: "Barker owned the influence of Lord Dunsany, wilful fantastic names included; only Ophelia the ballerina carried traces of a friend from his Liverpool days.", src: "Memory, Prophecy and Fantasy, 2009" },
        { de: "Die sechs Original-Artworks zur Novelle sind verschollen — erhalten blieben nur Barkers eigene Schwarzweißfotos, die der Ausgabe beilagen.", en: "The six original artworks for the novella are lost — only Barker's own black-and-white photographs survived to accompany the edition.", src: "Revelations-Interview, 2008" }
      ],
      covers: {
        ukus: [{ f: "bacchuscover1.jpg", c: "Bad Moon Books, hardback first edition, 2009" }, { f: "bacchusl2.jpg", c: "Lettered edition (traycase), 2009" }, { f: "bacchusultrafront.jpg", c: "Ultra edition, 2010" }, { f: "bacchuskindle.jpg", c: "Kindle edition, 2011" }],
        world: []
      }
    },
    {
      slug: "theyre-mad",
      title: "They're Mad, They Are",
      year: "2012",
      kind: { de: "Prolog · Gemeinschaftsprojekt", en: "Prologue · community project" },
      lead: "theyremad.png",
      syn: {
        de: "Der Auftakt zum Odyssey-Projekt auf deviantART: Barker schrieb den Prolog und übergab die Geschichte der Community, die sie über Monate gemeinsam weitererzählte und bebilderte.",
        en: "The opening of the Odyssey project on deviantART: Barker wrote the prologue and handed the story to the community, which carried it on in words and images over months."
      },
      notes: [
        { de: "Barker feierte das Projekt als gemeinsames Welterschaffen — die Fortsetzung seiner Lebensaufgabe, diesmal mit tausenden Beteiligten.", en: "Barker celebrated the project as collective world-building — his life's work continued, this time with thousands taking part.", src: "ReadWriteWeb, 2012" },
        { de: "Rückblickend beschrieb er den Prolog als Schiff, das erst auf offener See fertiggebaut wurde — von einer Community, deren Kurs niemand vorhersagen konnte.", en: "Looking back he described the prologue as a ship finished at open sea — by a community whose course no one could predict.", src: "Final Thoughts, deviantART, 2013" }
      ],
      covers: {
        ukus: [{ f: "theyremad.png", c: "They're Mad, They Are at deviantART" }],
        world: []
      }
    },
    {
      slug: "candle-in-the-cloud",
      title: "The Candle in the Cloud",
      year: "2013",
      kind: { de: "Frühwerk · Jugendroman", en: "Early work · juvenile novel" },
      lead: "firsttalesush1.jpg",
      syn: {
        de: "Ein Fantasyabenteuer zwischen dem Hier und einer erfundenen Welt, geschrieben mit siebzehn: Barkers erster Roman, jahrzehntelang unveröffentlicht, bis First Tales ihn 2013 zugänglich machte.",
        en: "A fantasy adventure between the here-and-now and an invented world, written at seventeen: Barker's first novel, unpublished for decades until First Tales made it available in 2013."
      },
      notes: [
        { de: "Ein Verlag zeigte damals Interesse, verlangte aber Überarbeitungen — und Barker stand kurz vor dem Studium: Die Änderungen blieben liegen, das Buch verschwand in der Schublade.", en: "A publisher showed interest at the time but wanted revisions — and Barker was about to start university: the changes never happened, the book went into the drawer.", src: "Introduction to The Thief of Always, 2001" },
        { de: "Später nannte er es ein Glück für seinen Ruf, dass niemand den Siebzehnjährigen druckte — seine Liebe zur Kinder- und Jugendliteratur aber blieb.", en: "He later called it lucky for his reputation that no one published the seventeen-year-old — but his love of children's fiction remained.", src: "Barnes & Noble presentation" }
      ],
      covers: {
        ukus: [{ f: "firsttalesush1.jpg", c: "First Tales, US trade edition, 2013" }],
        world: []
      }
    },
    {
      slug: "a-nights-work",
      title: "A Night's Work",
      year: "2013",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "bramstoker2013.jpg",
      syn: {
        de: "Ein Schriftsteller, der nicht mehr weiß, ob er wacht, träumt oder schreibt — und Entscheidungen treffen muss, die alle drei Zustände betreffen. Zuerst für die Bram-Stoker-Awards-Gala 2013 erschienen, später in Best New Horror 25.",
        en: "A writer no longer sure whether he is awake, dreaming or writing — facing choices that touch all three states. First issued for the 2013 Bram Stoker Awards, later collected in Best New Horror 25."
      },
      notes: [
        { de: "Cemetery Dance kündigte sie als klassische Barker-Denksportgeschichte an — eine seiner verspieltesten späten Arbeiten.", en: "Cemetery Dance billed it as a classic thinking-man's Barker story — among his most imaginative late pieces.", src: "Cemetery Dance, 2014" }
      ],
      covers: {
        ukus: [{ f: "bramstoker2013.jpg", c: "Bram Stoker Awards, US, 2013" }, { f: "nightsukpb1.jpg", c: "Best New Horror 25, UK" }, { f: "nightsuspb1.jpg", c: "Best New Horror 25, US" }, { f: "nightsukl1.jpg", c: "Best New Horror 25, UK limited edition" }],
        world: []
      }
    },
    {
      slug: "dollie",
      title: "Dollie",
      year: "2013",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "dollieush1.jpg",
      syn: {
        de: "Eine sehr kurze Geschichte für die Cemetery-Dance-Anthologie Turn Down the Lights — kaum mehr als eine Tür, hinter der eine größere Dunkelheit nur eben sichtbar wird.",
        en: "A very short story for the Cemetery Dance anthology Turn Down the Lights — little more than a door through which a larger darkness is just barely glimpsed."
      },
      notes: [
        { de: "Barker erklärte dazu seine Liebe zu sehr knappen Erzählungen, die eine größere Welt oder Mythologie nur andeuten, statt sie auszubuchstabieren.", en: "Barker professed his love of very brief tales that hint at a larger world or mythology just out of sight rather than spelling it out.", src: "Facebook, 2013" }
      ],
      covers: {
        ukus: [{ f: "dollieush1.jpg", c: "Turn Down the Lights, US trade" }, { f: "dollieush2.jpg", c: "Turn Down the Lights, US limited editions" }, { f: "dollieukpb1.jpg", c: "Turn Down the Lights, UK paperback" }],
        world: []
      }
    },
    {
      slug: "afraid",
      title: "Afraid",
      year: "2015",
      kind: { de: "Kurzgeschichte", en: "Short story" },
      lead: "horrorology3.jpg",
      syn: {
        de: "Barkers Beitrag zu Stephen Jones' Anthologie Horrorology: The Lexicon of Fear — einem Wörterbuch des Schreckens, gehütet in der Library of the Damned.",
        en: "Barker's contribution to Stephen Jones' anthology Horrorology: The Lexicon of Fear — a dictionary of dread kept in the Library of the Damned."
      },
      notes: [
        { de: "Herausgeber Stephen Jones baute die Anthologie als »Studie des Horrors« um gestohlene Seiten aus der Library of the Damned — Barkers Stichwort: die Angst selbst.", en: "Editor Stephen Jones framed the anthology as a 'study of horror' built around pages stolen from the Library of the Damned — Barker's entry: fear itself.", src: "Starburst, 2015" }
      ],
      covers: {
        ukus: [{ f: "horrorology3.jpg", c: "Horrorology: The Lexicon of Fear, 2015" }],
        world: []
      }
    },
    {
      slug: "tonight-again",
      title: "Tonight, Again",
      year: "2015",
      kind: { de: "Erzählungen · Sammlung", en: "Stories · collection" },
      lead: "tonightushb1.jpg",
      syn: {
        de: "Zweiunddreißig kurze Geschichten über Begehren in allen Spielarten — zärtlich, monströs, komisch. Erschienen bei Subterranean Press mit Illustrationen von Barker selbst.",
        en: "Thirty-two brief tales of desire in all its registers — tender, monstrous, comic. Published by Subterranean Press with illustrations by Barker himself."
      },
      notes: [
        { de: "Kurzprosa musste sich Barker regelmäßig gegen die Skepsis seiner Verlage erkämpfen — der Markt galt als schwierig, sein Vergnügen daran blieb ungebrochen.", en: "Barker repeatedly had to fight his publishers' scepticism about short fiction — a troubled market, they said; his delight in it never wavered.", src: "Interview, 1996" },
        { de: "Nach Jahren an Vierzehn-Monats-Romanen genoss er Geschichten, die in drei Wochen fertig sind — schnelle, konzentrierte Imagination.", en: "After years of fourteen-month novels he relished stories finished in three weeks — fast, concentrated imagining.", src: "Lost Souls, 1998" }
      ],
      covers: {
        ukus: [{ f: "tonightushb1.jpg", c: "US trade edition" }, { f: "tonightusl1.jpg", c: "US lettered edition" }, { f: "tonightusl2.jpg", c: "US numbered edition" }, { f: "tonightukhb1.jpg", c: "UK limited edition" }],
        world: []
      }
    }
  ];

  function coverPath(story, file) {
    return "assets/covers/stories/" + story.slug + "/" + file;
  }

  /* ---------------- Overview rendering ---------------- */
  var grid = document.getElementById("storiesGrid");

  function leadMarkup(s) {
    if (s.lead) {
      return '<span class="novelcard__coverwrap"><img src="' + coverPath(s, s.lead) + '" alt="' + s.title + ' — Cover" loading="lazy" /></span>';
    }
    return '<span class="novelcard__coverwrap novelcard__coverwrap--empty"><span>' + s.title.charAt(0) + "</span></span>";
  }

  function renderGrid() {
    var html = "";
    STORIES.forEach(function (s, i) {
      html +=
        '<a class="novelcard reveal-news" href="story.html?s=' + s.slug + '">' +
        '<span class="novelcard__num mono">' + String(i + 1).padStart(2, "0") + "</span>" +
        leadMarkup(s) +
        '<span class="novelcard__title">' + s.title + "</span>" +
        '<span class="novelcard__sub">' + pick(s.kind) + "</span>" +
        '<span class="novelcard__year mono">' + s.year + "</span>" +
        "</a>";
    });
    grid.innerHTML = html;
    bindHoverCursor(".novelcard");
  }

  /* ---------------- Detail rendering ---------------- */
  var detail = document.getElementById("storyDetail");
  var currentStory = null;

  function coverFigure(story, img) {
    return (
      '<figure class="coverfig" data-file="' + img.f + '">' +
      '<img src="' + coverPath(story, img.f) + '" alt="' + story.title + " — " + img.c + '" loading="lazy" />' +
      '<figcaption class="mono">' + img.c + "</figcaption>" +
      "</figure>"
    );
  }

  function renderDetail() {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("s");
    var idx = STORIES.findIndex(function (s) { return s.slug === slug; });
    if (idx === -1) idx = 0;
    var s = STORIES[idx];
    currentStory = s;

    document.title = s.title + " — Revelations · Clive Barker";

    var notesHtml = s.notes.map(function (note) {
      return (
        '<li class="novelnote reveal-news"><p>' + pick(note) + "</p>" +
        '<p class="novelnote__src mono">' + note.src + "</p></li>"
      );
    }).join("");

    var prev = STORIES[(idx - 1 + STORIES.length) % STORIES.length];
    var next = STORIES[(idx + 1) % STORIES.length];

    var leadFig = s.lead
      ? '<figure class="noveldetail__leadwrap"><div class="bio__imgwrap"><img src="' + coverPath(s, s.lead) + '" alt="' + s.title + ' — Cover" /></div>' +
        '<figcaption class="mono">' + (s.covers.ukus.length ? s.covers.ukus[0].c : "") + "</figcaption></figure>"
      : "";

    detail.innerHTML =
      '<section class="newshero novelhero">' +
      '<p class="hero__eyebrow mono">' + pick(s.kind) + " · " + s.year + "</p>" +
      '<h1 class="novelhero__title">' + s.title + "</h1>" +
      "</section>" +

      '<section class="noveldetail">' +
      '<div class="noveldetail__grid' + (s.lead ? "" : " noveldetail__grid--noimg") + '">' +
      leadFig +
      '<div class="noveldetail__text">' +
      '<h2 class="noveldetail__h mono">' + t("novel.synopsis") + "</h2>" +
      '<p class="noveldetail__syn">' + pick(s.syn) + "</p>" +
      '<h2 class="noveldetail__h mono">' + t("novel.cliveOn") + "</h2>" +
      '<ul class="novelnotes">' + notesHtml + "</ul>" +
      "</div></div>" +

      (s.covers.ukus.length
        ? '<div class="coversection">' +
          '<div class="coversection__head"><h2 class="section__title section__title--small">' + t("story.coversUkus") + '</h2><p class="mono coversection__hint">' + t("novel.coverHint") + "</p></div>" +
          '<div class="coverrow">' + s.covers.ukus.map(function (img) { return coverFigure(s, img); }).join("") + "</div>" +
          "</div>"
        : "") +

      (s.covers.world.length
        ? '<div class="coversection">' +
          '<div class="coversection__head"><h2 class="section__title section__title--small">' + t("novel.coversWorld") + "</h2></div>" +
          '<div class="coverrow">' + s.covers.world.map(function (img) { return coverFigure(s, img); }).join("") + "</div>" +
          "</div>"
        : "") +

      '<p class="coversection__credit mono">Cover-Abbildungen: Revelations-Archiv (clivebarker.info) · Artwork teils © Clive Barker, teils © der jeweiligen Verlage</p>' +

      '<nav class="novelpager">' +
      '<a class="novelpager__link mono" href="story.html?s=' + prev.slug + '">' + t("novel.prev") + " · " + prev.title + "</a>" +
      '<a class="novelpager__link mono" href="stories.html">' + t("story.backToList") + "</a>" +
      '<a class="novelpager__link mono" href="story.html?s=' + next.slug + '">' + next.title + " · " + t("novel.next") + "</a>" +
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
      lightboxTitle.textContent = currentStory.title;
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
      document.title = t("title.stories");
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
