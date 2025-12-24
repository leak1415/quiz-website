// Global authentication functions needed for the home page
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

function logout() {
    localStorage.removeItem('quizApp_user');
    localStorage.removeItem('quizApp_loggedIn');
    sessionStorage.removeItem('quizApp_user');
    sessionStorage.removeItem('quizApp_loggedIn');
    window.location.href = 'auth/login.html';
}

document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in when home page loads
    if (!isLoggedIn()) {
        // Redirect to login if not authenticated
        window.location.href = 'auth/login.html';
        return;
    }

    // Display user info if logged in
    const userData = getUserData();
    if (userData) {
        const userGreetingElement = document.getElementById('userGreeting');
        if (userGreetingElement) {
            userGreetingElement.textContent = `Welcome, ${userData.fullName || userData.email}!`;
        }
    }

    // Add logout functionality to any logout buttons
    const logoutButtons = document.querySelectorAll('.logout-btn, [data-logout]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            logout();
        });
    });
});

// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        const isExpanded = navList.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    });
}

// Toggle dropdown on mobile
const dropDown = document.querySelector('.drop-down');
const dropContent = document.querySelector('.dropdown-content');

if (dropDown && dropContent) {
    dropDown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropContent.classList.toggle('active');
        }
    });
}

// Highlight active link
const currentPath = window.location.pathname.split('/').pop();
const links = document.querySelectorAll('.nav-list a');

links.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// Add a function to refresh user session periodically (optional)
function refreshSession() {
    if (isLoggedIn()) {
        const userData = getUserData();
        if (userData) {
            // Update login time
            userData.loginTime = new Date().toISOString();

            // Re-save user data
            if (localStorage.getItem('quizApp_loggedIn')) {
                localStorage.setItem('quizApp_user', JSON.stringify(userData));
            } else {
                sessionStorage.setItem('quizApp_user', JSON.stringify(userData));
            }
        }
    }
}

// Refresh session every 30 minutes
setInterval(refreshSession, 30 * 60 * 1000);