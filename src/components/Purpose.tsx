import React from "react";

export const Purpose: React.FC = () => {
  return (
    <section id="proyecto" className="statement section-pad">
      <div className="section-label">01 — Nuestro propósito</div>
      <div className="statement-grid">
        <h2>La inclusión digital<br />es inclusión <em>social.</em></h2>
        <div className="statement-copy">
          <p>Cuando lo digital se convierte en una barrera, las oportunidades se alejan. HOPE nace para acercarlas de nuevo.</p>
          <p>Compartimos conocimientos, conversación y tiempo para que cada persona pueda desenvolverse con más seguridad en la sociedad que habita.</p>
          <a href="#metodo" className="underlined-link">
            Cómo lo hacemos
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m13 6 6 6-6 6"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
