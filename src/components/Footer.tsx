import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-brand">
        <a href="#inicio" className="brand" aria-label="HOPE, inicio">
          <span className="brand-mark"><span>H</span></span>
          <span>HOPE</span>
        </a>
        <p>Inclusión social y bienestar digital en Valencia.</p>
      </div>

      <div className="footer-affiliate">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
        <span>Universitat Politècnica de València · ETSINF</span>
      </div>

      <div className="footer-links">
        <a href="#proyecto">Proyecto</a>
        <a href="#talleres">Talleres</a>
        <a href="#aula">Aula</a>
        <a href="#podcast">Podcast</a>
      </div>

      <div className="copyright">
        <span>© 2027 HOPE · Proyecto de Inclusión Digital y Social · El Carme, Valencia</span>
        <span>Contacto: mmtorres@etsinf.upv.es</span>
      </div>
    </footer>
  );
};
