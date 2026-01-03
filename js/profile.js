// Profile page authentication/utility helpers
function getUser() {
    let userData = localStorage.getItem('quizApp_user');
    if (!userData) userData = sessionStorage.getItem('quizApp_user');
    return userData ? JSON.parse(userData) : null;
}

function isLoggedIn() {
  const appData = getAppData();
  return appData.loggedIn === true && !!appData.currentUser;
}

const appData = getAppData();
const user = appData.currentUser;
if (!user || !isLoggedIn()) {
  alert("Please login first.");
  window.location.href = "../auth/login.html";
}

// Populate user info
const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const editNameEl = document.getElementById("edit-name");
const editEmailEl = document.getElementById("edit-email");
const userAvatarEl = document.getElementById("user-avatar");
const avatarInputEl = document.getElementById("avatar-input");
const removeAvatarBtn = document.getElementById("remove-avatar-btn");

if (userNameEl) userNameEl.textContent = user.fullName || user.name || user.email || 'User';
if (userEmailEl) userEmailEl.textContent = user.email || '';
if (editNameEl) editNameEl.value = user.fullName || user.name || '';
if (editEmailEl) editEmailEl.value = user.email || '';
if (userAvatarEl) userAvatarEl.src = user.avatar || '../images/avatar.png';

// Member since
const memberSinceEl = document.getElementById("member-since");
if (memberSinceEl) {
  if (user.createdAt) {
    try {
      const d = new Date(user.createdAt);
      memberSinceEl.textContent = `Member since ${d.toLocaleDateString()}`;
    } catch (e) {
      memberSinceEl.textContent = "";
    }
  }
}

// Populate stats
const qTakenEl = document.getElementById("quizzes-taken");
const successRateEl = document.getElementById("success-rate");
const rankingEl = document.getElementById("ranking");
const avgScoreEl = document.getElementById("avg-score");

if (qTakenEl) qTakenEl.textContent = user.quizzesTaken || 0;
if (successRateEl) successRateEl.textContent = user.successRate || "0%";
if (rankingEl) rankingEl.textContent = user.ranking ? "#" + user.ranking : "#0";
if (avgScoreEl) avgScoreEl.textContent = user.avgScore || 0;

// Persist updates to the unified quizAppData in localStorage
function persistUser() {
  const appData = getAppData();
  // Update currentUser
  appData.currentUser = user;
  appData.loggedIn = true;

  // Also update the users list if present
  if (!Array.isArray(appData.users)) appData.users = [];
  const idx = appData.users.findIndex((u) => u.id === user.id);
  if (idx >= 0) {
    appData.users[idx] = Object.assign({}, appData.users[idx], user);
  } else {
    appData.users.push(user);
  }

  localStorage.setItem("quizAppData", JSON.stringify(appData));
}

// Resize image file to a data URL (keeps size reasonable)
function resizeImage(file, maxW = 800, maxH = 800, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        let w = img.width;
        let h = img.height;
        const ratio = Math.min(1, maxW / w, maxH / h);
        w = Math.round(w * ratio);
        h = Math.round(h * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, w, h);
        // use JPEG for smaller size; fall back to PNG if drawing fails
        try {
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        } catch (err) {
          try {
            const dataUrl = canvas.toDataURL();
            resolve(dataUrl);
          } catch (err2) {
            reject(err2);
          }
        }
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Avatar upload handling with resizing and robust storage error handling
if (avatarInputEl) {
  avatarInputEl.addEventListener("change", async function () {
    const file = this.files && this.files[0];
    if (!file) return;
    if (!file.type || !file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    const maxOriginalSize = 6 * 1024 * 1024; // 6MB limit for incoming file
    if (file.size > maxOriginalSize) {
      alert("Please select an image smaller than 6MB.");
      return;
    }

    // Resize/compress image to keep storage use low
    try {
      const dataUrl = await resizeImage(file, 1000, 1000, 0.8);
      user.avatar = dataUrl;
      if (userAvatarEl) {
        userAvatarEl.src = user.avatar;
        userAvatarEl.classList.add("avatar-updated");
        setTimeout(() => userAvatarEl.classList.remove("avatar-updated"), 900);
      }

      // Persist with error handling for storage quota
      try {
        persistUser();
        alert("Profile picture updated!");
      } catch (err) {
        console.error("Failed to save avatar to storage:", err);
        alert(
          "Unable to save the image to local storage (quota exceeded). Please try a smaller image or use a different browser."
        );
      }
    } catch (err) {
      console.error("Image processing failed:", err);
      alert(
        "Failed to process the selected image. Please try a different file."
      );
    }
  });
}

if (removeAvatarBtn) {
    removeAvatarBtn.addEventListener('click', function () {
        if (!confirm('Remove profile picture?')) return;
        delete user.avatar;
        if (userAvatarEl) userAvatarEl.src = '../images/avatar.png';
        try {
            persistUser();
            alert('Profile picture removed.');
        } catch (err) {
            console.error('Failed to remove avatar from storage:', err);
            alert('Could not remove profile picture from storage. Please try again.');
        }
    });
}

// Edit profile form
const editForm = document.getElementById("edit-profile-form");
if (editForm) {
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newName = editNameEl
      ? editNameEl.value.trim()
      : user.fullName || user.name || "";
    const newEmail = editEmailEl ? editEmailEl.value.trim() : user.email || "";

    // Update user object
    if (user.hasOwnProperty("fullName") || !user.hasOwnProperty("name")) {
      user.fullName = newName;
    } else {
      user.name = newName;
    }
    user.email = newEmail;

    // Persist and update UI
    persistUser();
    if (userNameEl)
      userNameEl.textContent =
        user.fullName || user.name || user.email || "User";
    if (userEmailEl) userEmailEl.textContent = user.email || "";

    alert("Profile updated successfully!");
  });
}

// Logout function (clears both storage locations)
function logout() {
  const appData = getAppData();
  appData.loggedIn = false;
  appData.currentUser = null;
  localStorage.setItem("quizAppData", JSON.stringify(appData));
  window.location.href = "../auth/login.html";
}

// Update UI based on authentication status
document.addEventListener('DOMContentLoaded', function() {
    // Update auth section in navbar
    updateAuthUI();
});