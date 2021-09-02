//links var startButton to element id start-btn
const startButton = document.getElementById('start-btn');
//links var questionConElement to element id question-container
const questionConElement = document.getElementById('questions-container');
//create a var currentQuestions sets it to undefined
let currentQuestion;
//create a var shuffleQuestions sets it to undefined
let shuffleQuestions;
//
const questionElement = document.getElementById('question')
//
const ansButtonElement = document.getElementById('answer-buttons')


startButton.addEventListener('click', startQuiz);

function startQuiz() {
console.log('quiz started');
//hides start button
startButton.classList.add('hide');
//shuffle questions
shuffleQuestions = questions.sort(() => Math.random() - .5);
//set current questions index to 0
currentQuestion = 0;
//unhides questions container
questionConElement.classList.remove('hide');
//
nextQuestion();
}

function nextQuestion() {
displayQuestions(shuffleQuestions[currentQuestion])
}

function showQuestion(question) {
questionElement.innerText = question.question
}

function selectAnswer() {

}

const questions = [
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
        question: "The clearTimeout() method _____ the execution of the function specified in setTimeout().",
        answers: {
            a: "stops",
            b: "starts",
            c: "skips",
            d: "repeat"
        },
        correctAnswer: "a"
    },
    //question 4
    {
        question: "The _____ web storage can be used to store and retrieve data",
        answers: {
            a: "home",
            b: "local",
            c: "resident",
            d: "foreign"
        },
        correctAnswer: "b"
    },
    //question 5
    {
        question: "In Javascript the === operator _______ data being logged in",
        answers: {
            a: "ignores",
            b: "duplicates",
            c: "compares",
            d: "deletes"
        },
        correctAnswer: "a"
    }
]


