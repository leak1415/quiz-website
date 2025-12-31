function isLoggedIn() {
    const loggedIn = localStorage.getItem('quizApp_loggedIn') || sessionStorage.getItem('quizApp_loggedIn');
    return loggedIn === "true";
}

function checkAuth() {
    // Define public pages that don't require authentication
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    const publicPages = ['index.html', 'login.html', 'register.html', ''];

    // Check if current page is a public page
    const isPublicPage = publicPages.some(page => currentPath === page.toLowerCase());

    // If not a public page and user is not logged in, redirect to login
    if (!isPublicPage && !isLoggedIn()) {
        // Determine the correct path to the login page based on current location
        const path = window.location.pathname;

        if (path.includes('/auth/')) {
            // If we're in the auth directory, we're likely on logout.html
            window.location.href = './login.html';
        } else if (path.includes('/pages/')) {
            // If we're in the pages directory
            window.location.href = '../auth/login.html';
        } else {
            // If we're in the root directory
            window.location.href = './auth/login.html';
        }
    }
}

// Run auth check when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
});