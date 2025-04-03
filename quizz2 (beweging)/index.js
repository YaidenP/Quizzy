const questions = [
    {
        question: "Waarom is het belangrijk om regelmatig te bewegen?",
        answers: ["Om spieren te versterken", "Om meer te kunnen eten", "Om minder te slapen"],
        correct: 0
    },
    {
        question: "Welke activiteit is een vorm van cardio?",
        answers: ["Hardlopen", "Bankdrukken", "Yoga"],
        correct: 0
    },
    {
        question: "Wat is een goede warming-up voor het sporten?",
        answers: ["Statische stretches", "Lichte joggen", "Direct zware gewichten tillen"],
        correct: 1
    },
    {
        question: "Welke sport verbetert je flexibiliteit het meest?",
        answers: ["Voetbal", "Basketbal", "Yoga"],
        correct: 2
    },
    {
        question: "Wat is een gezonde manier om spierpijn te verminderen?",
        answers: ["Rust en lichte beweging", "Meer trainen", "Niets doen"],
        correct: 0
    },
    {
        question: "Hoeveel minuten beweging per dag wordt aanbevolen voor volwassenen?",
        answers: ["10 minuten", "30 minuten", "60 minuten"],
        correct: 1
    },
    {
        question: "Welke oefening is goed voor je core?",
        answers: ["Plank", "Squat", "Push-up"],
        correct: 0
    },
    {
        question: "Wat is een voordeel van buiten sporten?",
        answers: ["Meer zuurstof", "Minder calorieën verbranden", "Minder motivatie nodig"],
        correct: 0
    },
    {
        question: "Welke sport is een combinatie van kracht en cardio?",
        answers: ["CrossFit", "Schaken", "Golf"],
        correct: 0
    },
    {
        question: "Welke dansstijl is het meest intensief?",
        answers: ["Ballet", "Zumba", "Wals"],
        correct: 1
    },
    {
        question: "Wat is jouw favoriete manier van bewegen?",
        type: "open",
        correct: null
    },
    {
        question: "Hoe zorg jij ervoor dat je genoeg beweegt op een dag?",
        type: "open",
        correct: null
    },
    {
        question: "Wat is jouw favoriete sport of activiteit?",
        type: "open",
        correct: null
    },
    {
        question: "Welke nieuwe sport zou je willen proberen?",
        type: "open",
        correct: null
    },
    {
        question: "Wat motiveert jou om te blijven bewegen?",
        type: "open",
        correct: null
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons

    // DOM Elements
    const questionText = document.querySelector('.question-text');
    const answerButtons = document.querySelectorAll('.answer-btn');
    const previousButton = document.querySelector('.previous-btn');
    const quizContainer = document.querySelector('.quiz-container');
    const resultsContainer = document.querySelector('.results-container');
    const infoButton = document.querySelector('.info-btn');
    const scoreText = document.querySelector('.score-text');
    const answersReview = document.querySelector('.answers-review');

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let answers = [];

    function showQuestion(index) {
        const question = questions[index];
        questionText.textContent = `Vraag ${index + 1}: ${question.question}`;
        
        // Remove any existing input fields or buttons
        const existingInput = document.querySelector('.open-answer-input');
        const existingSubmitButton = document.querySelector('.submit-btn');
        if (existingInput) existingInput.remove();
        if (existingSubmitButton) existingSubmitButton.remove();

        if (question.type === "open") {
            // Hide answer buttons and show an input field
            answerButtons.forEach(button => button.style.display = 'none');
            const openAnswerInput = document.createElement('input');
            openAnswerInput.type = 'text';
            openAnswerInput.className = 'open-answer-input';
            openAnswerInput.placeholder = 'Typ je antwoord hier...';
            questionText.parentElement.appendChild(openAnswerInput);

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Indienen';
            submitButton.className = 'btn submit-btn';
            questionText.parentElement.appendChild(submitButton);

            submitButton.addEventListener('click', () => {
                if (openAnswerInput.value.trim() !== '') {
                    handleOpenAnswer(openAnswerInput.value);
                    openAnswerInput.remove();
                    submitButton.remove();
                } else {
                    alert('Vul een antwoord in voordat je verder gaat.');
                }
            });
        } else {
            // Reset buttons and display answers
            answerButtons.forEach((button, i) => {
                if (i < question.answers.length) {
                    button.style.display = 'block';
                    button.textContent = question.answers[i];
                } else {
                    button.style.display = 'none';
                }
            });
        }

        // Ensure the previous button is disabled for the first question
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

    function handleOpenAnswer(answer) {
        const currentQuestion = questions[currentQuestionIndex];
        answers.push({
            question: currentQuestion.question,
            selected: answer,
            correct: null
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
                <p class="review-answer ${answer.correct !== null && answer.selected === answer.correct ? 'correct' : 'incorrect'}">
                    Jouw antwoord: ${answer.selected}
                </p>
                ${answer.correct !== null && answer.selected !== answer.correct ? 
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
});