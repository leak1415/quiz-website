const questions = [
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

// ===== VARIABLES =====
let currentQuestion = 0;
let score = 0;
let timeLeft = 20;
let timer;

// shortcut for getElementById
function get(id) {
  return document.getElementById(id);
}

// ===== BUTTON EVENTS =====
get("start-btn").onclick = function () {
  get("instructions").classList.remove("active");
  get("quiz").classList.add("active");
  loadQuestion();
};

get("next-btn").onclick = function () {
  clearInterval(timer);
  checkAnswer();
  showFeedback(nextQuestion);
};

get("restart-btn").onclick = function () {
  location.reload();
};

// ===== LOAD QUESTION =====
function loadQuestion() {
  timeLeft = 20;
  get("time-left").textContent = timeLeft;

  const q = questions[currentQuestion];
  get("question-title").textContent =
    (currentQuestion + 1) + ". " + q.question;

  get("quiz-form").innerHTML = "";

  for (let i = 0; i < q.choices.length; i++) {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = i;

    label.appendChild(input);
    label.append(" " + q.choices[i]);

    get("quiz-form").appendChild(label);
  }

  startTimer();
  updateProgress();
}

// ===== TIMER =====
function startTimer() {
  timer = setInterval(function () {
    timeLeft--;
    get("time-left").textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer();
      showFeedback(nextQuestion);
    }
  }, 1000);
}

// ===== CHECK ANSWER =====
function checkAnswer() {
  const selected = document.querySelector(
    'input[name="answer"]:checked'
  );

  if (selected) {
    const userAnswer = Number(selected.value);
    if (userAnswer === questions[currentQuestion].answer) {
      score++;
    }
  }
}

// ===== SHOW FEEDBACK =====
function showFeedback(callback) {
  const correctIndex = questions[currentQuestion].answer;
  const labels = document.querySelectorAll("#quiz-form label");

  labels.forEach(function (label) {
    const input = label.querySelector("input");
    input.disabled = true;

    if (Number(input.value) === correctIndex) {
      label.classList.add("correct");
    } else if (input.checked) {
      label.classList.add("incorrect");
    }
  });

  setTimeout(callback, 1500);
}

// ===== NEXT QUESTION =====
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// ===== PROGRESS BAR =====
function updateProgress() {
  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  get("progress-bar").style.width = progress + "%";
  get("progress-bar").textContent =
    currentQuestion + 1 + " / " + questions.length;
}

// ===== RESULT =====
function showResult() {
  get("quiz").classList.remove("active");
  get("result").classList.add("active");

  get("final-score").textContent =
    "You scored " + score + " out of " + questions.length;
}
