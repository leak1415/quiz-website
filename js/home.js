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

// Note: Authentication logic removed as Firebase is not integrated and elements don't exist in this page.
// If authentication is needed, integrate Firebase and add corresponding HTML elements.