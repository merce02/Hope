import React from "react";
import { Workshop } from "../types";

interface WorkshopModalProps {
  workshop: Workshop | null;
  onClose: () => void;
  onEnroll: (workshop: Workshop) => void;
}

export const WorkshopModal: React.FC<WorkshopModalProps> = ({ workshop, onClose, onEnroll }) => {
  if (!workshop) return null;

  return (
    <div className="modal-overlay open" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Cerrar ventana">✕</button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <span className="section-label">Taller {workshop.num}</span>
          <span style={{ background: "rgba(239, 106, 76, 0.15)", color: "var(--coral)", padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700 }}>
            {workshop.spotsAvailable} plazas disponibles
          </span>
        </div>

        <h3 style={{ fontSize: "34px", marginBottom: "12px" }}>{workshop.title}</h3>
        <p style={{ color: "var(--ink-light)", marginBottom: "22px", fontSize: "15px" }}>{workshop.description}</p>

        <div style={{ background: "#ede8dc", padding: "18px 22px", borderRadius: "4px", marginBottom: "24px", fontSize: "13px" }}>
          <p style={{ marginBottom: "8px" }}><strong>📅 Horario:</strong> {workshop.schedule}</p>
          <p><strong>📍 Lugar:</strong> {workshop.location}</p>
        </div>

        <h4 style={{ fontSize: "18px", marginBottom: "12px" }}>Objetivos y contenidos del taller:</h4>
        <ul style={{ listStyle: "none", marginBottom: "28px" }}>
          {workshop.objectives.map((obj, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "6px 0", fontSize: "13px", color: "var(--ink)" }}>
              <span style={{ color: "var(--coral)", fontWeight: 700, lineHeight: 1 }}>✓</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: "14px", justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button type="button" className="button" style={{ border: "1px solid var(--line)", color: "var(--ink)" }} onClick={onClose}>
            Cerrar
          </button>
          <button type="button" className="button button-coral" onClick={() => onEnroll(workshop)}>
            Inscribirme en este taller
          </button>
        </div>
      </div>
    </div>
  );
};
