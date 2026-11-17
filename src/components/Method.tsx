import React, { useState } from "react";

interface Phase {
  num: string;
  title: string;
  summary: string;
  details: string;
}

const PHASES: Phase[] = [
  {
    num: "01",
    title: "Escuchamos",
    summary: "Entrevistas y observación directa para conocer las necesidades y objetivos reales de cada persona.",
    details: "Nos sentamos a conversar sin prisas. Averiguamos qué trámites o herramientas generan más dudas (citas sanitarias, LABORA, banca móvil, WhatsApp) para trazar un plan a medida."
  },
  {
    num: "02",
    title: "Diseñamos",
    summary: "Contenidos claros, materiales visuales y actividades adaptadas al ritmo de cada participante.",
    details: "Creamos fichas simplificadas, tutoriales en vídeo y guías de bolsillo con letra grande y vocabulario cercano, sin tecnicismos innecesarios."
  },
  {
    num: "03",
    title: "Acompañamos",
    summary: "Talleres semanales, tutorías individualizadas y práctica en un entorno seguro y de confianza.",
    details: "Cada alumno cuenta con el apoyo de mentores voluntarios. Si algo no sale a la primera, lo repetimos las veces que haga falta con paciencia y una sonrisa."
  },
  {
    num: "04",
    title: "Medimos",
    summary: "Seguimiento continuo de habilidades adquiridas, trámites resueltos y confianza recuperada.",
    details: "Registramos los logros: desde la primera cita médica solicitada sin intermediarios hasta el primer currículum enviado. El indicador más valioso es la autonomía lograda."
  }
];

export const Method: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const togglePhase = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="metodo" className="method section-pad">
      <div className="method-head">
        <div className="section-label">04 — El proceso</div>
        <h2>Acompañar también es<br /><em>estar presente.</em></h2>
      </div>

      <div className="phase-list">
        {PHASES.map((phase, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={phase.num} className={`phase-item ${isOpen ? "open" : ""}`}>
              <div
                className="phase-header"
                role="button"
                tabIndex={0}
                onClick={() => togglePhase(index)}
              >
                <span>{phase.num}</span>
                <h3>{phase.title}</h3>
                <p>{phase.summary}</p>
                <span className="phase-toggle">{isOpen ? "▲" : "▼"}</span>
              </div>
              {isOpen && (
                <div className="phase-details" style={{ maxHeight: "200px" }}>
                  {phase.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
