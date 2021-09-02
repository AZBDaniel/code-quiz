var startButton = document.getElementById('start');
var countdown = document.getElementById('countdown');
var questionElement = document.getElementById('question');
var trueButton = document.getElementById('true');
var falseButton = document.getElementById('false');
var completedTest = document.getElementById('completedTest');
var currentQuestion = 0;
var timeLeft = 60;
var score = 0;
var questions = [
    { q: "With the HTML DOM, JavaScript can access and change all the _________ of an HTML document.", 
    answer1: objects,
    answer2: array,
    answer3: elements,
    answer4: blimps,
    a: 3 },
    { q: "In Javascript onselect is used for accessing button ______.",
    answer1: feature,
    answer2: looks,
    answer3: buttons,
    answer4: clicks,
    a: 4 },
    { q: "The clearTimeout() method _____ the execution of the function specified in setTimeout().",
    answer1: stops,
    answer2: starts,
    answer3: skips,
    answer4: repeat, 
    a: 1 },
    { q: "The _____ web storage can be used to store and retrieve data",
    answer1: home,
    answer2: local,
    answer3: resident,
    answer4: foreign, 
    a: 2 },
    { q: "In Javascript the === operator _______ data being logged in", 
    answer1: ignores,
    answer2: duplicates,
    answer3: compares,
    answer4: deletes,
    a: 1 }
]

startButton.addEventListener('click', startQuiz);
trueButton.addEventListener('click', () => answerQuestion(true));
falseButton.addEventListener('click', () => answerQuestion(false));

function startQuiz() {
    startButton.hidden = true;
    countdown.hidden = false;
    trueButton.hidden = false;
    falseButton.hidden = false;

    startTimer();
    displayQuestion();
}

function startTimer() {
    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            countdown.textContent = timeLeft + " seconds remaining";
            timeLeft--;
        } else if (timeLeft === 1) {
            countdown.textContent = timeLeft + " second remaining";
            timeLeft--;
        } else {
            countdown.textContent = ""
            clearInterval(timeInterval)
        }
    }, 1000);
}

function answerQuestion(answer) {

    if (currentQuestion <= questions.length && questions[currentQuestion].a === answer) {
        score ++;
    } else {
    timeLeft -= 5;
    }
    currentQuestion ++;
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestion >= questions.length) {
        displyScoreMessage();
    }
    questionElement.textContent = questions[currentQuestion].q;
}

function displyScoreMessage() {
    completedTest.hidden = false;
    completedTest.textContent = ("Test is over your score is " + score);
}


