const questions = [
    { question: "Waarom is het belangrijk om regelmatig een arts te bezoeken?", answers: ["Om ziektes vroegtijdig te ontdekken", "Om medicijnen te krijgen", "Om je gewicht te controleren"], correct: 0 },
    { question: "Welke van de volgende is een gezonde gewoonte?", answers: ["Roken", "Dagelijks sporten", "Veel suiker eten"], correct: 1 },
    { question: "Hoeveel uur slaap heb je gemiddeld per nacht nodig?", answers: ["4-5 uur", "6-7 uur", "7-9 uur"], correct: 2 },
    { question: "Wat is een goede manier om stress te verminderen?", answers: ["Alcohol drinken", "Meditatie", "Langdurig werken"], correct: 1 },
    { question: "Welke van de volgende voedingsmiddelen is goed voor je hart?", answers: ["Gefrituurd eten", "Groenten en fruit", "Suikerrijke snacks"], correct: 1 },
    { question: "Wat is een voordeel van regelmatig handen wassen?", answers: ["Het voorkomt infecties", "Het maakt je huid droog", "Het vermindert jeuk"], correct: 0 },
    { question: "Hoe vaak moet je je tanden poetsen?", answers: ["Een keer per dag", "Twee keer per dag", "Een keer per week"], correct: 1 },
    { question: "Wat is een goede manier om gehydrateerd te blijven?", answers: ["Veel koffie drinken", "Veel water drinken", "Veel frisdrank drinken"], correct: 1 },
    { question: "Wat is een voordeel van een gezonde voeding?", answers: ["Meer energie", "Gewichtstoename", "Slechtere huid"], correct: 0 },
    { question: "Welke van de volgende is een teken van een goede mentale gezondheid?", answers: ["Chronische stress", "Positieve relaties", "Slaapproblemen"], correct: 1 },
    { question: "Wat zijn de voordelen van een gebalanceerd dieet?", answers: [], correct: "Het voorziet je lichaam van essentiële voedingsstoffen" },
    { question: "Hoe kan je je immuunsysteem versterken?", answers: [], correct: "Door voldoende slaap, gezonde voeding en regelmatige lichaamsbeweging" },
    { question: "Wat zijn de symptomen van uitdroging?", answers: [], correct: "Dorst, droge mond, vermoeidheid, en donkere urine" },
    { question: "Waarom is het belangrijk om stress te beheersen?", answers: [], correct: "Om je mentale en fysieke gezondheid te beschermen" },
    { question: "Wat zijn de voordelen van regelmatige lichaamsbeweging?", answers: [], correct: "Verbeterde cardiovasculaire gezondheid, sterkere spieren, en beter humeur" }
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
        openAnswerInput.placeholder = 'Type your answer here';
        openAnswerInput.style.width = '60%';
        openAnswerInput.style.height = '40px';
        openAnswerInput.style.marginTop = '20px';
        openAnswerInput.style.borderRadius = '15px';
        openAnswerInput.style.backgroundColor = '#b71c1c'; //red
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
    resultatenDiv.style.minHeight = '100vh'; // Ensure it covers the entire viewport height
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
