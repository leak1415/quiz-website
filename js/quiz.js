// Authentication check functions
function isLoggedIn() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  return appData && appData.loggedIn === true;
}

function getUserData() {
  const appData = JSON.parse(localStorage.getItem("quizAppData")) || {};
  return appData && appData.currentUser ? appData.currentUser : null;
}

// Check if user is logged in when page loads
document.addEventListener("DOMContentLoaded", function () {
  if (!isLoggedIn()) {
    alert("Please login first to access the quiz!");
    window.location.href = "../auth/login.html";
    return;
  }
});

const quizzes = {
  web: [
    {
      question: "What does HTML stand for?",
      choices: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Home Tool Markup Language",
        "Hyperloop Machine Language",
      ],
      answer: 0,
    },
    {
      question: "Which tag is used for JavaScript?",
      choices: ["<java>", "<script>", "<js>", "<code>"],
      answer: 1,
    },
    {
      question: "What does CSS do?",
      choices: [
        "Adds logic",
        "Styles web pages",
        "Manages database",
        "Handles forms",
      ],
      answer: 1,
    },
    {
      question: "Which one is a JavaScript framework?",
      choices: ["Laravel", "Django", "React", "Flask"],
      answer: 2,
    },
    {
      question: "What keyword creates a variable in JS?",
      choices: ["create", "int", "let", "define"],
      answer: 2,
    },
  ],
  python: [
    {
      question: "Which is a Python data type?",
      choices: ["integer", "string", "list", "All of the above"],
      answer: 3,
    },
    {
      question: "What is the correct file extension for Python?",
      choices: [".py", ".python", ".pyt", ".txt"],
      answer: 0,
    },
    {
      question: "How do you start a comment in Python?",
      choices: ["//", "#", "/*", "--"],
      answer: 1,
    },
    {
      question: "What does 'len()' do in Python?",
      choices: [
        "Creates a list",
        "Returns length",
        "Deletes items",
        "Sorts items",
      ],
      answer: 1,
    },
    {
      question: "Which library is used for data analysis?",
      choices: ["NumPy", "Pandas", "Both", "None"],
      answer: 2,
    },
  ],
  math: [
    {
      question: "What is 15 × 8?",
      choices: ["120", "125", "130", "135"],
      answer: 0,
    },
    {
      question: "What is the square root of 144?",
      choices: ["10", "12", "14", "16"],
      answer: 1,
    },
    {
      question: "What is 25% of 200?",
      choices: ["40", "50", "60", "70"],
      answer: 1,
    },
    {
      question: "What is 7 + 8 × 2?",
      choices: ["30", "23", "15", "22"],
      answer: 1,
    },
    {
      question: "What is the value of π (pi) approximately?",
      choices: ["3.12", "3.14", "3.16", "3.18"],
      answer: 1,
    },
  ],
  history: [
    {
      question: "In which year did World War II end?",
      choices: ["1943", "1944", "1945", "1946"],
      answer: 2,
    },
    {
      question: "Who was the first President of USA?",
      choices: [
        "Thomas Jefferson",
        "George Washington",
        "John Adams",
        "Benjamin Franklin",
      ],
      answer: 1,
    },
    {
      question: "Which ancient wonder is still standing?",
      choices: [
        "Colossus of Rhodes",
        "Great Pyramid",
        "Hanging Gardens",
        "Lighthouse of Alexandria",
      ],
      answer: 1,
    },
    {
      question: "In what year did the Titanic sink?",
      choices: ["1910", "1912", "1914", "1920"],
      answer: 1,
    },
    {
      question: "Who discovered America?",
      choices: [
        "Leif Erikson",
        "Christopher Columbus",
        "Ferdinand Magellan",
        "Vasco da Gama",
      ],
      answer: 1,
    },
  ],
  java: [
    {
      question: "What does JVM stand for?",
      choices: [
        "Java Virtual Memory",
        "Java Virtual Machine",
        "Java Valid Module",
        "Java Value Manager",
      ],
      answer: 1,
    },
    {
      question: "Which keyword is used to create a class in Java?",
      choices: ["Class", "class", "CLASS", "Both A and B"],
      answer: 1,
    },
    {
      question: "What is the correct way to declare a variable in Java?",
      choices: ["int x = 5;", "x = 5;", "int x;", "variable x = 5;"],
      answer: 0,
    },
    {
      question: "Which method is the entry point of a Java program?",
      choices: ["start()", "begin()", "main()", "init()"],
      answer: 2,
    },
    {
      question: "What is the output of: System.out.println(10 + 20);",
      choices: ["Error", "30", "1020", "None"],
      answer: 1,
    },
  ],
};

let questions = [
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperloop Machine Language",
    ],
    answer: 0,
  },
  {
    question: "Which tag is used for JavaScript?",
    choices: ["<java>", "<script>", "<js>", "<code>"],
    answer: 1,
  },
  {
    question: "What does CSS do?",
    choices: [
      "Adds logic",
      "Styles web pages",
      "Manages database",
      "Handles forms",
    ],
    answer: 1,
  },
  {
    question: "Which one is a JavaScript framework?",
    choices: ["Laravel", "Django", "React", "Flask"],
    answer: 2,
  },
  {
    question: "What keyword creates a variable in JS?",
    choices: ["create", "int", "let", "define"],
    answer: 2,
  },
];

let current = 0,
  score = 0,
  timeLeft = 20,
  timer,
  customQuizMode = false,
  selectedSubject = "";

const subjectInfo = {
  web: {
    name: "Web Development",
    emoji: "🌐",
    description: "Test your knowledge on HTML, CSS, and JavaScript!",
  },
  python: {
    name: "Python",
    emoji: "🐍",
    description: "Challenge yourself with Python programming questions!",
  },
  math: {
    name: "Mathematics",
    emoji: "🔢",
    description: "Solve mathematical problems and challenges!",
  },
  history: {
    name: "History",
    emoji: "📚",
    description: "Explore historical facts and events!",
  },
  java: {
    name: "Java",
    emoji: "☕",
    description: "Master Java programming basics and concepts!",
  },
};

const $ = (id) => document.getElementById(id);

// Main Menu Navigation
$("choose-subject-btn").onclick = () => {
  $("main-menu").classList.remove("active");
  $("subject-selection").classList.add("active");
};

$("create-quiz-btn").onclick = () => {
  $("main-menu").classList.remove("active");
  $("create-quiz").classList.add("active");
  initializeQuizBuilder();
};

// Back buttons
$("back-to-menu-btn").onclick = () => {
  $("subject-selection").classList.remove("active");
  $("main-menu").classList.add("active");
};

$("back-to-menu-btn2").onclick = () => {
  $("create-quiz").classList.remove("active");
  $("main-menu").classList.add("active");
};

$("back-from-instructions").onclick = () => {
  $("instructions").classList.remove("active");
  $("main-menu").classList.add("active");
};

// Subject Selection
document.querySelectorAll(".subject-btn").forEach((btn) => {
  btn.onclick = (e) => {
    const subject = e.target.dataset.subject;
    selectedSubject = subject;
    const info = subjectInfo[subject];
    questions = JSON.parse(JSON.stringify(quizzes[subject]));
    current = 0;
    score = 0;
    customQuizMode = false;
    $("subject-title").textContent = `${info.name} Quiz`;
    $("subject-emoji").textContent = info.emoji;
    $(
      "quiz-description"
    ).textContent = `${info.description} This quiz includes ${questions.length} questions. You have 20 seconds per question. Good luck!`;
    $("subject-selection").classList.remove("active");
    $("instructions").classList.add("active");
  };
});

// Quiz Builder
let questionCount = 0;

function initializeQuizBuilder() {
  questionCount = 0;
  $("questions-container").innerHTML = "";
  $("quiz-title").value = "";
  addQuestionInput();
}

function addQuestionInput() {
  questionCount++;
  const questionDiv = document.createElement("div");
  questionDiv.className = "question-input";
  questionDiv.id = `question-${questionCount}`;

  const questionHTML = `
    <div style="margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
      <h4>Question ${questionCount}</h4>
      
      <!-- Question Type Selection -->
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Question Type:</label>
        <select class="question-type" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <option value="multiple">Multiple Choice</option>
          <option value="trueFalse">True/False</option>
          <option value="checkbox">Checkbox (Multiple Answers)</option>
        </select>
      </div>
      
      <!-- Question Text -->
      <input type="text" class="question-text" placeholder="Enter question text" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
      
      <!-- Choices Container (Dynamic based on question type) -->
      <div class="question-type-container" style="margin-bottom: 1rem;">
        <!-- Multiple Choice Container -->
        <div class="multiple-choice-container">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Choices:</label>
          <div class="choices">
            <input type="text" class="choice" placeholder="Choice 1" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            <input type="text" class="choice" placeholder="Choice 2" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            <input type="text" class="choice" placeholder="Choice 3" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            <input type="text" class="choice" placeholder="Choice 4" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          </div>
          <select class="answer-select" style="width: 100%; padding: 0.5rem; margin-top: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            <option value="">Select Correct Answer</option>
            <option value="0">Choice 1</option>
            <option value="1">Choice 2</option>
            <option value="2">Choice 3</option>
            <option value="3">Choice 4</option>
          </select>
        </div>
        
        <!-- True/False Container (Hidden by default) -->
        <div class="trueFalse-container" style="display: none;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Correct Answer:</label>
          <select class="trueFalse-answer" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            <option value="">Select Correct Answer</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        
        <!-- Checkbox Container (Hidden by default) -->
        <div class="checkbox-container" style="display: none;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Choices (Check all that are correct):</label>
          <div class="checkbox-choices">
            <div style="margin-bottom: 0.5rem;">
              <input type="text" class="checkbox-choice" placeholder="Choice 1" style="width: calc(100% - 30px); padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
              <input type="checkbox" class="checkbox-correct" style="margin-left: 0.5rem;" title="Mark as correct">
            </div>
            <div style="margin-bottom: 0.5rem;">
              <input type="text" class="checkbox-choice" placeholder="Choice 2" style="width: calc(100% - 30px); padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
              <input type="checkbox" class="checkbox-correct" style="margin-left: 0.5rem;" title="Mark as correct">
            </div>
            <div style="margin-bottom: 0.5rem;">
              <input type="text" class="checkbox-choice" placeholder="Choice 3" style="width: calc(100% - 30px); padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
              <input type="checkbox" class="checkbox-correct" style="margin-left: 0.5rem;" title="Mark as correct">
            </div>
            <div style="margin-bottom: 0.5rem;">
              <input type="text" class="checkbox-choice" placeholder="Choice 4" style="width: calc(100% - 30px); padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
              <input type="checkbox" class="checkbox-correct" style="margin-left: 0.5rem;" title="Mark as correct">
            </div>
          </div>
        </div>
      </div>
      
      <button type="button" class="btn secondary" style="margin-top: 0.5rem; width: 100%;" onclick="removeQuestion('question-${questionCount}')">Remove</button>
    </div>
  `;

  questionDiv.innerHTML = questionHTML;
  $("questions-container").appendChild(questionDiv);

  // Add event listener for question type change
  const typeSelect = questionDiv.querySelector(".question-type");
  typeSelect.addEventListener("change", function () {
    updateQuestionTypeDisplay(questionDiv, this.value);
  });
}

function updateQuestionTypeDisplay(questionDiv, questionType) {
  const multipleContainer = questionDiv.querySelector(
    ".multiple-choice-container"
  );
  const trueFalseContainer = questionDiv.querySelector(".trueFalse-container");
  const checkboxContainer = questionDiv.querySelector(".checkbox-container");

  // Hide all containers
  multipleContainer.style.display = "none";
  trueFalseContainer.style.display = "none";
  checkboxContainer.style.display = "none";

  // Show the selected container
  if (questionType === "multiple") {
    multipleContainer.style.display = "block";
  } else if (questionType === "trueFalse") {
    trueFalseContainer.style.display = "block";
  } else if (questionType === "checkbox") {
    checkboxContainer.style.display = "block";
  }
}

function removeQuestion(id) {
  const element = $(id);
  if (element) {
    element.remove();
  }
}

$("add-question-btn").onclick = () => {
  addQuestionInput();
};

$("submit-custom-quiz-btn").onclick = () => {
  const title = $("quiz-title").value || "Custom Quiz";
  const questionDivs = document.querySelectorAll(".question-input");
  const customQuestions = [];

  questionDivs.forEach((div) => {
    const questionText = div.querySelector(".question-text").value;
    const questionType = div.querySelector(".question-type").value;

    if (!questionText) return; // Skip if no question text

    let questionObj = {
      question: questionText,
      type: questionType,
    };

    if (questionType === "multiple") {
      // Multiple choice question
      const choicesInputs = div.querySelectorAll(".choice");
      const choices = Array.from(choicesInputs).map((input) => input.value);
      const answer = parseInt(div.querySelector(".answer-select").value);

      if (choices.every((c) => c) && answer !== "") {
        questionObj.choices = choices;
        questionObj.answer = answer;
        customQuestions.push(questionObj);
      }
    } else if (questionType === "trueFalse") {
      // True/False question
      const answer = div.querySelector(".trueFalse-answer").value;

      if (answer !== "") {
        questionObj.choices = ["True", "False"];
        questionObj.answer = answer === "true" ? 0 : 1;
        customQuestions.push(questionObj);
      }
    } else if (questionType === "checkbox") {
      // Checkbox question (multiple correct answers)
      const checkboxChoices = div.querySelectorAll(".checkbox-choice");
      const checkboxCorrects = div.querySelectorAll(".checkbox-correct");
      const choices = Array.from(checkboxChoices).map((input) => input.value);
      const correctAnswers = Array.from(checkboxCorrects)
        .map((checkbox, index) => (checkbox.checked ? index : -1))
        .filter((i) => i !== -1);

      if (choices.every((c) => c) && correctAnswers.length > 0) {
        questionObj.choices = choices;
        questionObj.answer = correctAnswers; // Array of correct answer indices
        customQuestions.push(questionObj);
      }
    }
  });

  if (customQuestions.length === 0) {
    alert("Please fill in at least one complete question!");
    return;
  }

  questions = customQuestions;
  current = 0;
  score = 0;
  customQuizMode = true;
  $(
    "quiz-description"
  ).textContent = `Custom Quiz: ${title}. ${questions.length} questions, 20 seconds each. Good luck!`;
  $("create-quiz").classList.remove("active");
  $("instructions").classList.add("active");
};

$("start-btn").onclick = () => {
  $("instructions").classList.remove("active");
  $("quiz").classList.add("active");
  loadQuestion();
};

$("next-btn").onclick = () => {
  clearInterval(timer);
  checkAnswer();
  showFeedback(() => nextQuestion());
};

$("restart-btn").onclick = () => location.reload();

$("fullscreen-btn").onclick = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    $("fullscreen-btn").textContent = "✖ Exit Fullscreen";
  } else {
    document.exitFullscreen();
    $("fullscreen-btn").textContent = "⛶ Fullscreen";
  }
};

function loadQuestion() {
  timeLeft = 20;
  $("time-left").textContent = timeLeft;
  const q = questions[current];
  $("question-title").textContent = `${current + 1}. ${q.question}`;

  // Display subject name in quiz
  if (selectedSubject && subjectInfo[selectedSubject]) {
    $(
      "current-subject"
    ).textContent = `${subjectInfo[selectedSubject].emoji} ${subjectInfo[selectedSubject].name}`;
  } else if (customQuizMode) {
    $("current-subject").textContent = "📝 Custom Quiz";
  }

  $("quiz-form").innerHTML = "";

  const questionType = q.type || "multiple"; // Default to multiple choice for backward compatibility

  if (questionType === "checkbox") {
    // Checkbox question - multiple correct answers
    q.choices.forEach((choice, i) => {
      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "10px";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `question-${i}`;
      input.value = i;
      label.appendChild(input);
      label.append(` ${choice}`);
      $("quiz-form").appendChild(label);
    });
  } else {
    // Radio button for multiple choice and true/false
    q.choices.forEach((choice, i) => {
      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "10px";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "question";
      input.value = i;
      label.appendChild(input);
      label.append(` ${choice}`);
      $("quiz-form").appendChild(label);
    });
  }

  startTimer();
  updateProgress();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    $("time-left").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      checkAnswer();
      showFeedback(() => nextQuestion());
    }
  }, 1000);
}

function checkAnswer() {
  const q = questions[current];
  const questionType = q.type || "multiple";

  if (questionType === "checkbox") {
    // For checkbox questions, check if all correct answers are selected and no incorrect ones
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const selectedAnswers = Array.from(checkboxes)
      .map((checkbox, index) => (checkbox.checked ? index : -1))
      .filter((i) => i !== -1);

    // Sort both arrays to compare
    const correctAnswers = Array.isArray(q.answer)
      ? q.answer.sort((a, b) => a - b)
      : [];
    const userAnswers = selectedAnswers.sort((a, b) => a - b);

    // Check if arrays are equal
    if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
      score++;
    }
  } else {
    // For multiple choice and true/false
    const selected = document.querySelector('input[name="question"]:checked');
    const userAnswer = selected ? parseInt(selected.value) : null;
    if (userAnswer !== null && userAnswer === q.answer) {
      score++;
    }
  }
}

function showFeedback(callback) {
  const q = questions[current];
  const questionType = q.type || "multiple";
  const labels = document.querySelectorAll("#quiz-form label");

  if (questionType === "checkbox") {
    // For checkbox questions
    const correctAnswers = Array.isArray(q.answer) ? q.answer : [];

    labels.forEach((label) => {
      const input = label.querySelector("input");
      const index = parseInt(input.value);

      if (correctAnswers.includes(index)) {
        label.classList.add("correct");
      } else if (input.checked) {
        label.classList.add("incorrect");
      }
      input.disabled = true;
    });

    const correctDiv = document.createElement("div");
    correctDiv.className = "correct-answer-popup";
    const correctChoices = correctAnswers.map((i) => q.choices[i]).join(", ");
    correctDiv.innerHTML = `<p>✅ Correct answers: <strong>${correctChoices}</strong></p>`;
    $("quiz-form").appendChild(correctDiv);
  } else {
    // For multiple choice and true/false
    const correctIndex = q.answer;

    labels.forEach((label) => {
      const input = label.querySelector("input");
      const index = parseInt(input.value);

      if (index === correctIndex) {
        label.classList.add("correct");
      } else if (input.checked) {
        label.classList.add("incorrect");
      }
      input.disabled = true;
    });

    const correctDiv = document.createElement("div");
    correctDiv.className = "correct-answer-popup";
    correctDiv.innerHTML = `<p>✅ Correct answer: <strong>${q.choices[correctIndex]}</strong></p>`;
    $("quiz-form").appendChild(correctDiv);
  }

  setTimeout(() => {
    const correctDiv = $("quiz-form").querySelector(".correct-answer-popup");
    if (correctDiv) {
      correctDiv.remove();
    }
    callback();
  }, 1500);
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function updateProgress() {
  const percent = ((current + 1) / questions.length) * 100;
  $("progress-bar").style.width = `${percent}%`;
  $("progress-bar").textContent = `${current + 1} / ${questions.length}`;
}

function saveQuizResultToLeaderboard() {
  // Get logged-in user data
  const userData = getUserData();
  const playerName = userData
    ? userData.fullName || userData.email
    : "Anonymous";

  const category =
    selectedSubject && subjectInfo[selectedSubject]
      ? subjectInfo[selectedSubject].name
      : customQuizMode
      ? "Custom Quiz"
      : "Unknown";

  // Get unified app data
  let appData = JSON.parse(localStorage.getItem("quizAppData")) || {
    users: [],
    leaderboard: [],
    currentUser: null,
    loggedIn: false,
  };

  // Create new entry with user ID for tracking
  const newEntry = {
    userId: userData ? userData.id : null,
    name: playerName,
    score: score,
    category: category,
    totalQuestions: questions.length,
    date: new Date().toISOString(),
  };

  // Add to leaderboard and sort
  appData.leaderboard = appData.leaderboard || [];
  appData.leaderboard.push(newEntry);
  appData.leaderboard.sort((a, b) => b.score - a.score);

  // Save back to unified storage
  localStorage.setItem("quizAppData", JSON.stringify(appData));
}

function showResult() {
  $("quiz").classList.remove("active");
  $("result").classList.add("active");
  $(
    "final-score"
  ).textContent = `You scored ${score} out of ${questions.length}`;

  $("celebration-overlay").style.display = "flex";
  $("celebration-overlay").textContent =
    score >= 4 ? "🎉 Congratulations!" : "👍 Better Luck Next Time!";
  setTimeout(() => ($("celebration-overlay").style.display = "none"), 3000);

  // Save result to leaderboard
  saveQuizResultToLeaderboard();
}
