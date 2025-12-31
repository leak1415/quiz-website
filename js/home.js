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
    window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', function () {
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
        }
    }

    // Remove the logout button event listener since we're now using direct links to the logout page
    // The logout link in the dropdown now directly goes to auth/logout.html
});

// Update UI based on authentication status
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;

    if (isLoggedIn()) {
        const userData = getUserData();
        const userMenu = `
            <div class="dropdown">
                <button class="dropbtn dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    ${userData?.fullName || userData?.email || 'User'}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="pages/profile.html"><i class="fas fa-user me-2"></i>Profile</a></li>
                    <li><a class="dropdown-item" href="results.html"><i class="fas fa-trophy me-2"></i>My Results</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="auth/logout.html"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
        authSection.innerHTML = userMenu;
    } else {
        authSection.innerHTML = '<a href="auth/login.html">Login</a>';
    }
}

// Update dashboard content with user stats
function updateDashboardContent(userData) {
    // For now, we'll use placeholder data. In a real application, this would come from the server or local storage
    const quizzesTakenElement = document.getElementById('quizzes-taken');
    if (quizzesTakenElement) {
        quizzesTakenElement.textContent = '5';
    }
    
    const successRateElement = document.getElementById('success-rate');
    if (successRateElement) {
        successRateElement.textContent = '87%';
    }
    
    const rankingElement = document.getElementById('ranking');
    if (rankingElement) {
        rankingElement.textContent = '#12';
    }
    
    const avgScoreElement = document.getElementById('avg-score');
    if (avgScoreElement) {
        avgScoreElement.textContent = '8.4';
    }

    // Update recent activity
    const recentActivity = document.getElementById('recent-activity');
    if (recentActivity) {
        recentActivity.innerHTML = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas fa-check-circle text-success me-2"></i>
                    JavaScript Quiz
                </div>
                <span class="badge bg-primary rounded-pill">85%</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas fa-check-circle text-success me-2"></i>
                    HTML & CSS Quiz
                </div>
                <span class="badge bg-primary rounded-pill">92%</span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <i class="fas fa-clock text-warning me-2"></i>
                    Started: General IT Quiz
                </div>
                <span class="badge bg-secondary rounded-pill">In Progress</span>
            </li>
        `;
    }

    // Update continue learning section
    const continueLearning = document.getElementById('continue-learning');
    if (continueLearning) {
        continueLearning.innerHTML = `
            <a href="quiz.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Complete: General IT Quiz</h6>
                    <small>50%</small>
                </div>
                <p class="mb-1">Continue where you left off</p>
            </a>
            <a href="quiz.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Advanced JavaScript Quiz</h6>
                    <small>New</small>
                </div>
                <p class="mb-1">Challenge yourself with advanced concepts</p>
            </a>
            <a href="quiz.html" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">Web Security Fundamentals</h6>
                    <small>Recommended</small>
                </div>
                <p class="mb-1">Learn about security best practices</p>
            </a>
        `;
    }
}

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
const links = document.querySelectorAll('.nav-list .nav-link');

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