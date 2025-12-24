function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Get all users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check user
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  // Save login session
  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("user", JSON.stringify(user));

  alert("Login successful!");
  window.location.href = "index.html";
}
