var startButton = document.getElementById('start');
var countdown = document.getElementById('countdown');
var questionElement = document.getElementById('question');
var trueButton = document.getElementById('true');
var falseButton = document.getElementById('false');
var completedTest = document.getElementById('completedTest');
var currentQuestion = 0;

var timeLeft = 60;
var score = 0;
//all new test code blow
var = index;


var questions = [
    //question 1
    {
        question: "With the HTML DOM, JavaScript can access and change all the _________ of an HTML document.",
        answers: {
            a: "objects",
            b: "array",
            c: "elements",
            d: "blimps"
        },
        correctAnswer: "c"
    },
    //question 2
    {
        question: "In Javascript onselect is used for accessing button ______.",
        answers: {
            a: "feature",
            b: "looks",
            c: "buttons",
            d: "clicks"
        },
        correctAnswer: "d"
    },
    //question 3
    {
        
        q: "The clearTimeout() method _____ the execution of the function specified in setTimeout().",
        answer1: stops,
        answer2: starts,
        answer3: skips,
        answer4: repeat,
        a: 1
    },
    //question 4
    {
        
        q: "The _____ web storage can be used to store and retrieve data",
        answer1: home,
        answer2: local,
        answer3: resident,
        answer4: foreign,
        a: 2
    },
    //question 5
    {
        
        q: "In Javascript the === operator _______ data being logged in",
        answer1: ignores,
        answer2: duplicates,
        answer3: compares,
        answer4: deletes,
        a: 1
    }
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
        score++;
    } else {
        timeLeft -= 5;
    }
    currentQuestion++;
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


