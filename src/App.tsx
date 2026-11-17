import React, { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Purpose } from "./components/Purpose";
import { Workshops } from "./components/Workshops";
import { AulaHope } from "./components/AulaHope";
import { Podcast } from "./components/Podcast";
import { Method } from "./components/Method";
import { Impact } from "./components/Impact";
import { ParticipateCTA } from "./components/ParticipateCTA";
import { Footer } from "./components/Footer";
import { ParticipateModal } from "./components/ParticipateModal";
import { WorkshopModal } from "./components/WorkshopModal";
import { Workshop, AulaModule } from "./types";

export const App: React.FC = () => {
  const [isParticipateOpen, setIsParticipateOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [activeGuideModule, setActiveGuideModule] = useState<AulaModule | null>(null);
  const [initialLeadMessage, setInitialLeadMessage] = useState("");

  const handleOpenParticipate = (presetMessage = "") => {
    setInitialLeadMessage(presetMessage);
    setIsParticipateOpen(true);
  };

  const handleEnrollFromWorkshop = (workshop: Workshop) => {
    setSelectedWorkshop(null);
    handleOpenParticipate(`Deseo inscribirme en el taller: "${workshop.title}" (${workshop.schedule}).`);
  };

  const handlePlayPodcastScroll = () => {
    document.getElementById("podcast")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="root">
      <main>
        <Header onOpenParticipate={() => handleOpenParticipate()} />
        <Hero onPlayPodcastClick={handlePlayPodcastScroll} />
        <Purpose />
        <Workshops onSelectWorkshop={(w) => setSelectedWorkshop(w)} />
        <AulaHope
          onOpenGuide={(m) => setActiveGuideModule(m)}
          onOpenParticipate={() => handleOpenParticipate()}
        />
        <Podcast />
        <Method />
        <Impact />
        <ParticipateCTA onOpenParticipate={() => handleOpenParticipate()} />
        <Footer />

        {/* Modals */}
        <ParticipateModal
          isOpen={isParticipateOpen}
          onClose={() => setIsParticipateOpen(false)}
          initialMessage={initialLeadMessage}
        />

        <WorkshopModal
          workshop={selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
          onEnroll={handleEnrollFromWorkshop}
        />

        {/* Guide Modal */}
        {activeGuideModule && (
          <div className="modal-overlay open" onClick={() => setActiveGuideModule(null)} role="dialog" aria-modal="true">
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="modal-close-btn" onClick={() => setActiveGuideModule(null)} aria-label="Cerrar ventana">✕</button>
              <span className="section-label">Módulo 0{activeGuideModule.id} · {activeGuideModule.level}</span>
              <h3 style={{ margin: "12px 0 16px" }}>{activeGuideModule.title}</h3>
              <p style={{ color: "var(--ink-light)", marginBottom: "20px" }}>{activeGuideModule.details}</p>

              <h4 style={{ fontSize: "20px", margin: "20px 0 10px" }}>Habilidades que practicarás:</h4>
              <ul style={{ listStyle: "none", marginBottom: "24px" }}>
                {activeGuideModule.skills.map((s) => (
                  <li key={s.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0", fontSize: "14px" }}>
                    <span style={{ color: "var(--coral)", fontWeight: 700 }}>•</span> {s.text}
                  </li>
                ))}
              </ul>

              <h4 style={{ fontSize: "20px", margin: "20px 0 10px" }}>Consejos prácticos del equipo HOPE:</h4>
              <div style={{ background: "#ede8dc", padding: "16px 20px", borderRadius: "4px", marginBottom: "26px" }}>
                {activeGuideModule.tips.map((tip, idx) => (
                  <p key={idx} style={{ fontSize: "13px", marginBottom: "6px", color: "var(--ink)" }}>💡 {tip}</p>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "14px" }}>
                <button type="button" className="button button-coral" onClick={() => setActiveGuideModule(null)}>
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
