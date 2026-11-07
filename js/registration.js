/**
 * LIVEVIBE - Concert Registration & Verification Logic
 * Validates inputs, renders live concert preview, and presents confirmed registration modal.
 */

document.addEventListener("DOMContentLoaded", () => {
  initRegistrationPage();
});

function initRegistrationPage() {
  const form = document.querySelector("#registration-form");
  const concertSelect = document.querySelector("#concert-select");
  const fullNameInput = document.querySelector("#full-name");
  const emailInput = document.querySelector("#email-address");
  const phoneInput = document.querySelector("#phone-number");
  const termsCheckbox = document.querySelector("#terms-agreement");
  const previewCard = document.querySelector("#concert-preview-container");
  const modalOverlay = document.querySelector("#confirmation-modal");
  const modalCloseBtn = document.querySelector("#close-confirmation-btn");

  if (!form || !concertSelect || !window.LiveVibeData) return;

  const allEvents = window.LiveVibeData.getAllEvents();

  // 1. Populate Concert Dropdown
  concertSelect.innerHTML = '<option value="" disabled selected>-- Select an upcoming concert --</option>';
  allEvents.forEach(evt => {
    const opt = document.createElement("option");
    opt.value = evt.id;
    opt.textContent = `${evt.artist} – ${evt.title} (${evt.date})`;
    concertSelect.appendChild(opt);
  });

  // 2. Read ?event=ID from query string to preselect
  const urlParams = new URLSearchParams(window.location.search);
  const preselectId = urlParams.get("event") || urlParams.get("id");

  if (preselectId) {
    const matched = allEvents.find(e => e.id === parseInt(preselectId, 10));
    if (matched) {
      concertSelect.value = matched.id;
      updatePreview(matched);
    } else {
      updatePreview(allEvents[0]);
    }
  } else {
    // Default preview with first upcoming concert
    updatePreview(allEvents[0]);
  }

  // 3. Dropdown change listener
  concertSelect.addEventListener("change", (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedEvent = allEvents.find(ev => ev.id === selectedId);
    if (selectedEvent) {
      updatePreview(selectedEvent);
      clearFieldError(concertSelect);
    }
  });

  // Helper to update the live preview sidebar
  function updatePreview(event) {
    if (!previewCard || !event) return;
    previewCard.innerHTML = `
      <div class="preview-header">
        <h4><i class="fa-solid fa-compact-disc"></i> Selected Concert</h4>
        <span class="badge badge-pill">${window.escapeHtml(event.genre)}</span>
      </div>
      <div class="preview-body">
        <img src="${window.escapeHtml(event.image)}" alt="${window.escapeHtml(event.artist)}" class="preview-image">
        <div class="preview-artist">${window.escapeHtml(event.artist)}</div>
        <h3 class="preview-title">${window.escapeHtml(event.title)}</h3>
        <ul class="preview-meta">
          <li>
            <i class="fa-regular fa-calendar"></i>
            <span>${window.escapeHtml(event.date)} &bull; ${window.escapeHtml(event.time)}</span>
          </li>
          <li>
            <i class="fa-solid fa-map-pin"></i>
            <span>${window.escapeHtml(event.venue)}, ${window.escapeHtml(event.city)}</span>
          </li>
          <li>
            <i class="fa-solid fa-tags"></i>
            <span>Tier: ${window.escapeHtml(event.priceRange || "General Admission")}</span>
          </li>
        </ul>
        <div class="preview-disclaimer">
          <i class="fa-solid fa-circle-check" style="color: var(--accent-primary);"></i>
          Instant confirmation &bull; Priority queue access &bull; Digital pass delivered to your inbox.
        </div>
      </div>
    `;
  }

  // 4. Field Validation Helpers
  function validateFullName(val) {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Full name is required.";
    }
    if (trimmed.length < 2) {
      return "Full name must be at least 2 characters long.";
    }
    // Must contain letters, not only numbers or symbols
    if (!/[a-zA-Z]/.test(trimmed)) {
      return "Full name must contain alphabetic letters.";
    }
    // Realistic name check (letters, spaces, periods, hyphens, apostrophes)
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
      return "Full name contains invalid characters.";
    }
    return null;
  }

  function validateEmail(val) {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Email address is required.";
    }
    // Standard RFC-compatible regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(trimmed)) {
      return "Please enter a valid email address (e.g., name@example.com).";
    }
    return null;
  }

  function validatePhone(val) {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Phone number is required.";
    }
    // Indian 10-digit mobile number, optionally prefixed with +91 or 91
    // Format examples: 9876543210, +919876543210, +91 9876543210, 919876543210, +91-9876543210
    const cleanDigits = trimmed.replace(/[\s-]/g, "");
    const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanDigits)) {
      return "Please enter a valid 10-digit Indian mobile number (optionally with +91).";
    }
    return null;
  }

  function validateConcert(val) {
    if (!val || val === "") {
      return "Please select a concert event from the list.";
    }
    return null;
  }

  function validateTerms(checked) {
    if (!checked) {
      return "You must agree to the Terms and Conditions to proceed.";
    }
    return null;
  }

  // UI Error helpers
  function setFieldError(inputEl, message) {
    inputEl.classList.remove("is-valid");
    inputEl.classList.add("is-invalid");
    const parent = inputEl.closest(".form-group") || inputEl.parentElement;
    let feedback = parent.querySelector(".invalid-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      parent.appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.style.display = "block";
  }

  function clearFieldError(inputEl) {
    inputEl.classList.remove("is-invalid");
    inputEl.classList.add("is-valid");
    const parent = inputEl.closest(".form-group") || inputEl.parentElement;
    const feedback = parent.querySelector(".invalid-feedback");
    if (feedback) {
      feedback.textContent = "";
      feedback.style.display = "none";
    }
  }

  // Real-time inline feedback on blur / change
  fullNameInput.addEventListener("blur", () => {
    const err = validateFullName(fullNameInput.value);
    if (err) setFieldError(fullNameInput, err);
    else clearFieldError(fullNameInput);
  });
  fullNameInput.addEventListener("input", () => {
    if (fullNameInput.classList.contains("is-invalid")) {
      const err = validateFullName(fullNameInput.value);
      if (!err) clearFieldError(fullNameInput);
    }
  });

  emailInput.addEventListener("blur", () => {
    const err = validateEmail(emailInput.value);
    if (err) setFieldError(emailInput, err);
    else clearFieldError(emailInput);
  });
  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("is-invalid")) {
      const err = validateEmail(emailInput.value);
      if (!err) clearFieldError(emailInput);
    }
  });

  phoneInput.addEventListener("blur", () => {
    const err = validatePhone(phoneInput.value);
    if (err) setFieldError(phoneInput, err);
    else clearFieldError(phoneInput);
  });
  phoneInput.addEventListener("input", () => {
    if (phoneInput.classList.contains("is-invalid")) {
      const err = validatePhone(phoneInput.value);
      if (!err) clearFieldError(phoneInput);
    }
  });

  concertSelect.addEventListener("change", () => {
    const err = validateConcert(concertSelect.value);
    if (err) setFieldError(concertSelect, err);
    else clearFieldError(concertSelect);
  });

  termsCheckbox.addEventListener("change", () => {
    const err = validateTerms(termsCheckbox.checked);
    if (err) setFieldError(termsCheckbox, err);
    else clearFieldError(termsCheckbox);
  });

  // 5. Form Submit Handler (Strict frontend validation sequence)
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stop default browser submission

    // Validate all fields
    const nameErr = validateFullName(fullNameInput.value);
    const emailErr = validateEmail(emailInput.value);
    const phoneErr = validatePhone(phoneInput.value);
    const concertErr = validateConcert(concertSelect.value);
    const termsErr = validateTerms(termsCheckbox.checked);

    let hasErrors = false;
    let firstInvalidField = null;

    if (nameErr) {
      setFieldError(fullNameInput, nameErr);
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = fullNameInput;
    } else {
      clearFieldError(fullNameInput);
    }

    if (emailErr) {
      setFieldError(emailInput, emailErr);
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = emailInput;
    } else {
      clearFieldError(emailInput);
    }

    if (phoneErr) {
      setFieldError(phoneInput, phoneErr);
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = phoneInput;
    } else {
      clearFieldError(phoneInput);
    }

    if (concertErr) {
      setFieldError(concertSelect, concertErr);
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = concertSelect;
    } else {
      clearFieldError(concertSelect);
    }

    if (termsErr) {
      setFieldError(termsCheckbox, termsErr);
      hasErrors = true;
      if (!firstInvalidField) firstInvalidField = termsCheckbox;
    } else {
      clearFieldError(termsCheckbox);
    }

    if (hasErrors) {
      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return; // Stop submission
    }

    // ALL FIELDS ARE VALID!
    // Retrieve matched event for display
    const selectedId = parseInt(concertSelect.value, 10);
    const selectedEvent = allEvents.find(ev => ev.id === selectedId) || allEvents[0];
    const participantName = fullNameInput.value.trim();

    // Display confirmation modal with required information:
    // - Participant Name
    // - Selected Artist
    // - Concert Name
    // - Concert Date
    showConfirmationModal({
      participantName,
      artist: selectedEvent.artist,
      concertName: selectedEvent.title,
      concertDate: selectedEvent.date
    });

    // Reset the form so that no sensitive/personal data is retained
    form.reset();
    document.querySelectorAll(".form-control").forEach(el => {
      el.classList.remove("is-valid", "is-invalid");
    });
    termsCheckbox.classList.remove("is-valid", "is-invalid");
  });

  // 6. Confirmation Modal Presentation
  function showConfirmationModal(details) {
    if (!modalOverlay) return;

    const nameEl = document.querySelector("#conf-participant-name");
    const artistEl = document.querySelector("#conf-artist-name");
    const eventEl = document.querySelector("#conf-event-name");
    const dateEl = document.querySelector("#conf-event-date");

    if (nameEl) nameEl.textContent = details.participantName;
    if (artistEl) artistEl.textContent = details.artist;
    if (eventEl) eventEl.textContent = details.concertName;
    if (dateEl) dateEl.textContent = details.concertDate;

    modalOverlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function hideConfirmationModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", hideConfirmationModal);
  }

  // Also close if clicked outside card
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      hideConfirmationModal();
    }
  });
}
