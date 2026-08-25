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
    lista: ["Scrum · Kanban", "Lean Startup", "Design Thinking", "OKRs y métricas ágiles"],
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
    lista: ["Investigación cuantitativa", "Investigación cualitativa", "Análisis de datos con IA", "Inteligencia competitiva"],
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
    lista: ["Coaching ejecutivo de negocios y liderazgo", "Brain based coaching o coaching basado en neurosciencias"],
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
    lista: ["Constelaciones organizacionales", "Mapeo de vínculos", "Roles y jerarquías", "Dinámicas de equipo"],
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
    lista: ["Innovación · Evolución adaptativa", "Investigación · Inteligencia de datos", "Coaching · Biología del liderazgo", "Sistémica · Geometría de vínculos"],
    info_label: "Frecuencia Alfa",
    info: "Estado de calma alerta entre 8 y 12 Hz. El cerebro en frecuencia alfa procesa, conecta y crea con máxima eficiencia.",
    integra: "Conocé los Programas Alfa",
  },
};

function renderModal(key) {
  var d = saContent[key];
  if (!d) return;
  var lista = d.lista.map(function (i) { return "<li>" + i + "</li>"; }).join("");
  document.getElementById("saHeader").innerHTML =
    '<div class="sa-modal-eyebrow">' + d.eyebrow + "</div>" +
    '<h2 class="sa-modal-title">' + d.title + "</h2>" +
    '<p class="sa-modal-sub">' + d.sub + "</p>";
  document.getElementById("saScroll").innerHTML =
    '<div class="sa-modal-content">' +
    '<div class="sa-modal-text">' + d.text +
    "<h4>" + d.lista_label + "</h4><ul>" + lista + "</ul>" +
    '<a href="/contacto" class="sa-modal-cta" id="saModalCta">Conversemos →</a>' +
    "</div>" +
    '<div class="sa-modal-sidebar">' +
    '<div class="sa-modal-info"><div class="sa-modal-info-label">' + d.info_label + '</div><div class="sa-modal-info-val">' + d.info + "</div></div>" +
    '<div class="sa-modal-info sa-modal-info--light"><div class="sa-modal-info-label">Integración sistémica</div><div class="sa-modal-info-val">' + d.integra + "</div></div>" +
    "</div></div>";
  document.getElementById("saScroll").scrollTop = 0;
}

function openModal(key) {
  renderModal(key);
  document.getElementById("saOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
  document.addEventListener("wheel", blockScroll, { passive: false, capture: true });
  document.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
}

function closeModal() {
  document.getElementById("saOverlay").classList.remove("open");
  document.body.style.overflow = "";
  document.removeEventListener("wheel", blockScroll, { capture: true });
  document.removeEventListener("touchmove", blockScroll, { capture: true });
}

function blockScroll(e) {
  var body = document.getElementById("saScroll");
  if (body && body.contains(e.target)) return;
  e.preventDefault();
  e.stopPropagation();
}
/*
document.querySelectorAll(".sa-point").forEach(function (btn) {
  btn.addEventListener("click", function () {
    openModal(btn.dataset.modal);
  });
});

document.getElementById("saClose").addEventListener("click", closeModal);
document.getElementById("saOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});


// ── MODALES SISTEMA ALFA® CON HOVER (Opción B + efecto visual) ──

let hoverTimeout = null;
let closeTimeout = null;
let isModalOpen = false;

// HOVER en puntos del diagrama
document.querySelectorAll(".sa-point").forEach(function (btn) {
  btn.addEventListener("mouseenter", function () {
    clearTimeout(closeTimeout); // Cancela cierre programado
    clearTimeout(hoverTimeout);
    const key = this.dataset.modal;

    if (document.getElementById("saOverlay").classList.contains("open")) {
      renderModal(key);
    } else {
      hoverTimeout = setTimeout(() => {
        openModal(key);
      }, 200);
    }
  });

  btn.addEventListener("mouseleave", function () {
    clearTimeout(hoverTimeout);
    // Cierra después de 2 segundos (Opción B)
    closeTimeout = setTimeout(() => {
      closeModal();
    }, 2000);
  });
});

// Cerrar con click fuera (overlay)
document.getElementById("saOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Cerrar con tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// Botón cerrar (X)
document.getElementById("saClose").addEventListener("click", closeModal);

// CTA dentro del modal
document.getElementById("saOverlay").addEventListener("click", function (e) {
  if (e.target.id === "saModalCta") {
    e.preventDefault();
    closeModal();
    setTimeout(function () {
      var t = document.getElementById("contacto");
      if (t) t.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
});

// ── FUNCIONES MODALES CON EFECTO VISUAL ──

function openModal(key) {
  renderModal(key);
  const overlay = document.getElementById("saOverlay");
  const modal = document.getElementById("saModal");

  // Remover clase closing si existía
  modal.classList.remove("closing");

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  isModalOpen = true;

  document.addEventListener("wheel", blockScroll, { passive: false, capture: true });
  document.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
}

function closeModal() {
  const overlay = document.getElementById("saOverlay");
  const modal = document.getElementById("saModal");

  // Agregar efecto de cierre
  modal.classList.add("closing");

  setTimeout(() => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    modal.classList.remove("closing");
    isModalOpen = false;

    document.removeEventListener("wheel", blockScroll, { capture: true });
    document.removeEventListener("touchmove", blockScroll, { capture: true });
  }, 300);
}

function blockScroll(e) {
  var body = document.getElementById("saScroll");
  if (body && body.contains(e.target)) return;
  e.preventDefault();
  e.stopPropagation();
}
// CTA dentro del modal

document.getElementById("saOverlay").addEventListener("click", function (e) {
  if (e.target.id === "saModalCta") {
    e.preventDefault();
    closeModal();
    setTimeout(function () {
      var t = document.getElementById("contacto");
      if (t) t.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
});
*/
// ── MODALES SISTEMA ALFA® CON HOVER (Opción C - Cierre Inteligente) ──

let hoverTimeout = null;
let closeTimeout = null;
let isModalOpen = false;

// HOVER en puntos del diagrama
document.querySelectorAll(".sa-point").forEach(function (btn) {
  btn.addEventListener("mouseenter", function () {
    clearTimeout(closeTimeout); // Cancela cierre programado
    clearTimeout(hoverTimeout);
    const key = this.dataset.modal;

    // Si el modal ya está abierto, solo actualizamos el contenido
    if (document.getElementById("saOverlay").classList.contains("open")) {
      renderModal(key);
    } else {
      hoverTimeout = setTimeout(() => {
        openModal(key);
      }, 200);
    }
  });

  btn.addEventListener("mouseleave", function () {
    clearTimeout(hoverTimeout);
    // Programar cierre, pero se cancela si el mouse entra al modal
    closeTimeout = setTimeout(() => {
      // Verificar si el mouse está dentro del modal
      const modal = document.getElementById("saModal");
      const isHoveringModal = modal && modal.matches(':hover');
      if (!isHoveringModal && isModalOpen) {
        closeModal();
      }
    }, 1500); // 1.5 segundos de espera
  });
});

// ── CONTROL DE CIERRE INTELIGENTE ──

// Cancelar cierre cuando el mouse entra al modal
const modalElement = document.getElementById("saModal");
if (modalElement) {
  modalElement.addEventListener("mouseenter", function () {
    clearTimeout(closeTimeout);
  });

  modalElement.addEventListener("mouseleave", function () {
    // Programar cierre cuando el mouse sale del modal
    closeTimeout = setTimeout(() => {
      // Verificar si el mouse está sobre algún punto del diagrama
      const points = document.querySelectorAll(".sa-point");
      let isHoveringPoint = false;
      points.forEach(point => {
        if (point.matches(':hover')) {
          isHoveringPoint = true;
        }
      });

      if (!isHoveringPoint && isModalOpen) {
        closeModal();
      }
    }, 1000); // 1 segundo después de salir del modal
  });
}

// ── FUNCIONES MODALES CON EFECTO VISUAL ──

function openModal(key) {
  renderModal(key);
  const overlay = document.getElementById("saOverlay");
  const modal = document.getElementById("saModal");

  // Remover clase closing si existía
  modal.classList.remove("closing");

  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  isModalOpen = true;

  document.addEventListener("wheel", blockScroll, { passive: false, capture: true });
  document.addEventListener("touchmove", blockScroll, { passive: false, capture: true });
}

function closeModal() {
  const overlay = document.getElementById("saOverlay");
  const modal = document.getElementById("saModal");

  // Agregar efecto de cierre
  modal.classList.add("closing");

  setTimeout(() => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    modal.classList.remove("closing");
    isModalOpen = false;

    document.removeEventListener("wheel", blockScroll, { capture: true });
    document.removeEventListener("touchmove", blockScroll, { capture: true });
  }, 300);
}

function blockScroll(e) {
  var body = document.getElementById("saScroll");
  if (body && body.contains(e.target)) return;
  e.preventDefault();
  e.stopPropagation();
}

// ── EVENTOS DE CIERRE ──

// Cerrar con click fuera (overlay)
document.getElementById("saOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});

// Cerrar con tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

// Botón cerrar (X)
document.getElementById("saClose").addEventListener("click", closeModal);

// CTA dentro del modal
document.getElementById("saOverlay").addEventListener("click", function (e) {
  if (e.target.id === "saModalCta") {
    e.preventDefault();
    closeModal();
    setTimeout(function () {
      var t = document.getElementById("contacto");
      if (t) t.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }
});

// ── NAVEGACIÓN ──────────────────────────────────────────

// Detectar si un enlace es una ancla (#)
function isAnchor(href) {
  return href && href.startsWith("#");
}

// Detectar si un enlace es una URL completa (con http o https)
function isFullUrl(href) {
  return href && (href.startsWith("http://") || href.startsWith("https://"));
}

// Manejar clics en enlaces de navegación
document.querySelectorAll(".nav__links a, .nav__mobile li:not(:last-child) a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Si es una ancla (#clientes), hacemos scroll suave
    if (isAnchor(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActive(href);
      }
      // Cerrar menú mobile
      mobileMenu.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
      return;
    }

    // Si es una URL completa, dejamos que navegue normalmente
    if (isFullUrl(href)) {
      return;
    }

    // Si es una ruta amigable (/, /sobre-nosotros, etc.)
    // o un .html, dejamos que navegue normalmente
    // (no prevenimos el evento)
  });
});

// Marcar enlace activo
function setActive(href) {
  document.querySelectorAll(".nav__links a, .nav__mobile li:not(:last-child) a").forEach((l) => {
    const linkHref = l.getAttribute("href");
    l.classList.toggle("active", linkHref === href);
  });
}

// ── Nav shadow on scroll ──────────────────────────────
window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.scrollY > 60 ? "0 2px 16px rgba(0,0,0,.08)" : "none";
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

// ── Intersection Observer: activo al scrollear ────────
const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActive("#" + entry.target.id);
      }
    });
    if (window.scrollY < 100) setActive("/");
  },
  { threshold: 0.35 }
);
sections.forEach((s) => observer.observe(s));

// ── Volver arriba (footer) ────────────────────────────
document.getElementById("footerBack").addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  setActive("/");
});

// ── Marcar "Home" como activo según la URL ────────────
const currentPath = window.location.pathname;
if (currentPath === "/" || currentPath === "/index.html" || currentPath === "") {
  setActive("/");
} else if (currentPath === "/sobre-nosotros") {
  setActive("/sobre-nosotros");
} else if (currentPath === "/metodo") {
  setActive("/metodo");
} else if (currentPath === "/contacto") {
  setActive("/contacto");
}