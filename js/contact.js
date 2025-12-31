// contact.js - Contact Page Functionality

document.addEventListener("DOMContentLoaded", function () {
  // Navigation Toggle
  const hamburger = document.getElementById("hamburger");
  const navList = document.getElementById("nav-list");

  if (hamburger && navList) {
    hamburger.addEventListener("click", function () {
      navList.classList.toggle("show");
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !navList.contains(event.target) &&
        !hamburger.contains(event.target)
      ) {
        navList.classList.remove("show");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Form Validation and Submission
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const successAlert = document.getElementById("successAlert");

  if (contactForm) {
    // Form elements
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    // Error elements
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    // Validation functions
    function validateName() {
      const name = nameInput.value.trim();
      if (!name) {
        showError(nameInput, nameError, "Name is required");
        return false;
      }
      if (name.length < 2) {
        showError(nameInput, nameError, "Name must be at least 2 characters");
        return false;
      }
      hideError(nameInput, nameError);
      return true;
    }

    function validateEmail() {
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email) {
        showError(emailInput, emailError, "Email is required");
        return false;
      }
      if (!emailRegex.test(email)) {
        showError(emailInput, emailError, "Please enter a valid email address");
        return false;
      }
      hideError(emailInput, emailError);
      return true;
    }

    function validateSubject() {
      const subject = subjectInput.value.trim();
      if (!subject) {
        showError(subjectInput, subjectError, "Subject is required");
        return false;
      }
      if (subject.length < 3) {
        showError(
          subjectInput,
          subjectError,
          "Subject must be at least 3 characters"
        );
        return false;
      }
      hideError(subjectInput, subjectError);
      return true;
    }

    function validateMessage() {
      const message = messageInput.value.trim();
      if (!message) {
        showError(messageInput, messageError, "Message is required");
        return false;
      }
      if (message.length < 10) {
        showError(
          messageInput,
          messageError,
          "Message must be at least 10 characters"
        );
        return false;
      }
      hideError(messageInput, messageError);
      return true;
    }

    function showError(input, errorElement, message) {
      input.classList.add("is-invalid");
      errorElement.textContent = message;
    }

    function hideError(input, errorElement) {
      input.classList.remove("is-invalid");
      errorElement.textContent = "";
    }

    // Real-time validation on blur
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    subjectInput.addEventListener("blur", validateSubject);
    messageInput.addEventListener("blur", validateMessage);

    // Form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          // Get form data
          const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim(),
            newsletter: document.getElementById("newsletter").checked,
            timestamp: new Date().toISOString(),
          };

          // Log form data (replace with actual API call)
          console.log("Form submitted:", formData);

          // Show success message
          successAlert.classList.remove("d-none");

          // Reset form
          contactForm.reset();

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Hide success message after 5 seconds
          setTimeout(() => {
            successAlert.classList.add("d-none");
          }, 5000);

          // Scroll to success message
          successAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 1500);
      } else {
        // Scroll to first error
        const firstError = document.querySelector(".is-invalid");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });

    // Clear errors on input
    nameInput.addEventListener("input", () => hideError(nameInput, nameError));
    emailInput.addEventListener("input", () =>
      hideError(emailInput, emailError)
    );
    subjectInput.addEventListener("input", () =>
      hideError(subjectInput, subjectError)
    );
    messageInput.addEventListener("input", () =>
      hideError(messageInput, messageError)
    );
  }

  // Newsletter form in footer
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector(".newsletter-input");
      const email = emailInput.value.trim();

      if (email) {
        // Simulate subscription
        console.log("Newsletter subscription:", email);
        alert("Thank you for subscribing to our newsletter!");
        emailInput.value = "";
      }
    });
  }
});
