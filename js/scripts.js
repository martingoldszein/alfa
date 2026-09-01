// ── SCRIPTS COMPLETOS PARA TODAS LAS PÁGINAS ──
// (Este archivo funciona en index.html, contacto.html, metodo.html y sobre-nosotros.html)

// ── NAVEGACIÓN ──────────────────────────────────────────
const nav = document.getElementById("nav");
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

// ── HERO TYPEWRITER ANIMATION (SOLO PARA HOME) ──────
const h1El = document.getElementById("heroH1");
const h2El = document.getElementById("heroH2");

// Verificar si estamos en la home (existen elementos del hero)
const isHomePage = h1El !== null && h2El !== null;

// --- Traducciones del Hero (solo para home) ---
const HERO_TRANSLATIONS = isHomePage ? {
  es: {
    h1: [
      { text: "Del ", cls: null },
      { text: "INSIGHT", cls: "clay" },
      { text: " a la acción.", cls: null },
    ],
    h2Prefix: "Información ",
    h2Suffix: "<br> para decisiones que transforman.",
    words: ["CLAVE", "ESTRATÉGICA", "CONFIABLE", "REVELADORA"],
  },
  en: {
    h1: [
      { text: "From ", cls: null },
      { text: "INSIGHT", cls: "clay" },
      { text: " to action.", cls: null },
    ],
    h2Prefix: "",
    h2Suffix: " Information<br> for decisions that transform.",
    words: ["KEY", "STRATEGIC", "RELIABLE", "REVEALING"],
  },
  pt: {
    h1: [
      { text: "Do ", cls: null },
      { text: "INSIGHT", cls: "clay" },
      { text: " à ação.", cls: null },
    ],
    h2Prefix: "Informação ",
    h2Suffix: "<br> para decisões que transformam.",
    words: ["CHAVE", "ESTRATÉGICA", "CONFIÁVEL", "REVELADORA"],
  },
  fr: {
    h1: [
      { text: "De l'", cls: null },
      { text: "INSIGHT", cls: "clay" },
      { text: " à l'action.", cls: null },
    ],
    h2Prefix: "Information ",
    h2Suffix: "<br> pour des décisions qui transforment.",
    words: ["CLÉ", "STRATÉGIQUE", "FIABLE", "RÉVÉLATRICE"],
  },
} : {};

// Solo definir funciones del hero si estamos en home
const TYPE_SPEED = 55;
const DELETE_SPEED = 40;
const HOLD_TIME = 1400;
const PAUSE_BETWEEN_LINES = 400;
let heroRunId = 0;

function caret() {
  return '<span class="caret"></span>';
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// Funciones del hero (solo definidas si estamos en home)
const typeSegments = isHomePage ? function(el, segments, speed, runId) {
  return new Promise((resolve) => {
    const full = segments.map((s) => s.text).join("");
    let i = 0;
    function step() {
      if (runId !== heroRunId) return resolve();
      const shown = full.slice(0, i);
      let html = "";
      let cursor = 0;
      for (const seg of segments) {
        const segShown = shown.slice(cursor, cursor + seg.text.length);
        if (segShown) {
          html += seg.cls
            ? '<span class="' + seg.cls + '">' + segShown + "</span>"
            : segShown;
        }
        cursor += seg.text.length;
      }
      el.innerHTML = html + caret();
      i++;
      if (i <= full.length) {
        setTimeout(step, speed);
      } else {
        resolve();
      }
    }
    step();
  });
} : function() {};

const typeFullH2 = isHomePage ? function(word, prefix, suffix, speed, runId) {
  return typeSegments(
    h2El,
    [
      { text: prefix, cls: null },
      { text: word, cls: "rot" },
      { text: suffix, cls: null },
    ],
    speed,
    runId,
  );
} : function() {};

const typeRotatingWord = isHomePage ? function(word, prefix, suffix, speed, runId) {
  return new Promise((resolve) => {
    let i = 0;
    function step() {
      if (runId !== heroRunId) return resolve();
      h2El.innerHTML =
        prefix +
        '<span class="rot">' +
        word.slice(0, i) +
        "</span>" +
        caret() +
        suffix;
      i++;
      if (i <= word.length) {
        setTimeout(step, speed);
      } else {
        resolve();
      }
    }
    step();
  });
} : function() {};

const deleteRotatingWord = isHomePage ? function(word, prefix, suffix, speed, runId) {
  return new Promise((resolve) => {
    let i = word.length;
    function step() {
      if (runId !== heroRunId) return resolve();
      h2El.innerHTML =
        prefix +
        '<span class="rot">' +
        word.slice(0, i) +
        "</span>" +
        caret() +
        suffix;
      i--;
      if (i >= 0) {
        setTimeout(step, speed);
      } else {
        resolve();
      }
    }
    step();
  });
} : function() {};

const rotatingLoop = isHomePage ? async function(startIdx, words, prefix, suffix, runId) {
  let idx = startIdx;
  while (runId === heroRunId) {
    const word = words[idx % words.length];
    await sleep(HOLD_TIME);
    if (runId !== heroRunId) return;
    await deleteRotatingWord(word, prefix, suffix, DELETE_SPEED, runId);
    if (runId !== heroRunId) return;
    await sleep(200);
    if (runId !== heroRunId) return;
    idx++;
    const nextWord = words[idx % words.length];
    await typeRotatingWord(nextWord, prefix, suffix, TYPE_SPEED, runId);
  }
} : function() {};

const startHeroAnimation = isHomePage ? async function(lang) {
  const data = HERO_TRANSLATIONS[lang] || HERO_TRANSLATIONS.es;
  heroRunId++;
  const runId = heroRunId;

  h1El.innerHTML = "";
  h2El.innerHTML = "";

  await typeSegments(h1El, data.h1, TYPE_SPEED, runId);
  if (runId !== heroRunId) return;
  await sleep(PAUSE_BETWEEN_LINES);
  if (runId !== heroRunId) return;

  await typeFullH2(
    data.words[0],
    data.h2Prefix,
    data.h2Suffix,
    TYPE_SPEED,
    runId,
  );
  if (runId !== heroRunId) return;

  rotatingLoop(0, data.words, data.h2Prefix, data.h2Suffix, runId);
} : function() {};

// ── MODALES SISTEMA ALFA® (SOLO PARA HOME) ──────────
// Verificar si existen los elementos de los modales
const hasModals = document.getElementById("saOverlay") !== null;

// ── CONTENIDO DE MODALES CON TRADUCCIONES ─────────────
const saContent = {
  innovacion: {
    es: {
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
    en: {
      eyebrow: "Innovation",
      title: "Adaptive Evolution",
      sub: "Agile Methodologies · Living Processes",
      text: "<p>We integrate agile frameworks —Scrum, Lean, Design Thinking— as living processes that adapt to your organization's culture and rhythm.</p><p>Innovation is not an event but the natural consequence of an orderly and conscious system.</p>",
      lista_label: "Tools",
      lista: ["Scrum · Kanban", "Lean Startup", "Design Thinking", "OKRs and Agile Metrics"],
      info_label: "The game in this discipline",
      info: "At Ludoteca we prototype through play: play lowers the fear of error and accelerates ideas that wouldn't appear in a meeting room.",
      integra: "Integrates with The Task",
    },
    pt: {
      eyebrow: "Inovação",
      title: "Evolução Adaptativa",
      sub: "Metodologias Ágeis · Processos vivos",
      text: "<p>Integramos estruturas ágeis —Scrum, Lean, Design Thinking— como processos vivos que se adaptam à cultura e ao ritmo da sua organização.</p><p>A inovação não é um evento, mas a consequência natural de um sistema ordenado e consciente.</p>",
      lista_label: "Ferramentas",
      lista: ["Scrum · Kanban", "Lean Startup", "Design Thinking", "OKRs e métricas ágeis"],
      info_label: "O jogo nesta disciplina",
      info: "Na Ludoteca prototipamos jogando: o jogo reduz o medo do erro e acelera ideias que não surgiriam em uma sala de reuniões.",
      integra: "Integra com A Tarefa",
    },
    fr: {
      eyebrow: "Innovation",
      title: "Évolution Adaptative",
      sub: "Méthodologies Agiles · Processus vivants",
      text: "<p>Nous intégrons des cadres agiles —Scrum, Lean, Design Thinking— comme des processus vivants qui s'adaptent à la culture et au rythme de votre organisation.</p><p>L'innovation n'est pas un événement mais la conséquence naturelle d'un système ordonné et conscient.</p>",
      lista_label: "Outils",
      lista: ["Scrum · Kanban", "Lean Startup", "Design Thinking", "OKRs et métriques agiles"],
      info_label: "Le jeu dans cette discipline",
      info: "À la Ludothèque, nous prototypons en jouant : le jeu réduit la peur de l'erreur et accélère des idées qui n'apparaîtraient pas en salle de réunion.",
      integra: "S'intègre avec La Tâche",
    }
  },
  investigacion: {
    es: {
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
    en: {
      eyebrow: "Research",
      title: "Data Intelligence",
      sub: "Applied AI · Strategic Insights",
      text: "<p>We transform market complexity into clear insights, concrete decisions, and measurable results, combining methodological rigor with AI applied to analysis.</p><p>Data validates intuition and provides the foundation for strategic decision-making.</p>",
      lista_label: "Methodologies",
      lista: ["Quantitative Research", "Qualitative Research", "AI-Powered Data Analysis", "Competitive Intelligence"],
      info_label: "Certification",
      info: "Method certified by ESOMAR · ISPOR · ICC. Over 10,000 hours of consulting in data intelligence.",
      integra: "Integrates with The Task",
    },
    pt: {
      eyebrow: "Pesquisa",
      title: "Inteligência de Dados",
      sub: "IA aplicada · Insights estratégicos",
      text: "<p>Transformamos a complexidade do mercado em insights claros, decisões concretas e resultados mensuráveis, combinando rigor metodológico com IA aplicada à análise.</p><p>O dado valida a intuição e dá suporte à decisão estratégica.</p>",
      lista_label: "Metodologias",
      lista: ["Pesquisa quantitativa", "Pesquisa qualitativa", "Análise de dados com IA", "Inteligência competitiva"],
      info_label: "Certificação",
      info: "Método certificado por ESOMAR · ISPOR · ICC. Mais de 10.000 horas de consultoria em inteligência de dados.",
      integra: "Integra com A Tarefa",
    },
    fr: {
      eyebrow: "Recherche",
      title: "Intelligence des Données",
      sub: "IA appliquée · Insights stratégiques",
      text: "<p>Nous transformons la complexité du marché en insights clairs, décisions concrètes et résultats mesurables, alliant rigueur méthodologique et IA appliquée à l'analyse.</p><p>La donnée valide l'intuition et soutient la décision stratégique.</p>",
      lista_label: "Méthodologies",
      lista: ["Recherche quantitative", "Recherche qualitative", "Analyse de données avec IA", "Intelligence concurrentielle"],
      info_label: "Certification",
      info: "Méthode certifiée par ESOMAR · ISPOR · ICC. Plus de 10 000 heures de conseil en intelligence des données.",
      integra: "S'intègre avec La Tâche",
    }
  },
  coaching: {
    es: {
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
    en: {
      eyebrow: "Coaching",
      title: "Leadership Biology",
      sub: "Awareness · Neuroscience · Presence",
      text: "<p>We activate coherence between body, emotion, and thought so that the leader operates at their maximum capacity.</p><p>We facilitate accompaniment processes focused on conscious leadership development and team effectiveness.</p>",
      lista_label: "Approaches",
      lista: ["Executive Business & Leadership Coaching", "Brain-Based Coaching"],
      info_label: "The game in this discipline",
      info: "Role-playing games and simulations activate states of presence that verbal coaching only touches on the surface.",
      integra: "Integrates with The Being",
    },
    pt: {
      eyebrow: "Coaching",
      title: "Biologia da Liderança",
      sub: "Consciência · Neurociência · Presença",
      text: "<p>Ativamos a coerência entre corpo, emoção e pensamento para que o líder opere em sua máxima capacidade.</p><p>Facilitamos processos de acompanhamento focados no desenvolvimento da liderança consciente e na eficácia das equipes.</p>",
      lista_label: "Abordagens",
      lista: ["Coaching executivo de negócios e liderança", "Brain based coaching ou coaching baseado em neurociências"],
      info_label: "O jogo nesta disciplina",
      info: "Jogos de role-playing e simulações ativam estados de presença que o coaching verbal apenas toca superficialmente.",
      integra: "Integra com O Ser",
    },
    fr: {
      eyebrow: "Coaching",
      title: "Biologie du Leadership",
      sub: "Conscience · Neurosciences · Présence",
      text: "<p>Nous activons la cohérence entre le corps, l'émotion et la pensée pour que le leader opère à sa pleine capacité.</p><p>Nous facilitons des processus d'accompagnement axés sur le développement d'un leadership conscient et l'efficacité des équipes.</p>",
      lista_label: "Approches",
      lista: ["Coaching exécutif en affaires et leadership", "Brain based coaching ou coaching basé sur les neurosciences"],
      info_label: "Le jeu dans cette discipline",
      info: "Les jeux de rôle et simulations activent des états de présence que le coaching verbal n'effleure qu'en surface.",
      integra: "S'intègre avec L'Être",
    }
  },
  sistemica: {
    es: {
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
    en: {
      eyebrow: "Systemic",
      title: "Geometry of Bonds",
      sub: "Constellations · Organizational Order",
      text: "<p>We organize invisible hierarchies working from a systemic perspective, applied to roles, leadership, and organizational bonds.</p><p>Organizations are networks of relationships before they are structures. We map bonds and identify influence nodes.</p>",
      lista_label: "Applications",
      lista: ["Organizational Constellations", "Bond Mapping", "Roles and Hierarchies", "Team Dynamics"],
      info_label: "The game in this discipline",
      info: "Playful constellations reveal invisible relational dynamics that the organizational chart would never show.",
      integra: "Integrates with The Bonds",
    },
    pt: {
      eyebrow: "Sistêmica",
      title: "Geometria dos Vínculos",
      sub: "Constelações · Ordem organizacional",
      text: "<p>Ordenamos as hierarquias invisíveis trabalhando a partir da perspectiva sistêmica, aplicada a papéis, liderança e vínculos organizacionais.</p><p>As organizações são redes de relacionamentos antes de serem estruturas. Mapeamos os vínculos e identificamos os nós de influência.</p>",
      lista_label: "Aplicações",
      lista: ["Constelações organizacionais", "Mapeamento de vínculos", "Papéis e hierarquias", "Dinâmicas de equipe"],
      info_label: "O jogo nesta disciplina",
      info: "Constelações lúdicas revelam dinâmicas relacionais invisíveis que o organograma nunca mostraria.",
      integra: "Integra com Os Vínculos",
    },
    fr: {
      eyebrow: "Systémique",
      title: "Géométrie des Liens",
      sub: "Constellations · Ordre organisationnel",
      text: "<p>Nous organisons les hiérarchies invisibles en travaillant dans une perspective systémique, appliquée aux rôles, au leadership et aux liens organisationnels.</p><p>Les organisations sont des réseaux de relations avant d'être des structures. Nous cartographions les liens et identifions les nœuds d'influence.</p>",
      lista_label: "Applications",
      lista: ["Constellations organisationnelles", "Cartographie des liens", "Rôles et hiérarchies", "Dynamiques d'équipe"],
      info_label: "Le jeu dans cette discipline",
      info: "Les constellations ludiques révèlent des dynamiques relationnelles invisibles que l'organigramme ne montrerait jamais.",
      integra: "S'intègre avec Les Liens",
    }
  },
  insight: {
    es: {
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
    en: {
      eyebrow: "Insight · Center",
      title: "Alpha Frequency",
      sub: "8–12 Hz · The core that integrates everything",
      text: "<p>Insight is the moment when data and intuition collapse into understanding. It is the alpha frequency of the system: the state of maximum coherence between analysis and organic wisdom.</p><p>Inspired by the alpha frequency of the human brain —the state of calm alertness, creativity, and deep learning— we design organizations that operate in this state sustainably.</p>",
      lista_label: "The complete system",
      lista: ["Innovation · Adaptive Evolution", "Research · Data Intelligence", "Coaching · Leadership Biology", "Systemic · Geometry of Bonds"],
      info_label: "Alpha Frequency",
      info: "State of calm alertness between 8 and 12 Hz. The brain in alpha frequency processes, connects, and creates with maximum efficiency.",
      integra: "Discover the Alpha Programs",
    },
    pt: {
      eyebrow: "Insight · Centro",
      title: "Frequência Alfa",
      sub: "8–12 Hz · O núcleo que integra tudo",
      text: "<p>O insight é o momento em que o dado e a intuição colapsam em compreensão. É a frequência alfa do sistema: o estado de máxima coerência entre a análise e a sabedoria orgânica.</p><p>Inspirados na frequência alfa do cérebro humano —o estado de calma alerta, criatividade e aprendizado profundo— projetamos organizações que operam nesse estado de forma sustentada.</p>",
      lista_label: "O sistema completo",
      lista: ["Inovação · Evolução adaptativa", "Pesquisa · Inteligência de dados", "Coaching · Biologia da liderança", "Sistêmica · Geometria dos vínculos"],
      info_label: "Frequência Alfa",
      info: "Estado de calma alerta entre 8 e 12 Hz. O cérebro em frequência alfa processa, conecta e cria com máxima eficiência.",
      integra: "Conheça os Programas Alfa",
    },
    fr: {
      eyebrow: "Insight · Centre",
      title: "Fréquence Alpha",
      sub: "8–12 Hz · Le noyau qui intègre tout",
      text: "<p>L'insight est le moment où la donnée et l'intuition s'effondrent en compréhension. C'est la fréquence alpha du système : l'état de cohérence maximale entre l'analyse et la sagesse organique.</p><p>Inspirés par la fréquence alpha du cerveau humain —l'état de calme alerte, de créativité et d'apprentissage profond— nous concevons des organisations qui opèrent dans cet état de manière durable.</p>",
      lista_label: "Le système complet",
      lista: ["Innovation · Évolution adaptative", "Recherche · Intelligence des données", "Coaching · Biologie du leadership", "Systémique · Géométrie des liens"],
      info_label: "Fréquence Alpha",
      info: "État de calme alerte entre 8 et 12 Hz. Le cerveau en fréquence alpha traite, connecte et crée avec une efficacité maximale.",
      integra: "Découvrez les Programmes Alpha",
    }
  }
};

// ── TOOLTIPS PARA PUNTOS DEL DIAGRAMA ────────────────
const POINT_TOOLTIPS = {
  es: {
    innovacion: "Innovación",
    coaching: "Coaching",
    investigacion: "Investigación",
    sistemica: "Sistémica",
    insight: "Insight · Frecuencia Alfa"
  },
  en: {
    innovacion: "Innovation",
    coaching: "Coaching",
    investigacion: "Research",
    sistemica: "Systemic",
    insight: "Insight · Alpha Frequency"
  },
  pt: {
    innovacion: "Inovação",
    coaching: "Coaching",
    investigacion: "Pesquisa",
    sistemica: "Sistêmica",
    insight: "Insight · Frequência Alfa"
  },
  fr: {
    innovacion: "Innovation",
    coaching: "Coaching",
    investigacion: "Recherche",
    sistemica: "Systémique",
    insight: "Insight · Fréquence Alpha"
  }
};

// Variables globales para los modales
let isModalOpen = false;
let currentModalLang = 'es';
let hoverTimeout = null;
let closeTimeout = null;

function updatePointTooltips(lang) {
  const points = document.querySelectorAll(".sa-point");
  const tooltips = POINT_TOOLTIPS[lang] || POINT_TOOLTIPS.es;

  points.forEach(function(point) {
    const key = point.dataset.modal;
    if (key && tooltips[key]) {
      point.setAttribute("title", tooltips[key]);
      point.setAttribute("aria-label", tooltips[key]);
    }
  });
}

if (hasModals) {
  function renderModal(key) {
    const lang = currentModalLang;
    const d = saContent[key] && saContent[key][lang] ? saContent[key][lang] : saContent[key]['es'];
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
      '<a href="/contacto" class="sa-modal-cta" id="saModalCta">' + (lang === 'es' ? 'Conversemos →' : lang === 'en' ? "Let's talk →" : lang === 'pt' ? "Vamos conversar →" : "Parlons-en →") + '</a>' +
      "</div>" +
      '<div class="sa-modal-sidebar">' +
      '<div class="sa-modal-info"><div class="sa-modal-info-label">' + d.info_label + '</div><div class="sa-modal-info-val">' + d.info + "</div></div>" +
      '<div class="sa-modal-info sa-modal-info--light"><div class="sa-modal-info-label">' + (lang === 'es' ? 'Integración sistémica' : lang === 'en' ? 'Systemic Integration' : lang === 'pt' ? 'Integração sistêmica' : 'Intégration systémique') + '</div><div class="sa-modal-info-val">' + d.integra + "</div></div>" +
      "</div></div>";
    document.getElementById("saScroll").scrollTop = 0;
  }

  document.querySelectorAll(".sa-point").forEach(function (btn) {
    btn.addEventListener("mouseenter", function () {
      clearTimeout(closeTimeout);
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
      closeTimeout = setTimeout(() => {
        const modal = document.getElementById("saModal");
        const isHoveringModal = modal && modal.matches(':hover');
        if (!isHoveringModal && isModalOpen) {
          closeModal();
        }
      }, 1500);
    });
  });

  const modalElement = document.getElementById("saModal");
  if (modalElement) {
    modalElement.addEventListener("mouseenter", function () {
      clearTimeout(closeTimeout);
    });

    modalElement.addEventListener("mouseleave", function () {
      closeTimeout = setTimeout(() => {
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
      }, 1000);
    });
  }

  function openModal(key) {
    renderModal(key);
    const overlay = document.getElementById("saOverlay");
    const modal = document.getElementById("saModal");

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

  document.getElementById("saOverlay").addEventListener("click", function (e) {
    if (e.target === this) closeModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  document.getElementById("saClose").addEventListener("click", closeModal);

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
}

// ── NAVEGACIÓN COMÚN ──────────────────────────────────
function isAnchor(href) {
  return href && href.startsWith("#");
}

function isFullUrl(href) {
  return href && (href.startsWith("http://") || href.startsWith("https://"));
}

document.querySelectorAll(".nav__links a, .nav__mobile li:not(:last-child) a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (isAnchor(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setActiveByPath(); // Actualizar active después del scroll
      }
      if (mobileMenu) {
        mobileMenu.classList.remove("open");
      }
      if (hamburger) {
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", false);
      }
      return;
    }

    if (isFullUrl(href)) {
      return;
    }
  });
});

function setActive(href) {
  document.querySelectorAll(".nav__links a, .nav__mobile li:not(:last-child) a").forEach((l) => {
    const linkHref = l.getAttribute("href");
    l.classList.toggle("active", linkHref === href);
  });
}

if (nav) {
  window.addEventListener("scroll", () => {
    nav.style.boxShadow = window.scrollY > 60 ? "0 2px 16px rgba(0,0,0,.08)" : "none";
  });
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");
    hamburger.classList.toggle("open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen);
  });
}

if (nav) {
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) {
      if (mobileMenu) {
        mobileMenu.classList.remove("open");
      }
      if (hamburger) {
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", false);
      }
    }
  });
}

// ── Intersection Observer ─────────────────────────────
const sections = document.querySelectorAll("section[id]");
if (sections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive("#" + entry.target.id);
        }
      });
      if (window.scrollY < 100) setActiveByPath();
    },
    { threshold: 0.35 }
  );
  sections.forEach((s) => observer.observe(s));
}

// ── Volver arriba ──────────────────────────────────────
const footerBack = document.getElementById("footerBack");
if (footerBack) {
  footerBack.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveByPath();
  });
}

// ── MARCADOR DE ENLACE ACTIVO - VERSIÓN DEFINITIVA ────
function setActiveByPath() {
  // Obtener la ruta actual sin el dominio
  let currentPath = window.location.pathname;

  // Limpiar la ruta: eliminar .html, eliminar / al final, eliminar / al inicio
  let cleanPath = currentPath
    .replace(/\.html$/, '')      // Eliminar .html
    .replace(/\/$/, '')          // Eliminar / al final
    .replace(/^\//, '');         // Eliminar / al inicio

  // Si está vacío, es la home
  if (cleanPath === '') {
    cleanPath = '/';
  }

  // Obtener todos los enlaces de navegación
  const navLinks = document.querySelectorAll(".nav__links a, .nav__mobile li:not(:last-child) a");

  // Quitar clase active de todos primero
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Activar el enlace que corresponda
  navLinks.forEach((link) => {
    let linkHref = link.getAttribute('href');

    // Saltar si es un ancla (#) o está vacío
    if (!linkHref || linkHref === '#' || linkHref.startsWith('#') && linkHref !== '#clientes') {
      return;
    }

    // Limpiar el href del enlace para comparación
    let cleanLinkHref = linkHref
      .replace(/\.html$/, '')      // Eliminar .html
      .replace(/^\//, '');         // Eliminar / al inicio

    // Caso especial: Home
    if ((cleanLinkHref === '' || cleanLinkHref === '/') && cleanPath === '/') {
      link.classList.add('active');
      return;
    }

    // Caso especial: si el enlace es / y la ruta es index
    if (cleanLinkHref === '' && (cleanPath === '' || cleanPath === 'index')) {
      link.classList.add('active');
      return;
    }

    // Comparar las rutas limpias
    if (cleanLinkHref === cleanPath) {
      link.classList.add('active');
      return;
    }

    // Comparar sin case sensitive (por si hay mayúsculas/minúsculas)
    if (cleanLinkHref.toLowerCase() === cleanPath.toLowerCase()) {
      link.classList.add('active');
      return;
    }

    // Si el enlace es "sobre-nosotros" y la ruta es "sobre-nosotros" (con o sin html)
    if (cleanLinkHref === cleanPath ||
        cleanLinkHref === cleanPath + '.html' ||
        cleanLinkHref + '.html' === cleanPath) {
      link.classList.add('active');
      return;
    }
  });
}

// ── TRADUCCIONES ──────────────────────────────────────
// EXCLUIR #typewriterText de las traducciones automáticas
const translatables = document.querySelectorAll("[data-es][data-en][data-pt][data-fr]:not(#typewriterText)");
const langSelectors = document.querySelectorAll("[data-lang]");

function setLanguage(lang) {
  if (hasModals) {
    currentModalLang = lang;
  }

  translatables.forEach((el) => {
    const translation = el.getAttribute("data-" + lang);
    if (translation !== null) {
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.placeholder = translation;
      } else {
        el.innerHTML = translation;
      }
    }
  });

  langSelectors.forEach((link) => {
    const linkLang = link.getAttribute("data-lang");
    if (linkLang === lang) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  localStorage.setItem("alfalogica-lang", lang);
  document.documentElement.lang = lang;

  const navLangCurrent = document.getElementById("navLangCurrent");
  if (navLangCurrent) navLangCurrent.textContent = lang.toUpperCase();

  document
    .querySelectorAll(".nav__lang-dropdown[open]")
    .forEach((d) => d.removeAttribute("open"));

  updatePointTooltips(lang);

  if (hasModals && isModalOpen) {
    const overlay = document.getElementById("saOverlay");
    if (overlay && overlay.classList.contains("open")) {
      const activePoint = document.querySelector(".sa-point:hover") ||
                          document.querySelector(".sa-point[data-modal]");
      if (activePoint) {
        const key = activePoint.dataset.modal;
        if (key) {
          renderModal(key);
        }
      }
    }
  }

  if (isHomePage && typeof startHeroAnimation === 'function') {
    startHeroAnimation(lang);
  }
}

langSelectors.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const lang = this.getAttribute("data-lang");
    setLanguage(lang);
  });
});

// ── SCROLL SUAVE PARA ANCLAS ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  const href = anchor.getAttribute("href");
  if (href === "#" || href === "" || href.includes("/")) return;

  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ── INICIALIZACIÓN ────────────────────────────────────
document.addEventListener("DOMContentLoaded", function() {
  const savedLang = localStorage.getItem("alfalogica-lang");
  const initialLang = savedLang && ["es", "en", "pt", "fr"].includes(savedLang) ? savedLang : "es";
  setLanguage(initialLang);

  // Activar el enlace según la URL actual
  setActiveByPath();
});

// También ejecutar cuando cambie la URL (para navegación SPA)
window.addEventListener("popstate", setActiveByPath);

// ── TYPEWRITER PARA SECCIÓN FRASES (MULTI-IDIOMA) ──
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriterText');
  if (!typewriterElement) return;

  // Frases en cada idioma
  const phrases = {
    es: [
      'Los Vínculos · Orden y Dinámica',
      'El Ser · Presencia y Autorregulación',
      'La Tarea · Propósito e Innovación'
    ],
    en: [
      'The Bonds · Order and Dynamics',
      'The Being · Presence and Self-Regulation',
      'The Task · Purpose and Innovation'
    ],
    pt: [
      'Os Vínculos · Ordem e Dinâmica',
      'O Ser · Presença e Autorregulação',
      'A Tarefa · Propósito e Inovação'
    ],
    fr: [
      'Les Liens · Ordre et Dynamique',
      "L'Être · Présence et Autorégulation",
      'La Mission · Objectif et Innovation'
    ]
  };

  let currentLang = localStorage.getItem('alfalogica-lang') || 'es';
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typewriterTimeout = null;
  let isRunning = true;

  function getCurrentPhrases() {
    return phrases[currentLang] || phrases.es;
  }

  function type() {
    if (!isRunning) return;

    const currentPhrases = getCurrentPhrases();
    const fullText = currentPhrases[phraseIndex % currentPhrases.length];

    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = fullText.substring(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % currentPhrases.length;
        typewriterTimeout = setTimeout(type, 500);
        return;
      }
      typewriterTimeout = setTimeout(type, 30);
    } else {
      charIndex++;
      typewriterElement.textContent = fullText.substring(0, charIndex);

      if (charIndex === fullText.length) {
        typewriterTimeout = setTimeout(() => {
          isDeleting = true;
          type();
        }, 2500);
        return;
      }
      typewriterTimeout = setTimeout(type, 60);
    }
  }

  // Detener el typewriter actual
  function stopTypewriter() {
    isRunning = false;
    if (typewriterTimeout) {
      clearTimeout(typewriterTimeout);
      typewriterTimeout = null;
    }
  }

  // Reiniciar el typewriter con el nuevo idioma
  function restartTypewriter(lang) {
    stopTypewriter();
    currentLang = lang;
    phraseIndex = 0;
    charIndex = 0;
    isDeleting = false;
    isRunning = true;

    // Limpiar y empezar de nuevo
    typewriterElement.textContent = '';
    setTimeout(type, 400);
  }

  // Escuchar cambios de idioma
  const langObserver = new MutationObserver(() => {
    const newLang = localStorage.getItem('alfalogica-lang') || 'es';
    if (newLang !== currentLang) {
      restartTypewriter(newLang);
    }
  });

  // Observar cambios en localStorage (por si otra pestaña cambia el idioma)
  langObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  // También escuchar clicks en los selectores de idioma
  document.addEventListener('click', function(e) {
    const langLink = e.target.closest('[data-lang]');
    if (langLink) {
      const newLang = langLink.getAttribute('data-lang');
      if (newLang && newLang !== currentLang) {
        // Esperar a que el script principal cambie el idioma
        setTimeout(() => {
          const storedLang = localStorage.getItem('alfalogica-lang') || 'es';
          if (storedLang !== currentLang) {
            restartTypewriter(storedLang);
          }
        }, 100);
      }
    }
  });

  // Iniciar
  setTimeout(type, 400);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
  initTypewriter();
}