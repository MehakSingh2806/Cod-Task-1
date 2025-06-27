const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Sheets", correct: false }
    ]
  }
];

const questionEl = document.getElementById("question");
const answerButtonsEl = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const feedbackEl = document.getElementById("feedback");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add("hide");
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    li.appendChild(button);
    answerButtonsEl.appendChild(li);
  });
}

function resetState() {
  feedbackEl.innerText = "";
  nextBtn.style.display = "none";
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

function selectAnswer(button, correct) {
  const buttons = answerButtonsEl.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (correct) {
    button.classList.add("correct");
    feedbackEl.innerText = "Correct!";
    score++;
  } else {
    button.classList.add("wrong");
    feedbackEl.innerText = "Wrong!";
  }
  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionEl.innerText = "Quiz Completed!";
  scoreContainer.classList.remove("hide");
  scoreEl.innerText = `${score} / ${questions.length}`;
  nextBtn.innerText = "Restart";
  nextBtn.style.display = "inline-block";
  nextBtn.onclick = startQuiz;
}

startQuiz();
