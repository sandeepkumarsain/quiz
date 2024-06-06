
let quizData = [
    {
        q: '2+2',
        a: 4,
        opt: [1, 2, 3, 4]
    },
    {
        q: '2+2+4-4',
        a: 4,
        opt: [4, 3, 2, 1]
    },
    {
        q: '2+2+4-4*0',
        a: 6,
        opt: [4, 3, 0, 6]
    },
    {
        q: '3+3/3+3',
        a: 7,
        opt: [1, 2, 3, 7]
    },
    {
        q: '2/2-2',
        a: -1,
        opt: [-1, 0, 2, 4]
    }
];

let startButton = document.getElementById('startButton');
let nameInput = document.getElementById('nameInput');
let quizDiv = document.getElementById('quiz');
let firstScreen = document.querySelector('.first_screen');
let lastScreen = document.querySelector('.last_screen');
let questionDiv = document.querySelector('.question');
let optionButtons = document.querySelectorAll('.option');
let resultP = document.getElementById('result');
let timerDiv = document.querySelector('.timer');

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timeLeft = 10;

startButton.addEventListener('click', () => {
    if (nameInput !== '') {
        firstScreen.style.display = 'none';
        quizDiv.style.display = 'block';
        startQuiz();
    } else {
        alert('Please enter your name');
    }
});

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (parseInt(button.textContent) === quizData[currentQuestionIndex].a) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuiz();
        } else {
            endQuiz();
        }
    });
});

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    loadQuiz();
}

function loadQuiz() {
    let currentQuestion = quizData[currentQuestionIndex];
    questionDiv.textContent = currentQuestion.q;
    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.opt[index];
    });
    resetTimer();
}

function endQuiz() {
    clearInterval(timerInterval);
    quizDiv.style.display = 'none';
    lastScreen.style.display = 'block';
    resultP.textContent = nameInput.value + ", you scored " + score + " out of " + quizData.length;
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 10; 
    timerDiv.textContent = "Time left: " + timeLeft + "s";

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = "Time left: " + timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuiz();
            } else {
                endQuiz();
            }
        }
    }, 1000);
}
