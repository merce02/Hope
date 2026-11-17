import React from "react";
import { WORKSHOPS } from "../data/content";
import { Workshop } from "../types";

interface WorkshopsProps {
  onSelectWorkshop: (workshop: Workshop) => void;
}

export const Workshops: React.FC<WorkshopsProps> = ({ onSelectWorkshop }) => {
  return (
    <section id="talleres" className="workshops section-pad">
      <div className="section-head">
        <div>
          <div className="section-label light">02 — Talleres</div>
          <h2>Herramientas para<br /><em>avanzar.</em></h2>
        </div>
        <p>Aprendizaje útil, práctico y humano. Desde lo más básico hasta los próximos grandes pasos.</p>
      </div>

      <div className="workshop-grid">
        {WORKSHOPS.map((workshop) => (
          <article
            key={workshop.id}
            className="workshop-card"
            role="button"
            tabIndex={0}
            onClick={() => onSelectWorkshop(workshop)}
            aria-label={`Ver información del taller ${workshop.title}`}
          >
            <div className="card-top">
              <span className="workshop-badge">Presencial</span>
              <span>{workshop.num}</span>
            </div>

            <div>
              <span className="workshop-icon">
                {workshop.id === 1 && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path>
                  </svg>
                )}
                {workshop.id === 2 && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 8 6 6M4 14l6-6 2-3"></path>
                    <path d="M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"></path>
                  </svg>
                )}
                {workshop.id === 3 && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"></circle>
                    <path d="M4 22a8 8 0 0 1 16 0"></path>
                  </svg>
                )}
              </span>
              <h3>{workshop.title}</h3>
              <p>{workshop.description}</p>
            </div>

            <div className="workshop-card-action">
              <span>Saber más y horarios</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m13 6 6 6-6 6"></path>
              </svg>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
