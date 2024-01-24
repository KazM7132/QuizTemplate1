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

/* QUESTION CONTAINER*/

let questions = [
  {
    questionimage: "<img src=\"https://fultonfishmarket.com/cdn/shop/articles/20220223181102-blinis-with-black-caviar-recipe_3_800x800.jpg?v=1686860198\" alt = \"Sorting hat\" width=\"40%\" height = \"auto\" object-position=\"center\">", 
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
  },
  {
    questionimage: "<img src=\"https://www.aspicyperspective.com/wp-content/uploads/2021/11/Shoestring-Fries-Julienne-Cut-20-500x500.jpg\" width=\"30%\" length = \"30%\" object-position=\"center\">",
    question:"Which cut is this?",
    choice1: "Batonnet",
    choice2: "Diced",
    choice3: "Rondelle",
    choice4: "Julienne",
    answer: 4,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, Juienne is a technique where food is cut into long, thin strips, similar to matchsticks"
  },
  {
    questionimage: "<img src=\"https://www.justonecookbook.com/wp-content/uploads/2022/03/Fresh-Kimchi-6968-I-500x500.jpg\" width=\"30%\" length = \"30%\" object-position=\"center\">",
    question:"What is this dish called?",
    choice1: "Pad Thai",
    choice2: "Tomato Sauce",
    choice3: "Kimchi",
    choice4: "Curry",
    answer: 3,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, Kimchi is a staple in Korean cuisine and is made from salted and fermented vegetables"
  },
  {
    questionimage: "<img src=\"https://img.sndimg.com/food/image/upload/f_auto,c_thumb,q_55,w_860,ar_3:2/v1/img/recipes/24/11/39/fx6DgBKrTqqH8ZA92OiN_blue-ribbon-dill-pickles_075.jpg\" width=\"50%\" length = \"30%\" object-position=\"center\">",
    question:"How long does it take to pickle cucumbers?",
    choice1: "3 Days",
    choice2: "3 Weeks",
    choice3: "1 Week",
    choice4: "1 Day",
    answer: 2,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, regular dill pickles and sauerkraut are fermented and cured for about 3 weeks"
  },
  {
    questionimage: "<img src=\"https://static01.nyt.com/images/2022/10/04/multimedia/06ASKWELL-MATCHA1/06ASKWELL-MATCHA1-articleLarge.jpg\" width=\"30%\" length = \"30%\" object-position=\"center\">",
    question:"What is this",
    choice1: "Celery root",
    choice2: "Curry",
    choice3: "Oolong",
    choice4: "Matcha",
    answer: 4,
    correctanswer: "Correct",
    incorrectanswer: "Incorrect, Matcha is a type of green tea ground into powdered form"
  },
  
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 7;

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
    localStorage.setItem("numericScoreTest", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText = `${((questionCounter / MAX_QUESTIONS) * 100).toFixed(0)}%`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  
  
  question.innerText = currentQuestion.question;
  correctBox.innerText = currentQuestion.correctanswer
  incorrectBox.innerText = currentQuestion.incorrectanswer
  innerImage.innerHTML = currentQuestion.questionimage;
  document.getElementById('nextQuestion').style.visibility='hidden';
  document.getElementById('correctBox').style.visibility='hidden';
  document.getElementById('incorrectBox').style.visibility='hidden';


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
      document.getElementById('correctBox').style.visibility='visible';
    } else{
      document.getElementById('incorrectBox').style.visibility='visible';
    }


    selectedChoice.parentElement.classList.add(classToApply);
    document.getElementById('nextQuestion').style.visibility='visible';
    

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