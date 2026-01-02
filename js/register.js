function hashPassword(password) {
    // Simple encoding for demo purposes - use proper hashing in production
    return btoa(password);
}

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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Check if email already exists
    let users = [];
    try {
        const usersData = localStorage.getItem("users");
        if (usersData) {
            users = JSON.parse(usersData);
        }
    } catch (e) {
        console.error("Error parsing users data:", e);
        users = [];
    }

    const userExists = users.some(u => u.email === email);

    if (userExists) {
        alert("Email already registered");
        return;
    }

    // Create new user with hashed password
    const newUser = {
        id: Date.now(), // Simple ID generation
        fullName: fullName,
        email: email,
        password: hashPassword(password), // Store hashed password
        createdAt: new Date().toISOString()
    };

    // Add user to the list
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Determine the correct path based on current location
    const currentPath = window.location.pathname;
    let redirectPath = './auth/login.html'; // Default

    if (currentPath.includes('/auth/')) {
        redirectPath = './login.html'; // Already in auth directory
    } else {
        redirectPath = './auth/login.html'; // Need to go to auth directory
    }

    alert("Registration successful! You can now login.");
    window.location.href = redirectPath;
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is already logged in and redirect if needed
    const loggedIn = localStorage.getItem('quizApp_loggedIn') || sessionStorage.getItem('quizApp_loggedIn');
    if (loggedIn === "true") {
        // Determine the correct redirect path
        const currentPath = window.location.pathname;
        let redirectPath = '../index.html'; // Default to go up one level from auth directory

        if (currentPath.includes('/auth/')) {
            redirectPath = '../index.html'; // From auth directory to root index
        } else {
            redirectPath = './index.html'; // If already in root
        }

        window.location.href = redirectPath;
    }

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    if (fullNameInput) {
        fullNameInput.addEventListener('input', function () {
            validateFullName(this);
        });
    }

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

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function () {
            validateConfirmPassword(this);
        });
    }
});

function validateFullName(inputElement) {
    const fullName = inputElement.value.trim();
    if (fullName.length > 0 && fullName.length < 2) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    } else if (fullName.length >= 2) {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
    } else {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.remove('is-valid');
    }
}

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

function validateConfirmPassword(inputElement) {
    const password = document.getElementById('password').value;
    const confirmPassword = inputElement.value;

    if (confirmPassword.length > 0 && password !== confirmPassword) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
    } else if (password === confirmPassword && confirmPassword !== '') {
        inputElement.classList.add('is-valid');
        inputElement.classList.remove('is-invalid');
    } else {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.remove('is-valid');
    }
}