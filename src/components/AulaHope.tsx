import React, { useState } from "react";
import { AULA_MODULES } from "../data/content";
import { AulaModule } from "../types";

interface AulaHopeProps {
  onOpenGuide: (module: AulaModule) => void;
  onOpenParticipate: () => void;
}

export const AulaHope: React.FC<AulaHopeProps> = ({ onOpenGuide, onOpenParticipate }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [completedSkills, setCompletedSkills] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("hope_completed_skills") || "[]");
    } catch {
      return [];
    }
  });

  const currentModule = AULA_MODULES[activeIdx];

  const toggleSkill = (skillId: string) => {
    setCompletedSkills((prev) => {
      const updated = prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId];
      localStorage.setItem("hope_completed_skills", JSON.stringify(updated));
      return updated;
    });
  };

  const totalSkills = AULA_MODULES.reduce((acc, m) => acc + m.skills.length, 0);
  const progressPercent = Math.min(
    100,
    Math.round(((activeIdx + 1) / AULA_MODULES.length) * 50 + (completedSkills.length / totalSkills) * 50)
  );

  return (
    <section id="aula" className="learning section-pad">
      <div className="learning-intro">
        <div className="section-label">Aula HOPE — Aprendizaje guiado</div>
        <h2>Aprender haciendo,<br /><em>sin prisas.</em></h2>
        <p>Un itinerario educativo sencillo, visual y práctico. Cada módulo parte de una situación real y termina con una habilidad que puedes usar desde el primer día.</p>
        <div className="learning-principles">
          <span><i>1</i> A tu ritmo</span>
          <span><i>2</i> Con acompañamiento</span>
          <span><i>3</i> Con práctica real</span>
        </div>
      </div>

      <div className="lesson-browser">
        <div className="lesson-tabs" role="tablist" aria-label="Módulos del Aula HOPE">
          {AULA_MODULES.map((m, idx) => (
            <button
              key={m.id}
              className={idx === activeIdx ? "active" : ""}
              role="tab"
              aria-selected={idx === activeIdx}
              onClick={() => setActiveIdx(idx)}
            >
              <span>0{m.id}</span> Módulo {m.id}
            </button>
          ))}
        </div>

        <article className="lesson-panel" role="tabpanel">
          <div className="lesson-meta">
            <span>Módulo {currentModule.id}</span>
            <span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {currentModule.duration}
            </span>
            <span>{currentModule.level}</span>
          </div>

          <h3>{currentModule.title}</h3>
          <p>{currentModule.summary}</p>

          <div className="skill-list" role="group" aria-label="Habilidades del módulo">
            {currentModule.skills.map((skill) => {
              const isDone = completedSkills.includes(skill.id);
              return (
                <button
                  key={skill.id}
                  type="button"
                  className={`skill-item ${isDone ? "completed" : ""}`}
                  onClick={() => toggleSkill(skill.id)}
                  title="Haz clic para marcar como completada"
                >
                  <i>{isDone ? "✓" : "+"}</i>
                  <span>{skill.text}</span>
                </button>
              );
            })}
          </div>

          <div className="lesson-panel-actions">
            <button
              type="button"
              className="explore-lesson-btn"
              onClick={() => onOpenGuide(currentModule)}
            >
              Ver guía detallada del módulo
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m13 6 6 6-6 6"></path>
              </svg>
            </button>
            <button type="button" className="underlined-link" onClick={onOpenParticipate}>
              Participar en El Carme
            </button>
          </div>
        </article>

        <div className="lesson-progress">
          <span>Tu itinerario</span>
          <div className="progress-track">
            <i className="progress-fill" style={{ width: `${progressPercent}%` }}></i>
          </div>
          <strong>{activeIdx + 1}/{AULA_MODULES.length} ({completedSkills.length} logros)</strong>
        </div>
      </div>
    </section>
  );
};
