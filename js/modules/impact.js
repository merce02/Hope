/**
 * Impact & Method Module
 * Handles animated metric counter on scroll and interactive process accordion.
 */

export function initImpactAndMethod() {
  initProcessAccordion();
  initMetricCounters();
}

function initProcessAccordion() {
  const phaseItems = document.querySelectorAll(".phase-item");
  if (!phaseItems.length) return;

  phaseItems.forEach(item => {
    const header = item.querySelector(".phase-header");
    if (header) {
      header.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        // Close other items for single-open accordion feel
        phaseItems.forEach(other => other.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });

  // Open first phase by default
  if (phaseItems[0]) {
    phaseItems[0].classList.add("open");
  }
}

function initMetricCounters() {
  const metricsSection = document.getElementById("impacto");
  const metricValues = document.querySelectorAll(".metric-grid strong");

  if (!metricsSection || !metricValues.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(metricsSection);

  function animateCounters() {
    metricValues.forEach(el => {
      const text = el.textContent.trim();
      if (text === "12") {
        countUp(el, 0, 12, 1200);
      } else if (text === "4") {
        countUp(el, 0, 4, 1000);
      }
    });
  }

  function countUp(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(easeOutQuad * (end - start) + start);
      element.textContent = current;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = end;
      }
    };
    window.requestAnimationFrame(step);
  }
}
