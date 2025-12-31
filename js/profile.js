// Profile page authentication/utility helpers
function getUser() {
    let userData = localStorage.getItem('quizApp_user');
    if (!userData) userData = sessionStorage.getItem('quizApp_user');
    return userData ? JSON.parse(userData) : null;
}

function isLoggedIn() {
    const loggedIn = localStorage.getItem('quizApp_loggedIn') || sessionStorage.getItem('quizApp_loggedIn');
    return loggedIn === 'true';
}

const user = getUser();
if (!user || !isLoggedIn()) {
    alert('Please login first.');
    window.location.href = "../auth/login.html";
}

// Populate user info
const userNameEl = document.getElementById('user-name');
const userEmailEl = document.getElementById('user-email');
const editNameEl = document.getElementById('edit-name');
const editEmailEl = document.getElementById('edit-email');

if (userNameEl) userNameEl.textContent = user.fullName || user.name || user.email || 'User';
if (userEmailEl) userEmailEl.textContent = user.email || '';
if (editNameEl) editNameEl.value = user.fullName || user.name || '';
if (editEmailEl) editEmailEl.value = user.email || '';

// Populate stats
const qTakenEl = document.getElementById('quizzes-taken');
const successRateEl = document.getElementById('success-rate');
const rankingEl = document.getElementById('ranking');
const avgScoreEl = document.getElementById('avg-score');

if (qTakenEl) qTakenEl.textContent = user.quizzesTaken || 0;
if (successRateEl) successRateEl.textContent = user.successRate || '0%';
if (rankingEl) rankingEl.textContent = user.ranking ? '#' + user.ranking : '#0';
if (avgScoreEl) avgScoreEl.textContent = user.avgScore || 0;

// Edit profile form
const editForm = document.getElementById('edit-profile-form');
if (editForm) {
    editForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newName = editNameEl ? editNameEl.value.trim() : (user.fullName || user.name || '');
        const newEmail = editEmailEl ? editEmailEl.value.trim() : (user.email || '');

        // Update user object
        if (user.hasOwnProperty('fullName') || !user.hasOwnProperty('name')) {
            user.fullName = newName;
        } else {
            user.name = newName;
        }
        user.email = newEmail;

        // Persist in the same storage where it came from
        if (localStorage.getItem('quizApp_user')) {
            localStorage.setItem('quizApp_user', JSON.stringify(user));
        } else if (sessionStorage.getItem('quizApp_user')) {
            sessionStorage.setItem('quizApp_user', JSON.stringify(user));
        } else {
            // default to localStorage if none found
            localStorage.setItem('quizApp_user', JSON.stringify(user));
            localStorage.setItem('quizApp_loggedIn', 'true');
        }

        alert('Profile updated successfully!');
        location.reload();
    });
}

// Logout function (clears both storage locations)
function logout() {
    localStorage.removeItem('quizApp_user');
    localStorage.removeItem('quizApp_loggedIn');
    sessionStorage.removeItem('quizApp_user');
    sessionStorage.removeItem('quizApp_loggedIn');
    window.location.href = "../auth/login.html";
}
