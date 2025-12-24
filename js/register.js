function register(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation
    if (!fullName || !email || !password) {
        alert("Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    // Check if email already exists
    const users = JSON.parse(localStorage.getItem("users") || []);
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert("Email already registered");
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(), // Simple ID generation
        fullName: fullName,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    // Add user to the list
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now login.");
    window.location.href = "login.html";
}