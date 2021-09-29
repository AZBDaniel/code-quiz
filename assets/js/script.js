//links var startButton to element id start-btn
const startButton = document.getElementById('start-btn');

//links var nextButton to element id next-btn
const nextButton = document.getElementById('next-btn');

//links var questionConElement to element id question-container
const questionConElement = document.getElementById('questions-container');

//links var questionElement to element id question
const questionElement = document.getElementById('question')

//links ansButtonElement to element answer-button
const ansButtonElement = document.getElementById('answer-buttons')

//create var 
const localStorage = window.localStorage;

let localResults = (() => {
    const results = localStorage.getItem('results')
    return results ? JSON.parse(results) : [];
    //IIFE
})();

//create a vars
let currentQuestion;
let shuffleQuestions;
let totalCorrectAnswers;
let timeLeft;
let timer;

//start and next button event listener
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

//create a object for controlling element add remove hide to make code cleaner
const elementControl = {
    hide: (element) => element.classList.add('hide'),
    show: (element) => element.classList.remove('hide')
};

//created object for displaying or not the timer container
const timerContainer = (() => {
    const container = document.getElementById('timer-container');
    const hide = () => elementControl.hide(container);
    const show = () => elementControl.show(container);

    return {
        hide,
        show
    }
    //IIFE
})();

const initials = (() => {
    const containerElement = document.getElementById('initials-container');
    const inputElement = document.getElementById('initials');
    const hide = () => elementControl.hide(containerElement);
    const show = () => elementControl.show(containerElement);
    const getInitials = () => inputElement.value;

    return {
        containerElement,
        inputElement,
        hide,
        show,
        getInitials
    }
    //IIFE
})();

const highScores = (() => {
    const containerElement = document.getElementById('high-scores-container');
    const show = () => elementControl.show(containerElement);
    const hide = () => elementControl.hide(containerElement);
    const addHighScore = (name, totalCorrectAnswers) => {
        const p = document.createElement('p');
        p.innerText = `${name}: ${totalCorrectAnswers}`;
        containerElement.appendChild(p)
    };
    const initializeHighScores = () => localResults.forEach(score => addHighScore(score.name, score.totalCorrectAnswers));

    return {
        containerElement,
        show,
        hide,
        addHighScore,
        initializeHighScores
    }
    //IIFE
})();

highScores.initializeHighScores();
highScores.hide();

//start quiz function
function startQuiz() {
    console.log('quiz started');
    totalCorrectAnswers = 0;
    highScores.hide();
    startTimer();
    //hides start button
    startButton.classList.add('hide');
    //shuffle questions
    shuffleQuestions = questions.sort(() => Math.random() - .5);
    //set current questions index to 0
    currentQuestion = 0;
    //unhides questions container
    questionConElement.classList.remove('hide');
    //call next question function
    nextQuestion();
}

//start timer function
function startTimer() {
    timeLeft = 30;
    const element = document.getElementById("timer");
    element.innerText = `${timeLeft} seconds`;
    timerContainer.show();
    timer = setInterval(() => {
        timeLeft--;
        element.innerText = `${timeLeft} seconds`;
        if (timeLeft < 0) {
            clearInterval(timer);
            stopQuiz();
            element.innerText = `You got ${totalCorrectAnswers} correct out of ${questions.length}.`
        }
    }, 1000);
}

//display the next question
function nextQuestion() {
    defaultState()
    displayQuestions(shuffleQuestions[currentQuestion])
}

//display current question
function displayQuestions(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', pickAnswer)
        ansButtonElement.appendChild(button)
    })
}

//function to hide next button 
function defaultState() {
    removeStatusClass(document.body)
    nextButton.classList.add('hide')
    while (ansButtonElement.firstChild) {
        ansButtonElement.removeChild(ansButtonElement.firstChild)
    }
}

//function for election answer in array which unhides buttons
function pickAnswer(e) {
    const choosenButton = e.target
    const correct = choosenButton.dataset.correct
    if (correct) {
        totalCorrectAnswers++;
    } else {
        timeLeft = timeLeft - 5;
    }

    compelStatusClass(document.body, correct)
    Array.from(ansButtonElement.children).forEach(button => {
        compelStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestion + 1) {
        nextButton.classList.remove('hide')
    } else {
        stopQuiz();
    }
}

function stopQuiz() {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    nextButton.classList.add('hide');
    questionConElement.classList.add('hide');
    initials.show();
    timerContainer.hide();
    inputInitials()
}

function inputInitials() {
    document.getElementById('submit-btn').addEventListener('click', (e) => {
        localResults.push({ name: initials.getInitials(), totalCorrectAnswers });
        localStorage.setItem('results', JSON.stringify(localResults));
        initials.hide();
        timerContainer.show();
        highScores.addHighScore(initials.getInitials(), totalCorrectAnswers);
        highScores.show();
    })
}

//set the new element class for correct or incorrect selected btn
function compelStatusClass(element, correct) {
    removeStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

//remove the elment class from correct or incorrect seleted btn
function removeStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}


const questions = [
    //question 1 MC
    {
        question: "With the HTML DOM, JavaScript can access and change all the _________ of an HTML document.",
        answers: [
            { text: "objects", correct: false },
            { text: "array", correct: false },
            { text: "elements", correct: true },
            { text: "blimps", correct: false }
        ]

    },
    //question 2 MC
    {
        question: "In Javascript onselect is used for accessing button ______.",
        answers: [
            { text: "feature", correct: false },
            { text: "looks", correct: false },
            { text: "buttons", correct: false },
            { text: "clicks", correct: true }
        ]
    },
    //question 3 MC
    {
        question: "The clearTimeout() method _____ the execution of the function specified in setTimeout().",
        answers: [
            { text: "stops", correct: true },
            { text: "starts", correct: false },
            { text: "skips", correct: false },
            { text: "repeat", correct: false }
        ]
    },
    //question 4 MC
    {
        question: "The _____ web storage can be used to store and retrieve data",
        answers: [
            { text: "home", correct: false },
            { text: "local", correct: true },
            { text: "resident", correct: false },
            { text: "foreign", correct: false }
        ]
    },
    //question 5 MC
    {
        question: "In Javascript the === operator _______ data being logged in",
        answers: [
            { text: "ignores", correct: false },
            { text: "duplicates", correct: false },
            { text: "compares", correct: true },
            { text: "deletes", correct: false }
        ]
    },
    //question 6 TF
    {
        question: "Math.random can be used to create random mutiple choice function?",
        answers: [
            { text: "Correct", correct: true },
            { text: "Incorrect", correct: false }
        ]
    },
    //question 7 TF
    {
        question: "A variable not set in creation, will default to true?",
        answers: [
            { text: "Correct", correct: false },
            { text: "Incorrect", correct: true }
        ]
    },
    //question 8 TF
    {
        question: "Javascript can update (hide, remove, set) html classes",
        answers: [
            { text: "Correct", correct: true },
            { text: "Incorrect", correct: false }
        ]
    },
    //question 9 TTT
    {
        question: "The Best Operating System to code with is?",
        answers: [
            { text: "Windows", correct: false },
            { text: "Linux", correct: true },
            { text: "MacOS", correct: false }
        ]
    },
    //question 10 FFF
    {
        question: "Which school is better then the University of Arizona?",
        answers: [
            { text: "Arizona State", correct: false },
            { text: "Northern Arizona University", correct: false },
            { text: "No School is better", correct: true }
        ]
    }
]


