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

//create a var currentQuestions sets it to undefined
let currentQuestion;
//create a var shuffleQuestions sets it to undefined
let shuffleQuestions;


//start and next button event listener
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestion++
    nextQuestion()
})

//start quiz function
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
    //call next question function
    nextQuestion();
}

//display the next question
function nextQuestion() {
    defaultState()
    displayQuestions(shuffleQuestions[currentQuestion])
}

//display current question
function displayQuestions(question) {
    questionElement.innerText = question.question
    question.answers.forEach( answer => {
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

    compelStatusClass(document.body, correct)
    Array.from(ansButtonElement.children).forEach(button => {
        compelStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestion + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
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
            {text: "feature", correct: false},
            {text: "looks", correct: false},
            {text: "buttons", correct: false},
            {text: "clicks", correct: true}
        ]
    },
    //question 3 MC
    {
        question: "The clearTimeout() method _____ the execution of the function specified in setTimeout().",
        answers: [
            {text: "stops", correct: true},
            {text: "starts", correct: false},
            {text: "skips", correct: false},
            {text: "repeat", correct: false}
        ]
    },
    //question 4 MC
    {
        question: "The _____ web storage can be used to store and retrieve data",
        answers: [
            {text: "home", correct: false},
            {text: "local",correct: true},
            {text: "resident", correct: false},
            {text: "foreign", correct: false}
        ]
    },
    //question 5 MC
    {
        question: "In Javascript the === operator _______ data being logged in",
        answers: [
            {text: "ignores", correct: false},
            {text: "duplicates", correct: false},
            {text: "compares", correct: true},
            {text: "deletes", correct: false}
        ]
    }
]


