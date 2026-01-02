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