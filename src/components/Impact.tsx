import React, { useState, useEffect, useRef } from "react";

export const Impact: React.FC = () => {
  const [countPlazas, setCountPlazas] = useState(0);
  const [countFases, setCountFases] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let animated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          animated = true;
          // Count animation
          let p = 0;
          const pInterval = setInterval(() => {
            p += 1;
            setCountPlazas(p);
            if (p >= 12) clearInterval(pInterval);
          }, 80);

          let f = 0;
          const fInterval = setInterval(() => {
            f += 1;
            setCountFases(f);
            if (f >= 4) clearInterval(fInterval);
          }, 200);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="impacto" className="impact section-pad" ref={sectionRef}>
      <div className="impact-copy">
        <div className="section-label light">05 — Medimos lo que importa</div>
        <h2>Pequeños logros.<br /><em>Grandes cambios.</em></h2>
        <p>No se trata solo de saber usar una herramienta. Se trata de sentir que puedes hacerlo por ti mismo.</p>
      </div>

      <div className="metric-grid">
        <article>
          <strong>{countPlazas || 12}</strong>
          <span>plazas activas en el centro<br />El Carme (Valencia)</span>
        </article>
        <article>
          <strong>1:1</strong>
          <span>acompañamiento y tutorías<br />personalizadas</span>
        </article>
        <article>
          <strong>{countFases || 4}</strong>
          <span>fases de trabajo<br />continuo y seguimiento</span>
        </article>
        <article className="metric-accent">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2L12 3Z"></path>
            <path d="m5 14-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14ZM19 13l-.5 1.5L17 15l1.5.5L19 17l.5-1.5L21 15l-1.5-.5L19 13Z"></path>
          </svg>
          <span>Más autonomía.<br />Más confianza.</span>
        </article>
      </div>
    </section>
  );
};
