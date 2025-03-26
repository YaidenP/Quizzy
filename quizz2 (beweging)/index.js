const questions = [
    { question: "Waarom is het belangrijk om regelmatig te bewegen?", answers: ["Omdat het helpt bij gewichtsverlies", "Omdat het goed is voor je hart", "Beide antwoorden zijn correct"], correct: 2 },
    { question: "Welke oefening is het beste voor het versterken van je spieren?", answers: ["Joggen", "Krachttraining", "Yoga"], correct: 1 },
    { question: "Hoeveel minuten per dag moet je minimaal bewegen volgens de richtlijnen?", answers: ["30 minuten", "60 minuten", "90 minuten"], correct: 0 },
    { question: "Wat is een goede manier om meer beweging in je dagelijkse routine te krijgen?", answers: ["De lift nemen", "Fietsen naar werk", "Langdurig zitten"], correct: 1 },
    { question: "Welke van de volgende activiteiten is een vorm van cardio?", answers: ["Zwemmen", "Gewichtheffen", "Stretching"], correct: 0 },
    { question: "Wat is een voordeel van het doen van yoga?", answers: ["Verhoogde flexibiliteit", "Verhoogde spiermassa", "Verhoogde calorieverbranding"], correct: 0 },
    { question: "Hoe vaak per week moet je krachttraining doen voor optimale resultaten?", answers: ["1 keer", "3 keer", "7 keer"], correct: 1 },
    { question: "Wat is een goede manier om je hartslag te verhogen?", answers: ["Rustig wandelen", "Hardlopen", "Zitten"], correct: 1 },
    { question: "Wat is een voordeel van buiten sporten?", answers: ["Betere luchtkwaliteit", "Meer vitamine D", "Beide antwoorden zijn correct"], correct: 2 },
    { question: "Welke van de volgende is een goede warming-up oefening?", answers: ["Statische stretching", "Dynamische stretching", "Geen warming-up"], correct: 1 },
    { question: "Wat zijn de voordelen van dagelijks wandelen?", answers: [], correct: "Dagelijks wandelen verbetert de cardiovasculaire gezondheid, verhoogt de stemming en helpt bij gewichtsbeheersing." },
    { question: "Hoe kun je je flexibiliteit verbeteren?", answers: [], correct: "Je kunt je flexibiliteit verbeteren door regelmatig te stretchen en yoga te beoefenen." },
    { question: "Wat is het belang van een goede warming-up?", answers: [], correct: "Een goede warming-up bereidt je lichaam voor op inspanning, vermindert het risico op blessures en verbetert de prestaties." },
    { question: "Hoe kun je beweging integreren in je dagelijkse routine?", answers: [], correct: "Je kunt beweging integreren door de trap te nemen in plaats van de lift, te fietsen naar werk en regelmatig pauzes te nemen om te bewegen." },
    { question: "Wat zijn de voordelen van krachttraining?", answers: [], correct: "Krachttraining verhoogt de spiermassa, verbetert de botdichtheid en verhoogt de stofwisseling." }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = [];

function showQuestion(index) {
    const questionContainer = document.querySelector('.vragen');
    const answersContainer = document.querySelectorAll('.antwoorden button');
    const question = questions[index];
    questionContainer.innerHTML = `<h2>Vraag ${index + 1}: ${question.question}</h2>`;
    document.body.style.backgroundImage = ''; // Remove the background image of the entire page
    if (question.answers.length > 0) {
        question.answers.forEach((answer, i) => {
            answersContainer[i].textContent = answer;
            answersContainer[i].style.display = 'block';
            answersContainer[i].classList.add('answer-button'); // Add class for styling
        });
    } else {
        answersContainer.forEach(button => button.style.display = 'none');
        const openAnswerInput = document.createElement('input');
        openAnswerInput.type = 'text';
        openAnswerInput.className = 'open-answer';
        openAnswerInput.placeholder = 'Voer hier je antwoord in';
        openAnswerInput.style.width = '60%';
        openAnswerInput.style.height = '40px';
        openAnswerInput.style.marginTop = '20px';
        openAnswerInput.style.borderRadius = '15px';
        openAnswerInput.style.backgroundColor = '#0288d1'; // Blue
        document.querySelector('.antwoorden').appendChild(openAnswerInput);
    }
}

function nextQuestion(selectedAnswerIndex = null) {
    const openAnswerInput = document.querySelector('.open-answer');
    if (openAnswerInput && openAnswerInput.value.trim() === '') {
        alert('Please provide an answer before proceeding.');
        return;
    }

    if (selectedAnswerIndex !== null) {
        if (selectedAnswerIndex === questions[currentQuestionIndex].correct) {
            correctAnswers++;
        }
        incorrectAnswers.push({
            question: questions[currentQuestionIndex].question,
            selected: questions[currentQuestionIndex].answers[selectedAnswerIndex],
            correct: questions[currentQuestionIndex].answers[questions[currentQuestionIndex].correct],
            type: 'multiple-choice'
        });
    } else if (openAnswerInput) {
        const userAnswer = openAnswerInput.value.trim();
        if (userAnswer.toLowerCase() === questions[currentQuestionIndex].correct.toLowerCase()) {
            correctAnswers++;
        }
        incorrectAnswers.push({
            question: questions[currentQuestionIndex].question,
            selected: userAnswer,
            correct: questions[currentQuestionIndex].correct,
            type: 'open'
        });
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.querySelector('.open-answer')?.remove(); // Remove the open answer input if it exists
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        // Remove the last recorded answer if it exists
        if (incorrectAnswers.length > 0 && incorrectAnswers[incorrectAnswers.length - 1].question === questions[currentQuestionIndex - 1].question) {
            incorrectAnswers.pop();
        } else if (correctAnswers > 0) {
            correctAnswers--;
        }
        currentQuestionIndex--;
        document.querySelector('.open-answer')?.remove(); // Remove the open answer input if it exists
        showQuestion(currentQuestionIndex);
    }
}

function showResults(customBackgroundImage) {
    document.body.classList.add('results-background');
    document.body.classList.remove('custom-results-background');
    document.body.style.backgroundImage = ''; // Remove the background image
    document.querySelector('.vragen').style.display = 'none';
    document.querySelector('.antwoorden').style.display = 'none';
    document.querySelector('.previousButton').style.display = 'none'; // Hide the previous button
    document.querySelector('.infoButton').style.display = 'block'; // Show the info button
    const resultatenDiv = document.querySelector('.resultaten');
    resultatenDiv.style.display = 'block';
    resultatenDiv.style.width = '100%'; // Ensure it covers the entire width
    resultatenDiv.style.height = '100vh'; // Ensure it covers the entire height
    document.querySelector('.score').textContent = `Je hebt ${correctAnswers} van de ${questions.length} vragen goed beantwoord.`;

    const multipleChoiceDiv = document.querySelector('.multiple-choice-answers');
    const openAnswersDiv = document.querySelector('.open-answers');
    multipleChoiceDiv.innerHTML = '<h3>Keuze vragen:</h3>';
    openAnswersDiv.innerHTML = '<h3>Open vragen:</h3>';

    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        const userAnswer = incorrectAnswers.find(item => item.question === question.question)?.selected || questions[index].answers.length > 0 ? questions[index].answers[questions[index].correct] : questions[index].correct;
        const correctAnswer = question.answers.length > 0 ? question.answers[question.correct] : question.correct;
        questionDiv.innerHTML = `<p>Vraag ${index + 1}: ${question.question}</p><p>Jouw antwoord: ${userAnswer}</p><p>Correct antwoord: ${correctAnswer}</p>`;
        if (question.answers.length > 0) {
            multipleChoiceDiv.appendChild(questionDiv);
        } else {
            openAnswersDiv.appendChild(questionDiv);
        }
    });
}

function hideResults() {
    document.body.classList.remove('results-background', 'custom-results-background');
    document.body.style.backgroundImage = '';
    // ...existing code to hide results...
}

document.addEventListener('DOMContentLoaded', () => {
    showQuestion(currentQuestionIndex);
    document.querySelectorAll('.antwoorden button').forEach((button, index) => {
        button.addEventListener('click', () => {
            nextQuestion(index);
        });
        button.classList.add('answer-button'); // Add class for styling
    });
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.querySelector('.open-answer')) {
            nextQuestion();
        }
    });
    document.querySelector('.previousButton').addEventListener('click', previousQuestion);
});
