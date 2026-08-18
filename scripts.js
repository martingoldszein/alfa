const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

// ── MODALES SISTEMA ALFA® ─────────────────────────────
var saContent = {
  innovacion: {
    eyebrow: "Innovación",
    title: "Evolución Adaptativa",
    sub: "Metodologías Ágiles · Procesos vivos",
    text: "<p>Integramos marcos de trabajo ágiles —Scrum, Lean, Design Thinking— como procesos vivos que se adaptan a la cultura y ritmo de tu organización.</p><p>La innovación no es un evento sino la consecuencia natural de un sistema ordenado y consciente.</p>",
    lista_label: "Herramientas",
    lista: [
      "Scrum · Kanban",
      "Lean Startup",
      "Design Thinking",
      "OKRs y métricas ágiles",
    ],
    info_label: "El juego en esta disciplina",
    info: "En la Ludoteca prototipamos jugando: el juego baja el miedo al error y acelera ideas que en una sala de reuniones no aparecerían.",
    integra: "Integra con La Tarea",
  },
  investigacion: {
    eyebrow: "Investigación",
    title: "Inteligencia de Datos",
    sub: "IA aplicada · Insights estratégicos",
    text: "<p>Convertimos la complejidad del mercado en insights claros, decisiones concretas y resultados medibles, combinando rigor metodológico con IA aplicada al análisis.</p><p>El dato valida la intuición y le da sustento a la decisión estratégica.</p>",
    lista_label: "Metodologías",
    lista: [
      "Investigación cuantitativa",
      "Investigación cualitativa",
      "Análisis de datos con IA",
      "Inteligencia competitiva",
    ],
    info_label: "Certificación",
    info: "Método certificado por ESOMAR · ISPOR · ICC. Más de 10.000 horas de consultoría en inteligencia de datos.",
    integra: "Integra con La Tarea",
  },
  coaching: {
    eyebrow: "Coaching",
    title: "Biología del Liderazgo",
    sub: "Consciencia · Neurociencia · Presencia",
    text: "<p>Activamos la coherencia entre cuerpo, emoción y pensamiento para que el líder opere desde su máxima capacidad.</p><p>Facilitamos procesos de acompañamiento enfocados en el desarrollo de liderazgo consciente y la efectividad de equipos.</p>",
    lista_label: "Enfoques",
    lista: [
      "Coaching ejecutivo de negocios y liderazgo",
      "Brain based coaching o coaching basado en neurosciencias",
    ],
    info_label: "El juego en esta disciplina",
    info: "Los juegos de rol y simulaciones activan estados de presencia que el coaching verbal solo toca en superficie.",
    integra: "Integra con El Ser",
  },
  sistemica: {
    eyebrow: "Sistémica",
    title: "Geometría de Vínculos",
    sub: "Constelaciones · Orden organizacional",
    text: "<p>Ordenamos las jerarquías invisibles trabajando desde la perspectiva sistémica, aplicada a roles, liderazgo y vínculos organizacionales.</p><p>Las organizaciones son redes de relaciones antes que estructuras. Mapeamos los vínculos e identificamos los nodos de influencia.</p>",
    lista_label: "Aplicaciones",
    lista: [
      "Constelaciones organizacionales",
      "Mapeo de vínculos",
      "Roles y jerarquías",
      "Dinámicas de equipo",
    ],
    info_label: "El juego en esta disciplina",
    info: "Las constelaciones lúdicas revelan dinámicas relacionales invisibles que el organigrama nunca mostraría.",
    integra: "Integra con Los Vínculos",
  },
  insight: {
    eyebrow: "Insight · Centro",
    title: "Frecuencia Alfa",
    sub: "8–12 Hz · El núcleo que integra todo",
    text: "<p>El insight es el momento en que el dato y la intuición colapsan en comprensión. Es la frecuencia alfa del sistema: el estado de máxima coherencia entre el análisis y la sabiduría orgánica.</p><p>Inspirados en la frecuencia alfa del cerebro humano —el estado de calma alerta, creatividad y aprendizaje profundo— diseñamos organizaciones que operan en ese estado de forma sostenida.</p>",
    lista_label: "El sistema completo",
    lista: [
      "Innovación · Evolución adaptativa",
      "Investigación · Inteligencia de datos",
      "Coaching · Biología del liderazgo",
      "Sistémica · Geometría de vínculos",
    ],
    info_label: "Frecuencia Alfa",
    info: "Estado de calma alerta entre 8 y 12 Hz. El cerebro en frecuencia alfa procesa, conecta y crea con máxima eficiencia.",
    integra: "Conocé los Programas Alfa",
  },
};

function renderModal(key) {
  var d = saContent[key];
  if (!d) return;
  var lista = d.lista
    .map(function (i) {
      return "<li>" + i + "</li>";
    })
    .join("");
  // Header fijo
  document.getElementById("saHeader").innerHTML =
    '<div class="sa-modal-eyebrow">' +
    d.eyebrow +
    "</div>" +
    '<h2 class="sa-modal-title">' +
    d.title +
    "</h2>" +
    '<p class="sa-modal-sub">' +
    d.sub +
    "</p>";

  // Cuerpo scrolleable
  document.getElementById("saScroll").innerHTML =
    '<div class="sa-modal-content">' +
    '<div class="sa-modal-text">' +
    d.text +
    "<h4>" +
    d.lista_label +
    "</h4>" +
    "<ul>" +
    lista +
    "</ul>" +
    '<a href="#contacto" class="sa-modal-cta" id="saModalCta">Conversemos →</a>' +
    "</div>" +
    '<div class="sa-modal-sidebar">' +
    '<div class="sa-modal-info">' +
    '<div class="sa-modal-info-label">' +
    d.info_label +
    "</div>" +
    '<div class="sa-modal-info-val">' +
    d.info +
    "</div>" +
    "</div>" +
    '<div class="sa-modal-info sa-modal-info--light">' +
    '<div class="sa-modal-info-label">Integración sistémica</div>' +
    '<div class="sa-modal-info-val">' +
    d.integra +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  // Reset scroll al abrir
  document.getElementById("saScroll").scrollTop = 0;
}

function openModal(key) {
  renderModal(key);
  document.getElementById("saOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
  // Fix Bridge/scroll engines: bloquear scroll de fondo
  document.addEventListener("wheel", blockScroll, {
    passive: false,
    capture: true,
  });
  document.addEventListener("touchmove", blockScroll, {
    passive: false,
    capture: true,
  });
}

function closeModal() {
  document.getElementById("saOverlay").classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("wheel", blockScroll, { capture: true });
  document.removeEventListener("touchmove", blockScroll, {
    capture: true,
  });
}

function blockScroll(e) {
  var body = document.getElementById("saScroll");
  if (body && body.contains(e.target)) return; // permitir scroll dentro del modal
  e.preventDefault();
  e.stopPropagation();
}

// Click en hotspots
document.querySelectorAll(".sa-point").forEach(function (btn) {
  btn.addEventListener("click", function () {
    openModal(btn.dataset.modal);
  });
});

// Cerrar con botón ×
document.getElementById("saClose").addEventListener("click", closeModal);

// Cerrar clickando el overlay (fuera del modal)
document
  .getElementById("saOverlay")
  .addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

// Cerrar con Escape
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// CTA dentro del modal: cerrar y scrollear a contacto
document
  .getElementById("saOverlay")
  .addEventListener("click", function (e) {
    if (e.target.id === "saModalCta") {
      e.preventDefault();
      closeModal();
      setTimeout(function () {
        var t = document.getElementById("contacto");
        if (t) t.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  });

// ── Nav shadow on scroll ──────────────────────────────
window.addEventListener("scroll", () => {
  nav.style.boxShadow =
    window.scrollY > 60 ? "0 2px 16px rgba(0,0,0,.08)" : "none";
});

// ── Hamburger toggle ──────────────────────────────────
hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

// ── Cerrar menú mobile al hacer click fuera ───────────
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target)) {
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  }
});

// ── Función para marcar activo en ambos menús ─────────
function setActive(href) {
  // Desktop
  document.querySelectorAll(".nav__links a").forEach((l) => {
    l.classList.toggle("active", l.getAttribute("href") === href);
  });
  // Mobile
  document
    .querySelectorAll(".nav__mobile a:not(.nav__mobile__lang a)")
    .forEach((l) => {
      l.classList.toggle("active", l.getAttribute("href") === href);
    });
}

// ── Click en links DESKTOP ────────────────────────────
document.querySelectorAll(".nav__links a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");
    setActive(href);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ── Click en links MOBILE ─────────────────────────────
document
  .querySelectorAll(".nav__mobile li:not(:last-child) a")
  .forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      setActive(href);
      // Cerrar menú mobile
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
      // Scroll
      if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

// ── Intersection Observer: activo al scrollear ────────
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive("#" + entry.target.id);
      }
    });
    // Si estamos al tope marcamos Home
    if (window.scrollY < 100) setActive("#");
  },
  { threshold: 0.35 },
);

sections.forEach((s) => observer.observe(s));

// ── Volver arriba (footer) ────────────────────────────
document.getElementById("footerBack").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setActive("#");
});
