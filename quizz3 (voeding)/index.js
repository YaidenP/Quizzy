const questions = [
    {
        question: "Waarom is het belangrijk om een gezond ontbijt te eten?",
        answers: ["Omdat je dan sneller afvalt", "Omdat je dan geen honger hebt voor de lunch", "Omdat het je energie geeft voor de rest van de dag"],
        correct: 2
    },
    {
        question: "Welke snack is het beste voor een boost van energie tijdens het studeren?",
        answers: ["Een zak chips", "Een appel met pindakaas", "Een frisdrank"],
        correct: 1
    }
    // Add more questions here
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let answers = [];

// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const questionText = document.querySelector('.question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const previousButton = document.querySelector('.previous-btn');
const quizContainer = document.querySelector('.quiz-container');
const resultsContainer = document.querySelector('.results-container');
const infoButton = document.querySelector('.info-btn');
const scoreText = document.querySelector('.score-text');
const answersReview = document.querySelector('.answers-review');

function showQuestion(index) {
    const question = questions[index];
    questionText.textContent = `Vraag ${index + 1}: ${question.question}`;
    
    question.answers.forEach((answer, i) => {
        answerButtons[i].textContent = answer;
    });

    previousButton.disabled = index === 0;
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    if (isCorrect) {
        correctAnswers++;
    }

    answers.push({
        question: currentQuestion.question,
        selected: currentQuestion.answers[selectedIndex],
        correct: currentQuestion.answers[currentQuestion.correct]
    });

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function handlePrevious() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        const lastAnswer = answers.pop();
        if (lastAnswer.selected === lastAnswer.correct) {
            correctAnswers--;
        }
        showQuestion(currentQuestionIndex);
    }
}

function showResults() {
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    infoButton.style.display = 'flex';
    previousButton.style.display = 'none';

    scoreText.textContent = `Je hebt ${correctAnswers} van de ${questions.length} vragen goed beantwoord.`;
    
    answersReview.innerHTML = answers.map((answer, index) => `
        <div class="review-item">
            <p class="review-question">Vraag ${index + 1}: ${answer.question}</p>
            <p class="review-answer ${answer.selected === answer.correct ? 'correct' : 'incorrect'}">
                Jouw antwoord: ${answer.selected}
            </p>
            ${answer.selected !== answer.correct ? 
                `<p class="review-answer correct">Correct antwoord: ${answer.correct}</p>` : 
                ''}
        </div>
    `).join('');
}

// Event Listeners
answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => handleAnswer(index));
});

previousButton.addEventListener('click', handlePrevious);

// Initialize first question
showQuestion(currentQuestionIndex);