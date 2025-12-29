const leaderboardBody = document.getElementById("allTimeLeaderboardBody");

let currentData = [];

function getLeaderboardData() {
  return JSON.parse(localStorage.getItem("leaderboard")) || [];
}

function saveLeaderboardData(data) {
  localStorage.setItem("leaderboard", JSON.stringify(data));
}

// Load leaderboard data from localStorage or JSON file
async function loadLeaderboard() {
  let data = getLeaderboardData();

  if (data.length > 0) {
    currentData = data;
    displayLeaderboard(currentData);
    return currentData;
  }

  try {
    const response = await fetch("../data/leaderBoard.json");
    const fetched = await response.json();
    currentData = fetched || [];
    saveLeaderboardData(currentData);
    displayLeaderboard(currentData);
    return currentData;
  } catch (err) {
    console.error("Error loading leaderboard:", err);
    displayLeaderboard([]);
    return [];
  }
}

// Display leaderboard data in the table
function displayLeaderboard(data) {
  leaderboardBody.innerHTML = ""; // Clear existing content

  if (!data || data.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="5">No leaderboard entries.</td>`;
    leaderboardBody.appendChild(row);
    return;
  }

  data.forEach((entry, index) => {
    const row = document.createElement("tr");
    const dateText = formatDate(entry.date);
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${entry.name}</td>
      <td>${entry.score}</td>
      <td>${entry.category}</td>
      <td>${dateText}</td>
    `;
    leaderboardBody.appendChild(row);
  });
}

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d)) return date; // leave as-is if unparseable
  return d.toLocaleDateString();
}

// Add new entry to leaderboard
function addLeaderboardEntry(name, score, category, date) {
  const data = getLeaderboardData();
  const newEntry = {
    name: name,
    score: Number(score) || 0,
    category: category || "",
    date: date || new Date().toISOString(),
  };
  data.push(newEntry);
  data.sort((a, b) => b.score - a.score);
  saveLeaderboardData(data);
  currentData = data;
  displayLeaderboard(currentData);
  populateCategoryFilter();
}

// Clear leaderboard data
function clearLeaderboard() {
  localStorage.removeItem("leaderboard");
  currentData = [];
  displayLeaderboard([]);
  populateCategoryFilter();
}

// Categories
function getCategories() {
  const data = getLeaderboardData();
  return [...new Set(data.map((e) => e.category).filter((c) => c))];
}

function populateCategoryFilter() {
  const categoryFilter = document.getElementById("categoryFilter");
  if (!categoryFilter) return;
  categoryFilter.innerHTML = "";
  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.textContent = "All Categories";
  categoryFilter.appendChild(defaultOpt);

  const categories = getCategories();
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
}

// Filter and sort operations
function filterByCategory(category) {
  if (!category) {
    displayLeaderboard(currentData);
    return;
  }
  const filtered = currentData.filter((entry) => entry.category === category);
  displayLeaderboard(filtered);
}

function sortByScore() {
  const copy = [...currentData];
  copy.sort((a, b) => b.score - a.score);
  displayLeaderboard(copy);
}

function sortByName() {
  const copy = [...currentData];
  copy.sort((a, b) => a.name.localeCompare(b.name));
  displayLeaderboard(copy);
}

function sortByDate() {
  const copy = [...currentData];
  copy.sort((a, b) => {
    const da = new Date(a.date).getTime() || 0;
    const db = new Date(b.date).getTime() || 0;
    return db - da;
  });
  displayLeaderboard(copy);
}

// Wire up controls after DOM loads
document.addEventListener("DOMContentLoaded", async () => {
  await loadLeaderboard();
  populateCategoryFilter();

  const categoryFilter = document.getElementById("categoryFilter");
  const sortScoreBtn = document.getElementById("sortScoreBtn");
  const sortNameBtn = document.getElementById("sortNameBtn");
  const sortDateBtn = document.getElementById("sortDateBtn");
  const clearBtn = document.getElementById("clearBtn");

  if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) =>
      filterByCategory(e.target.value)
    );
  }

  if (sortScoreBtn) sortScoreBtn.addEventListener("click", sortByScore);
  if (sortNameBtn) sortNameBtn.addEventListener("click", sortByName);
  if (sortDateBtn) sortDateBtn.addEventListener("click", sortByDate);

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (
        confirm(
          "Are you sure you want to clear all leaderboard data? This action cannot be undone."
        )
      ) {
        clearLeaderboard();
      }
    });
  }
});
