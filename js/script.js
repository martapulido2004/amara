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
  const textSeparation = 71.5;
  const initialOffset = 38;
  let offset = initialOffset;
  let lastTimestamp = null;

  waveTexts.forEach((textPath, index) => {
    const loopOffset = initialOffset - (index * textSeparation);
    textPath.setAttribute("startOffset", `${loopOffset}%`);
  });

  const animateWaveText = (timestamp) => {
    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }

    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    offset = (offset + speed * deltaSeconds) % 100;
    const normalizedOffset = ((offset % 100) + 100) % 100;

    waveTexts.forEach((textPath, index) => {
      const loopOffset = normalizedOffset - (index * textSeparation);
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
  const authContainer = document.querySelector(".perfil-auth");

  const activate = (target) => {
    const isRegister = target === "register";
    switcher.classList.toggle("is-register-mode", isRegister);
    if (authContainer) {
      authContainer.classList.toggle("is-register", isRegister);
    }
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

  const requestedView = new URLSearchParams(window.location.search).get("view");
  const initialTab =
    tabs.find((tab) => tab.dataset.authTarget === requestedView) ||
    tabs.find((tab) => tab.classList.contains("is-active"));

  if (initialTab) {
    activate(initialTab.dataset.authTarget);
  }

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

document.addEventListener("DOMContentLoaded", () => {
  const revealItems = Array.from(document.querySelectorAll("[data-amara-care-reveal]"));
  if (!revealItems.length) return;

  // Activa una entrada suave para la sección de cuidado creativo del home.
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.22 }
  );

  revealItems.forEach((item) => observer.observe(item));
});
