(function () {
  /* Script per language, mirrored from src/lib/i18n/langs.ts. Duplicated on
     purpose: this file has to run before the bundle, and a 300-byte map is
     cheaper than blocking paint on the app's JavaScript. The pack tests
     check the two lists agree. */
  var SCRIPT = {
    en: "latin",
    hi: "devanagari",
    mr: "devanagari",
    gu: "gujarati",
    ta: "tamil",
    bn: "bengali",
    te: "telugu",
    kn: "kannada",
    ml: "malayalam",
    or: "odia",
    pa: "gurmukhi",
    ur: "arabic",
  };

  function guess() {
    try {
      var tags = (navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language]) || [];
      for (var i = 0; i < tags.length; i++) {
        var base = String(tags[i]).toLowerCase().split(/[-_]/)[0];
        if (SCRIPT[base]) return base;
      }
    } catch (e) {
      /* locked-down browser */
    }
    return "hi";
  }

  try {
    var s = JSON.parse(localStorage.getItem("sajag.settings.v1") || "{}");
    var theme = s.theme || "light";
    var dark =
      theme === "dark" ||
      (theme === "auto" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    var r = document.documentElement;
    r.setAttribute("data-theme", dark ? "dark" : "light");
    r.setAttribute("data-contrast", s.contrast || "normal");
    var lang = SCRIPT[s.lang] ? s.lang : guess();
    r.setAttribute("lang", lang);
    /* Urdu is right to left. Set before paint so the first frame is not
       laid out the wrong way round and then flipped. */
    r.setAttribute("dir", lang === "ur" ? "rtl" : "ltr");
    r.setAttribute("data-script", SCRIPT[lang]);
    var scale = s.textScale || 1;
    if (s.simpleMode && scale < 1.5) scale = 1.5;
    r.style.setProperty("--text-scale", String(scale));
  } catch (e) {
    /* first run, or storage blocked: defaults in the markup stand */
  }
})();
