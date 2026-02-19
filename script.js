

function showError(fieldId, errorId, message) {
  var field = document.getElementById(fieldId);
  var errorSpan = document.getElementById(errorId);

  field.classList.remove("success-field");
  field.classList.add("error-field");

  errorSpan.textContent = message;
  errorSpan.classList.add("visible");
}


function clearError(fieldId, errorId) {
  var field = document.getElementById(fieldId);
  var errorSpan = document.getElementById(errorId);

  field.classList.remove("error-field");
  field.classList.add("success-field");

  errorSpan.classList.remove("visible");
}


function validateForm(event) {
  // Prevent the default browser form submission
  event.preventDefault();

  // ── Retrieve field values ────────────────────────────────
  var name     = document.getElementById("name").value.trim();
  var email    = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value;
  var mobile   = document.getElementById("mobile").value.trim();

  var isValid = true;

  // ── 1. Name Validation ───────────────────────────────────
  if (name === "") {
    showError("name", "nameError", "Name must not be empty.");
    isValid = false;
  } else if (name.length < 3) {
    showError("name", "nameError", "Name must be at least 3 characters long.");
    isValid = false;
  } else {
    clearError("name", "nameError");
  }

  // ── 2. Email Validation ──────────────────────────────────
  // Simple regex: something@something.something
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("email", "emailError", "Email must not be empty.");
    isValid = false;
  } else if (!emailPattern.test(email)) {
    showError("email", "emailError", "Enter a valid email address (e.g. user@example.com).");
    isValid = false;
  } else {
    clearError("email", "emailError");
  }

  // ── 3. Password Validation ───────────────────────────────
  if (password === "") {
    showError("password", "passwordError", "Password must not be empty.");
    isValid = false;
  } else if (password.length < 6) {
    showError("password", "passwordError", "Password must be at least 6 characters long.");
    isValid = false;
  } else {
    clearError("password", "passwordError");
  }

  // ── 4. Mobile Number Validation ──────────────────────────
  // Must be exactly 10 digits, no letters or spaces
  var mobilePattern = /^[0-9]{10}$/;
  if (mobile === "") {
    showError("mobile", "mobileError", "Mobile number must not be empty.");
    isValid = false;
  } else if (!mobilePattern.test(mobile)) {
    showError("mobile", "mobileError", "Enter a valid 10-digit mobile number (digits only).");
    isValid = false;
  } else {
    clearError("mobile", "mobileError");
  }

  // ── 5. Final Result ──────────────────────────────────────
  if (isValid) {
    // Show success banner inside the page
    var banner = document.getElementById("successBanner");
    banner.style.display = "block";

    // Optional: reset the form after a short delay
    setTimeout(function () {
      document.getElementById("registrationForm").reset();

      // Remove green borders after reset
      ["name", "email", "password", "mobile"].forEach(function (id) {
        document.getElementById(id).classList.remove("success-field");
      });

      banner.style.display = "none";
    }, 2500);
  }

  return isValid;
}
