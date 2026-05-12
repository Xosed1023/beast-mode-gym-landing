const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const header = document.querySelector("header");

function getHeaderOffset() {
  if (!header) return 0;
  const styles = window.getComputedStyle(header);
  const paddingBottom = Number.parseFloat(styles.paddingBottom) || 0;
  return header.getBoundingClientRect().height + paddingBottom + 12;
}

function easeInOutCubic(progress) {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function smoothScrollTo(target) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
  const destination = Math.max(targetTop, 0);

  if (prefersReducedMotion) {
    window.scrollTo(0, destination);
    return;
  }

  const start = window.scrollY;
  const distance = destination - start;
  const duration = 850;
  let startTime = null;

  function step(timestamp) {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    smoothScrollTo(target);

    if (window.location.hash !== targetId) {
      window.history.pushState(null, "", targetId);
    }
  });
});

window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (!target) return;
  window.setTimeout(() => {
    smoothScrollTo(target);
  }, 60);
});

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
    const isOpen = !menu.classList.contains("hidden");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const reveals = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-6");
        entry.target.classList.add("opacity-100", "translate-y-0");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => {
    item.classList.remove("opacity-0", "translate-y-6");
    item.classList.add("opacity-100", "translate-y-0");
  });
}

const testimonials = Array.from(document.querySelectorAll(".testimonial"));
const dotsContainer = document.querySelector(".slider-dots");
let currentSlide = 0;
let sliderInterval;

function showSlide(index) {
  testimonials.forEach((slide, slideIndex) => {
    slide.classList.toggle("hidden", slideIndex !== index);
  });

  if (dotsContainer) {
    dotsContainer.querySelectorAll(".slider-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("bg-white", dotIndex === index);
      dot.classList.toggle("shadow-[0_0_0_6px_rgba(255,255,255,0.14)]", dotIndex === index);
      dot.classList.toggle("bg-white/30", dotIndex !== index);
      dot.setAttribute("aria-selected", String(dotIndex === index));
    });
  }
}

function startSlider() {
  if (testimonials.length < 2) return;
  sliderInterval = window.setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    showSlide(currentSlide);
  }, 4500);
}

if (dotsContainer && testimonials.length) {
  testimonials.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider-dot h-3 w-3 rounded-full bg-white/30 transition";
    dot.setAttribute("aria-label", `Ver testimonio ${index + 1}`);
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      window.clearInterval(sliderInterval);
      startSlider();
    });
    dotsContainer.appendChild(dot);
  });

  showSlide(currentSlide);
  if (!prefersReducedMotion) {
    startSlider();
  }
}

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = newsletterForm.querySelector("button");
    if (button) {
      button.textContent = "Gracias";
      button.disabled = true;
    }
  });
}
