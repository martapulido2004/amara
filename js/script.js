document.addEventListener("DOMContentLoaded", () => {

  
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  if (slides.length > 1) {
    let currentIndex = 0;
    const intervalMs = 3000;

   setInterval(() => {
      slides[currentIndex].classList.remove("is-active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("is-active");
    }, intervalMs);
  }

  const waveTexts = Array.from(document.querySelectorAll(".wave-marquee.is-animated textPath"));

  if (!waveTexts.length) return;

  const speed = 2.2;
  let offset = 0;
  let lastTimestamp = null;

  const animateWaveText = (timestamp) => {
    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }

    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    offset = (offset + speed * deltaSeconds) % 100;
    const normalizedOffset = ((offset % 100) + 100) % 100;

    waveTexts.forEach((textPath, index) => {
      const loopOffset = normalizedOffset - (index * 100);
      textPath.setAttribute("startOffset", `${loopOffset}%`);
    });

    requestAnimationFrame(animateWaveText);
  };

  requestAnimationFrame(animateWaveText);
});

document.addEventListener("DOMContentLoaded", () => {
  const switcher = document.querySelector("[data-auth-switcher]");
  if (!switcher) return;

  const tabs = Array.from(switcher.querySelectorAll("[data-auth-target]"));
  const panels = Array.from(switcher.querySelectorAll("[data-auth-panel]"));

  const activate = (target) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.authTarget === target;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.authPanel === target;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => activate(tab.dataset.authTarget));
  });

  switcher.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    const currentIndex = tabs.findIndex((tab) => tab.classList.contains("is-active"));
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];

    activate(nextTab.dataset.authTarget);
    nextTab.focus();
    event.preventDefault();
  });
});