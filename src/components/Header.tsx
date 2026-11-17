import React, { useState, useEffect } from "react";

interface HeaderProps {
  onOpenParticipate: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenParticipate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <a href="#inicio" className="brand" aria-label="HOPE, inicio">
        <span className="brand-mark"><span>H</span></span>
        <span>HOPE</span>
      </a>

      <nav className={`nav ${isMobileMenuOpen ? "open" : ""}`} aria-label="Navegación principal">
        <a href="#proyecto" onClick={() => setIsMobileMenuOpen(false)}>El proyecto</a>
        <a href="#talleres" onClick={() => setIsMobileMenuOpen(false)}>Talleres</a>
        <a href="#aula" onClick={() => setIsMobileMenuOpen(false)}>Aula</a>
        <a href="#podcast" onClick={() => setIsMobileMenuOpen(false)}>Podcast</a>
        <a href="#impacto" onClick={() => setIsMobileMenuOpen(false)}>Impacto</a>
        <button
          type="button"
          className="nav-cta"
          onClick={() => {
            setIsMobileMenuOpen(false);
            onOpenParticipate();
          }}
        >
          Quiero participar
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="m13 6 6 6-6 6"></path>
          </svg>
        </button>
      </nav>

      <button
        className="menu-button"
        aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
      </button>
    </header>
  );
};
