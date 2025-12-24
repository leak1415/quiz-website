const leaderboardBody = document.getElementById("allTimeLeaderboardBody");

// Function to load leaderboard data from localStorage or JSON file
function loadLeaderboard() {
  let leaderboardData = localStorage.getItem("leaderboard");

  if (leaderboardData) {
    // Load from localStorage
    leaderboardData = JSON.parse(leaderboardData);
    displayLeaderboard(leaderboardData);
  } else {
    // Fetch from JSON file if localStorage is empty
    fetch("../data/leaderBoard.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("leaderboard", JSON.stringify(data));
        displayLeaderboard(data);
      })
      .catch((error) => console.error("Error loading leaderboard:", error));
  }
}

// Function to display leaderboard data in the table
function displayLeaderboard(data) {
  leaderboardBody.innerHTML = ""; // Clear existing content
  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
      <td>${entry.category}</td>
      <td>${entry.date}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

// Function to add a new entry to the leaderboard
function addLeaderboardEntry(name, score, category, date) {
  let leaderboardData = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const newEntry = {
    name: name,
    score: score,
    category: category,
    date: date || new Date().toLocaleDateString(),
  };

  leaderboardData.push(newEntry);
  // Sort by score in descending order
  leaderboardData.sort((a, b) => b.score - a.score);

  localStorage.setItem("leaderboard", JSON.stringify(leaderboardData));
  displayLeaderboard(leaderboardData);
}

// Function to clear all leaderboard data
function clearLeaderboard() {
  localStorage.removeItem("leaderboard");
  leaderboardBody.innerHTML = "";
}

// Load leaderboard on page load
loadLeaderboard();