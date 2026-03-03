// Registration Timeline Management
const REGISTRATION_OPEN_DATE = new Date("2026-06-25");
const RACE_DATE = new Date("2026-09-25");

function checkRegistrationStatus() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (today < REGISTRATION_OPEN_DATE) {
    return "pre-registration";
  } else if (today < RACE_DATE) {
    return "registration-open";
  } else {
    return "closed";
  }
}

function updateRegistrationBanner() {
  const status = checkRegistrationStatus();
  const bannerContainer = document.querySelector(".registration-banner");

  if (!bannerContainer) {
    // Create banner if it doesn't exist
    const banner = document.createElement("div");
    banner.className = "registration-banner";
    banner.id = "registrationBanner";

    const hero = document.querySelector(".hero");
    if (hero && hero.parentNode) {
      hero.parentNode.insertBefore(banner, hero.nextSibling);
    }
  }

  const banner = document.getElementById("registrationBanner");

  if (status === "pre-registration") {
    banner.className = "registration-banner pre-registration";
    banner.innerHTML = `
      <div class="banner-content">
        <h3>Registration Opens June 25, 2026</h3>
        <p>Mark your calendar for early registration access to the Utah Mixed Epic</p>
      </div>
    `;
    banner.style.display = "block";
  } else if (status === "registration-open") {
    banner.className = "registration-banner registration-open";
    banner.innerHTML = `
      <div class="banner-content">
        <h3>Registration is Now Open!</h3>
        <p>Secure your spot for the Utah Mixed Epic 2026</p>
        <a href="registration.html" class="banner-cta">Register Now</a>
      </div>
    `;
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }

  // Update hero CTA button state
  const heroCTA = document.querySelector(".hero .cta-button");
  if (heroCTA) {
    if (status === "pre-registration") {
      heroCTA.disabled = true;
      heroCTA.style.opacity = "0.6";
      heroCTA.style.cursor = "not-allowed";
      heroCTA.title = "Registration opens June 25, 2026";
    } else if (status === "registration-open") {
      heroCTA.disabled = false;
      heroCTA.style.opacity = "1";
      heroCTA.style.cursor = "pointer";
      heroCTA.title = "";
    } else {
      heroCTA.disabled = true;
      heroCTA.style.opacity = "0.6";
      heroCTA.style.cursor = "not-allowed";
      heroCTA.title = "Registration has closed";
    }
  }
}

// Registration Form - Category Selection
// Photo gallery settings - Google Apps Script Proxy for Google Photos
const PHOTO_GALLERY_ENDPOINT = "https://script.google.com/macros/s/AKfycby1IDGrIoVRblsh1qxJh_Rg-aWEMFN91ZJ_EiKwmkjYqsN168ewohBmCCbPWui00Jp4/exec";

function loadPhotoGallery() {
  console.log("🖼️ Gallery loader starting...");

  if (!PHOTO_GALLERY_ENDPOINT) {
    console.warn("⚠️ Photo gallery endpoint not configured");
    return;
  }

  console.log("📡 Fetching from:", PHOTO_GALLERY_ENDPOINT);

  fetch(PHOTO_GALLERY_ENDPOINT, {
    method: "GET",
    mode: "cors",
    cache: "no-cache"
  })
    .then((resp) => {
      console.log("📨 Response status:", resp.status, resp.statusText);
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
      }
      return resp.json();
    })
    .then((data) => {
      console.log("📦 Raw response data:", data);

      // Handle error response from Apps Script
      if (data.error) {
        console.error("❌ Gallery error from script:", data.error);
        return;
      }

      const photoUrls = Array.isArray(data) ? data : [];
      console.log("✓ Photo URLs found:", photoUrls.length);

      if (photoUrls.length === 0) {
  
        
        return;
      }

      const gallery = document.querySelector(".masonry-gallery");
      if (!gallery) {
        console.error("❌ Gallery element not found in DOM");
        return;
      }

      console.log("🎨 Clearing gallery and adding", photoUrls.length, "photos...");
      gallery.innerHTML = "";
      photoUrls.forEach((url, idx) => {
        const item = document.createElement("div");
        item.className = "masonry-item" + (idx % 5 === 0 ? " tall" : "");
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Gallery image";
        img.loading = "lazy";
        item.appendChild(img);
        gallery.appendChild(item);
      });
      console.log("✅ Gallery loaded successfully!");
    })
    .catch((err) => {
      console.error("❌ Gallery load error:", err.message, err);
    });
}

// (No pricing calculations needed - event is free)

// Form Submission
document.addEventListener("DOMContentLoaded", function () {
  loadPhotoGallery();
  updateRegistrationBanner();
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable submit button to prevent duplicate submissions
      const submitButton = registrationForm.querySelector(
        'button[type="submit"]',
      );
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      // Get form data
      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value,
        emergencyContact: document.getElementById("emergencyContact").value,
        emergencyPhone: document.getElementById("emergencyPhone").value,
        waiver: document.getElementById("waiver").checked,
        newsletter: document.getElementById("newsletter").checked,
      };

      // Validate form
      if (!validateForm(formData)) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        alert("Please fill in all required fields correctly.");
        return;
      }

      // Submit to Google Sheets
      submitToGoogleSheets(
        formData,
        registrationForm,
        submitButton,
        originalButtonText,
      );
    });
  }
});

// Form Validation
function validateForm(data) {
  // Basic validation
  if (!data.firstName.trim() || !data.lastName.trim()) {
    alert("Please enter your full name.");
    return false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Phone validation
  const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
  if (!phoneRegex.test(data.phone)) {
    alert("Please enter a valid phone number.");
    return false;
  }

  if (!data.course) {
    alert("Please select a category.");
    return false;
  }

  return true;
}

// Google Sheets Integration
const GOOGLE_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzvt6LJCbgu7ri-pvF8IJcVRopNhXn2Oz6RUv1wQ1D_HR138cXrppAmym3LteNURcQKQg/exec"; // You'll set this after deploying the Google Apps Script

function sendToGoogleSheets(data) {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    console.warn(
      "Google Sheets URL not configured. Check your deployment URL.",
    );
    return Promise.reject("Google Sheets not configured");
  }

  // Prepare data with timestamp
  const payload = {
    timestamp: new Date().toISOString(),
    ...data,
  };

  return fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log("Data sent to Google Sheets successfully");
      return payload;
    })
    .catch((error) => {
      console.error("Error sending to Google Sheets:", error);
      throw error;
    });
}

// LocalStorage Management for Registrations (backup)
function saveRegistration(data) {
  // Get existing registrations
  let registrations =
    JSON.parse(localStorage.getItem("umeRegistrations")) || [];

  // Add timestamp and unique ID
  const registration = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...data,
  };

  // Add to array
  registrations.push(registration);

  // Save back to localStorage
  localStorage.setItem("umeRegistrations", JSON.stringify(registrations));

  console.log(
    "Registration saved locally! Total registrations:",
    registrations.length,
  );
  return registration;
}

function getAllRegistrations() {
  return JSON.parse(localStorage.getItem("umeRegistrations")) || [];
}

function deleteRegistration(id) {
  let registrations =
    JSON.parse(localStorage.getItem("umeRegistrations")) || [];
  registrations = registrations.filter((reg) => reg.id !== id);
  localStorage.setItem("umeRegistrations", JSON.stringify(registrations));
  console.log("Registration deleted!");
}

// Submit to Google Sheets
function submitToGoogleSheets(data, form, submitButton, originalButtonText) {
  sendToGoogleSheets(data)
    .then(() => {
      // Also save locally as backup
      saveRegistration(data);
      console.log("Registration submitted successfully!");

      // Show success message
      showSuccessMessage(data);

      // Reset form
      form.reset();

      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    })
    .catch((error) => {
      console.error("Could not reach Google Sheets, saving locally:", error);
      // Still save locally if Google Sheets fails
      saveRegistration(data);

      // Show error message with fallback notice
      alert(
        `Thank you for registering, ${data.firstName}!\n\nYour registration has been saved. We will contact you at ${data.email} or ${data.phone} with confirmation details.`,
      );

      // Reset form
      form.reset();

      // Re-enable submit button
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    });
}

// Modal helpers
function createNotificationModal() {
  if (document.getElementById("notificationModal")) return;

  const modal = document.createElement("div");
  modal.id = "notificationModal";
  modal.className = "notification-modal";

  const content = document.createElement("div");
  content.className = "modal-content";

  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", hideNotificationModal);

  content.appendChild(closeBtn);
  modal.appendChild(content);
  document.body.appendChild(modal);
}

function showNotification(title, message) {
  createNotificationModal();
  const modal = document.getElementById("notificationModal");
  const content = modal.querySelector(".modal-content");

  // clear existing body except close button
  content.innerHTML = "";
  const closeBtn = document.createElement("button");
  closeBtn.className = "modal-close";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", hideNotificationModal);
  content.appendChild(closeBtn);

  const h2 = document.createElement("h2");
  h2.textContent = title;
  content.appendChild(h2);

  const p = document.createElement("p");
  p.innerHTML = message.replace(/\n/g, "<br />");
  content.appendChild(p);

  modal.classList.add("show");
}

function hideNotificationModal() {
  const modal = document.getElementById("notificationModal");
  if (modal) modal.classList.remove("show");
}

// Success Message
function showSuccessMessage(data) {
  const selectedCourse =
    document.getElementById("course").options[
      document.getElementById("course").selectedIndex
    ].text;

  const message = `
Thank you for registering, ${data.firstName}!<br><br>
<strong>Registration Confirmation:</strong><br>
- Name: ${data.firstName} ${data.lastName}<br>
- Email: ${data.email}<br>
- Phone: ${data.phone}<br>
- Route: ${selectedCourse}<br>
- Emergency Contact: ${data.emergencyContact}<br><br>
A confirmation email will be sent to ${data.email} shortly.<br>
Check your email for race day details, route maps, and further instructions.<br><br>
We look forward to seeing you at the Utah Mixed Epic!
    `;

  showNotification("Registration Submitted", message);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Mobile menu functionality (if needed)
function initializeMobileMenu() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelector(".nav-links");

  // This can be extended for mobile hamburger menu functionality
  if (window.innerWidth <= 768) {
    // Mobile-specific functionality can be added here
  }
}

// Initialize on page load
window.addEventListener("load", function () {
  initializeMobileMenu();
});

// Handle window resize
window.addEventListener("resize", function () {
  initializeMobileMenu();
});

// Add active class to current navigation link
document.addEventListener("DOMContentLoaded", function () {
  const currentLocation = location.pathname;
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    if (
      link.getAttribute("href") === currentLocation.split("/").pop() ||
      (currentLocation.endsWith("/") &&
        link.getAttribute("href") === "index.html")
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

// Analytics tracking (placeholder for future integration)
function trackEvent(eventName, eventData) {
  // This can be connected to Google Analytics, Segment, or another tracking service
  console.log("Event Tracked:", eventName, eventData);
}

// Category selection analytics
document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("course");
  if (categorySelect) {
    categorySelect.addEventListener("change", function () {
      const selectedCategory = this.options[this.selectedIndex].text;
      trackEvent("category_selected", { category: selectedCategory });
    });
  }
});
