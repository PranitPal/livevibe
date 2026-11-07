/**
 * LIVEVIBE - Event Details Page Logic
 * Parses URL query parameter ?id=X, retrieves the concert from the centralized dataset,
 * renders detailed event information, and handles invalid or missing IDs gracefully.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderEventDetails();
});

function renderEventDetails() {
  const container = document.querySelector("#event-details-root");
  if (!container || !window.LiveVibeData) return;

  // Extract ID from query string
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  // Validate presence and existence
  if (!eventId || isNaN(parseInt(eventId, 10))) {
    showNotFoundError(container, "Missing or invalid concert identifier in the URL.");
    return;
  }

  const event = window.LiveVibeData.getEventById(eventId);
  if (!event) {
    showNotFoundError(container, `We could not locate any concert corresponding to ID #${eventId}.`);
    return;
  }

  // Update Document Title
  document.title = `${event.title} — ${event.artist} | LiveVibe`;

  // Render Full Event Details
  container.innerHTML = `
    <!-- Large Concert Hero Banner -->
    <section class="event-details-hero">
      <img class="event-details-hero-bg" src="${window.escapeHtml(event.image)}" alt="${window.escapeHtml(event.artist)} - ${window.escapeHtml(event.title)}">
      <div class="event-details-hero-overlay"></div>
      <div class="container event-details-content-wrap">
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
          <a href="events.html">Events</a>
          <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
          <span style="color: var(--text-primary); font-weight: 600;">${window.escapeHtml(event.title)}</span>
        </nav>

        <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 12px; flex-wrap: wrap;">
          <span class="badge badge-pill">${window.escapeHtml(event.genre)}</span>
          <span class="badge badge-warm"><i class="fa-solid fa-location-dot"></i> ${window.escapeHtml(event.city)}</span>
        </div>

        <div style="font-size: 1.1rem; font-weight: 700; color: var(--accent-secondary); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;">
          ${window.escapeHtml(event.artist)}
        </div>

        <h1 style="font-size: 3rem; margin-bottom: 16px; line-height: 1.15;">
          ${window.escapeHtml(event.title)}
        </h1>

        <div style="display: flex; align-items: center; gap: 24px; flex-wrap: wrap; color: #E4E4E7; font-size: 1rem;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-regular fa-calendar" style="color: var(--accent-primary);"></i>
            <span>${window.escapeHtml(event.date)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-regular fa-clock" style="color: var(--accent-primary);"></i>
            <span>${window.escapeHtml(event.time)}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fa-solid fa-map-pin" style="color: var(--accent-primary);"></i>
            <span>${window.escapeHtml(event.venue)}, ${window.escapeHtml(event.city)}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content & Sidebar Grid -->
    <div class="container">
      <div class="event-details-grid">
        
        <!-- Left: Detailed Info -->
        <div class="event-main-info">
          
          <!-- Event Overview Card -->
          <article class="info-card">
            <h3><i class="fa-solid fa-circle-info"></i> About This Concert</h3>
            <p style="margin-bottom: 18px; font-size: 1.05rem;">
              ${window.escapeHtml(event.description)}
            </p>
            <p>
              ${window.escapeHtml(event.additionalDescription)}
            </p>

            <!-- Metadata Specs Grid -->
            <div class="meta-spec-grid">
              <div class="spec-item">
                <div class="spec-icon"><i class="fa-regular fa-calendar-check"></i></div>
                <div class="spec-details">
                  <span>Concert Date</span>
                  <strong>${window.escapeHtml(event.date)}</strong>
                </div>
              </div>

              <div class="spec-item">
                <div class="spec-icon"><i class="fa-solid fa-hourglass-half"></i></div>
                <div class="spec-details">
                  <span>Show Runtime</span>
                  <strong>${window.escapeHtml(event.duration || "Approx. 3 Hours")}</strong>
                </div>
              </div>

              <div class="spec-item">
                <div class="spec-icon"><i class="fa-solid fa-id-card"></i></div>
                <div class="spec-details">
                  <span>Age Requirement</span>
                  <strong>${window.escapeHtml(event.ageLimit || "All Ages Welcome")}</strong>
                </div>
              </div>

              <div class="spec-item">
                <div class="spec-icon"><i class="fa-solid fa-ticket"></i></div>
                <div class="spec-details">
                  <span>Ticket Tiers</span>
                  <strong>${window.escapeHtml(event.priceRange || "General Admission")}</strong>
                </div>
              </div>
            </div>
          </article>

          <!-- Highlights Card -->
          <article class="info-card">
            <h3><i class="fa-solid fa-wand-magic-sparkles"></i> Concert Production & Experience Highlights</h3>
            <div class="highlights-list">
              ${(event.highlights || [
                "Full stadium-grade spatial audio sound system",
                "World-class laser and synchronized lighting visuals",
                "Dedicated merchandise booth and artisan food village",
                "Professional on-site medical and guest support staff"
              ]).map(h => `
                <div class="highlight-row">
                  <i class="fa-solid fa-circle-check"></i>
                  <span>${window.escapeHtml(h)}</span>
                </div>
              `).join("")}
            </div>
          </article>

          <!-- Venue & Arrival Guide -->
          <article class="info-card">
            <h3><i class="fa-solid fa-location-arrow"></i> Venue & Entry Guidelines</h3>
            <p style="margin-bottom: 14px;">
              <strong>Venue:</strong> ${window.escapeHtml(event.venue)}, ${window.escapeHtml(event.city)}
            </p>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
              Gates open 2 hours prior to scheduled showtime (${window.escapeHtml(event.time)}). Please arrive early for security checks and digital QR wristband wrist-tagging. Ample parking is available at designated zone lots with shuttle connectivity.
            </p>
          </article>

          <!-- Navigation Action Row -->
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-top: 10px;">
            <a href="events.html" class="btn btn-secondary">
              <i class="fa-solid fa-arrow-left"></i> Back to Events
            </a>
            <a href="register.html?event=${event.id}" class="btn btn-primary btn-lg">
              <i class="fa-solid fa-ticket"></i> Register for This Concert
            </a>
          </div>

        </div>

        <!-- Right: Sticky Booking Interest Sidebar -->
        <aside class="event-booking-sidebar">
          <div class="booking-card">
            <span class="badge badge-warm" style="margin-bottom: 12px;">Exclusive Live Tour</span>
            <div class="booking-price-tag">Indicative Entry Price</div>
            <div class="booking-price-val">${window.escapeHtml(event.priceRange || "₹1,499 - ₹4,999")}</div>

            <ul class="booking-feature-list">
              <li><i class="fa-solid fa-circle-check"></i> Instant Digital Pass Confirmation</li>
              <li><i class="fa-solid fa-circle-check"></i> High Priority Tour Announcements</li>
              <li><i class="fa-solid fa-circle-check"></i> Zero Convenience Fee on Pre-Bookings</li>
              <li><i class="fa-solid fa-circle-check"></i> Accessible Seating Zones Available</li>
            </ul>

            <a href="register.html?event=${event.id}" class="btn btn-primary" style="width: 100%; margin-bottom: 12px;">
              <i class="fa-solid fa-ticket"></i> Register for This Concert
            </a>

            <a href="events.html" class="btn btn-secondary btn-sm" style="width: 100%;">
              <i class="fa-solid fa-chevron-left"></i> Explore Other Concerts
            </a>

            <div class="booking-card-divider"></div>

            <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; text-align: center;">
              <i class="fa-solid fa-shield-halved"></i> Official live partner &bull; Guaranteed valid entry pass for all registered attendees.
            </div>
          </div>
        </aside>

      </div>
    </div>
  `;
}

function showNotFoundError(container, message) {
  document.title = "Event Not Found — LiveVibe";
  container.innerHTML = `
    <div class="container section-padding">
      <div class="no-results-box" style="max-width: 650px; margin: 40px auto; padding: 56px 32px;">
        <div class="no-results-icon" style="color: var(--accent-secondary);">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h2 style="font-size: 2rem; margin-bottom: 12px;">Concert Not Found</h2>
        <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 24px;">
          ${window.escapeHtml(message)} The requested live concert entry may have expired or does not exist in our tour catalog.
        </p>
        <div style="display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;">
          <a href="events.html" class="btn btn-primary">
            <i class="fa-solid fa-list-ul"></i> Return to Events Catalog
          </a>
          <a href="index.html" class="btn btn-secondary">
            <i class="fa-solid fa-house"></i> Go to Homepage
          </a>
        </div>
      </div>
    </div>
  `;
}
