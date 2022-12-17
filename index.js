// var timerEl = document.getElementById('timer'); 

// function timer() {
//     var time = 100;

//     var timeInterval = setInterval(function () {
//         if (time > 0) {
//             timerEl.textContent = 'Time: ' + time;
//             time--; 
//         } else if (time === 0) {
//             clearInterval(timeInterval);
//         } 
//     }, 1000);  
// }

// timer();
// start button 
// countdown timer
// array of questions
// prompts for questions

// Creating Javascript constants that connect to HTML to dynamically update the elements

const start = document.getElementById('start');

const quiz = document.getElementById('quiz');

const question = document.getElementById('question');

const counter = document.getElementById('counter');

const timeGauge = document.getElementById('timeGauge');

const choiceA = document.getElementById('A');

const choiceB = document.getElementById('B');

const choiceC = document.getElementById('C');

const choiceD = document.getElementById('D');

const progress = document.getElementById('progress');

const scoreContainer = document.getElementById('score');

const highscore = document.getElementById('highscore');



// Create array for questions

let questions = [

    {

        question: "Which ASIN is the highest according to the ASIN progression Hierarchy?",

        choiceA: "X00",

        choiceB: "B00",

        choiceC: "LPN",

        choiceD: "UPC",

        correct: "C"

    },

    {

        question: "What accuracy must a counter maintain to be eligible for IRDR counts?",

        choiceA: "99.0%",

        choiceB: "99.5%",

        choiceC: "100%",

        choiceD: "99.3%",

        correct: "B"

    },

    {

        question: "If an item has no scannable barcodes what should the counter do?",

        choiceA: "Find a barcode of a similar item in another bin.",

        choiceB: "Do not count the item.",

        choiceC: "Select new bin.",

        choiceD: "Pull an Andon for no scannable barcode.",

        correct: "D"

    },

    {

        question: "What is the Bins per hour count rate for Simple Bin Counts?",

        choiceA: "35 bins per hour.",

        choiceB: "100 bins per hour.",

        choiceC: "50 bins per hour.",

        choiceD: "75 bins per hour.",

        correct: "B"

    },

    {

        question: "Do counters pull items out of a pallet bin for 6-sided checks?",

        choiceA: "No.",

        choiceB: "Yes.",

        choiceC: "Only when supervised.",

        choiceD: "Only if the item is less than 85 lbs.",

        correct: "D"

    },

    {

        question: "Do counters pull items out of a pallet bin for 6-sided checks?",

        choiceA: "No.",

        choiceB: "Yes.",

        choiceC: "Only when supervised.",

        choiceD: "Only if the item is less than 85 lbs.",

        correct: "D"

    },

    {

        question: "How many unique ASINs belong in a rainbow bin?",

        choiceA: "6.",

        choiceB: "8.",

        choiceC: "10.",

        choiceD: "12.",

        correct: "C"

    },

    {

        question: "Why is accuracy so important for Cycle Counts?",

        choiceA: "Cycle Counts edit inventory when count does not match FC Research.",

        choiceB: "Good metrics make counters look better.",

        choiceC: "Counters are paid based off accuracy.",

        choiceD: "Accurate counts don't matter.",

        correct: "A"

    },

    {

        question: "What does SRC stand for?",

        choiceA: "Single record count.",

        choiceB: "Simple record count.",

        choiceC: "Simple rate count.",

        choiceD: "Single rate count.",

        correct: "B"

    },

    {

        question: "Which is not allowed for Cycle Counts and IRDR Counts?",

        choiceA: "An OP.",

        choiceB: "Counting on foot.",

        choiceC: "FC Research.",

        choiceD: "Reach Tool.",

        correct: "C"

    },

]



const lastQuestion = questions.length - 1;

let runningQuestion = 0;

// Creates function to render questions

function renderQuestion() {

    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";

    choiceA.innerHTML = q.choiceA;

    choiceB.innerHTML = q.choiceB;

    choiceC.innerHTML = q.choiceC;

    choiceD.innerHTML = q.choiceD;

};



// Create a for loop that runs through the questions to render progress

function progressRender() {

    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {

        progress.innerHTML += "<div class= 'prog' id=' + qIndex + '></div>";

    }

}



const questionTime = 100;

const gaugeWidth = 150;

let count = 0;

const gaugeProgressUnit = gaugeWidth / questionTime;



function counterRender() {

    if (count <= questionTime) {

        counter.innerHTML = count;

        timeGauge.style.width = gaugeProgressUnit * count + "px";

        count++;

    } else {

        // count = 0;



        if (runningQuestion < lastQuestion) {

            runningQuestion++;

            renderQuestion();

        } else {

            // clearInterval(TIMER);

            scoreRender();

        }

    }

};



// Checks answer and updates score as well as progress bar.

let score = 0;

function checkAnswer(answer) {

    if (answer == questions[runningQuestion].correct) {

        score++;



    } else if (answer != questions[runningQuestion].correct){
        count = count + 15;

    }

    if (runningQuestion < lastQuestion) {

        // count = 0;

        runningQuestion++;

        renderQuestion();

    } else {

        clearInterval(TIMER);

        scoreRender();

    }

};



let TIMER;

start.addEventListener("click", startQuiz);

function startQuiz() {

    start.style.display = "none";

    counterRender();

    TIMER = setInterval(counterRender, 1000);

    progressRender();

    renderQuestion();

    quiz.style.display = "block";

}



// Create ternary operator to handle conditional statement on score

// condition ? expressionTrue : expressionFalse

// X(Y == "one") ? 1 : 0;



function scoreRender() {

    scoreContainer.style.display = "block";

    let scorePercent = Math.round(100 * score / questions.length);

    let img = (scorePercent <= 79) ? "./assets/sad.png" : "./assets/crown.png";

    scoreContainer.innerHTML = "<img src=" + img + "><p>" + scorePercent + "%<p>";

    end();
};

function end() {
    if (runningQuestion = lastQuestion) {
        scoreSave();
    }
};

function scoreSave() {
    const lastScore = Math.round(100 * score / questions.length);

    localStorage.setItem('lastScore', JSON.stringify(lastScore));
    console.log(lastScore);
};

function getScore() {
    var storedScore = JSON.parse(localStorage.getItem('lastScore'));
    if (storedScore != null) {
        document.getElementById('highscore').innerHTML = 'Last Score: ' + storedScore;
    }
};

function init() {
    getScore();
  }
  init();