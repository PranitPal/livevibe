/**
 * LIVEVIBE - Events Exploration Page Logic
 * Handles dynamic search, genre filtering, sorting, query parameter parsing,
 * result counts, and no-results feedback states.
 */

document.addEventListener("DOMContentLoaded", () => {
  initEventsPage();
});

function initEventsPage() {
  const eventsGrid = document.querySelector("#all-events-grid");
  if (!eventsGrid || !window.LiveVibeData) return;

  const searchInput = document.querySelector("#event-search-input");
  const searchClearBtn = document.querySelector("#search-clear-btn");
  const genrePills = document.querySelectorAll(".genre-pill-btn");
  const sortSelect = document.querySelector("#event-sort-select");
  const resultsCountEl = document.querySelector("#results-count-text");
  const clearFiltersBtn = document.querySelector("#clear-all-filters-btn");

  // State
  let currentSearch = "";
  let currentGenre = "All Events";
  let currentSort = "upcoming";

  // Check URL query parameters (e.g. ?genre=Bollywood or ?search=coldplay)
  const urlParams = new URLSearchParams(window.location.search);
  const paramGenre = urlParams.get("genre");
  const paramSearch = urlParams.get("search");

  if (paramGenre) {
    currentGenre = paramGenre;
    // Highlight matching genre pill if present
    genrePills.forEach(pill => {
      const g = pill.getAttribute("data-genre");
      if (g && g.toLowerCase() === paramGenre.toLowerCase()) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  if (paramSearch) {
    currentSearch = paramSearch;
    if (searchInput) {
      searchInput.value = paramSearch;
      if (searchClearBtn) searchClearBtn.style.display = "block";
    }
  }

  // Render function
  function renderEvents() {
    const results = window.LiveVibeData.filterEvents({
      searchTerm: currentSearch,
      genre: currentGenre,
      sortBy: currentSort
    });

    // Update count display
    const totalEvents = window.LiveVibeData.getAllEvents().length;
    if (resultsCountEl) {
      if (currentSearch || (currentGenre && currentGenre !== "All Events")) {
        resultsCountEl.innerHTML = `Showing <strong>${results.length}</strong> of <strong>${totalEvents}</strong> concerts`;
      } else {
        resultsCountEl.innerHTML = `Showing all <strong>${results.length}</strong> upcoming concerts`;
      }
    }

    // Handle empty state
    if (results.length === 0) {
      eventsGrid.innerHTML = `
        <div class="no-results-box">
          <div class="no-results-icon"><i class="fa-solid fa-compact-disc fa-spin" style="--fa-animation-duration: 6s;"></i></div>
          <h3>No Matching Concerts Found</h3>
          <p>We couldn't find any live music performances matching "${window.escapeHtml(currentSearch || currentGenre)}".</p>
          <button type="button" class="btn btn-primary" id="empty-state-reset-btn">
            <i class="fa-solid fa-rotate-left"></i> Reset All Filters
          </button>
        </div>
      `;

      const resetBtn = document.querySelector("#empty-state-reset-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", resetFilters);
      }
      return;
    }

    // Render cards
    eventsGrid.innerHTML = results.map(event => window.createEventCardHtml(event)).join("");

    // Trigger reveal observer for new cards
    if (typeof window.initScrollReveal === "function") {
      window.initScrollReveal();
    } else {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
    }
  }

  // Reset Filters Helper
  function resetFilters() {
    currentSearch = "";
    currentGenre = "All Events";
    currentSort = "upcoming";

    if (searchInput) searchInput.value = "";
    if (searchClearBtn) searchClearBtn.style.display = "none";
    if (sortSelect) sortSelect.value = "upcoming";

    genrePills.forEach(pill => {
      if (pill.getAttribute("data-genre") === "All Events") {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });

    // Update URL quietly without reloading
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);

    renderEvents();
  }

  // Event Listeners: Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim();
      if (searchClearBtn) {
        searchClearBtn.style.display = currentSearch.length > 0 ? "block" : "none";
      }
      renderEvents();
    });
  }

  // Event Listeners: Clear Search Button
  if (searchClearBtn) {
    searchClearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      searchClearBtn.style.display = "none";
      currentSearch = "";
      renderEvents();
    });
  }

  // Event Listeners: Genre Filter Pills
  genrePills.forEach(pill => {
    pill.addEventListener("click", () => {
      genrePills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      currentGenre = pill.getAttribute("data-genre") || "All Events";
      renderEvents();
    });
  });

  // Event Listeners: Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderEvents();
    });
  }

  // Event Listeners: Clear All Filters Button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", resetFilters);
  }

  // Initial Render
  renderEvents();
}
