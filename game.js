const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const innerImage = document.getElementById('innerImage');
const correctBox = document.getElementById('correctBox');
const incorrectBox = document.getElementById('incorrectBox');
const nextQuestion = document.getElementById('nextQuestion');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    questionimage: "<img src=\"https://fultonfishmarket.com/cdn/shop/articles/20220223181102-blinis-with-black-caviar-recipe_3_800x800.jpg?v=1686860198\" alt = \"Sorting hat\" width=\"30%\" length = \"30%\" object-position=\"center\">", 
    question: "Which animal does caviar come from?",
    choice1: "Octopus",
    choice2: "Chickens",
    choice3: "Fish",
    choice4: "Frogs",
    answer: 3,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, caviar originates from fish"
  },
  {
    questionimage: "<img src=\"https://agrimatco.ae/wp-content/uploads/2019/12/p3.jpg\" width=\"30%\" length = \"30%\" object-position=\"center\">",
    question:"What is a tomato?",
    choice1: "Mineral",
    choice2: "Legume",
    choice3: "Fruit",
    choice4: "Vegetable",
    answer: 3,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, tomato is a fruit due to possessing seeds"
  },
  {
    questionimage: "<img src=\"https://feelgoodfoodie.net/wp-content/uploads/2016/12/how-to-poach-an-egg-10.jpg\" alt = \"Sorting hat\" width=\"30%\" length = \"30%\" object-position=\"center\">",
    question: "What type of egg is this?",
    choice1: "Poached",
    choice2: "Scrambled",
    choice3: "Boiled",
    choice4: "Fried",
    answer: 1,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, poached eggs are cooked at a low temperature to ensure a runny yolk with a hardened crust"
  }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

document.getElementById('score').style.display='none';

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `${(questionCounter / MAX_QUESTIONS).toFixed(2) * 100}%`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  
  question.innerText = currentQuestion.question;
  correctBox.innerText = currentQuestion.correctanswer
  incorrectBox.innerText = currentQuestion.incorrectanswer
  innerImage.innerHTML = currentQuestion.questionimage;
  document.getElementById('nextQuestion').style.display='none';
  document.getElementById('correctBox').style.display='none';
  document.getElementById('incorrectBox').style.display='none';


  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
      document.getElementById('correctBox').style.display='block';
    } else{
      document.getElementById('incorrectBox').style.display='block';
    }


    selectedChoice.parentElement.classList.add(classToApply);
    document.getElementById('nextQuestion').style.display='block';
    

    nextQuestion.addEventListener("click", e => {
    selectedChoice.parentElement.classList.remove(classToApply);
    
    });
  });
});


incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();