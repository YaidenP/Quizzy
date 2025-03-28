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
    },
    {
        question: "Hoeveel glazen water wordt aanbevolen om dagelijks te drinken?",
        answers: ["4-6 glazen", "6-8 glazen", "8-10 glazen"],
        correct: 2
    },
    {
        question: "Welke van de volgende is een goede bron van eiwitten?",
        answers: ["Broccoli", "Kipfilet", "Witte rijst"],
        correct: 1
    },
    {
        question: "Wat is een gezond alternatief voor suiker in thee of koffie?",
        answers: ["Honing", "Kunstmatige zoetstoffen", "Geen van beide"],
        correct: 0
    },
    {
        question: "Welke oefening is het beste voor cardiovasculaire gezondheid?",
        answers: ["Yoga", "Hardlopen", "Krachttraining"],
        correct: 1
    },
    {
        question: "Wat is een belangrijk voordeel van voldoende slaap?",
        answers: ["Gewichtsverlies", "Betere concentratie", "Meer spiermassa"],
        correct: 1
    },
    {
        question: "Welke van de volgende voedingsmiddelen bevat gezonde vetten?",
        answers: ["Avocado", "Chocolade", "Franse frietjes"],
        correct: 0
    },
    {
        question: "Wat is een goede manier om stress te verminderen?",
        answers: ["Social media gebruiken", "Meditatie", "Meer koffie drinken"],
        correct: 1
    },
    {
        question: "Welke vitamine krijg je voornamelijk van zonlicht?",
        answers: ["Vitamine A", "Vitamine C", "Vitamine D"],
        correct: 2
    },
    {
        question: "Wat is jouw favoriete manier om actief te blijven?",
        type: "open",
        correct: null
    },
    {
        question: "Hoe zorg jij ervoor dat je voldoende water drinkt?",
        type: "open",
        correct: null
    },
    {
        question: "Wat is jouw favoriete gezonde snack?",
        type: "open",
        correct: null
    },
    {
        question: "Hoe plan jij je maaltijden om gezond te blijven?",
        type: "open",
        correct: null
    },
    {
        question: "Wat is jouw favoriete gezonde maaltijd?",
        type: "open",
        correct: null // Open questions don't have a predefined correct answer
    }
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
    
    if (question.type === "open") {
        // Hide answer buttons and show an input field for open-ended questions
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
            handleOpenAnswer(openAnswerInput.value);
            openAnswerInput.remove();
            submitButton.remove();
        });
    } else {
        question.answers.forEach((answer, i) => {
            answerButtons[i].style.display = 'block';
            answerButtons[i].textContent = answer;
        });
    }

    previousButton.disabled = index === 0;
}

function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    if (isCorrect) {
        correctAnswers++;
    }

    // Zorg ervoor dat het geselecteerde antwoord en het correcte antwoord correct worden opgeslagen
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
        correct: null // No predefined correct answer for open questions
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
    // Zorg ervoor dat de resultatencontainer zichtbaar wordt
    quizContainer.style.display = 'none';
    resultsContainer.style.display = 'block';
    infoButton.style.display = 'flex';
    previousButton.style.display = 'none';

    // Debug: Controleer of de score correct wordt berekend
    console.log('Correct answers:', correctAnswers);
    console.log('Total questions:', questions.length);

    // Toon de score correct
    scoreText.textContent = `Je hebt ${correctAnswers} van de ${questions.length} vragen goed beantwoord.`;

    // Debug: Controleer of de antwoorden correct in de array zitten
    console.log('Answers array:', answers);

    // Zorg ervoor dat de antwoorden correct worden weergegeven
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

    // Debug: Controleer of de innerHTML correct wordt gegenereerd
    console.log('Generated HTML for answersReview:', answersReview.innerHTML);
}

// Event Listeners
answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => handleAnswer(index));
});

previousButton.addEventListener('click', handlePrevious);

// Initialize first question
showQuestion(currentQuestionIndex);