/**
 * HOPE - Master Application Orchestrator
 * Integrates all dynamic features: Navigation, Aula HOPE, Podcast Player, Workshops, Participation, and Impact.
 */

import { initNavigation } from "./modules/nav.js";
import { initAula } from "./modules/aula.js";
import { initPodcast } from "./modules/podcast.js";
import { initWorkshops } from "./modules/workshops.js";
import { initParticipate } from "./modules/participate.js";
import { initImpactAndMethod } from "./modules/impact.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌱 Inicializando Proyecto HOPE — Inclusión social · Valencia");

  initNavigation();
  initAula();
  initPodcast();
  initWorkshops();
  initParticipate();
  initImpactAndMethod();

  console.log("✓ Todos los módulos de HOPE activos y en ejecución.");
});
