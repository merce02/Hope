/**
 * Workshops Module
 * Handles workshop data, modal viewer, and quick-enrollment handoff.
 */

export const workshopsData = [
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

export function initWorkshops() {
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
