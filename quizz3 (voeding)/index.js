const questions = [
    { question: "Hoe oud ben ik", answers: ["10", "20", "30"], correct: 1 },
    { question: "Question 2?", answers: ["A", "B", "C"], correct: 0 },
    { question: "Question 3?", answers: ["A", "B", "C"], correct: 2 },
    { question: "Question 4?", answers: ["A", "B", "C"], correct: 1 },
    { question: "Question 5?", answers: ["A", "B", "C"], correct: 0 },
    { question: "Question 6?", answers: ["A", "B", "C"], correct: 2 },
    { question: "Question 7?", answers: ["A", "B", "C"], correct: 1 },
    { question: "Question 8?", answers: ["A", "B", "C"], correct: 0 },
    { question: "Question 9?", answers: ["A", "B", "C"], correct: 2 },
    { question: "Question 10?", answers: ["A", "B", "C"], correct: 1 },
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
