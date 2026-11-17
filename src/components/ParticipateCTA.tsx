import React from "react";

interface ParticipateCTAProps {
  onOpenParticipate: () => void;
}

export const ParticipateCTA: React.FC<ParticipateCTAProps> = ({ onOpenParticipate }) => {
  return (
    <section id="participa" className="cta section-pad">
      <div className="cta-icon">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 14a8 8 0 0 1 16 0"></path>
          <path d="M18 19c0 1.7-1.3 3-3 3v-8h5v5h-2ZM6 19c0 1.7 1.3 3 3 3v-8H4v5h2Z"></path>
        </svg>
      </div>

      <div className="cta-text">
        <span>Este proyecto se construye entre personas</span>
        <h2>¿Nos ayudas a abrir<br />el próximo camino?</h2>
      </div>

      <button
        type="button"
        className="button button-dark"
        onClick={onOpenParticipate}
      >
        Hablemos
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14"></path>
          <path d="m13 6 6 6-6 6"></path>
        </svg>
      </button>
    </section>
  );
};
