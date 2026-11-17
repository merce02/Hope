/**
 * Aula HOPE Module
 * Interactive guided itinerary with tabs, interactive skill checklists, and persistent progress.
 */

export const modulesData = [
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

export function initAula() {
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
