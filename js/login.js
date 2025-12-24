// Global functions for authentication
function isLoggedIn() {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');
  return user !== null;
}

function getUserData() {
  let userData = localStorage.getItem('user');
  if (!userData) {
    userData = sessionStorage.getItem('user');
  }
  return userData ? JSON.parse(userData) : null;
}

function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('loggedIn');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('loggedIn');
  window.location.href = 'auth/login.html';
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Get all registered users
  const users = JSON.parse(localStorage.getItem("users") || []);

  // Check if user exists
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // Save login session (use sessionStorage for this session only, localStorage to persist)
  const rememberMe = document.getElementById('remember') ? document.getElementById('remember').checked : false;

  if (rememberMe) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  alert("Login successful!");
  window.location.href = "../index.html"; // Adjust path to your home page
}