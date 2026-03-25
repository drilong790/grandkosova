/**
 * Grand Kosova — Shqip (primary) / English (secondary).
 * Preference: localStorage key "gk-lang" ("sq" | "en").
 */
(function () {
  "use strict";

  var STORAGE_KEY = "gk-lang";
  var DEFAULT_LANG = "sq";

  var DICT = {
    sq: {
      "nav.home": "Home",
      "nav.menu": "Menu",
      "nav.about": "Rreth Nesh",
      "nav.gallery": "Galeri",
      "nav.contact": "Kontakti",
      "lang.aria": "Gjuha / Language",

      "titles.index": "Grand Kosova Restaurant | Sallë Dasmash në Rogovë të Hasit, Gjakovë",
      "titles.about": "Grand Kosova Restaurant | Rreth Nesh",
      "titles.contact": "Grand Kosova Restaurant | Kontakti",
      "titles.package": "Grand Kosova Restaurant | Menu",
      "titles.gallery": "Grand Kosova Restaurant | Galeri",

      "footer.afterYear":
        "Restaurant Grand Kosova, Rogovë e Hasit, Gjakovë. Të gjitha të drejtat e rezervuara.",
      "footer.instagram": "Instagram",
      "footer.whatsapp": "WhatsApp",

      "index.hero.title": "Restaurant Grand Kosova",
      "index.hero.subtitle": "Sallë dasmash klasike dhe elegante në Rogovë të Hasit, Gjakovë",
      "index.hero.cta": "Zbuloni më shumë",
      "index.hero.scroll": "Scroll",

      "index.hl1.t": "Kapacitet 1000+ mysafirë",
      "index.hl1.p": "Hapësirë e bollshme për çdo dasmë elegante.",
      "index.hl2.t": "Parking & Shërbim Premium",
      "index.hl2.p": "Parkim i bollshëm dhe staf i trajnuar për çdo nevojë.",
      "index.hl3.t": "Dekor elegant & klasik",
      "index.hl3.p": "Ambient të brendshëm dhe të jashtëm me stil luksoz.",

      "index.about.h": "Rreth Nesh",
      "index.about.p":
        "Restaurant Grand Kosova ofron një ambient të mrekullueshëm për dasma, fejesa dhe evente speciale. Me dekore klasike dhe shërbim premium, ne bëjmë ëndrrën tuaj realitet.",
      "index.about.btn": "Lexo më shumë",

      "index.packages.h": "Menu Dasmash",
      "index.pkg1.t": "Menu 1",
      "index.pkg1.p":
        "Grand Kosova Menu 1",
      "index.pkg2.t": "Menu 2",
      "index.pkg2.p":
        "Grand Kosova Menu 2",
      "index.packages.btn": "Shiko menunë",
      "index.packages.all": "Shiko të gjitha menutë",

      "index.gallery.h": "Galeri",
      "index.gallery.btn": "Shiko Galerinë e Plotë",

      "index.testimonials.h": "Çfarë thonë çiftet për ne",
      "index.testimonial1": '"Një eksperiencë e paharrueshme! Çdo gjë ishte perfekte."',
      "index.testimonial2":
        '"Stafi shumë i kujdesshëm dhe dekorimi luksoz – të gjitha ëndrrat u realizuan."',
      "index.testimonial3": '"Rekomandoj pa hezitim – Restaurant Grand Kosova është i mrekullueshëm."',

      "index.cta.h": "Rezervo një takim ose konsultë",
      "index.cta.btn": "Na Kontakto Tani",

      "about.badge": "Rreth Restaurantit Grand Kosova",
      "about.hero.h": "Elegancë, traditë dhe mikpritje shqiptare",
      "about.hero.sub":
        "Sallë dasmash dhe eventesh në Rogovë të Hasit, Gjakovë – ku çdo detaj mendohet me kujdes, nga dekorimi luksoz deri te shërbimi i personalizuar për çdo çift dhe familje.",

      "about.story.h": "Historia jonë",
      "about.story.p1":
        "Restaurant Grand Kosova është krijuar me një vizion të qartë: të sjellë një ambient të klasit të lartë për dasma dhe evente të veçanta, duke ruajtur ngrohtësinë dhe traditën shqiptare. Me vite përvojë në organizimin e dasmave, fejesave dhe banketeve familjare, ne kemi ndërtuar një reputacion të fortë për korrektësi, elegancë dhe shërbim të jashtëzakonshëm.",
      "about.story.p2":
        "Çdo event trajtohet sikur të ishte festë e jona – duke filluar nga pritja e mysafirëve, organizimi i rrjedhshëm i mbrëmjes, koordinimi me muzikantë, fotografë dhe dekorues, e deri te detajet më të vogla që bëjnë diferencën në përjetimin final.",

      "about.why.h": "Pse na zgjedhin çiftet",
      "about.why.intro":
        "Ne kombinojmë organizimin profesional, kuzhinën e pasur dhe ambientin e rafinuar për të krijuar një mbrëmje që i kalon pritshmëritë tuaja.",
      "about.why.v1h": "Ambient luksoz & fleksibël",
      "about.why.v1p":
        "Salla jonë moderne përshtatet për dasma të mëdha apo intime, me mundësi personalizimi të dekorit, ndriçimit dhe ulëseve sipas shijes suaj.",
      "about.why.v2h": "Kuzhinë e përzgjedhur",
      "about.why.v2p":
        "Menu tradicionale dhe moderne, të përgatitura nga kuzhinierë me përvojë, me fokus në shije autentike, prezantim elegant dhe cilësi konstante.",
      "about.why.v3h": "Organizim i plotë i mbrëmjes",
      "about.why.v3p":
        "Nga hyrja e çiftit, vallëzimet e para, deri te momentet finale – stafi ynë kujdeset që çdo gjë të rrjedhë natyrshëm dhe pa stres për ju.",

      "about.stat.num1": "1000+",
      "about.stat.num2": "Qindra",
      "about.stat1": "Mysafirë kapacitet maksimal",
      "about.stat2": "Dasma & evente të suksesshme",

      "about.cta.h": "Gati të planifikojmë mbrëmjen tuaj?",
      "about.cta.p":
        "Na kontaktoni për t'ju prezantuar sallën nga afër, për të diskutuar menutë dhe për të krijuar një ofertë të personalizuar për dasmën ose eventin tuaj.",
      "about.cta.btn": "Rezervo një takim",

      "contact.h": "Na Kontaktoni",
      "contact.lead": "Për pyetje, rezervime ose info të tjera, mund të na kontaktoni direkt!",
      "contact.phone": "Telefon / WhatsApp",
      "contact.email": "Email",
      "contact.social": "Rrjetet Sociale",
      "contact.location": "Lokacioni",

      "pkg.badge": "Menu",
      "pkg.hero.h": "Menu dasmash për çdo vizion",
      "pkg.hero.sub":
        "Zgjidhni nga menutë tona të kuruara me kujdes – nga menutë klasike deri te ato luksoze, me mundësi shtesë sipas dëshirës suaj.",

      "pkg.m1.tag": "Grand Kosova Menu 1",
      "pkg.m1.btn": "Shiko Menunë",
      "pkg.m1.i1":
        "Sallatë e kombinuar (speca me sos, sallatë të gjelbërta, ullinj) për person",
      "pkg.m1.i2": "Paragjellë e kombinuar (proshutë, kaçkavall, djathë, suxhuk)",
      "pkg.m1.i3":
        "Specialitete nga skara: pljeskavicë, shpatull pule me sos; ramstek me perime të fërguara",
      "pkg.m1.i4": "Lëng frutash në qelq 0,25 l — mollë, pjeshkë, portokall",
      "pkg.m1.i5":
        "Pijet e gazuara në qelq 0,25 l: Coca-Cola, Fanta, Schweppes, Sprite, Red Eagle; ujë i gazuar, ujë natyral",
      "pkg.m1.i6":
        "Pijet alkoolike: Smirnoff, Ballantine’s, Shtok, raki rrushi; verë e bardhë, verë e kuqe (Bodrumi i vjetër – Haxhijaha); birrë e Pejës, Shkupi",
      "pkg.m1.i7": "Torta e nuses: tortë për të gjithë mysafirët",
      "pkg.m1.i8": "Pije pa kufi",

      "pkg.m2.badge": "Më e kërkuara",
      "pkg.m2.tag": "Grand Kosova Menu 2",
      "pkg.m2.btn": "Shiko Menunë",
      "pkg.m2.i1":
        "Sallatë e kombinuar (speca me sos, sallatë të gjelbërta, ullinj) për person",
      "pkg.m2.i2": "Paragjellë e kombinuar (proshutë, kaçkavall, djathë, suxhuk)",
      "pkg.m2.i3":
        "Specialitete nga skara: pljeskavicë, shpatull pule me sos, bombic me kaçkavall; mish viçi me sos kepurdhash dhe perime",
      "pkg.m2.i4": "Lëng frutash të vogëla 0,50 l — mollë, portokall, vishnje, boronicë, pjeshkë",
      "pkg.m2.i5":
        "Pijet e gazuara të vogëla 0,50 l: Coca-Cola, Fanta, Schweppes, Sprite, Red Eagle; ujë i gazuar, ujë natyral",
      "pkg.m2.i6":
        "Pijet alkoolike: Smirnoff, Shtok, raki rrushi; verë e bardhë, verë e kuqe; birrë e Pejës, birrë e Shkupit",
      "pkg.m2.i7": "Torta e nuses: tortë për të gjithë mysafirët",
      "pkg.m2.i8": "Pije pa kufi",

      "pkg.reserve": "Rezervo",

      "pkg.drinks.h": "Extra",
      "pkg.drinks.sub": "Pije, duhan dhe më shumë sipas kërkesës — shfletoni galerinë më poshtë.",
      "pkg.drinks.prev": "Foto e mëparshme",
      "pkg.drinks.next": "Foto tjetër",
      "pkg.drinks.dots": "Zgjidh foto",
      "pkg.drinks.empty":
        'Shto foto në <code>assets/images/drinks/</code> dhe shto rrugët në <code>assets/gallery.json</code> te fusha <code>drinks</code> (edhe në <code>galleryData</code> nëse përdor skedarë lokalë pa server).',
      "pkg.drinks.region": "Galeri: extra",

      "gallery.badge": "Momente dhe Atmosferë",
      "gallery.h": "Galeria e Hotelit",
      "gallery.lead":
        "Zbuloni ambientin, detajet dhe energjinë e eventeve tona në një galeri me stil modern.",
    },
    en: {
      "nav.home": "Home",
      "nav.menu": "Menu",
      "nav.about": "About",
      "nav.gallery": "Gallery",
      "nav.contact": "Contact",
      "lang.aria": "Language",

      "titles.index": "Grand Kosova Restaurant | Wedding Hall in Rogovë e Hasit, Gjakova",
      "titles.about": "Grand Kosova Restaurant | About",
      "titles.contact": "Grand Kosova Restaurant | Contact",
      "titles.package": "Grand Kosova Restaurant | Menu",
      "titles.gallery": "Grand Kosova Restaurant | Gallery",

      "footer.afterYear":
        " Restaurant Grand Kosova, Rogovë e Hasit, Gjakova. All rights reserved.",
      "footer.instagram": "Instagram",
      "footer.whatsapp": "WhatsApp",

      "index.hero.title": "Restaurant Grand Kosova",
      "index.hero.subtitle": "Classic, elegant wedding hall in Rogovë e Hasit, Gjakova",
      "index.hero.cta": "Discover more",
      "index.hero.scroll": "Scroll",

      "index.hl1.t": "Capacity 1000+ guests",
      "index.hl1.p": "Spacious venue for every elegant wedding.",
      "index.hl2.t": "Parking & premium service",
      "index.hl2.p": "Ample parking and trained staff for every need.",
      "index.hl3.t": "Elegant & classic décor",
      "index.hl3.p": "Indoor and outdoor spaces with a luxurious feel.",

      "index.about.h": "About us",
      "index.about.p":
        "Restaurant Grand Kosova offers a stunning setting for weddings, engagements and special events. With classic décor and premium service, we make your dream a reality.",
      "index.about.btn": "Read more",

      "index.packages.h": "Wedding menus",
      "index.pkg1.t": "Menu 1",
      "index.pkg1.p":
        "Grand Kosova Menu 1",
      "index.pkg2.t": "Menu 2",
      "index.pkg2.p":
        "Grand Kosova Menu 2",
      "index.packages.btn": "View menu",
      "index.packages.all": "View all menus",

      "index.gallery.h": "Gallery",
      "index.gallery.btn": "View full gallery",

      "index.testimonials.h": "What couples say about us",
      "index.testimonial1": '"An unforgettable experience! Everything was perfect."',
      "index.testimonial2":
        '"Very attentive staff and luxurious décor – every dream came true."',
      "index.testimonial3": '"I recommend without hesitation – Restaurant Grand Kosova is wonderful."',

      "index.cta.h": "Book a meeting or consultation",
      "index.cta.btn": "Contact us now",

      "about.badge": "About Restaurant Grand Kosova",
      "about.hero.h": "Elegance, tradition and Albanian hospitality",
      "about.hero.sub":
        "Wedding and event hall in Rogovë e Hasit, Gjakova – where every detail is considered with care, from luxurious décor to personalised service for every couple and family.",

      "about.story.h": "Our story",
      "about.story.p1":
        "Restaurant Grand Kosova was created with a clear vision: to offer a high-end setting for weddings and special events while preserving warmth and Albanian tradition. With years of experience hosting weddings, engagements and family banquets, we have built a strong reputation for reliability, elegance and outstanding service.",
      "about.story.p2":
        "Every event is treated like our own celebration – from welcoming guests and the smooth flow of the evening to coordination with musicians, photographers and decorators, down to the smallest details that make the final experience unforgettable.",

      "about.why.h": "Why couples choose us",
      "about.why.intro":
        "We combine professional organisation, rich cuisine and a refined atmosphere to create an evening that exceeds your expectations.",
      "about.why.v1h": "Luxurious & flexible space",
      "about.why.v1p":
        "Our modern hall adapts to large or intimate weddings, with options to personalise décor, lighting and seating to your taste.",
      "about.why.v2h": "Curated cuisine",
      "about.why.v2p":
        "Traditional and modern menus prepared by experienced chefs, focused on authentic flavour, elegant presentation and consistent quality.",
      "about.why.v3h": "Full evening coordination",
      "about.why.v3p":
        "From the couple’s entrance and first dances to the final moments – our team ensures everything flows naturally and stress-free for you.",

      "about.stat.num1": "1000+",
      "about.stat.num2": "Hundreds",
      "about.stat1": "Maximum guest capacity",
      "about.stat2": "Successful weddings & events",

      "about.cta.h": "Ready to plan your evening?",
      "about.cta.p":
        "Contact us to see the hall in person, discuss menus and create a tailored offer for your wedding or event.",
      "about.cta.btn": "Book a visit",

      "contact.h": "Contact us",
      "contact.lead": "For questions, bookings or other information, you can reach us directly!",
      "contact.phone": "Phone / WhatsApp",
      "contact.email": "Email",
      "contact.social": "Social media",
      "contact.location": "Location",

      "pkg.badge": "Menu",
      "pkg.hero.h": "Wedding menus for every vision",
      "pkg.hero.sub":
        "Choose from our carefully designed menus – from classic options to luxurious ones, with add-ons to suit your wishes.",

      "pkg.m1.tag": "Grand Kosova Menu 1",
      "pkg.m1.btn": "View menu",
      "pkg.m1.i1":
        "Mixed salad (peppers with sauce, green salad, olives) per person",
      "pkg.m1.i2": "Mixed appetizer platter (ham, kashkaval, cheese, sujuk)",
      "pkg.m1.i3":
        "Grill specialties: pljeskavica, chicken shoulder with sauce; rump steak with fried vegetables",
      "pkg.m1.i4": "Fruit juices in glass 0.25 l — apple, peach, orange",
      "pkg.m1.i5":
        "Carbonated drinks in glass 0.25 l: Coca-Cola, Fanta, Schweppes, Sprite, Red Eagle; sparkling water, still water",
      "pkg.m1.i6":
        "Alcoholic drinks: Smirnoff, Ballantine’s, Shtok, grape rakia; white wine, red wine (Bodrumi i vjetër – Haxhijaha); Peja beer, Skopsko beer",
      "pkg.m1.i7": "Bride’s cake: cake for all guests",
      "pkg.m1.i8": "Unlimited drinks",

      "pkg.m2.badge": "Most popular",
      "pkg.m2.tag": "Grand Kosova Menu 2",
      "pkg.m2.btn": "View menu",
      "pkg.m2.i1":
        "Mixed salad (peppers with sauce, green salad, olives) per person",
      "pkg.m2.i2": "Mixed appetizer platter (ham, kashkaval, cheese, sujuk)",
      "pkg.m2.i3":
        "Grill specialties: pljeskavica, chicken shoulder with sauce, bombic with kashkaval; veal with mushroom sauce and vegetables",
      "pkg.m2.i4": "Small fruit juices 0.5 l — apple, orange, sour cherry, blueberry, peach",
      "pkg.m2.i5":
        "Small carbonated drinks 0.5 l: Coca-Cola, Fanta, Schweppes, Sprite, Red Eagle; sparkling water, still water",
      "pkg.m2.i6":
        "Alcoholic drinks: Smirnoff, Stock, grape rakia; white wine, red wine; Peja beer, Skopje beer",
      "pkg.m2.i7": "Bride’s cake: cake for all guests",
      "pkg.m2.i8": "Unlimited drinks",

      "pkg.reserve": "Book",

      "pkg.drinks.h": "Extra",
      "pkg.drinks.sub": "Drinks, smokes and more on request — browse the gallery below.",
      "pkg.drinks.prev": "Previous photo",
      "pkg.drinks.next": "Next photo",
      "pkg.drinks.dots": "Choose photo",
      "pkg.drinks.empty":
        'Add photos to <code>assets/images/drinks/</code> and list paths in <code>assets/gallery.json</code> under <code>drinks</code> (and in <code>galleryData</code> if opening files locally without a server).',
      "pkg.drinks.region": "Extra gallery",

      "gallery.badge": "Moments & atmosphere",
      "gallery.h": "Restaurant gallery",
      "gallery.lead":
        "Discover the setting, details and energy of our events in a modern-style gallery.",
    },
  };

  /** Gallery page dynamic strings (used by gallery.js) */
  window.GK_I18N_GALLERY = {
    empty: {
      sq: 'Nuk ka media në galeri. Shto foto në <code>assets/images/gallery/</code> dhe listo rrugët në <code>assets/gallery.json</code> te fusha <code>gallery</code>.',
      en: 'No media in the gallery. Add photos to <code>assets/images/gallery/</code> and list paths in <code>assets/gallery.json</code> under <code>gallery</code>.',
    },
    loadError: {
      sq: "Nuk u ngarkua galeria. Kontrollo <code>assets/gallery.json</code>.",
      en: "Could not load the gallery. Check <code>assets/gallery.json</code>.",
    },
    photo: { sq: "Foto", en: "Photo" },
    video: { sq: "Video", en: "Video" },
  };

  function getLang() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (s === "en" || s === "sq") return s;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (lang !== "en" && lang !== "sq") return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    apply();
    window.dispatchEvent(new CustomEvent("gk-lang-change", { detail: { lang: lang } }));
  }

  function t(key, lang) {
    var L = DICT[lang] || DICT.sq;
    if (L[key] != null) return L[key];
    var fb = DICT.sq[key];
    return fb != null ? fb : key;
  }

  function apply() {
    var lang = getLang();
    document.documentElement.lang = lang === "en" ? "en" : "sq";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var text = t(key, lang);
      if (el.tagName === "TITLE") {
        document.title = text;
      } else {
        el.textContent = text;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key) return;
      el.innerHTML = t(key, lang);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var raw = el.getAttribute("data-i18n-attr");
      if (!raw) return;
      var idx = raw.indexOf(":");
      if (idx === -1) return;
      var attrName = raw.slice(0, idx).trim();
      var i18nKey = raw.slice(idx + 1).trim();
      if (!attrName || !i18nKey) return;
      el.setAttribute(attrName, t(i18nKey, lang));
    });

    document.querySelectorAll(".gk-lang-switch[aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t("lang.aria", lang));
    });

    var footerYear = document.getElementById("footerYear");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    document.querySelectorAll(".gk-lang-btn[data-gk-lang]").forEach(function (btn) {
      var active = btn.getAttribute("data-gk-lang") === lang;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  window.GK_I18N = {
    getLang: getLang,
    setLang: setLang,
    apply: apply,
    t: t,
  };

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".gk-lang-btn[data-gk-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-gk-lang") || "sq");
      });
    });
    apply();
  });
})();
