const questions = [
    { question: "Waarom is het belangrijk om een gezond ontbijt te eten?", answers: ["Omdat je dan sneller afvalt", "Omdat je dan geen honger hebt voor de lunch", "Omdat het je energie geeft voor de rest van de dag"], correct: 2 },
    { question: "Welke snack is het beste voor een boost van energie tijdens het studeren?", answers: ["Een zak chips", "Een appel met pindakaas", "Een frisdrank"], correct: 1 },
    { question: "Wat is een gezonde bron van eiwitten voor vegetariërs?", answers: ["Zalm", "Amandelen", "Vlees"], correct: 1 },
    { question: "Wat kan het gevolg zijn van te veel suiker drinken, zoals in frisdrank?", answers: ["Je krijgt meer energie", "Je kunt aankomen in gewicht en je kans op diabetes vergroten", "Je spieren groeien sneller"], correct: 1 },
    { question: "Welke van de volgende is een gezond alternatief voor frisdrank?", answers: ["Smoothie van vers fruit", "Suikervrije energie drank", "Icetea met veel suiker"], correct: 0 },
    { question: "Wat is een voorbeeld van een gezonde lunch voor op school?", answers: ["Een witbrood sandwich met veel mayo en vlees", "Een bak chips en een cola", "Een volkorenbrood sandwich met kipfilet, avocado en groenten"], correct: 2 },
    { question: "Wat is het belangrijkste voordeel van het eten van groenten?", answers: ["Ze geven je een snelle energieboost", "Ze zijn goed voor je huid en helpen bij de spijsvertering", "Ze maken je dik"], correct: 1 },
    { question: "Hoeveel water moet je gemiddeld per dag drinken?", answers: ["2 liter", "4 liter", "1 liter"], correct: 0 },
    { question: "Wat is een mogelijke reactie van je lichaam op te veel junkfood?", answers: ["Verbeterde concentratie", "Snelle spiergroei", "Minder energie en moeite met concentreren"], correct: 2 },
    { question: "Welke van de volgende voedingsmiddelen bevat veel gezonde vetten?", answers: ["Gekookte kip", "Avocado", "Patat"], correct: 1 },
    { question: "Open Question 1?", answers: [], correct: "Correct Answer 1" },
    { question: "Open Question 2?", answers: [], correct: "Correct Answer 2" },
    { question: "Open Question 3?", answers: [], correct: "Correct Answer 3" },
    { question: "Open Question 4?", answers: [], correct: "Correct Answer 4" },
    { question: "Open Question 5?", answers: [], correct: "Correct Answer 5" }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = [];

function showQuestion(index) {
    const questionContainer = document.querySelector('.vragen');
    const answersContainer = document.querySelectorAll('.antwoorden button');
    const question = questions[index];
    questionContainer.innerHTML = `<h2>${question.question}</h2>`;
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
        } else {
            incorrectAnswers.push({
                question: questions[currentQuestionIndex].question,
                selected: questions[currentQuestionIndex].answers[selectedAnswerIndex],
                correct: questions[currentQuestionIndex].answers[questions[currentQuestionIndex].correct],
                type: 'multiple-choice'
            });
        }
    } else if (openAnswerInput) {
        const userAnswer = openAnswerInput.value.trim();
        if (userAnswer.toLowerCase() === questions[currentQuestionIndex].correct.toLowerCase()) {
            correctAnswers++;
        } else {
            incorrectAnswers.push({
                question: questions[currentQuestionIndex].question,
                selected: userAnswer,
                correct: questions[currentQuestionIndex].correct,
                type: 'open'
            });
        }
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.querySelector('.open-answer')?.remove(); // Remove the open answer input if it exists
        showQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    document.querySelector('.vragen').style.display = 'none';
    document.querySelector('.antwoorden').style.display = 'none';
    const resultatenDiv = document.querySelector('.resultaten');
    resultatenDiv.style.display = 'block';
    document.querySelector('.score').textContent = `Je hebt ${correctAnswers} van de ${questions.length} vragen goed beantwoord.`;

    const multipleChoiceDiv = document.querySelector('.multiple-choice-answers');
    const openAnswersDiv = document.querySelector('.open-answers');
    multipleChoiceDiv.innerHTML = '<h3>Fout beantwoorde keuze vragen:</h3>';
    openAnswersDiv.innerHTML = '<h3>Fout beantwoorde open vragen:</h3>';

    incorrectAnswers.forEach(item => {
        const questionDiv = document.createElement('div');
        questionDiv.innerHTML = `<p>Vraag: ${item.question}</p><p>Jouw antwoord: ${item.selected}</p><p>Correct antwoord: ${item.correct}</p>`;
        if (item.type === 'multiple-choice') {
            multipleChoiceDiv.appendChild(questionDiv);
        } else {
            openAnswersDiv.appendChild(questionDiv);
        }
    });
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
});
