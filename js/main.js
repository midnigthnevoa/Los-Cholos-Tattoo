/* =========================================================
   BODY INK STUDIO — Interatividade compartilhada
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  injectShell();
  initHeader();
  initDrawer();
  initYear();
  initWaLinks();

  if (document.getElementById("projects-slider")) renderProjects();
  if (document.getElementById("catalog-root")) renderCatalog();

  initReveal();
  initSliders();
  initCounters();
});

const ICONS = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>',
  chevL: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
  chevR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  whats: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.27-1.38a9.87 9.87 0 0 0 4.72 1.2c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.24 8.24 0 1 1 6.98 3.87zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z"/></svg>'
};

/* ---------- shell (header / drawer / footer / noise) ---------- */
function injectShell() {
  var page = document.body.dataset.page || "home";
  var navMap = {
    home: "index.html",
    about: "sobre.html",
    styles: "estilos.html",
    care: "cuidados.html",
    contact: "agendamento.html"
  };
  var labels = ["Início", "Sobre", "Estilos", "Cuidados", "Agendamento"];

  var navLinks = Object.keys(navMap)
    .map(function (key, i) {
      var act = key === page ? " active" : "";
      return '<a href="' + navMap[key] + '" class="nav-link' + act + '" data-nav="' + key + '">' + labels[i] + "</a>";
    })
    .join("");

  var drawerLinks = Object.keys(navMap)
    .map(function (key, i) {
      var act = key === page ? " active" : "";
      var num = String(i + 1).padStart(2, "0");
      return '<a href="' + navMap[key] + '" class="' + act + '"><small>' + num + "</small>" + labels[i] + "</a>";
    })
    .join("");

    var header =
    '<header class="site-header"><div class="container header-inner">' +
    '<a href="index.html" class="logo"><span class="logo-name">Los Cholos<span class="dot">.</span></span><span class="logo-tag">BLACKWORK // BH</span></a>' +
    '<nav class="nav-desktop">' + navLinks + "</nav>" +
    '<div class="header-actions">' +
    '<a class="icon-link" href="' + SITE.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICONS.instagram + "</a>" +
    '<a href="agendamento.html" class="btn btn-sm btn-outline">Booking</a>' +
    '<button class="burger" id="burger" aria-label="Abrir menu"><span></span><span></span><span></span></button>' +
    "</div></div></header>";

  var drawer =
    '<div class="drawer" id="drawer"><nav class="drawer-nav">' + drawerLinks + "</nav>" +
    '<div class="drawer-social"><span class="label">SOCIAL LINKS</span>' +
    '<a href="' + SITE.instagram + '" target="_blank" rel="noopener">Instagram — ' + SITE.instagramHandle + "</a>" +
    '<a href="mailto:' + SITE.email + '">E-mail — ' + SITE.email + "</a>" +
    "</div></div>";

  var footer =
    '<footer class="site-footer"><span class="watermark wm-footer">LOS CHOLOS</span><div class="container">' +
    '<div class="footer-top"><p class="footer-tag">Blackwork, dark ornamental e design autoral. <span class="grad">A cultura latina</span> em composições atemporais na pele.</p>' +
    '<div class="footer-map"><iframe src="https://maps.google.com/maps?q=-19.870195,-43.992950&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="200" style="border:0;filter:grayscale(0.8) brightness(0.9) contrast(1.1);width:100%;max-width:100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Los Cholos Tattoo — Localização"></iframe></div>' +
    '<div class="footer-grid">' +
    '<div class="footer-col"><h4>Explore</h4><ul>' +
    '<li><a href="sobre.html">Sobre</a></li>' +
    '<li><a href="estilos.html">Estilos</a></li>' +
    '<li><a href="cuidados.html">Cuidados</a></li>' +
    '<li><a href="agendamento.html">Agendamento</a></li>' +
    "</ul></div>" +
    '<div class="footer-col"><h4>Localização</h4><p>' + SITE.addressLine1 + "<br>" + SITE.addressLine2 + "<br>" + SITE.addressLine3 +
    '<br><a href="' + SITE.whatsappBase + '">' + SITE.phoneDisplay + "</a>" +
    '<br><a href="mailto:' + SITE.email + '">' + SITE.email + "</a></p></div>" +
    '<div class="footer-col"><h4>Conectar</h4><ul>' +
    '<li><a href="' + SITE.instagram + '" target="_blank" rel="noopener">Instagram — ' + SITE.instagramHandle + "</a></li>" +
    '<li><a href="mailto:' + SITE.email + '">' + SITE.email + "</a></li>" +
    "</ul></div>" +
    "</div>" +
    '<div class="footer-bottom"><p>© <span id="year"></span> ' + SITE.copyright + ".</p>" +
    '<p class="mono-note">Atendimento estritamente sob agendamento.</p>' +
    '<div class="links"><a href="#">Privacidade</a><a href="#">Termos_de_Serviço</a></div>' +
    '<span class="footer-status">Servidor_BH_Ativo</span></div>' +
    "</div></footer>";

  var noise = '<div class="noise" aria-hidden="true"></div>';

  document.body.insertAdjacentHTML("afterbegin", header + drawer);
  document.body.insertAdjacentHTML("beforeend", noise + footer);
}

/* ---------- header scroll state ---------- */
function initHeader() {
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 24);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- mobile drawer ---------- */
function initDrawer() {
  var burger = document.getElementById("burger");
  var drawer = document.getElementById("drawer");
  if (!burger || !drawer) return;

  burger.addEventListener("click", function () {
    var open = drawer.classList.toggle("open");
    burger.classList.toggle("open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  drawer.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      drawer.classList.remove("open");
      burger.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  var els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach(function (el) { io.observe(el); });
}

/* ---------- sliders ---------- */
function initSliders() {
  document.querySelectorAll("[data-slider]").forEach(function (root) {
    var viewport = root.querySelector("[data-slider-viewport]");
    var prev = root.querySelector("[data-slider-prev]");
    var next = root.querySelector("[data-slider-next]");
    var cur = root.querySelector("[data-slider-current]");
    if (!viewport) return;

    var slides = function () { return viewport.children; };

    var gap = function () {
      var g = window.getComputedStyle(viewport).gap;
      return (parseFloat(g) || 0) + 0;
    };

    var update = function () {
      var s = slides();
      if (!s.length) return;
      var i = Math.round(viewport.scrollLeft / (s[0].offsetWidth + gap()));
      i = Math.max(0, Math.min(i, s.length - 1));
      if (cur) cur.textContent = String(i + 1).padStart(2, "0");
      if (prev) prev.disabled = i <= 0;
      if (next) next.disabled = i >= s.length - 1;
    };

    var go = function (dir) {
      var s = slides();
      var i = Math.round(viewport.scrollLeft / (s[0].offsetWidth + gap()));
      i = Math.max(0, Math.min(i + dir, s.length - 1));
      viewport.scrollTo({ left: i * (s[0].offsetWidth + gap()), behavior: "smooth" });
    };

    viewport.addEventListener("scroll", function () {
      window.requestAnimationFrame(update);
    }, { passive: true });
    if (prev) prev.addEventListener("click", function () { go(-1); });
    if (next) next.addEventListener("click", function () { go(1); });
    window.addEventListener("resize", update);
    update();
  });
}

/* ---------- animated counters ---------- */
function initCounters() {
  var els = document.querySelectorAll("[data-count]");
  if (!els.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || "";
      var start = 0;
      var dur = 1600;
      var t0 = null;
      function tick(t) {
        if (!t0) t0 = t;
        var p = Math.min((t - t0) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(start + (target - start) * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  els.forEach(function (el) { io.observe(el); });
}

/* ---------- current year ---------- */
function initYear() {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

/* ---------- centraliza links de WhatsApp (data-wa) ---------- */
function initWaLinks() {
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = wa(a.getAttribute("data-wa"));
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });
}

/* ---------- home: projects slider ---------- */
function renderProjects() {
  var root = document.getElementById("projects-slider");
  var viewport = root.querySelector("[data-slider-viewport]");
  var html = PROJECTS.map(function (p, i) {
    return (
      '<article class="slide reveal">' +
      '<div class="frame overlay-slide project-card" style="--rd:' + i * 0.08 + 's">' +
      '<span class="project-num">' + p.id + "</span>" +
      '<div class="project-media"><img src="' + p.image + '" alt="' + p.title + '" loading="lazy"></div>' +
      '<div class="project-label">Projeto ' + p.id + " // " + p.label + "</div>" +
      "<h3>" + p.title + "</h3>" +
      "<p>" + p.desc + "</p>" +
      '<div class="tags">' + p.features.map(function (f) { return '<span class="tag">' + f + "</span>"; }).join("") + "</div>" +
      "</div></article>"
    );
  }).join("");
  viewport.insertAdjacentHTML("beforeend", html);
}

/* ---------- estilos: catalog ---------- */
function renderCatalog() {
  var root = document.getElementById("catalog-root");
  if (!root) return;

  var total = CATALOG.length;
  var html = CATALOG.map(function (cat, i) {
    var n = String(i + 1).padStart(2, "0");
    var cta = wa("Olá Gustavo, vi seu catálogo de " + cat.title + " e gostaria de um orçamento!");
    var title = cat.first + (cat.rest ? ' <span class="grad">' + cat.rest + "</span>" : "");
    return (
      '<section class="section" id="' + cat.slug + '">' +
      '<div class="container">' +
      '<div class="section-head reveal">' +
      '<span class="eyebrow">Estilo ' + n + " de " + total + "</span>" +
      '<h1 class="h-page" style="margin-top:1.2rem;margin-bottom:1.5rem">' + title + "</h1>" +
      '<p class="lead" style="color:var(--stone-400);max-width:40rem;font-size:1.02rem;margin-bottom:1.5rem">' + cat.desc + "</p>" +
      '<div class="tags" style="margin-bottom:2rem">' + cat.features.map(function (f) { return '<span class="tag">' + f + "</span>"; }).join("") + "</div>" +
      '<a class="btn" href="' + cta + '" target="_blank" rel="noopener">Orçamento para esta categoria ' + ICONS.arrow + "</a>" +
      "</div>" +
      '<div class="gallery-grid">' +
      cat.images.map(function (src, j) {
        return (
          '<div class="frame gallery-item reveal" style="--rd:' + (j * 0.05) + 's">' +
          '<img src="' + src + '" alt="' + cat.title + " — referência " + (j + 1) + '" loading="lazy">' +
          "</div>"
        );
      }).join("") +
      "</div>" +
      "</div></section>"
    );
  }).join("");

  var skills = SKILLS.map(function (s, i) {
    var num = String(i + 5).padStart(2, "0");
    var link = wa("Olá Gustavo, gostaria de solicitar um orçamento para: " + s);
    return '<a class="skill-tag reveal" style="--rd:' + (i * 0.06) + 's" href="' + link + '" target="_blank" rel="noopener"><small>' + num + "_</small>" + s + "</a>";
  }).join("");

  var skillsHtml =
    '<section class="section" style="background:var(--bg-2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)">' +
    '<div class="container">' +
    '<div class="section-head reveal"><span class="eyebrow">Outras Especialidades</span>' +
    '<h2 class="h-section" style="margin-top:1.2rem">Outras Habilidades<br><span class="grad">Técnicas</span></h2></div>' +
    '<div class="skill-tags">' + skills + "</div>" +
    '<p class="mono-note" style="margin-top:1.5rem">Nota: Portfólio visual em processamento. Clique acima para agendar estas especialidades.</p>' +
    "</div></section>";

  root.insertAdjacentHTML("beforeend", html + skillsHtml);
}

/* =========================================================
   EFFECTS & INTERACTIONS
   ========================================================= */

/* ---------- CUSTOM CURSOR ---------- */
(function initCursor() {
  if (window.innerWidth < 1024) return;
  
  var cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.innerHTML = '<span class="cursor-text"></span>';
  document.body.appendChild(cursor);
  
  var cursorText = cursor.querySelector(".cursor-text");
  var mouseX = 0, mouseY = 0;
  var cursorX = 0, cursorY = 0;
  
  document.addEventListener("mousemove", function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  
  // Hover states
  var interactives = "a, button, .btn, .slider-btn, .burger, [data-wa]";
  document.addEventListener("mouseover", function(e) {
    var target = e.target.closest(interactives);
    if (target) {
      cursor.classList.add("pointer");
      cursor.classList.remove("active");
    }
  });
  document.addEventListener("mouseout", function(e) {
    var target = e.target.closest(interactives);
    if (target) {
      cursor.classList.remove("pointer");
    }
  });
  
  // Click effect
  document.addEventListener("mousedown", function() {
    cursor.classList.add("active");
  });
  document.addEventListener("mouseup", function() {
    cursor.classList.remove("active");
  });
  
  // Hide on leave
  document.addEventListener("mouseleave", function() {
    cursor.classList.add("hidden");
  });
  document.addEventListener("mouseenter", function() {
    cursor.classList.remove("hidden");
  });
})();

/* ---------- MAGNETIC BUTTONS ---------- */
(function initMagnetic() {
  var magnets = document.querySelectorAll(".magnetic");
  magnets.forEach(function(magnet) {
    var inner = magnet.querySelector(".magnetic-inner") || magnet;
    
    function onMove(cx, cy) {
      var rect = magnet.getBoundingClientRect();
      var x = cx - rect.left - rect.width / 2;
      var y = cy - rect.top - rect.height / 2;
      inner.style.transform = "translate(" + (x * 0.3) + "px, " + (y * 0.3) + "px)";
    }
    
    function onEnd() {
      inner.style.transform = "translate(0, 0)";
    }
    
    magnet.addEventListener("mousemove", function(e) { onMove(e.clientX, e.clientY); });
    magnet.addEventListener("mouseleave", onEnd);
    magnet.addEventListener("touchmove", function(e) { onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    magnet.addEventListener("touchend", onEnd);
  });
})();

/* ---------- HOVER LIFT ON TOUCH ---------- */
(function initHoverLift() {
  document.querySelectorAll(".hover-lift").forEach(function(el) {
    el.addEventListener("touchstart", function() {
      el.classList.add("is-touch-hover");
    }, { passive: true });
    el.addEventListener("touchend", function() {
      el.classList.remove("is-touch-hover");
    });
    el.addEventListener("touchcancel", function() {
      el.classList.remove("is-touch-hover");
    });
  });
})();

/* ---------- HOVER GLOW EFFECT ---------- */
(function initGlow() {
  document.querySelectorAll(".hover-glow").forEach(function(el) {
    function onMove(cx, cy) {
      var rect = el.getBoundingClientRect();
      var x = ((cx - rect.left) / rect.width) * 100;
      var y = ((cy - rect.top) / rect.height) * 100;
      el.style.setProperty("--mouse-x", x + "%");
      el.style.setProperty("--mouse-y", y + "%");
    }
    
    el.addEventListener("mousemove", function(e) { onMove(e.clientX, e.clientY); });
    el.addEventListener("touchmove", function(e) { onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
  });
})();

/* ---------- TILT CARDS ---------- */
(function initTilt() {
  document.querySelectorAll(".tilt-card").forEach(function(card) {
    var inner = card.querySelector(".tilt-card-inner") || card;
    
    function onMove(cx, cy) {
      var rect = card.getBoundingClientRect();
      var x = (cx - rect.left) / rect.width - 0.5;
      var y = (cy - rect.top) / rect.height - 0.5;
      inner.style.transform = "rotateY(" + (x * 10) + "deg) rotateX(" + (-y * 10) + "deg)";
    }
    
    function onEnd() {
      inner.style.transform = "rotateY(0) rotateX(0)";
    }
    
    card.addEventListener("mousemove", function(e) { onMove(e.clientX, e.clientY); });
    card.addEventListener("mouseleave", onEnd);
    card.addEventListener("touchmove", function(e) { onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    card.addEventListener("touchend", onEnd);
  });
})();

/* ---------- SMOOTH ANCHOR SCROLL ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener("click", function(e) {
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ---------- STAGGER ANIMATION ---------- */
function initStagger() {
  var staggerEls = document.querySelectorAll(".stagger");
  if (!("IntersectionObserver" in window)) {
    staggerEls.forEach(function(el) { el.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  staggerEls.forEach(function(el) { io.observe(el); });
}
initStagger();

/* ---------- PARALLAX ON SCROLL ---------- */
(function initParallax() {
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  if (!parallaxEls.length) return;
  
  function onScroll() {
    var scrollY = window.scrollY;
    parallaxEls.forEach(function(el) {
      var speed = parseFloat(el.dataset.parallax) || 0.1;
      var rect = el.getBoundingClientRect();
      var offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
      el.style.transform = "translateY(" + (-offset) + "px)";
    });
  }
  
  window.addEventListener("scroll", function() {
    requestAnimationFrame(onScroll);
  }, { passive: true });
})();

/* ---------- TEXT COUNTER ANIMATION ---------- */
function animateValue(el, start, end, suffix, duration) {
  var startTimestamp = null;
  var step = function(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    var progress = Math.min((timestamp - startTimestamp) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(start + (end - start) * eased) + (suffix || "");
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCountUp() {
  var countEls = document.querySelectorAll("[data-count]");
  if (!countEls.length) return;
  
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var target = parseInt(el.dataset.count, 10);
      var suffix = el.dataset.suffix || "";
      animateValue(el, 0, target, suffix, 1800);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  
  countEls.forEach(function(el) { io.observe(el); });
}
initCountUp();

/* ---------- CURSOR TEXT ON CARDS ---------- */
(function initCursorText() {
  if (window.innerWidth < 1024) return;
  
  var cursorText = document.querySelector(".cursor-text");
  if (!cursorText) return;
  
  document.querySelectorAll("[data-cursor]").forEach(function(el) {
    el.addEventListener("mouseenter", function() {
      cursorText.textContent = el.dataset.cursor;
    });
    el.addEventListener("mouseleave", function() {
      cursorText.textContent = "";
    });
  });
})();
