document.addEventListener("DOMContentLoaded", () => {

  const menuLinks = Array.from(
    document.querySelectorAll(".topbar nav a:not(.icon)")
  );
  const currentPath = window.location.pathname.split("/").pop() || "home.html";
  const currentPage = currentPath === "" ? "home.html" : currentPath;

  menuLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const isHomeAlias =
      (currentPage === "index.html" || currentPage === "") && href === "home.html";
    const isActive = href === currentPage || isHomeAlias;
    link.classList.toggle("active", isActive);
  });
  
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

  const waveTexts = Array.from(document.querySelectorAll(".wave-marquee textPath"));

  if (!waveTexts.length) return;

  const speed = 12;
  let offset = 0;
  let lastTimestamp = null;

  const animateWaveText = (timestamp) => {
    if (lastTimestamp === null) {
      lastTimestamp = timestamp;
    }

    const deltaSeconds = (timestamp - lastTimestamp) / 1000;
    lastTimestamp = timestamp;

    offset = (offset + speed * deltaSeconds) % 100;

    waveTexts.forEach((textPath, index) => {
      textPath.setAttribute("startOffset", `${offset + index * 100}%`);
    });

    requestAnimationFrame(animateWaveText);
  };

  requestAnimationFrame(animateWaveText);
});