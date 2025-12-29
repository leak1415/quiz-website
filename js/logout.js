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
    // Remove login data from both localStorage and sessionStorage
    localStorage.removeItem('quizApp_user');
    localStorage.removeItem('quizApp_loggedIn');
    sessionStorage.removeItem('quizApp_user');
    sessionStorage.removeItem('quizApp_loggedIn');

    // Show success message
    showNotification("You have been successfully logged out.", "success");

    // Redirect to index page after a short delay
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1500); // Wait 1.5 seconds to show the success message
}

// Check if user is logged in when the page loads
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    if (!isLoggedIn()) {
        // If not logged in, redirect to login page
        window.location.href = 'login.html';
    }
});

function isLoggedIn() {
    const loggedIn = localStorage.getItem('quizApp_loggedIn') || sessionStorage.getItem('quizApp_loggedIn');
    return loggedIn === "true";
}

function getUserData() {
    let userData = localStorage.getItem('quizApp_user');
    if (!userData) {
        userData = sessionStorage.getItem('quizApp_user');
    }
    return userData ? JSON.parse(userData) : null;
}