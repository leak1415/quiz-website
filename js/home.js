// Add this to your navigation or user profile section
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn'); // if you have a logout button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            logout();
        });
    }
}

// Call this function after DOM loads
document.addEventListener('DOMContentLoaded', setupLogout);