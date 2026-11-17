/**
 * Podcast Module
 * Web Audio ambient soundscape + interactive player with episodes, scrubbing, and waveform animation.
 */

export const podcastEpisodes = [
  {
    id: 1,
    title: "Episodio 01 · Empezar de nuevo",
    guest: "Elena y Karim (Barrio del Carmen)",
    durationStr: "18:42",
    durationSec: 1122,
    description: "Elena y Karim comparten cómo el Centro El Carme y las sesiones de HOPE les ayudaron a perder el miedo a los trámites digitales y a conectar con la comunidad."
  },
  {
    id: 2,
    title: "Episodio 02 · La primera pantalla",
    guest: "Tariq y Bea (Voluntaria)",
    durationStr: "14:15",
    durationSec: 855,
    description: "Una conversación cercana sobre la primera vez que envías un currículum digital, la paciencia y el poder del acompañamiento individualizado."
  },
  {
    id: 3,
    title: "Episodio 03 · Redes que sostienen",
    guest: "María y Samuel (Coordinación)",
    durationStr: "22:05",
    durationSec: 1325,
    description: "Exploramos el impacto comunitario y social en Valencia: cómo la tecnología, lejos de aislar, puede ser el puente hacia una red vecinal sólida."
  }
];

export function initPodcast() {
  const artContainer = document.querySelector(".podcast-art");
  const playButton = document.querySelector(".player-play-btn");
  const trackTitle = document.querySelector(".track-info strong");
  const trackTime = document.querySelector(".track-info span");
  const scrubber = document.querySelector(".scrubber-range");
  const episodeSelector = document.querySelector(".episode-selector");

  if (!playButton || !scrubber) return;

  let currentEpisodeIndex = 0;
  let isPlaying = false;
  let currentTimeSec = 0;
  let intervalId = null;

  // Web Audio Context for authentic, self-contained playback
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function startSynthesizedAudio() {
    try {
      initAudio();
      if (!audioCtx) return;
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      // Create a gentle, ambient chord sound
      oscillator = audioCtx.createOscillator();
      gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      // Gentle warm tone (E3 note)
      oscillator.frequency.setValueAtTime(164.81, audioCtx.currentTime);

      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 1.2);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
    } catch (e) {
      console.warn("Web Audio playback not supported or user-gesture required", e);
    }
  }

  function stopSynthesizedAudio() {
    if (gainNode && audioCtx) {
      try {
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
        setTimeout(() => {
          if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            oscillator = null;
          }
        }, 500);
      } catch (e) {
        // ignore cleanup errors
      }
    }
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  function renderEpisodesNav() {
    if (!episodeSelector) return;
    episodeSelector.innerHTML = podcastEpisodes.map((ep, idx) => `
      <button class="ep-btn ${idx === currentEpisodeIndex ? "active" : ""}" data-index="${idx}">
        Ep. 0${ep.id}
      </button>
    `).join("");

    episodeSelector.querySelectorAll(".ep-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const nextIdx = parseInt(btn.dataset.index, 10);
        if (nextIdx !== currentEpisodeIndex) {
          switchEpisode(nextIdx);
        }
      });
    });
  }

  function updateTrackDisplay() {
    const ep = podcastEpisodes[currentEpisodeIndex];
    if (trackTitle) {
      trackTitle.textContent = ep.title;
      trackTitle.title = ep.description;
    }
    if (trackTime) {
      trackTime.textContent = `${formatTime(currentTimeSec)} / ${ep.durationStr}`;
    }
    const percent = (currentTimeSec / ep.durationSec) * 100;
    scrubber.value = percent;
  }

  function switchEpisode(index) {
    const wasPlaying = isPlaying;
    if (isPlaying) {
      togglePlay(false);
    }
    currentEpisodeIndex = index;
    currentTimeSec = 0;
    renderEpisodesNav();
    updateTrackDisplay();

    if (wasPlaying) {
      togglePlay(true);
    }
  }

  function togglePlay(forceState) {
    isPlaying = forceState !== undefined ? forceState : !isPlaying;

    if (isPlaying) {
      playButton.innerHTML = `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
        </svg>
      `;
      playButton.setAttribute("aria-label", "Pausar episodio");
      if (artContainer) artContainer.classList.add("playing");

      startSynthesizedAudio();

      intervalId = setInterval(() => {
        const ep = podcastEpisodes[currentEpisodeIndex];
        if (currentTimeSec < ep.durationSec) {
          currentTimeSec += 1;
          updateTrackDisplay();
        } else {
          togglePlay(false);
          currentTimeSec = 0;
          updateTrackDisplay();
        }
      }, 1000);
    } else {
      playButton.innerHTML = `
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="m8 5 11 7-11 7V5Z"></path>
        </svg>
      `;
      playButton.setAttribute("aria-label", "Reproducir episodio");
      if (artContainer) artContainer.classList.remove("playing");

      stopSynthesizedAudio();
      clearInterval(intervalId);
    }
  }

  // Scrubber drag / click
  scrubber.addEventListener("input", (e) => {
    const ep = podcastEpisodes[currentEpisodeIndex];
    const newPercent = parseFloat(e.target.value);
    currentTimeSec = Math.round((newPercent / 100) * ep.durationSec);
    updateTrackDisplay();
  });

  playButton.addEventListener("click", () => {
    togglePlay();
  });

  // Secondary hero play button triggers podcast player
  const heroAudioLink = document.querySelector(".hero-actions .text-link");
  if (heroAudioLink) {
    heroAudioLink.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("podcast")?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        if (!isPlaying) togglePlay(true);
      }, 600);
    });
  }

  renderEpisodesNav();
  updateTrackDisplay();
}
