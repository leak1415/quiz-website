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
  selectedSubject = "",
  adminQuizType = "";

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
    emoji: "☕️",
    description: "Master Java programming basics and concepts!",
  },
};

const $ = (id) => document.getElementById(id);

// Main Menu Navigation
$("choose-subject-btn").onclick = () => {
  $("main-menu").classList.remove("active");
  $("subject-selection").classList.add("active");
};

$("admin-quiz-btn").onclick = () => {
  $("main-menu").classList.remove("active");
  $("admin-quiz").classList.add("active");
  initializeAdminQuizBuilder();
};

// Back buttons
$("back-to-menu-btn").onclick = () => {
  $("subject-selection").classList.remove("active");
  $("main-menu").classList.add("active");
};

$("back-from-admin-btn").onclick = () => {
  $("admin-quiz").classList.remove("active");
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

// Hamburger menu
$("hamburger").onclick = () => {
  const navList = $("nav-list");
  const isExpanded = $("hamburger").getAttribute("aria-expanded") === "true";
  $("hamburger").setAttribute("aria-expanded", !isExpanded);
  navList.classList.toggle("active");
};

// Quiz Builder
let questionCount = 0;
let selectedQuestionType = null;
let adminQuestionCount = 0;

function initializeAdminQuizBuilder() {
  adminQuestionCount = 0;
  $("admin-questions-container").innerHTML = "";
  $("admin-quiz-title").value = "";
  $("admin-question-type-select").value = "";
  $("admin-quiz-type").value = "";
  adminQuizType = "";
}

// Capture admin quiz type selection
$("admin-quiz-type").onchange = function () {
  adminQuizType = this.value;
};


function addAdminMultipleChoiceQuestion() {
  adminQuestionCount++;
  const questionDiv = document.createElement("div");
  questionDiv.className = "question-input";
  questionDiv.id = `admin-question-${adminQuestionCount}`;
  questionDiv.setAttribute("data-type", "multiple-choice");
  questionDiv.innerHTML = `
    <div style="margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #4CAF50;">
      <h4>Question ${adminQuestionCount} - Multiple Choice</h4>
      <input type="text" class="question-text" placeholder="Enter question text" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Options:</label>
      <div class="choices">
        <input type="text" class="choice" placeholder="Choice 1" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
        <input type="text" class="choice" placeholder="Choice 2" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
        <input type="text" class="choice" placeholder="Choice 3" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
        <input type="text" class="choice" placeholder="Choice 4" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
      </div>
      <label style="display: block; margin-bottom: 0.5rem; margin-top: 0.5rem; font-weight: bold;">Correct Answer:</label>
      <select class="answer-select" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
        <option value="">Select Correct Answer</option>
        <option value="0">Choice 1</option>
        <option value="1">Choice 2</option>
        <option value="2">Choice 3</option>
        <option value="3">Choice 4</option>
      </select>
      <button type="button" class="btn secondary" style="margin-top: 0.5rem; width: 100%;" onclick="removeAdminQuestion('admin-question-${adminQuestionCount}')">Remove</button>
    </div>
  `;
  $("admin-questions-container").appendChild(questionDiv);
}

function addAdminTrueFalseQuestion() {
  adminQuestionCount++;
  const questionDiv = document.createElement("div");
  questionDiv.className = "question-input";
  questionDiv.id = `admin-question-${adminQuestionCount}`;
  questionDiv.setAttribute("data-type", "true-false");
  questionDiv.innerHTML = `
    <div style="margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #2196F3;">
      <h4>Question ${adminQuestionCount} - True/False</h4>
      <input type="text" class="question-text" placeholder="Enter question text" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Correct Answer:</label>
      <select class="answer-select" style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
        <option value="">Select Answer</option>
        <option value="0">True</option>
        <option value="1">False</option>
      </select>
      <button type="button" class="btn secondary" style="margin-top: 0.5rem; width: 100%;" onclick="removeAdminQuestion('admin-question-${adminQuestionCount}')">Remove</button>
    </div>
  `;
  $("admin-questions-container").appendChild(questionDiv);
}


function addAdminCheckboxQuestion() {
  adminQuestionCount++;
  const questionDiv = document.createElement("div");
  questionDiv.className = "question-input";
  questionDiv.id = `admin-question-${adminQuestionCount}`;
  questionDiv.setAttribute("data-type", "checkbox");
  questionDiv.innerHTML = `
    <div style="margin-bottom: 1rem; padding: 1rem; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #FF9800;">
      <h4>Question ${adminQuestionCount} - Checkbox (Multiple Correct)</h4>
      <input type="text" class="question-text" placeholder="Enter question text" style="width: 100%; padding: 0.5rem; margin-bottom: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: bold;">Options (check all that apply):</label>
      <div class="choices">
        <div style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <input type="text" class="choice" placeholder="Option 1" style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <label style="margin: 0; font-weight: normal;"><input type="checkbox" class="answer-checkbox" value="0"> Correct</label>
        </div>
        <div style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <input type="text" class="choice" placeholder="Option 2" style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <label style="margin: 0; font-weight: normal;"><input type="checkbox" class="answer-checkbox" value="1"> Correct</label>
        </div>
        <div style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <input type="text" class="choice" placeholder="Option 3" style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <label style="margin: 0; font-weight: normal;"><input type="checkbox" class="answer-checkbox" value="2"> Correct</label>
        </div>
        <div style="margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
          <input type="text" class="choice" placeholder="Option 4" style="flex: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
          <label style="margin: 0; font-weight: normal;"><input type="checkbox" class="answer-checkbox" value="3"> Correct</label>
        </div>
      </div>
      <button type="button" class="btn secondary" style="margin-top: 0.5rem; width: 100%;" onclick="removeAdminQuestion('admin-question-${adminQuestionCount}')">Remove</button>
    </div>
  `;
  $("admin-questions-container").appendChild(questionDiv);
}

function removeAdminQuestion(id) {
  const element = $(id);
  if (element) {
    element.remove();
  }
}

$("admin-add-question-btn").onclick = () => {
  const questionType = $("admin-question-type-select").value;

  if (!questionType) {
    alert("Please select a question type");
    return;
  }

  if (questionType === "mc") {
    addAdminMultipleChoiceQuestion();
  } else if (questionType === "tf") {
    addAdminTrueFalseQuestion();
  } else if (questionType === "checkbox") {
    addAdminCheckboxQuestion();
  }

  $("admin-question-type-select").value = "";
};

$("admin-submit-quiz-btn").onclick = () => {
  const title = $("admin-quiz-title").value || "Admin Quiz";
  const quizType = adminQuizType || "custom";
  const questionDivs = document.querySelectorAll(
    "#admin-questions-container .question-input"
  );
  const adminQuestions = [];

  questionDivs.forEach((div) => {
    const questionType = div.getAttribute("data-type");
    const questionText = div.querySelector(".question-text").value;

    if (!questionText) return;

    if (questionType === "multiple-choice") {
      const choicesInputs = div.querySelectorAll(".choice");
      const choices = Array.from(choicesInputs)
        .map((input) => input.value)
        .filter((c) => c);
      const answer = parseInt(div.querySelector(".answer-select").value);


      if (choices.length >= 2 && answer !== "" && !isNaN(answer)) {
        adminQuestions.push({
          question: questionText,
          type: "multiple-choice",
          choices: choices,
          answer: answer,
        });
      }
    } else if (questionType === "true-false") {
      const answer = parseInt(div.querySelector(".answer-select").value);
      const answers = ["True", "False"];

      if (answer !== "" && !isNaN(answer)) {
        adminQuestions.push({
          question: questionText,
          type: "true-false",
          choices: answers,
          answer: answer,
        });
      }
    } else if (questionType === "checkbox") {
      const choicesInputs = div.querySelectorAll(".choice");
      const choices = Array.from(choicesInputs)
        .map((input) => input.value)
        .filter((c) => c);
      const checkboxes = div.querySelectorAll(".answer-checkbox");
      const correctAnswers = Array.from(checkboxes)
        .map((cb, idx) => (cb.checked ? idx : null))
        .filter((idx) => idx !== null);

      if (choices.length >= 2 && correctAnswers.length > 0) {
        adminQuestions.push({
          question: questionText,
          type: "checkbox",
          choices: choices,
          answer: correctAnswers,
        });
      }
    }
  });

  if (adminQuestions.length === 0) {
    alert("Please add at least one valid question");
    return;
  }

  questions = adminQuestions;
  current = 0;
  score = 0;
  customQuizMode = true;

  // Set selected subject if it's one of the predefined types
  if (quizType !== "custom" && subjectInfo[quizType]) {
    selectedSubject = quizType;
    const info = subjectInfo[quizType];
    $("subject-title").textContent = `${info.name} Quiz`;
    $("subject-emoji").textContent = info.emoji;
  } else {
    selectedSubject = "";
    $("subject-title").textContent = `${title}`;
    $("subject-emoji").textContent = "📝";
  }

  $(
    "quiz-description"
  ).textContent = `Custom Quiz: ${title}. ${questions.length} questions, 20 seconds each. Good luck!`;

  $("admin-quiz").classList.remove("active");
  $("instructions").classList.add("active");

  // Reset the quiz type selector
  adminQuizType = "";
  $("admin-quiz-type").value = "";
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
  } else {
    $("current-subject").textContent = "";
  }

  $("quiz-form").innerHTML = "";

  if (q.type === "checkbox") {
    // Checkbox type - multiple correct answers
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
    // Multiple choice or True/False - single correct answer
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

  if (q.type === "checkbox") {
    // For checkbox questions, check if all correct answers are selected and no incorrect ones
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const userAnswers = Array.from(checkboxes)
      .filter((cb) => cb.checked)
      .map((cb) => parseInt(cb.value));

    const correctAnswers = q.answer;
    const isCorrect =
      userAnswers.length === correctAnswers.length &&
      userAnswers.every((ans) => correctAnswers.includes(ans));

    if (isCorrect) {
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
  const labels = document.querySelectorAll("#quiz-form label");
  const correctDiv = document.createElement("div");
  correctDiv.className = "correct-answer-popup";

  if (q.type === "checkbox") {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const correctAnswers = q.answer;

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

    const correctAnswerText = correctAnswers
      .map((i) => q.choices[i])
      .join(", ");
    correctDiv.innerHTML = `<p>✅ Correct answers: <strong>${correctAnswerText}</strong></p>`;
  } else {
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

    correctDiv.innerHTML = `<p>✅ Correct answer: <strong>${q.choices[correctIndex]}</strong></p>`;
  }

  $("quiz-form").appendChild(correctDiv);

  setTimeout(() => {
    correctDiv.remove();
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
}
