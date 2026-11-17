/**
 * Participate Module
 * Manages modal forms, profile chip selection, form validation, and toast alerts.
 */

export function showToast(message, duration = 3500) {
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

export function initParticipate() {
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
