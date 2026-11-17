import React, { useState, useEffect, useRef } from "react";
import { PODCAST_EPISODES } from "../data/content";

export const Podcast: React.FC = () => {
  const [activeEpisodeIdx, setActiveEpisodeIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSec, setCurrentSec] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const episode = PODCAST_EPISODES[activeEpisodeIdx];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const startAudioTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current && AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current?.state === "suspended") {
        audioCtxRef.current.resume();
      }

      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(164.81, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.03, audioCtxRef.current.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      }
    } catch (e) {
      console.warn("Audio Context init fallback", e);
    }
  };

  const stopAudioTone = () => {
    if (gainNodeRef.current && audioCtxRef.current) {
      try {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.4);
        setTimeout(() => {
          oscillatorRef.current?.stop();
          oscillatorRef.current?.disconnect();
          oscillatorRef.current = null;
        }, 400);
      } catch {
        // cleanup
      }
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      startAudioTone();
    } else {
      setIsPlaying(false);
      stopAudioTone();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSec((prev) => {
          if (prev < episode.durationSec) return prev + 1;
          setIsPlaying(false);
          stopAudioTone();
          return 0;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, episode.durationSec]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const sec = Math.round((val / 100) * episode.durationSec);
    setCurrentSec(sec);
  };

  const switchEpisode = (idx: number) => {
    setIsPlaying(false);
    stopAudioTone();
    setCurrentSec(0);
    setActiveEpisodeIdx(idx);
  };

  return (
    <section id="podcast" className="podcast section-pad">
      <div className={`podcast-art ${isPlaying ? "playing" : ""}`}>
        <div className="sound-lines" aria-hidden="true">
          {[36, 58, 80, 48, 68, 92, 56, 76, 40, 64, 88, 52, 70, 44, 82].map((height, i) => (
            <i key={i} style={{ height: `${height}%` }}></i>
          ))}
        </div>
        <div className="podcast-title">
          <span>HOPE presenta</span>
          <strong>Voces<br />que abren<br />camino</strong>
          <small>Un podcast sobre vida, cambio y autonomía</small>
        </div>
      </div>

      <div className="podcast-copy">
        <div className="section-label">03 — El podcast</div>
        <h2>Historias que merecen ser <em>escuchadas.</em></h2>
        <p>Un espacio híbrido de entrevistas, narración y storytelling para devolver visibilidad y voz a quienes tantas veces quedan fuera de la conversación.</p>

        <div className="player-container">
          <div className="episode-selector">
            {PODCAST_EPISODES.map((ep, idx) => (
              <button
                key={ep.id}
                type="button"
                className={`ep-btn ${idx === activeEpisodeIdx ? "active" : ""}`}
                onClick={() => switchEpisode(idx)}
              >
                Ep. 0{ep.id}
              </button>
            ))}
          </div>

          <div className="player">
            <button
              type="button"
              className="player-play-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pausar episodio" : "Reproducir episodio"}
            >
              {isPlaying ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" rx="1"></rect>
                  <rect x="14" y="4" width="4" height="16" rx="1"></rect>
                </svg>
              ) : (
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 5 11 7-11 7V5Z"></path>
                </svg>
              )}
            </button>
            <div className="track-info">
              <div className="track-meta">
                <strong>{episode.title}</strong>
                <span>{formatTime(currentSec)} / {episode.durationStr}</span>
              </div>
              <input
                type="range"
                className="scrubber-range"
                min="0"
                max="100"
                value={(currentSec / episode.durationSec) * 100 || 0}
                onChange={handleSeek}
                aria-label="Progreso del episodio"
              />
            </div>
          </div>
        </div>

        <p className="coming-soon"><span></span> Primera temporada disponible · Episodios semanales</p>
      </div>
    </section>
  );
};
