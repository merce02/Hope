import React, { useState } from "react";
import { UserRole, RegistrationLead } from "../types";

interface ParticipateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export const ParticipateModal: React.FC<ParticipateModalProps> = ({ isOpen, onClose, initialMessage = "" }) => {
  const [role, setRole] = useState<UserRole>("participante");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    const lead: RegistrationLead = {
      id: Date.now(),
      role,
      name: name.trim(),
      contact: contact.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("hope_registrations") || "[]");
    existing.push(lead);
    localStorage.setItem("hope_registrations", JSON.stringify(existing));

    setIsSuccess(true);
  };

  const handleReset = () => {
    setName("");
    setContact("");
    setMessage("");
    setIsSuccess(false);
  };

  return (
    <div className="modal-overlay open" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar ventana">✕</button>

        {!isSuccess ? (
          <div>
            <span className="section-label">Participa en HOPE</span>
            <h3 style={{ marginBottom: "8px" }}>Únete al proyecto</h3>
            <p className="modal-subtitle">Cuéntanos cómo te gustaría formar parte del centro El Carme.</p>

            <div className="role-chips" role="radiogroup" aria-label="Selecciona tu perfil">
              <button
                type="button"
                className={`role-chip ${role === "participante" ? "selected" : ""}`}
                onClick={() => setRole("participante")}
              >
                Quiero aprender
              </button>
              <button
                type="button"
                className={`role-chip ${role === "voluntario" ? "selected" : ""}`}
                onClick={() => setRole("voluntario")}
              >
                Ser voluntario/a
              </button>
              <button
                type="button"
                className={`role-chip ${role === "entidad" ? "selected" : ""}`}
                onClick={() => setRole("entidad")}
              >
                Entidad colaboradora
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="modal-name">Nombre y apellidos *</label>
                <input
                  id="modal-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Amina Benali / Carlos Gómez"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-contact">Teléfono o WhatsApp / Correo electrónico *</label>
                <input
                  id="modal-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Ej. 612 34 56 78 o email@ejemplo.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-msg">Mensaje o taller de interés</label>
                <textarea
                  id="modal-msg"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="¿En qué te gustaría participar o qué necesitas aprender?"
                />
              </div>

              <button type="submit" className="button button-coral" style={{ width: "100%" }}>
                Enviar solicitud
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m13 6 6 6-6 6"></path>
                </svg>
              </button>
            </form>
          </div>
        ) : (
          <div className="form-success-box">
            <div className="form-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3>¡Solicitud recibida!</h3>
            <p style={{ color: "var(--ink-light)", margin: "12px 0 24px", fontSize: "14px" }}>
              Gracias por dar este paso. Un miembro del equipo de HOPE en el centro El Carme se pondrá en contacto contigo muy pronto.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button type="button" className="button button-coral" onClick={onClose}>
                Aceptar
              </button>
              <button type="button" className="button" style={{ border: "1px solid var(--line)" }} onClick={handleReset}>
                Enviar otra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
