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