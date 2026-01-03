function isLoggedIn() {
  const appData = JSON.parse(localStorage.getItem("quizAppData"));
  if (!appData || !appData.loggedIn || !appData.currentUser) {
    return false;
  }

  // Check if session has expired (e.g., after 24 hours)
  const loginTime = new Date(appData.currentUser.loginTime);
  const now = new Date();
  const timeDiff = (now - loginTime) / (1000 * 60 * 60); // Difference in hours

  // If more than 24 hours have passed, log out automatically
  if (timeDiff > 24) {
    logout();
    return false;
  }

  return appData.loggedIn === true;
}

function logout() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  appData.loggedIn = false;
  appData.currentUser = null;
  localStorage.setItem("quizAppData", JSON.stringify(appData));
  
  // Determine the correct path based on current location
  const currentPath = window.location.pathname;
  let redirectPath = './auth/login.html'; // Default

  if (currentPath.includes('/auth/')) {
      redirectPath = './login.html'; // Already in auth directory
  } else if (currentPath.includes('/pages/')) {
      redirectPath = '../auth/login.html'; // From pages directory to auth
  } else {
      redirectPath = './auth/login.html'; // From root to auth
  }
  
  window.location.href = redirectPath;
}