function isLoggedIn() {
<<<<<<< HEAD
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
=======
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  return appData && appData.loggedIn === true;
}

function getUserData() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  return appData && appData.currentUser ? appData.currentUser : null;
}

function logout() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  appData.loggedIn = false;
  appData.currentUser = null;
  localStorage.setItem("quizAppData", JSON.stringify(appData));
  localStorage.removeItem("quizApp_remember");
  window.location.href = "../index.html";
>>>>>>> cd851bad3abf8bd1dc386571f73324ab21460225
}

document.addEventListener("DOMContentLoaded", function () {
    // Check if user is logged in when home page loads
    updateAuthUI();

<<<<<<< HEAD
    // Display user info if logged in
    const userData = getUserData();
    if (userData) {
        // Show dashboard section for logged-in users
        const dashboardSection = document.getElementById("dashboard-section");
        if (dashboardSection) {
            dashboardSection.style.display = "block";
        }

        // Update welcome message
        const userGreetingElement = document.getElementById("userGreeting");
        if (userGreetingElement) {
            userGreetingElement.textContent = `Welcome back! ${userData.fullName || userData.email
                } is logged in.`;
        }

        // Update dashboard content
        updateDashboardContent(userData);
    } else {
        // Show login button if not logged in
        const ctaButton = document.getElementById("cta-button");
        if (ctaButton) {
            ctaButton.textContent = "Sign In to Continue";
            ctaButton.href = "auth/login.html";
            ctaButton.onclick = (e) => {
                e.preventDefault();
                window.location.href = "auth/login.html";
            };
        }
=======
  // Display user info if logged in
  const userData = getUserData();
  if (userData) {
    // Show dashboard section for logged-in users
    const dashboardSection = document.getElementById("dashboard-section");
    if (dashboardSection) {
      dashboardSection.style.display = "block";
    }

    // Update welcome message
    const userGreetingElement = document.getElementById("userGreeting");
    if (userGreetingElement) {
      userGreetingElement.textContent = `Welcome back! ${
        userData.fullName || userData.email
      } is logged in.`;
    }

    // Update dashboard content
    updateDashboardContent(userData);
  } else {
    // Show login button if not logged in
    const ctaButton = document.getElementById("cta-button");
    if (ctaButton) {
      ctaButton.textContent = "Sign In to Continue";
      ctaButton.href = "auth/login.html";
      ctaButton.onclick = (e) => {
        e.preventDefault();
        window.location.href = "auth/login.html";
      };
    }
  }

  // Handle Get Started button click
  const ctaButton = document.getElementById("cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function (e) {
      if (isLoggedIn()) {
        // If logged in, go to quiz
        e.preventDefault();
        window.location.href = "./pages/quiz.html";
      } else {
        // If not logged in, go to login
        e.preventDefault();
        window.location.href = "./auth/login.html";
      }
    });
  }

  // Remove the logout button event listener since we're now using direct links to the logout page
  // The logout link in the dropdown now directly goes to auth/logout.html
});

// Update UI based on authentication status
function updateAuthUI() {
  const authSection = document.getElementById("auth-section");
  if (!authSection) return;

  if (isLoggedIn()) {
    const userData = getUserData();
    // Make links work from both root and /pages/* locations
    const inPagesFolder = window.location.pathname.includes("/pages/");
    const profileHref = inPagesFolder ? "profile.html" : "pages/profile.html";
    const resultsHref = inPagesFolder ? "results.html" : "pages/results.html";
    const logoutHref = inPagesFolder
      ? "../auth/logout.html"
      : "auth/logout.html";

    const userMenu = `
            <div class="dropdown">
                <button class="dropbtn dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    ${userData?.fullName || userData?.email || "User"}
                </button>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><a class="dropdown-item" href="${profileHref}"><i class="fas fa-user me-2"></i>Profile</a></li>
                    <li><a class="dropdown-item" href="${resultsHref}"><i class="fas fa-trophy me-2"></i>My Results</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="${logoutHref}"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
    authSection.innerHTML = userMenu;
  } else {
    const loginHref = window.location.pathname.includes("/pages/")
      ? "login.html"
      : "auth/login.html";
    authSection.innerHTML = `<a href="${loginHref}">Login</a>`;
  }
}

// Update dashboard content with user stats
function updateDashboardContent(userData) {
  // For now, we'll use placeholder data. In a real application, this would come from the server or local storage
  document.getElementById("quizzes-taken").textContent = "5";
  document.getElementById("success-rate").textContent = "87%";
  document.getElementById("ranking").textContent = "#12";
  document.getElementById("avg-score").textContent = "8.4";

  // Update recent activity
  const recentActivity = document.getElementById("recent-activity");
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
  const continueLearning = document.getElementById("continue-learning");
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
const hamburger = document.getElementById("hamburger");
const navList = document.getElementById("nav-list");

if (hamburger && navList) {
  hamburger.addEventListener("click", () => {
    navList.classList.toggle("active");
    const isExpanded = navList.classList.contains("active");
    hamburger.setAttribute("aria-expanded", isExpanded);
  });
}

// Toggle dropdown on mobile
const dropDown = document.querySelector(".drop-down");
const dropContent = document.querySelector(".dropdown-content");

if (dropDown && dropContent) {
  dropDown.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      dropContent.classList.toggle("active");
    }
  });
}

// Highlight active link
const currentPath = window.location.pathname.split("/").pop();
const links = document.querySelectorAll(".nav-list .nav-link");

links.forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});

// Add a function to refresh user session periodically (optional)
function refreshSession() {
  if (isLoggedIn()) {
    const userData = getUserData();
    if (userData) {
      // Update login time
      userData.loginTime = new Date().toISOString();

      // Re-save user data to unified localStorage
      const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
      appData.currentUser = userData;
      localStorage.setItem("quizAppData", JSON.stringify(appData));
>>>>>>> cd851bad3abf8bd1dc386571f73324ab21460225
    }

    // Handle Get Started button click
    const ctaButton = document.getElementById("cta-button");
    if (ctaButton) {
        ctaButton.addEventListener("click", function (e) {
            if (isLoggedIn()) {
                // If logged in, go to quiz
                e.preventDefault();
                window.location.href = "./pages/quiz.html";
            } else {
                // If not logged in, go to login
                e.preventDefault();
                window.location.href = "./auth/login.html";
            }
        });
    }
});