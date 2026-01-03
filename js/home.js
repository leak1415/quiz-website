// Global authentication functions needed for the home page
function isLoggedIn() {
    // Use unified quizAppData as per project规范
    const appData = JSON.parse(localStorage.getItem("quizAppData")) || {
        users: [],
        leaderboard: [],
        currentUser: null,
        loggedIn: false,
    };
    return appData.loggedIn === true;
}

function getUserData() {
    // Use unified quizAppData as per project规范
    const appData = JSON.parse(localStorage.getItem("quizAppData")) || {
        users: [],
        leaderboard: [],
        currentUser: null,
        loggedIn: false,
    };
    return appData.currentUser;
}

function logout() {
    const appData = JSON.parse(localStorage.getItem("quizAppData")) || {
        users: [],
        leaderboard: [],
        currentUser: null,
        loggedIn: false,
    };
    
    appData.loggedIn = false;
    appData.currentUser = null;
    localStorage.setItem("quizAppData", JSON.stringify(appData));
    
    localStorage.removeItem("quizApp_remember");
    window.location.href = "./index.html";
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

            // Determine the correct path for login based on current location
            const currentPath = window.location.pathname;
            let loginPath = './auth/login.html';

            if (currentPath.includes('/pages/')) {
                loginPath = '../auth/login.html';
            } else if (currentPath.includes('/auth/')) {
                loginPath = './login.html'; // If already in auth directory
            }

            ctaButton.href = loginPath;
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
        const linkPath = link.getAttribute('href') ? link.getAttribute('href').split('/').pop() : '';
        // Compare paths, treating empty path as index.html
        const normalizedCurrentPath = currentPath || 'index.html';
        const normalizedLinkPath = linkPath || 'index.html';
        if (normalizedLinkPath === normalizedCurrentPath) {
            link.classList.add('active');
        }
    });
});

// Update UI based on authentication status
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    if (!authSection) return;

    if (isLoggedIn()) {
        const userData = getUserData();

        // Determine the correct path prefix based on current page location
        const currentPath = window.location.pathname;
        let pathPrefix = '';

        if (currentPath.includes('/pages/')) {
            pathPrefix = '../'; // If we're in the pages directory, go up one level
        } else if (currentPath.includes('/auth/')) {
            pathPrefix = '../'; // If we're in the auth directory, go up one level
        } else {
            pathPrefix = './'; // If we're in root, stay at current level
        }

        const userMenu = `
            <div class="dropdown">
                <button class="dropbtn dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    ${userData?.fullName || userData?.email || 'User'}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="${pathPrefix}pages/profile.html"><i class="fas fa-user me-2"></i>Profile</a></li>
                    <li><a class="dropdown-item" href="${pathPrefix}pages/result.html"><i class="fas fa-trophy me-2"></i>My Results</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="${pathPrefix}auth/logout.html"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
        authSection.innerHTML = userMenu;
        
        // If we're on the home page, update the CTA button to reflect logged-in status
        const ctaButton = document.getElementById('cta-button');
        if (ctaButton) {
            ctaButton.textContent = 'Go to Dashboard';
            ctaButton.href = '#dashboard-section';
            ctaButton.onclick = function(e) {
                e.preventDefault();
                document.getElementById('dashboard-section').scrollIntoView({ behavior: 'smooth' });
            };
        }
    } else {
        // Determine the correct path for login based on current location
        const currentPath = window.location.pathname;
        let loginPath = './auth/login.html';

        if (currentPath.includes('/pages/')) {
            loginPath = '../auth/login.html';
        } else if (currentPath.includes('/auth/')) {
            loginPath = './login.html'; // If already in auth directory
        }

        authSection.innerHTML = `<a href="${loginPath}">Login</a>`;
        
        // Update CTA button if on home page
        const ctaButton = document.getElementById('cta-button');
        if (ctaButton) {
            ctaButton.textContent = 'Sign In to Continue';
            ctaButton.href = loginPath;
        }
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
    // Update the unified quizAppData as per project规范
    const appData = JSON.parse(localStorage.getItem("quizAppData")) || {
        users: [],
        leaderboard: [],
        currentUser: null,
        loggedIn: false,
    };
    
    // Update in users array if user exists
    const userIndex = appData.users.findIndex(u => u.id === updatedUserData.id);
    if (userIndex !== -1) {
        appData.users[userIndex] = { ...appData.users[userIndex], ...updatedUserData };
    } else {
        appData.users.push(updatedUserData);
    }
    
    // Update current user if it's the logged-in user
    if (appData.currentUser && appData.currentUser.id === updatedUserData.id) {
        appData.currentUser = { ...appData.currentUser, ...updatedUserData };
    }
    
    localStorage.setItem("quizAppData", JSON.stringify(appData));
}

// Add a function to manually refresh the auth UI when needed
function refreshAuthUI() {
    updateAuthUI();
}

// Also add an event listener to handle cases where login happens in another tab/window
window.addEventListener('storage', function(e) {
    if (e.key === 'quizAppData') {
        // The login status may have changed in another tab, refresh the UI
        updateAuthUI();
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
      const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
      if (appData.currentUser) {
          appData.currentUser = userData;
          localStorage.setItem("quizAppData", JSON.stringify(appData));
      }
    }
  }
}

// Call refreshSession function periodically to maintain session
setInterval(refreshSession, 300000); // Refresh every 5 minutes