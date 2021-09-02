var startButton = document.getElementById('start');
var countdown = document.getElementById('countdown');
var questionElement = document.getElementById('question');
var trueButton = document.getElementById('true');
var falseButton = document.getElementById('false');
var completedTest = document.getElementById('completedTest');
var currentQuestion = 0;
var timeLeft = 60;
var score = 0;




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


