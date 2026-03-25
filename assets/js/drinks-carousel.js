/**
 * Pije extra — carousel: prev/next, dots, touch swipe.
 * Drinks list: same manifest as the main gallery — assets/gallery.json
 * field "drinks", or embedded #galleryData with { "gallery": [...], "drinks": [...] }.
 */
(function () {
  function normalizePath(p) {
    if (!p || typeof p !== "string") return "";
    return p.trim();
  }

  function drinksFromManifest(data) {
    if (Array.isArray(data)) return [];
    if (data && Array.isArray(data.drinks)) return data.drinks;
    return [];
  }

  function parseEmbeddedGallery() {
    var el = document.getElementById("galleryData");
    if (!el || !el.textContent.trim()) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      return null;
    }
  }

  async function loadImageList() {
    var embedded = parseEmbeddedGallery();
    if (embedded !== null) {
      var fromEmb = drinksFromManifest(embedded);
      if (fromEmb.length) {
        return fromEmb.map(normalizePath).filter(Boolean);
      }
    }
    try {
      var url = new URL("assets/gallery.json", window.location.href);
      var res = await fetch(url.toString(), { cache: "no-cache" });
      if (!res.ok) return [];
      var data = await res.json();
      var list = drinksFromManifest(data);
      return list.map(normalizePath).filter(Boolean);
    } catch (e) {
      return [];
    }
  }

  function init() {
    var wrap = document.querySelector(".drinks-carousel-wrap");
    var img = document.getElementById("drinksCarouselImg");
    var dotsEl = document.getElementById("drinksDots");
    var emptyEl = document.getElementById("drinksEmpty");
    var counterEl = document.getElementById("drinksCounter");
    var prevBtn = document.querySelector(".drinks-prev");
    var nextBtn = document.querySelector(".drinks-next");

    if (!wrap || !img) return;

    var list = [];
    var index = 0;
    var touchStartX = 0;
    var touchEndX = 0;

    function drinksAltPrefix() {
      return "Extra ";
    }

    function show() {
      if (!list.length) return;
      index = ((index % list.length) + list.length) % list.length;
      img.src = list[index];
      img.alt = drinksAltPrefix() + (index + 1);
      if (counterEl) {
        counterEl.textContent = index + 1 + " / " + list.length;
      }
      if (dotsEl) {
        var dots = dotsEl.querySelectorAll(".drinks-dot");
        for (var i = 0; i < dots.length; i++) {
          dots[i].classList.toggle("is-active", i === index);
        }
      }
    }

    function go(delta) {
      if (!list.length) return;
      index += delta;
      if (index < 0) index = list.length - 1;
      if (index >= list.length) index = 0;
      show();
    }

    function buildDots() {
      if (!dotsEl || list.length <= 1) {
        if (dotsEl) dotsEl.innerHTML = "";
        return;
      }
      dotsEl.innerHTML = "";
      for (var i = 0; i < list.length; i++) {
        (function (j) {
          var b = document.createElement("button");
          b.type = "button";
          b.className = "drinks-dot" + (j === 0 ? " is-active" : "");
          b.setAttribute("aria-label", "Foto " + (j + 1));
          b.addEventListener("click", function () {
            index = j;
            show();
          });
          dotsEl.appendChild(b);
        })(i);
      }
    }

    loadImageList().then(function (paths) {
      list = paths;
      if (!list.length) {
        wrap.style.display = "none";
        if (emptyEl) emptyEl.classList.remove("d-none");
        return;
      }
      if (emptyEl) emptyEl.classList.add("d-none");
      wrap.style.display = "";
      buildDots();
      show();
    });

    window.addEventListener("gk-lang-change", function () {
      if (list.length) show();
    });

    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

    wrap.addEventListener(
      "keydown",
      function (e) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(-1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(1);
        }
      },
      true
    );

    var viewport = wrap.querySelector(".drinks-carousel-viewport");
    if (viewport) {
      viewport.addEventListener(
        "touchstart",
        function (e) {
          touchStartX = e.changedTouches[0].screenX;
        },
        { passive: true }
      );
      viewport.addEventListener(
        "touchend",
        function (e) {
          touchEndX = e.changedTouches[0].screenX;
          var dx = touchEndX - touchStartX;
          if (Math.abs(dx) < 50) return;
          if (dx < 0) go(1);
          else go(-1);
        },
        { passive: true }
      );
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
