/**
 * HOPE - Standalone Bundle
 * Combines all modules for zero-dependency execution (works with file:/// and http://)
 */

// --- js\modules\nav.js ---
/**
 * Navigation Module
 * Handles mobile drawer, smooth scrolling, scroll-spy, and header sticky states.
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a:not(.nav-cta)");
  const sections = document.querySelectorAll("section[id]");

  // Header scroll shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", isOpen);
      menuButton.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    // Close on link click
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active section scroll-spy
  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}


// --- js\modules\aula.js ---
/**
 * Aula HOPE Module
 * Interactive guided itinerary with tabs, interactive skill checklists, and persistent progress.
 */
const modulesData = [
  {
    id: 1,
    title: "Mi móvil, mi herramienta",
    duration: "45 min",
    level: "Inicial",
    summary: "Aprende a configurar tu teléfono, conectarte a una red y reconocer los ajustes que utilizas cada día.",
    details: "En este módulo aprenderás paso a paso a encender y personalizar el brillo, tamaño de letra, conectar el wifi del centro o tu hogar, y verificar las llamadas y mensajes sin temor a equivocarte.",
    skills: [
      { id: "m1-s1", text: "Ajustes básicos y volumen" },
      { id: "m1-s2", text: "Conexión a red wifi segura" },
      { id: "m1-s3", text: "Ajustes de accesibilidad y texto grande" },
      { id: "m1-s4", text: "Gestión de contactos y llamadas" }
    ],
    tips: [
      "No compartas tus contraseñas por mensajes de texto.",
      "Ajusta el tamaño de la letra para no cansar la vista.",
      "Revisa siempre el icono de candado al navegar."
    ]
  },
  {
    id: 2,
    title: "Español para trámites y citas",
    duration: "60 min",
    level: "Intermedio",
    summary: "Conversación práctica y vocabulario cotidiano para ganar confianza en trámites, citas del médico y vida diaria.",
    details: "Adquiere soltura y seguridad con las palabras clave que se emplean en citas sanitarias, portales municipales y correos oficiales, practicando diálogos en situaciones reales.",
    skills: [
      { id: "m2-s1", text: "Pedir cita previa online" },
      { id: "m2-s2", text: "Vocabulario de formularios y gestiones" },
      { id: "m2-s3", text: "Interpretar notificaciones y SMS" },
      { id: "m2-s4", text: "Redactar correos breves y claros" }
    ],
    tips: [
      "Guarda captura de pantalla del justificante o código de cita.",
      "Si no entiendes una palabra técnica, pide que te la expliquen sin miedo.",
      "Anota la fecha en tu calendario móvil con recordatorio."
    ]
  },
  {
    id: 3,
    title: "Empleo, currículum y autonomía",
    duration: "90 min",
    level: "Práctico",
    summary: "Crear un CV adaptado, buscar oportunidades en portales de empleo y realizar gestiones de forma independiente.",
    details: "Te acompañamos a estructurar tu experiencia, redactar un currículum atractivo y directo, crear un perfil en plataformas laborales y preparar respuestas clave para entrevistas.",
    skills: [
      { id: "m3-s1", text: "Estructura clara de un CV digital" },
      { id: "m3-s2", text: "Búsqueda en portales de empleo fiables" },
      { id: "m3-s3", text: "Adjuntar archivos PDF en solicitudes" },
      { id: "m3-s4", text: "Preparar videollamadas de selección" }
    ],
    tips: [
      "Mantén tus datos de contacto actualizados.",
      "Destaca tus habilidades prácticas y experiencia previa.",
      "Pide a tu tutor/a de HOPE que revise el borrador antes de enviarlo."
    ]
  }
];
function initAula() {
  const tabsContainer = document.querySelector(".lesson-tabs");
  const panel = document.getElementById("lesson-panel");
  const progressFill = document.querySelector(".progress-fill");
  const progressLabel = document.querySelector(".lesson-progress strong");
  const exploreBtn = document.querySelector(".explore-lesson-btn");

  if (!tabsContainer || !panel) return;

  let activeIndex = 0;
  let completedSkills = JSON.parse(localStorage.getItem("hope_completed_skills") || "[]");

  function renderTabs() {
    tabsContainer.innerHTML = modulesData.map((mod, idx) => `
      <button class="${idx === activeIndex ? "active" : ""}" role="tab" aria-selected="${idx === activeIndex}" data-index="${idx}">
        <span>0${mod.id}</span> Módulo ${mod.id}
      </button>
    `).join("");

    tabsContainer.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        const nextIdx = parseInt(btn.dataset.index, 10);
        if (nextIdx !== activeIndex) {
          activeIndex = nextIdx;
          renderTabs();
          renderPanel();
          updateProgress();
        }
      });
    });
  }

  function renderPanel() {
    const mod = modulesData[activeIndex];
    panel.classList.add("fade");

    setTimeout(() => {
      panel.innerHTML = `
        <div class="lesson-meta">
          <span>Módulo ${mod.id}</span>
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${mod.duration}
          </span>
          <span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            ${mod.level}
          </span>
        </div>
        <h3>${mod.title}</h3>
        <p>${mod.summary}</p>
        <div class="skill-list" role="group" aria-label="Habilidades del módulo">
          ${mod.skills.map(skill => {
            const isDone = completedSkills.includes(skill.id);
            return `
              <button class="skill-item ${isDone ? "completed" : ""}" data-skill-id="${skill.id}" title="Haz clic para marcar como completada">
                <i>${isDone ? "✓" : "+"}</i>
                <span>${skill.text}</span>
              </button>
            `;
          }).join("")}
        </div>
        <div class="lesson-panel-actions">
          <button type="button" class="explore-lesson-btn" data-index="${activeIndex}">
            Ver guía detallada del módulo
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"></path><path d="m13 6 6 6-6 6"></path></svg>
          </button>
          <a href="#participa" class="underlined-link">Participar en El Carme</a>
        </div>
      `;

      // Skill clicks
      panel.querySelectorAll(".skill-item").forEach(item => {
        item.addEventListener("click", () => {
          const sId = item.dataset.skillId;
          if (completedSkills.includes(sId)) {
            completedSkills = completedSkills.filter(id => id !== sId);
          } else {
            completedSkills.push(sId);
          }
          localStorage.setItem("hope_completed_skills", JSON.stringify(completedSkills));
          renderPanel();
          updateProgress();
        });
      });

      // Guide Modal
      panel.querySelector(".explore-lesson-btn").addEventListener("click", () => {
        openLessonGuideModal(mod);
      });

      panel.classList.remove("fade");
    }, 150);
  }

  function updateProgress() {
    const totalSkills = modulesData.reduce((acc, m) => acc + m.skills.length, 0);
    const doneCount = completedSkills.length;
    // Calculate progress: base module progress plus checked skills
    const baseModulePercent = ((activeIndex + 1) / modulesData.length) * 50;
    const skillsPercent = totalSkills > 0 ? (doneCount / totalSkills) * 50 : 0;
    const totalPercent = Math.min(100, Math.round(baseModulePercent + skillsPercent));

    if (progressFill) {
      progressFill.style.width = `${totalPercent}%`;
    }
    if (progressLabel) {
      progressLabel.textContent = `${activeIndex + 1}/${modulesData.length} (${doneCount} logros)`;
    }
  }

  // Initial render
  renderTabs();
  renderPanel();
  updateProgress();
}

/**
 * Detailed guide modal for the selected module
 */
function openLessonGuideModal(moduleData) {
  const modalOverlay = document.getElementById("lesson-modal-overlay");
  const modalBody = document.getElementById("lesson-modal-content");
  if (!modalOverlay || !modalBody) return;

  modalBody.innerHTML = `
    <span class="section-label">Módulo 0${moduleData.id} · ${moduleData.level}</span>
    <h3 style="margin: 12px 0 16px;">${moduleData.title}</h3>
    <p style="color: var(--ink-light); margin-bottom: 20px;">${moduleData.details}</p>
    
    <h4 style="font-size: 20px; margin: 20px 0 10px;">Habilidades que practicarás:</h4>
    <ul style="list-style: none; margin-bottom: 24px;">
      ${moduleData.skills.map(s => `
        <li style="display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 14px;">
          <span style="color: var(--coral); font-weight: 700;">•</span> ${s.text}
        </li>
      `).join("")}
    </ul>

    <h4 style="font-size: 20px; margin: 20px 0 10px;">Consejos prácticos del equipo HOPE:</h4>
    <div style="background: #ede8dc; padding: 16px 20px; border-radius: 4px; margin-bottom: 26px;">
      ${moduleData.tips.map(tip => `
        <p style="font-size: 13px; margin-bottom: 6px; color: var(--ink);">💡 ${tip}</p>
      `).join("")}
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 14px;">
      <button type="button" class="button button-coral modal-action-close">Entendido</button>
    </div>
  `;

  modalOverlay.classList.add("open");

  modalOverlay.querySelector(".modal-action-close").addEventListener("click", () => {
    modalOverlay.classList.remove("open");
  });
}


// --- js\modules\podcast.js ---
/**
 * Podcast Module
 * Web Audio ambient soundscape + interactive player with episodes, scrubbing, and waveform animation.
 */
const podcastEpisodes = [
  {
    id: 1,
    title: "Episodio 01 · Empezar de nuevo",
    guest: "Elena y Karim (Barrio del Carmen)",
    durationStr: "18:42",
    durationSec: 1122,
    description: "Elena y Karim comparten cómo el Centro El Carme y las sesiones de HOPE les ayudaron a perder el miedo a los trámites digitales y a conectar con la comunidad."
  },
  {
    id: 2,
    title: "Episodio 02 · La primera pantalla",
    guest: "Tariq y Bea (Voluntaria)",
    durationStr: "14:15",
    durationSec: 855,
    description: "Una conversación cercana sobre la primera vez que envías un currículum digital, la paciencia y el poder del acompañamiento individualizado."
  },
  {
    id: 3,
    title: "Episodio 03 · Redes que sostienen",
    guest: "María y Samuel (Coordinación)",
    durationStr: "22:05",
    durationSec: 1325,
    description: "Exploramos el impacto comunitario y social en Valencia: cómo la tecnología, lejos de aislar, puede ser el puente hacia una red vecinal sólida."
  }
];
function initPodcast() {
  const artContainer = document.querySelector(".podcast-art");
  const playButton = document.querySelector(".player-play-btn");
  const trackTitle = document.querySelector(".track-info strong");
  const trackTime = document.querySelector(".track-info span");
  const scrubber = document.querySelector(".scrubber-range");
  const episodeSelector = document.querySelector(".episode-selector");

  if (!playButton || !scrubber) return;

  let currentEpisodeIndex = 0;
  let isPlaying = false;
  let currentTimeSec = 0;
  let intervalId = null;

  // Web Audio Context for authentic, self-contained playback
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function startSynthesizedAudio() {
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      // Create a gentle, ambient chord sound
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      // Gentle warm tone (E3 note)
      oscillator.frequency.setValueAtTime(164.81, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 1.2);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
    } catch (e) {
      console.warn("Web Audio playback not supported or user-gesture required", e);
    }
  }

  function stopSynthesizedAudio() {
    if (gainNode && audioCtx) {
      try {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            oscillator = null;
          }
        }, 500);
      } catch (e) {
        // ignore cleanup errors
      }
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function renderEpisodesNav() {
    if (!episodeSelector) return;
    episodeSelector.innerHTML = podcastEpisodes.map((ep, idx) => `
      <button class="ep-btn ${idx === currentEpisodeIndex ? "active" : ""}" data-index="${idx}">
        Ep. 0${ep.id}
      </button>
    `).join("");

    episodeSelector.querySelectorAll(".ep-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const nextIdx = parseInt(btn.dataset.index, 10);
        if (nextIdx !== currentEpisodeIndex) {
          switchEpisode(nextIdx);
        }
      });
    });
  }

  function updateTrackDisplay() {
    const ep = podcastEpisodes[currentEpisodeIndex];
    if (trackTitle) {
      trackTitle.textContent = ep.title;
      trackTitle.title = ep.description;
    }
    if (trackTime) {
      trackTime.textContent = `${formatTime(currentTimeSec)} / ${ep.durationStr}`;
    }
    const percent = (currentTimeSec / ep.durationSec) * 100;
    scrubber.value = percent;
  }

  function switchEpisode(index) {
    const wasPlaying = isPlaying;
    if (isPlaying) {
      togglePlay(false);
    }
    currentEpisodeIndex = index;
    currentTimeSec = 0;
    renderEpisodesNav();
    updateTrackDisplay();

    if (wasPlaying) {
      togglePlay(true);
    }
  }

  function togglePlay(forceState) {
    isPlaying = forceState !== undefined ? forceState : !isPlaying;

    if (isPlaying) {
      playButton.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
        </svg>
      `;
      playButton.setAttribute("aria-label", "Pausar episodio");
      if (artContainer) artContainer.classList.add("playing");

      startSynthesizedAudio();

      intervalId = setInterval(() => {
        const ep = podcastEpisodes[currentEpisodeIndex];
        if (currentTimeSec < ep.durationSec) {
          currentTimeSec += 1;
          updateTrackDisplay();
        } else {
          togglePlay(false);
          currentTimeSec = 0;
          updateTrackDisplay();
        }
      }, 1000);
    } else {
      playButton.innerHTML = `
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="m8 5 11 7-11 7V5Z"></path>
        </svg>
      `;
      playButton.setAttribute("aria-label", "Reproducir episodio");
      if (artContainer) artContainer.classList.remove("playing");

      stopSynthesizedAudio();
      clearInterval(intervalId);
    }
  }

  // Scrubber drag / click
  scrubber.addEventListener("input", (e) => {
    const ep = podcastEpisodes[currentEpisodeIndex];
    const newPercent = parseFloat(e.target.value);
    currentTimeSec = Math.round((newPercent / 100) * ep.durationSec);
    updateTrackDisplay();
  });

  playButton.addEventListener("click", () => {
    togglePlay();
  });

  // Secondary hero play button triggers podcast player
  const heroAudioLink = document.querySelector(".hero-actions .text-link");
  if (heroAudioLink) {
    heroAudioLink.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("podcast")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        if (!isPlaying) togglePlay(true);
      }, 600);
    });
  }

  renderEpisodesNav();
  updateTrackDisplay();
}


// --- js\modules\workshops.js ---
/**
 * Workshops Module
 * Handles workshop data, modal viewer, and quick-enrollment handoff.
 */
const workshopsData = [
  {
    id: 1,
    num: "01",
    title: "Primeros pasos digitales",
    description: "Manejar el móvil, navegar con seguridad y resolver tareas cotidianas sin miedo.",
    schedule: "Lunes y Miércoles · 10:00 a 11:30",
    location: "Centro El Carme, Calle Museu, Valencia",
    spotsAvailable: 4,
    objectives: [
      "Perder el temor a pulsar y configurar el dispositivo móvil.",
      "Identificar enlaces seguros y evitar fraudes o estafas por SMS/WhatsApp.",
      "Usar herramientas útiles: cámara, notas de voz, mapas y correo.",
      "Conectar con familiares y amigos mediante videollamadas."
    ]
  },
  {
    id: 2,
    num: "02",
    title: "Español para conectar",
    description: "Conversación práctica para ganar confianza en trámites, entrevistas y vida diaria.",
    schedule: "Martes y Jueves · 17:00 a 18:30",
    location: "Centro El Carme, Calle Museu, Valencia",
    spotsAvailable: 3,
    objectives: [
      "Práctica de conversación en contextos reales (médico, escuela, administración).",
      "Comprensión de documentos oficiales y cartas de notificación.",
      "Expresión oral fluida para desenvolverse en la comunidad vecinal.",
      "Grupos reducidos con acompañamiento de mentores voluntarios."
    ]
  },
  {
    id: 3,
    num: "03",
    title: "Empleo y autonomía",
    description: "Crear un CV, buscar oportunidades y realizar gestiones de forma independiente.",
    schedule: "Viernes · 10:30 a 12:30",
    location: "Aula Digital El Carme, Valencia",
    spotsAvailable: 5,
    objectives: [
      "Redacción y diseño de un currículum vitae claro y profesional.",
      "Registro y uso de portales de empleo fiables (LABORA, InfoJobs, redes locales).",
      "Envío de correos de presentación y preparación de entrevistas.",
      "Obtención y uso del certificado digital o Cl@ve permanente."
    ]
  }
];
function initWorkshops() {
  const cards = document.querySelectorAll(".workshop-card");
  const modalOverlay = document.getElementById("workshop-modal-overlay");
  const modalBody = document.getElementById("workshop-modal-content");

  if (!cards.length || !modalOverlay || !modalBody) return;

  cards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const workshop = workshopsData[index];
      openWorkshopModal(workshop);
    });
  });

  function openWorkshopModal(workshop) {
    modalBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <span class="section-label">Taller ${workshop.num}</span>
        <span style="background: rgba(239, 106, 76, 0.15); color: var(--coral); padding: 4px 10px; border-radius: 99px; font-size: 11px; font-weight: 700;">
          ${workshop.spotsAvailable} plazas disponibles
        </span>
      </div>

      <h3 style="font-size: 34px; margin-bottom: 12px;">${workshop.title}</h3>
      <p style="color: var(--ink-light); margin-bottom: 22px; font-size: 15px;">${workshop.description}</p>

      <div style="background: #ede8dc; padding: 18px 22px; border-radius: 4px; margin-bottom: 24px; font-size: 13px;">
        <p style="margin-bottom: 8px;"><strong>📅 Horario:</strong> ${workshop.schedule}</p>
        <p><strong>📍 Lugar:</strong> ${workshop.location}</p>
      </div>

      <h4 style="font-size: 18px; margin-bottom: 12px;">Objetivos y contenidos del taller:</h4>
      <ul style="list-style: none; margin-bottom: 28px;">
        ${workshop.objectives.map(obj => `
          <li style="display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 13px; color: var(--ink);">
            <span style="color: var(--coral); font-weight: 700; line-height: 1;">✓</span>
            <span>${obj}</span>
          </li>
        `).join("")}
      </ul>

      <div style="display: flex; gap: 14px; justify-content: flex-end; flex-wrap: wrap;">
        <button type="button" class="button modal-cancel-btn" style="border: 1px solid var(--line); color: var(--ink);">Cerrar</button>
        <button type="button" class="button button-coral enroll-now-btn" data-workshop="${workshop.title}">Inscribirme en este taller</button>
      </div>
    `;

    modalOverlay.classList.add("open");

    modalBody.querySelector(".modal-cancel-btn").addEventListener("click", () => {
      modalOverlay.classList.remove("open");
    });

    modalBody.querySelector(".enroll-now-btn").addEventListener("click", () => {
      modalOverlay.classList.remove("open");
      const participateModal = document.getElementById("participate-modal-overlay");
      const noteInput = document.getElementById("input-message");
      if (participateModal) {
        if (noteInput) {
          noteInput.value = `Deseo inscribirme en el taller: "${workshop.title}" (${workshop.schedule}).`;
        }
        participateModal.classList.add("open");
      }
    });
  }
}


// --- js\modules\participate.js ---
/**
 * Participate Module
 * Manages modal forms, profile chip selection, form validation, and toast alerts.
 */
function showToast(message, duration = 3500) {
  let toastContainer = document.querySelector(".toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--coral)" stroke-width="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
function initParticipate() {
  const modalOverlay = document.getElementById("participate-modal-overlay");
  const form = document.getElementById("participate-form");
  const formContainer = document.getElementById("participate-form-container");
  const successContainer = document.getElementById("participate-success-container");
  const openButtons = document.querySelectorAll("[data-open-participate]");
  const roleChips = document.querySelectorAll(".role-chip");

  if (!modalOverlay || !form) return;

  let selectedRole = "participante";

  // Role chips toggle
  roleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      roleChips.forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      selectedRole = chip.dataset.role;
    });
  });

  // Open modal buttons (e.g. Header CTA, Footer CTA, etc.)
  openButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      resetForm();
      modalOverlay.classList.add("open");
    });
  });

  // Close modal via close button or backdrop
  modalOverlay.querySelectorAll(".modal-close-trigger").forEach(btn => {
    btn.addEventListener("click", () => {
      modalOverlay.classList.remove("open");
    });
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("open");
    }
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("input-name")?.value.trim();
    const contact = document.getElementById("input-contact")?.value.trim();
    const message = document.getElementById("input-message")?.value.trim();

    if (!name || !contact) {
      showToast("Por favor, completa tu nombre y una vía de contacto.");
      return;
    }

    const newLead = {
      id: Date.now(),
      role: selectedRole,
      name,
      contact,
      message,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("hope_registrations") || "[]");
    existing.push(newLead);
    localStorage.setItem("hope_registrations", JSON.stringify(existing));

    // Show success view
    if (formContainer && successContainer) {
      formContainer.style.display = "none";
      successContainer.style.display = "block";
    }

    showToast("¡Gracias por sumarte! Hemos recibido tu solicitud.");
  });

  function resetForm() {
    form.reset();
    roleChips.forEach((c, idx) => {
      if (idx === 0) c.classList.add("selected");
      else c.classList.remove("selected");
    });
    selectedRole = "participante";
    if (formContainer && successContainer) {
      formContainer.style.display = "block";
      successContainer.style.display = "none";
    }
  }

  // Also bind reset button inside success container
  const newRegistrationBtn = document.getElementById("btn-new-registration");
  if (newRegistrationBtn) {
    newRegistrationBtn.addEventListener("click", resetForm);
  }
}


// --- js\modules\impact.js ---
/**
 * Impact & Method Module
 * Handles animated metric counter on scroll and interactive process accordion.
 */
function initImpactAndMethod() {
  initProcessAccordion();
  initMetricCounters();
}

function initProcessAccordion() {
  const phaseItems = document.querySelectorAll(".phase-item");
  if (!phaseItems.length) return;

  phaseItems.forEach(item => {
    const header = item.querySelector(".phase-header");
    if (header) {
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Close other items for single-open accordion feel
        phaseItems.forEach(other => other.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // Open first phase by default
  if (phaseItems[0]) {
    phaseItems[0].classList.add("open");
  }
}

function initMetricCounters() {
  const metricsSection = document.getElementById("impacto");
  const metricValues = document.querySelectorAll(".metric-grid strong");

  if (!metricsSection || !metricValues.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricsSection);

  function animateCounters() {
    metricValues.forEach(el => {
      const text = el.textContent.trim();
      if (text === "12") {
        countUp(el, 0, 12, 1200);
      } else if (text === "4") {
        countUp(el, 0, 4, 1000);
      }
    });
  }

  function countUp(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(easeOutQuad * (end - start) + start);
      element.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  }
}


// --- js\app.js ---
/**
 * HOPE - Master Application Orchestrator
 * Integrates all dynamic features: Navigation, Aula HOPE, Podcast Player, Workshops, Participation, and Impact.
 */






document.addEventListener("DOMContentLoaded", () => {
  console.log("🌱 Inicializando Proyecto HOPE — Inclusión social · Valencia");

  initNavigation();
  initAula();
  initPodcast();
  initWorkshops();
  initParticipate();
  initImpactAndMethod();

  console.log("✓ Todos los módulos de HOPE activos y en ejecución.");
});


