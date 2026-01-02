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

  // Get all registered users
  let users = [];
  try {
    const usersData = localStorage.getItem("users");
    if (usersData) {
      users = JSON.parse(usersData);
    }
  } catch (e) {
    console.error("Error parsing users data:", e);
    alert("Error accessing user data");
    return;
  }

  // Check if user exists (using hashed password comparison)
  const user = users.find(u => u.email === email && u.password === hashPassword(password));

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // Save login session based on "Remember me" option
  const loginData = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    loginTime: new Date().toISOString()
  };

  if (remember) {
    localStorage.setItem("quizApp_loggedIn", "true");
    localStorage.setItem("quizApp_user", JSON.stringify(loginData));
  } else {
    sessionStorage.setItem("quizApp_loggedIn", "true");
    sessionStorage.setItem("quizApp_user", JSON.stringify(loginData));
  }

  // Show success message and redirect
  alert("Login successful!");
  window.location.href = "../index.html"; // Adjust path to your home page
}

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
  window.location.href = 'auth/login.html';
}

// Form validation in real-time
document.addEventListener('DOMContentLoaded', function () {
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (emailInput) {
    emailInput.addEventListener('input', function () {
      validateEmail(this);
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', function () {
      validatePassword(this);
    });
  }
});

function validateEmail(inputElement) {
  const email = inputElement.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length > 0 && !emailRegex.test(email)) {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
  } else if (emailRegex.test(email)) {
    inputElement.classList.add('is-valid');
    inputElement.classList.remove('is-invalid');
  } else {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.remove('is-valid');
  }
}

function validatePassword(inputElement) {
  const password = inputElement.value;
  if (password.length > 0 && password.length < 6) {
    inputElement.classList.add('is-invalid');
    inputElement.classList.remove('is-valid');
  } else if (password.length >= 6) {
    inputElement.classList.add('is-valid');
    inputElement.classList.remove('is-invalid');
  } else {
    inputElement.classList.remove('is-invalid');
    inputElement.classList.remove('is-valid');
  }
}