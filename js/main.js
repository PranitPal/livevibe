/**
 * LIVEVIBE - Main Application JavaScript
 * Manages site-wide interactions, mobile navigation, dark/light theme toggle,
 * next event countdown timer, featured cards rendering, and scroll animations.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initThemeToggle();
  initCountdownTimer();
  initFeaturedEvents();
  initGenreClicks();
  initScrollReveal();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Mobile Navigation
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navMenu = document.querySelector(".nav-menu");

  // Sticky header scroll effect
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile menu toggle
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
      hamburgerBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          navMenu.classList.remove("open");
          hamburgerBtn.setAttribute("aria-expanded", "false");
          hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
          document.body.style.overflow = "";
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   2. Dark / Light Mode Toggle
   (In-Memory only - NO LocalStorage as per project specification)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  if (!themeToggleBtns.length) return;

  // Dark mode is default
  let isLightMode = false;

  const updateIcons = () => {
    themeToggleBtns.forEach(btn => {
      btn.innerHTML = isLightMode
        ? '<i class="fa-solid fa-moon"></i>'
        : '<i class="fa-solid fa-sun"></i>';
      btn.setAttribute("title", isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode");
      btn.setAttribute("aria-label", isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode");
    });
  };

  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      isLightMode = !isLightMode;
      if (isLightMode) {
        document.body.classList.add("light-theme");
      } else {
        document.body.classList.remove("light-theme");
      }
      updateIcons();
    });
  });

  updateIcons();
}

/* --------------------------------------------------------------------------
   3. Next Concert Live Countdown Timer
   Dynamically finds the nearest upcoming concert from LiveVibeData
   -------------------------------------------------------------------------- */
function initCountdownTimer() {
  const countdownContainer = document.querySelector("#countdown-timer-widget");
  if (!countdownContainer || !window.LiveVibeData) return;

  const nextEvent = window.LiveVibeData.getNextUpcomingEvent();
  if (!nextEvent) {
    countdownContainer.innerHTML = `
      <div class="container text-center py-4">
        <p class="text-secondary"><i class="fa-solid fa-info-circle"></i> Check back soon for newly announced concert tours!</p>
      </div>
    `;
    return;
  }

  // Update target title & artist in banner
  const artistEl = document.querySelector("#countdown-artist-name");
  const titleEl = document.querySelector("#countdown-event-title");
  const venueEl = document.querySelector("#countdown-venue-name");
  const ctaBtn = document.querySelector("#countdown-cta-btn");

  if (artistEl) artistEl.textContent = nextEvent.artist;
  if (titleEl) titleEl.textContent = nextEvent.title;
  if (venueEl) venueEl.textContent = `${nextEvent.venue}, ${nextEvent.city}`;
  if (ctaBtn) {
    ctaBtn.href = `event-details.html?id=${nextEvent.id}`;
  }

  const daysVal = document.querySelector("#countdown-days");
  const hoursVal = document.querySelector("#countdown-hours");
  const minutesVal = document.querySelector("#countdown-minutes");
  const secondsVal = document.querySelector("#countdown-seconds");

  const targetDate = new Date(nextEvent.isoDate).getTime();

  function updateClock() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysVal) daysVal.textContent = "00";
      if (hoursVal) hoursVal.textContent = "00";
      if (minutesVal) minutesVal.textContent = "00";
      if (secondsVal) secondsVal.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysVal) daysVal.textContent = String(days).padStart(2, "0");
    if (hoursVal) hoursVal.textContent = String(hours).padStart(2, "0");
    if (minutesVal) minutesVal.textContent = String(minutes).padStart(2, "0");
    if (secondsVal) secondsVal.textContent = String(seconds).padStart(2, "0");
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   4. Featured Events on Homepage (Displays at least 6 concert cards)
   -------------------------------------------------------------------------- */
function initFeaturedEvents() {
  const featuredContainer = document.querySelector("#featured-events-grid");
  if (!featuredContainer || !window.LiveVibeData) return;

  // Retrieve all events, show first 6 on homepage
  const allEvents = window.LiveVibeData.getAllEvents();
  const featuredEvents = allEvents.slice(0, 6);

  featuredContainer.innerHTML = featuredEvents.map(event => createEventCardHtml(event)).join("");
}

/* --------------------------------------------------------------------------
   Reusable Event Card Generator
   -------------------------------------------------------------------------- */
function createEventCardHtml(event) {
  return `
    <article class="event-card reveal">
      <div class="event-poster-wrap">
        <img class="event-poster" src="${escapeHtml(event.image)}" alt="${escapeHtml(event.artist)} - ${escapeHtml(event.title)}" loading="lazy">
        <div class="event-poster-overlay"></div>
        <span class="badge badge-pill event-genre-badge">${escapeHtml(event.genre)}</span>
        <span class="event-city-badge"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(event.city)}</span>
      </div>
      <div class="event-card-body">
        <div class="event-artist-tag">${escapeHtml(event.artist)}</div>
        <h3 class="event-card-title">${escapeHtml(event.title)}</h3>
        <div class="event-meta-list">
          <div class="event-meta-item">
            <i class="fa-regular fa-calendar"></i>
            <span>${escapeHtml(event.date)} &bull; ${escapeHtml(event.time)}</span>
          </div>
          <div class="event-meta-item">
            <i class="fa-solid fa-map-pin"></i>
            <span>${escapeHtml(event.venue)}</span>
          </div>
        </div>
        <p class="event-card-desc">${escapeHtml(event.description)}</p>
        <div class="event-card-actions">
          <a href="event-details.html?id=${event.id}" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-eye"></i> View Details
          </a>
          <a href="register.html?event=${event.id}" class="btn btn-primary btn-sm">
            <i class="fa-solid fa-ticket"></i> Register
          </a>
        </div>
      </div>
    </article>
  `;
}

/* --------------------------------------------------------------------------
   5. Genre Shortcut Clicks (Homepage -> Events page with genre filter)
   -------------------------------------------------------------------------- */
function initGenreClicks() {
  const genreCards = document.querySelectorAll(".genre-card");
  genreCards.forEach(card => {
    card.addEventListener("click", (e) => {
      const genre = card.getAttribute("data-genre");
      if (genre) {
        window.location.href = `events.html?genre=${encodeURIComponent(genre)}`;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   6. Scroll-Based Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    revealElements.forEach(el => el.classList.add("active"));
  }
}

/* --------------------------------------------------------------------------
   HTML Escaping Helper
   -------------------------------------------------------------------------- */
function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Expose helper globally
window.createEventCardHtml = createEventCardHtml;
window.escapeHtml = escapeHtml;
