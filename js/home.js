// Global authentication functions needed for the home page
function isLoggedIn() {
    let appData = JSON.parse(localStorage.getItem("quizAppData"));
    if (!appData) {
        appData = JSON.parse(sessionStorage.getItem("quizAppData"));
    }
    return appData && appData.loggedIn === true;
}

function getUserData() {
    let userData = localStorage.getItem('quizApp_user');
    if (!userData) {
        userData = sessionStorage.getItem('quizApp_user');
    }
    try {
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
    }
}

function logout() {
    let appData = JSON.parse(localStorage.getItem("quizAppData"));
    if (appData) {
        appData.loggedIn = false;
        appData.currentUser = null;
        localStorage.setItem("quizAppData", JSON.stringify(appData));
    }

    let sessionData = JSON.parse(sessionStorage.getItem("quizAppData"));
    if (sessionData) {
        sessionData.loggedIn = false;
        sessionData.currentUser = null;
        sessionStorage.setItem("quizAppData", JSON.stringify(sessionData));
    }

    localStorage.removeItem("quizApp_remember");
    sessionStorage.removeItem("quizApp_remember");
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in when home page loads
    updateAuthUI();

    // Only update dashboard content if on the home page (where dashboard elements exist)
    const userData = getUserData();
    if (userData && document.getElementById('dashboard-section')) {
        // Show dashboard section for logged-in users
        const dashboardSection = document.getElementById('dashboard-section');
        if (dashboardSection) {
            dashboardSection.style.display = 'block';
        }

        // Update welcome message if element exists
        const userGreetingElement = document.getElementById('userGreeting');
        if (userGreetingElement) {
            userGreetingElement.textContent = `Welcome back! ${userData.fullName || userData.email} is logged in.`;
        }

        // Update dashboard content if elements exist
        updateDashboardContent(userData);
    } else if (!userData && document.getElementById('cta-button')) {
        // Show login button if not logged in and on home page
        const ctaButton = document.getElementById('cta-button');
        if (ctaButton) {
            ctaButton.textContent = 'Sign In to Continue';
            ctaButton.href = 'auth/login.html';
            ctaButton.onclick = (e) => {
                e.preventDefault();
                window.location.href = 'auth/login.html';
            };
        }
    }
});

// Update auth section in navbar based on login status
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;

    authSection.innerHTML = ''; // Clear the section

    if (isLoggedIn()) {
        // User is logged in - show profile and logout
        const userData = getUserData();
        const profileLink = document.createElement('a');
        profileLink.href = './pages/profile.html';
        profileLink.className = 'nav-link';
        profileLink.textContent = userData && (userData.fullName || userData.name) ? 
                                  (userData.fullName || userData.name).split(' ')[0] : 'Profile';
        profileLink.ariaLabel = 'Profile';

        const logoutLink = document.createElement('a');
        logoutLink.href = '#';
        logoutLink.className = 'nav-link';
        logoutLink.textContent = 'Logout';
        logoutLink.onclick = (e) => {
            e.preventDefault();
            logout();
        };

        authSection.appendChild(profileLink);
        authSection.appendChild(logoutLink);
    } else {
        // User is not logged in - show login and register
        const loginLink = document.createElement('a');
        loginLink.href = './auth/login.html';
        loginLink.className = 'nav-link';
        loginLink.textContent = 'Login';
        loginLink.ariaLabel = 'Login';

        const registerLink = document.createElement('a');
        registerLink.href = './auth/register.html';
        registerLink.className = 'nav-link';
        registerLink.textContent = 'Register';
        registerLink.ariaLabel = 'Register';

        authSection.appendChild(loginLink);
        authSection.appendChild(registerLink);
    }
}

// Update dashboard content with user statistics
function updateDashboardContent(userData) {
    if (!userData) return;

    // Update quizzes taken count
    const quizzesTakenEl = document.getElementById('quizzes-taken');
    if (quizzesTakenEl) {
        quizzesTakenEl.textContent = userData.quizzesTaken || 0;
    }

    // Update success rate
    const successRateEl = document.getElementById('success-rate');
    if (successRateEl) {
        successRateEl.textContent = `${userData.successRate || '0%'}`;
    }
}

// Function to update user's quiz statistics
function updateUserStats(quizResult) {
    if (!isLoggedIn()) return;

    const userData = getUserData();
    if (!userData) return;

    // Initialize stats if they don't exist
    if (!userData.quizzesTaken) userData.quizzesTaken = 0;
    if (!userData.successRate) userData.successRate = '0%';
    if (!userData.totalScore) userData.totalScore = 0;

    // Update stats based on quiz result
    userData.quizzesTaken += 1;
    userData.totalScore += quizResult.score || 0;
    
    // Calculate new success rate (as percentage of correct answers)
    const totalQuestions = userData.totalQuestions || 0;
    const totalCorrect = userData.totalCorrect || 0;
    
    if (quizResult.questions) {
        // If quiz result includes detailed answers
        const correctCount = quizResult.answers ? 
            quizResult.answers.filter(a => a.correct).length : 0;
        const newTotalQuestions = (userData.totalQuestions || 0) + quizResult.questions.length;
        const newTotalCorrect = (userData.totalCorrect || 0) + correctCount;
        
        userData.totalQuestions = newTotalQuestions;
        userData.totalCorrect = newTotalCorrect;
        
        userData.successRate = newTotalQuestions > 0 ? 
            `${Math.round((newTotalCorrect / newTotalQuestions) * 100)}%` : '0%';
    }

    // Update average score
    userData.avgScore = userData.quizzesTaken > 0 ? 
        Math.round(userData.totalScore / userData.quizzesTaken) : 0;

    // Save updated user data
    persistUserData(userData);
}

// Persist updated user data to storage
function persistUserData(updatedUserData) {
    // Update both localStorage and sessionStorage if user exists in either
    const localStorageData = JSON.parse(localStorage.getItem("quizAppData")) || { users: [], leaderboard: [] };
    const sessionStorageData = JSON.parse(sessionStorage.getItem("quizAppData")) || { users: [], leaderboard: [] };
    
    // Update in localStorage
    const localUserIndex = localStorageData.users.findIndex(u => u.id === updatedUserData.id);
    if (localUserIndex !== -1) {
        localStorageData.users[localUserIndex] = { ...localStorageData.users[localUserIndex], ...updatedUserData };
    } else {
        localStorageData.users.push(updatedUserData);
    }
    localStorage.setItem("quizAppData", JSON.stringify(localStorageData));
    
    // Update in sessionStorage
    const sessionUserIndex = sessionStorageData.users.findIndex(u => u.id === updatedUserData.id);
    if (sessionUserIndex !== -1) {
        sessionStorageData.users[sessionUserIndex] = { ...sessionStorageData.users[sessionUserIndex], ...updatedUserData };
    } else {
        sessionStorageData.users.push(updatedUserData);
    }
    sessionStorage.setItem("quizAppData", JSON.stringify(sessionStorageData));
    
    // Also update current user if it's the logged-in user
    const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
    if (appData.currentUser && appData.currentUser.id === updatedUserData.id) {
        appData.currentUser = { ...appData.currentUser, ...updatedUserData };
        localStorage.setItem("quizAppData", JSON.stringify(appData));
    }
}