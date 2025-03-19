const questions = [
    { question: "Waarom is het belangrijk om een gezond ontbijt te eten?", answers: ["Omdat je dan sneller afvalt", "Omdat je dan geen honger hebt voor de lunch", "Omdat het je energie geeft voor de rest van de dag"], correct: 2, background: "url('images/ontbijt.png')" },
    { question: "Welke snack is het beste voor een boost van energie tijdens het studeren?", answers: ["Een zak chips", "Een appel met pindakaas", "Een frisdrank"], correct: 1, background: "url('images/snack.jpg')" },
    { question: "Wat is een gezonde bron van eiwitten voor vegetariërs?", answers: ["Zalm", "Amandelen", "Vlees"], correct: 1, background: "url('images/protein.jpg')" },
    { question: "Wat kan het gevolg zijn van te veel suiker drinken, zoals in frisdrank?", answers: ["Je krijgt meer energie", "Je kunt aankomen in gewicht en je kans op diabetes vergroten", "Je spieren groeien sneller"], correct: 1, background: "url('images/sugar.jpg')" },
    { question: "Welke van de volgende is een gezond alternatief voor frisdrank?", answers: ["Smoothie van vers fruit", "Suikervrije energie drank", "Icetea met veel suiker"], correct: 0, background: "url('images/smoothie.jpg')" },
    { question: "Wat is een voorbeeld van een gezonde lunch voor op school?", answers: ["Een witbrood sandwich met veel mayo en vlees", "Een bak chips en een cola", "Een volkorenbrood sandwich met kipfilet, avocado en groenten"], correct: 2, background: "url('images/lunch.jpg')" },
    { question: "Wat is het belangrijkste voordeel van het eten van groenten?", answers: ["Ze geven je een snelle energieboost", "Ze zijn goed voor je huid en helpen bij de spijsvertering", "Ze maken je dik"], correct: 1, background: "url('images/vegetables.jpg')" },
    { question: "Hoeveel water moet je gemiddeld per dag drinken?", answers: ["2 liter", "4 liter", "1 liter"], correct: 0, background: "url('images/water.jpg')" },
    { question: "Wat is een mogelijke reactie van je lichaam op te veel junkfood?", answers: ["Verbeterde concentratie", "Snelle spiergroei", "Minder energie en moeite met concentreren"], correct: 2, background: "url('images/junkfood.jpg')" },
    { question: "Welke van de volgende voedingsmiddelen bevat veel gezonde vetten?", answers: ["Gekookte kip", "Avocado", "Patat"], correct: 1, background: "url('images/healthy-fats.jpg')" },
    { question: "Open Question 1?", answers: [], correct: "Correct Answer 1", background: "url('images/open1.jpg')" },
    { question: "Open Question 2?", answers: [], correct: "Correct Answer 2", background: "url('images/open2.jpg')" },
    { question: "Open Question 3?", answers: [], correct: "Correct Answer 3", background: "url('images/open3.jpg')" },
    { question: "Open Question 4?", answers: [], correct: "Correct Answer 4", background: "url('images/open4.jpg')" },
    { question: "Open Question 5?", answers: [], correct: "Correct Answer 5", background: "url('images/open5.jpg')" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = [];

function showQuestion(index) {
    const questionContainer = document.querySelector('.vragen');
    const answersContainer = document.querySelectorAll('.antwoorden button');
    const question = questions[index];
    questionContainer.innerHTML = `<h2>Vraag ${index + 1}: ${question.question}</h2>`;
    document.body.style.backgroundImage = question.background; // Set the background image of the entire page
    if (question.answers.length > 0) {
        question.answers.forEach((answer, i) => {
            answersContainer[i].textContent = answer;
            answersContainer[i].style.display = 'block';
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
        openAnswerInput.style.backgroundColor = 'limegreen';
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
    if (customBackgroundImage) {
        document.body.classList.add('custom-results-background');
        document.body.style.backgroundImage = `url('${customBackgroundImage}')`;
    } else {
        document.body.classList.remove('custom-results-background');
        document.body.style.backgroundImage = '';
    }
    document.querySelector('.vragen').style.display = 'none';
    document.querySelector('.antwoorden').style.display = 'none';
    document.querySelector('.previousButton').style.display = 'none'; // Hide the previous button
    document.querySelector('.infoButton').style.display = 'block'; // Show the info button
    const resultatenDiv = document.querySelector('.resultaten');
    resultatenDiv.style.display = 'block';
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
    });
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && document.querySelector('.open-answer')) {
            nextQuestion();
        }
    });
    document.querySelector('.previousButton').addEventListener('click', previousQuestion);
});


