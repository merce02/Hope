import React from "react";

interface HeroProps {
  onPlayPodcastClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPlayPodcastClick }) => {
  return (
    <section id="inicio" className="hero">
      <div className="hero-copy">
        <div className="eyebrow"><span></span> Inclusión social · Valencia</div>
        <h1>Aprender abre<br />nuevos <em>caminos.</em></h1>
        <p className="hero-intro">
          Acompañamos a las personas del centro El Carme para que la tecnología y el idioma sean herramientas de autonomía, conexión y futuro.
        </p>

        <div className="hero-actions">
          <a className="button button-coral" href="#proyecto">
            Conoce el proyecto
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"></path>
              <path d="m13 6 6 6-6 6"></path>
            </svg>
          </a>
          <button type="button" className="text-link" onClick={onPlayPodcastClick}>
            <span className="mini-play">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m8 5 11 7-11 7V5Z"></path>
              </svg>
            </span>
            Escucha sus historias
          </button>
        </div>

        <div className="hero-note">
          <div className="avatar-stack">
            <span>M</span>
            <span>N</span>
            <span>+</span>
          </div>
          <p>
            <strong>Un proyecto hecho en compañía</strong><br />
            Talleres semanales y atención cercana
          </p>
        </div>
      </div>

      <div className="hero-visual">
        <div className="photo-frame">
          <img
            alt="Persona aprendiendo y utilizando tecnología en un entorno amigable"
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
          />
          <span className="photo-credit">Foto: David L. Espina Rincon · Unsplash</span>
        </div>

        <div className="floating-card">
          <span className="floating-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 3-1.2 3.8L7 8l3.8 1.2L12 13l1.2-3.8L17 8l-3.8-1.2L12 3Z"></path>
              <path d="m5 14-.7 2.3L2 17l2.3.7L5 20l.7-2.3L8 17l-2.3-.7L5 14ZM19 13l-.5 1.5L17 15l1.5.5L19 17l.5-1.5L21 15l-1.5-.5L19 13Z"></path>
            </svg>
          </span>
          <div>
            <strong>La confianza también se aprende</strong>
            <small>Paso a paso, a tu ritmo</small>
          </div>
        </div>

        <div className="circle-word">crecer · conectar · aprender · </div>
      </div>
    </section>
  );
};
