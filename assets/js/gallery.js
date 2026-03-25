function inferType(src) {
  const ext = (src.split(".").pop() || "").toLowerCase();
  if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";
  return "image";
}

function gkGalleryUiLang() {
  return document.documentElement.lang === "en" ? "en" : "sq";
}

function gkGalleryBadgeLabel(type) {
  const g = window.GK_I18N_GALLERY;
  const lang = gkGalleryUiLang();
  if (!g) return type === "video" ? "Video" : "Foto";
  const part = type === "video" ? g.video : g.photo;
  return part[lang] || part.sq;
}

function updateGalleryMediaBadges() {
  const g = window.GK_I18N_GALLERY;
  if (!g) return;
  const lang = gkGalleryUiLang();
  document.querySelectorAll(".gallery-card .media-badge").forEach((badge) => {
    const card = badge.closest(".gallery-card");
    if (!card) return;
    const isVideo = card.dataset.type === "video";
    const part = isVideo ? g.video : g.photo;
    badge.textContent = part[lang] || part.sq;
  });
}

function slugFromTitle(title) {
  return (
    String(title)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "seksion"
  );
}

/** @typedef {{ src: string, type: string }} MediaItem */
/** @typedef {{ id: string, title: string, items: MediaItem[] }} GallerySection */

/**
 * @param {unknown} data
 * @returns {GallerySection[]}
 */
function normalizeGallerySections(data) {
  if (data && typeof data === "object" && Array.isArray(data.sections) && data.sections.length > 0) {
    return data.sections
      .map((sec) => {
        const title = sec.title != null ? String(sec.title) : "Seksion";
        const id = sec.id != null ? String(sec.id) : slugFromTitle(title);
        const items = (sec.items || []).map((src) => ({
          src: String(src),
          type: inferType(String(src)),
        }));
        return { id, title, items };
      })
      .filter((s) => s.items.length > 0);
  }

  /** @type {string[]} */
  let paths = [];
  if (Array.isArray(data)) paths = data;
  else if (data && typeof data === "object" && Array.isArray(data.gallery)) paths = data.gallery;

  if (paths.length === 0) return [];

  const items = paths.map((src) => ({
    src: String(src),
    type: inferType(String(src)),
  }));
  return [{ id: "galeri", title: "Galeri", items }];
}

async function loadRawManifest() {
  const embedded = document.getElementById("galleryData");
  if (embedded && embedded.textContent) {
    return JSON.parse(embedded.textContent);
  }

  const manifestUrl = new URL("assets/gallery.json", window.location.href).toString();
  const res = await fetch(manifestUrl, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load gallery.json: ${res.status}`);
  return res.json();
}

/**
 * @param {MediaItem} item
 * @param {number} idx
 * @returns {HTMLDivElement}
 */
function createGalleryCard(item, idx) {
  const card = document.createElement("div");
  card.className = "gallery-card";
  card.dataset.type = item.type;
  card.dataset.index = String(idx);

  if (item.type === "video") {
    const v = document.createElement("video");
    v.src = item.src;
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.autoplay = false;
    v.preload = "metadata";
    card.appendChild(v);
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.loading = "lazy";
    img.alt = "";
    card.appendChild(img);
  }

  const badge = document.createElement("span");
  badge.className = "media-badge";
  badge.textContent = gkGalleryBadgeLabel(item.type);
  card.appendChild(badge);

  return card;
}

/**
 * Një rrjet i vetëm pa tituj seksionesh (lista `gallery` në manifest).
 * @param {HTMLElement} container
 * @param {MediaItem[]} items
 */
function renderFlatGrid(container, items) {
  container.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "gallery-grid";

  items.forEach((item, idx) => {
    grid.appendChild(createGalleryCard(item, idx));
  });

  container.appendChild(grid);
}

/**
 * @param {unknown} data
 */
function useFlatGalleryLayout(data) {
  if (!data || typeof data !== "object") return false;
  if (Array.isArray(data.sections) && data.sections.length > 0) return false;
  return Array.isArray(data.gallery) && data.gallery.length > 0;
}

/**
 * @param {HTMLElement} container
 * @param {GallerySection[]} sections
 */
function renderSections(container, sections) {
  container.innerHTML = "";
  let globalIndex = 0;

  sections.forEach((section) => {
    const album = document.createElement("section");
    album.className = "gallery-album";
    album.setAttribute("aria-labelledby", `gallery-heading-${section.id}`);

    const heading = document.createElement("h2");
    heading.className = "gallery-section-title";
    heading.id = `gallery-heading-${section.id}`;
    heading.textContent = section.title;

    const grid = document.createElement("div");
    grid.className = "gallery-grid";

    section.items.forEach((item) => {
      const idx = globalIndex++;
      grid.appendChild(createGalleryCard(item, idx));
    });

    album.appendChild(heading);
    album.appendChild(grid);
    container.appendChild(album);
  });
}

function optimizeGalleryVideos() {
  const videos = Array.from(document.querySelectorAll(".gallery-card video"));
  if (videos.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    videos.forEach((video) => {
      video.play().catch(() => {});
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.2, rootMargin: "150px 0px" },
  );

  videos.forEach((video) => observer.observe(video));
}

/** @param {MediaItem[]} items */
function initLightbox(items) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxVideo = document.getElementById("lightbox-video");
  const nextBtn = document.querySelector("#lightbox .next");
  const prevBtn = document.querySelector("#lightbox .prev");
  const closeBtn = document.querySelector("#lightbox .close");

  if (!lightbox || !lightboxImg || !lightboxVideo || !nextBtn || !prevBtn || !closeBtn) return;

  let current = 0;
  let zoom = 1;
  /** @type {number | undefined} */
  let slideInterval;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let dragX = 0;
  let dragY = 0;

  function startSlideshow() {
    slideInterval = window.setInterval(nextImage, 4000);
  }

  function stopSlideshow() {
    window.clearInterval(slideInterval);
  }

  function showMedia(index) {
    const item = items[index];
    if (!item) return;

    current = index;
    zoom = 1;
    dragX = 0;
    dragY = 0;

    if (item.type === "video") {
      lightboxImg.style.display = "none";
      lightboxImg.src = "";
      lightboxVideo.style.display = "block";
      lightboxVideo.src = item.src;
      lightboxVideo.play().catch(() => {});
    } else {
      lightboxVideo.pause();
      lightboxVideo.src = "";
      lightboxVideo.style.display = "none";
      lightboxImg.style.display = "block";
      lightboxImg.src = item.src;
      lightboxImg.style.transform = "scale(1)";
    }
  }

  function openLightbox(index) {
    lightbox.style.display = "flex";
    showMedia(index);
    startSlideshow();
  }

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxVideo.pause();
    lightboxVideo.src = "";
    stopSlideshow();
    zoom = 1;
    dragX = 0;
    dragY = 0;
    lightboxImg.style.transform = "scale(1)";
  }

  function nextImage() {
    const next = (current + 1) % items.length;
    showMedia(next);
  }

  function prevImage() {
    const prev = (current - 1 + items.length) % items.length;
    showMedia(prev);
  }

  document.addEventListener("click", (e) => {
    const card = e.target instanceof Element ? e.target.closest(".gallery-card") : null;
    if (!card) return;
    const index = parseInt(card.dataset.index || "0", 10);
    openLightbox(Number.isFinite(index) ? index : 0);
  });

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display !== "flex") return;
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  });

  lightboxImg.addEventListener("wheel", (e) => {
    if (lightbox.style.display !== "flex") return;
    e.preventDefault();
    zoom += e.deltaY * -0.001;
    zoom = Math.min(Math.max(0.5, zoom), 4);
    lightboxImg.style.transform = `scale(${zoom}) translate(${dragX}px,${dragY}px)`;
  });

  lightboxImg.addEventListener("mousedown", (e) => {
    if (lightbox.style.display !== "flex") return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    lightboxImg.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    lightboxImg.style.cursor = "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    dragX += (e.clientX - startX) / zoom;
    dragY += (e.clientY - startY) / zoom;
    startX = e.clientX;
    startY = e.clientY;
    lightboxImg.style.transform = `scale(${zoom}) translate(${dragX}px,${dragY}px)`;
  });

  let touchStart = 0;
  lightbox.addEventListener("touchstart", (e) => {
    touchStart = e.touches[0]?.clientX || 0;
  });
  lightbox.addEventListener("touchend", (e) => {
    const touchEnd = e.changedTouches[0]?.clientX || 0;
    if (touchEnd - touchStart > 60) prevImage();
    if (touchStart - touchEnd > 60) nextImage();
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const root = document.querySelector(".gallery-sections");
  if (!root) return;

  try {
    const data = await loadRawManifest();
    const sections = normalizeGallerySections(data);
    const flatItems = sections.flatMap((s) => s.items);

    if (flatItems.length === 0) {
      const g = window.GK_I18N_GALLERY;
      const lang = gkGalleryUiLang();
      const msg = g?.empty?.[lang] || g?.empty?.sq || "";
      root.innerHTML = `<div class="text-center" style="padding:40px;">${msg}</div>`;
      return;
    }

    if (useFlatGalleryLayout(data)) {
      renderFlatGrid(root, flatItems);
    } else {
      renderSections(root, sections);
    }
    optimizeGalleryVideos();
    initLightbox(flatItems);
  } catch (e) {
    console.error(e);
    const g = window.GK_I18N_GALLERY;
    const lang = gkGalleryUiLang();
    const msg = g?.loadError?.[lang] || g?.loadError?.sq || "";
    root.innerHTML = `<div class="text-center" style="padding:40px;">${msg}</div>`;
  }

  window.addEventListener("gk-lang-change", updateGalleryMediaBadges);
});
