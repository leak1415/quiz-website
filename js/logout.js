function showNotification(message, type) {
  const messageDiv = document.getElementById("message");
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `alert alert-${type}`;
    messageDiv.classList.remove("d-none");

    // Auto-hide the notification after 5 seconds
    setTimeout(() => {
      messageDiv.classList.add("d-none");
    }, 5000);
  }
}

function confirmLogout() {
  // Show confirmation dialog
  if (confirm("Are you sure you want to log out?")) {
    performLogout();
  }
}

function performLogout() {
  // Update logout status in unified localStorage
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  appData.loggedIn = false;
  appData.currentUser = null;
  localStorage.setItem("quizAppData", JSON.stringify(appData));
  localStorage.removeItem("quizApp_remember");

  // Show success message
  showNotification("You have been successfully logged out.", "success");

  // Redirect to index page after a short delay
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1500); // Wait 1.5 seconds to show the success message
}

// Check if user is logged in when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in using the standard function
  if (!isLoggedIn()) {
    // If not logged in, redirect to login page
    window.location.href = "./login.html";
  }
});

function isLoggedIn() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  return appData && appData.loggedIn === true;
}

function getUserData() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  return appData && appData.currentUser ? appData.currentUser : null;
}