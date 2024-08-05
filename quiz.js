const quizData = [
  {
    question: "What is the tallest mountain on Earth?",
    choices: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount McKinley"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "How many continents are there?",
    choices: ["Five", "Six", "Seven", "Eight"],
    correctAnswer: "Seven",
  },
  {
    question: "What is the largest ocean in the world?",
    choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the capital of Australia?",
    choices: ["Sydney", "Melbourne", "Perth", "Canberra"],
    correctAnswer: "Canberra",
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O",
  },
  {
    question: "What is the boiling point of water in degrees Celsius?",
    choices: ["0°C", "100°C", "50°C", "200°C"],
    correctAnswer: "100°C",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    choices: ["William Shakespeare", "Charles Dickens", "Jane Austen", "F. Scott Fitzgerald"],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the currency of Japan?",
    choices: ["Yuan", "Dollar", "Euro", "Yen"],
    correctAnswer: "Yen",
  },
  {
    question: "What is the largest mammal in the world?",
    choices: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
];


let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");
const resultElement = document.getElementById("result");

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionElement.innerText = q.question;
  choicesElement.innerHTML = "";
  for (let choice of q.choices) {
    const button = document.createElement("button");
    button.innerText = choice;
    button.onclick = () => selectAnswer(button, choice);
    choicesElement.appendChild(button);
  }
}

function selectAnswer(button, choice) {
  const buttons = choicesElement.querySelectorAll("button");
  buttons.forEach((btn) => btn.classList.remove("selected"));

  button.classList.add("selected");
}

function checkAnswer() {
  const selectedButton = choicesElement.querySelector(".selected");
  if (!selectedButton) {
    feedbackElement.innerText = "Please select an answer.";
    return;
  }

  const choice = selectedButton.innerText;
  const q = quizData[currentQuestion];
  if (choice === q.correctAnswer) {
    score++;
    feedbackElement.innerText = "Correct!";
  } else {
    feedbackElement.innerText = "Wrong!";
  }

  const buttons = choicesElement.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  questionElement.style.display = "none";
  choicesElement.style.display = "none";
  submitButton.style.display = "none";
  feedbackElement.style.display = "none";
  resultElement.innerText = `Your score: ${score} out of ${quizData.length}`;
}

submitButton.addEventListener("click", checkAnswer);

loadQuestion();
