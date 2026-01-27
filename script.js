// Registration Form - Category Selection
// (No pricing calculations needed - event is free)

// Form Submission
document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  if (registrationForm) {
    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        bikeType: document.getElementById("bikeType").value,
        experience: document.getElementById("experience").value,
        course: document.getElementById("course").value,
        emergencyContact: document.getElementById("emergencyContact").value,
        emergencyPhone: document.getElementById("emergencyPhone").value,
      };

      // Validate form
      if (!validateForm(formData)) {
        alert("Please fill in all required fields correctly.");
        return;
      }

      // Show success message
      showSuccessMessage(formData);

      // Reset form
      registrationForm.reset();
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

  // Age validation
  if (parseInt(data.age) < 16) {
    alert("You must be at least 16 years old to participate.");
    return false;
  }

  if (!data.course) {
    alert("Please select a category.");
    return false;
  }

  return true;
}

// Success Message
function showSuccessMessage(data) {
  const message = `
Thank you for registering, ${data.firstName}!

Registration Confirmation:
- Name: ${data.firstName} ${data.lastName}
- Email: ${data.email}
- Category: ${document.getElementById("course").options[document.getElementById("course").selectedIndex].text}

A confirmation email will be sent to ${data.email} shortly.
Check your email for race day details, route maps, and further instructions.

We look forward to seeing you at the Utah Mixed Epic!
    `;

  alert(message);

  // In a real application, you would send this data to a server
  console.log("Registration Data:", data);
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
  updatePrice();
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
