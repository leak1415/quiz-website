function hashPassword(password) {
  // Simple encoding for demo purposes - use proper hashing in production
  return btoa(password);
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const remember = document.getElementById("remember").checked;

  // Basic validation
  if (!email || !password) {
    alert("Please fill in all fields");
    return;
  }

  // Get all data from unified storage
  let appData = JSON.parse(localStorage.getItem("quizAppData")) || {
    users: [],
    leaderboard: [],
    currentUser: null,
    loggedIn: false,
  };

  const users = appData.users || [];
  // Check if user exists (using hashed password comparison)
  const user = appData.users.find(u => u.email === email && u.password === hashPassword(password));

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // Save login session based on "Remember me" option
  const loginData = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    createdAt: user.createdAt || new Date().toISOString(),
    quizzesTaken: user.quizzesTaken || 0,
    successRate: user.successRate || "0%",
    totalScore: user.totalScore || 0,
    avgScore: user.avgScore || 0,
    totalQuestions: user.totalQuestions || 0,
    totalCorrect: user.totalCorrect || 0,
    ranking: user.ranking || 0,
    loginTime: new Date().toISOString()
  };

  appData.currentUser = loginData;
  appData.loggedIn = true;

  // Always persist to localStorage (single source of truth)
  localStorage.setItem("quizAppData", JSON.stringify(appData));

  // Show success message and redirect
  alert("Login successful!");
  window.location.href = "../index.html"; // Adjust path to your home page
}

function isLoggedIn() {
  let appData = JSON.parse(localStorage.getItem("quizAppData"));
  if (!appData) {
    appData = JSON.parse(sessionStorage.getItem("quizAppData"));
  }
  return appData && appData.loggedIn === true;
}

function getUserData() {
  let appData = JSON.parse(localStorage.getItem("quizAppData"));
  if (!appData) {
    appData = JSON.parse(sessionStorage.getItem("quizAppData"));
  }
  return appData && appData.currentUser ? appData.currentUser : null;
}

function logout() {
  // Clear login state in unified storage
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  appData.loggedIn = false;
  appData.currentUser = null;
  localStorage.setItem("quizAppData", JSON.stringify(appData));
  localStorage.removeItem("quizApp_remember");
  window.location.href = "auth/login.html";
}

// Form validation in real-time
document.addEventListener("DOMContentLoaded", function () {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (emailInput) {
    emailInput.addEventListener("input", function () {
      validateEmail(this);
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      validatePassword(this);
    });
  }
});

function validateEmail(inputElement) {
  const email = inputElement.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length > 0 && !emailRegex.test(email)) {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
  } else if (emailRegex.test(email)) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  } else {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.remove("is-valid");
  }
}

function validatePassword(inputElement) {
  const password = inputElement.value;
  if (password.length > 0 && password.length < 6) {
    inputElement.classList.add("is-invalid");
    inputElement.classList.remove("is-valid");
  } else if (password.length >= 6) {
    inputElement.classList.add("is-valid");
    inputElement.classList.remove("is-invalid");
  } else {
    inputElement.classList.remove("is-invalid");
    inputElement.classList.remove("is-valid");
  }
}