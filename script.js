const questions = [
    {
        question: "Which keyword creates a class in Java?",
        options: ["object", "class", "new", "create"],
        answer: "class"
    },
    {
        question: "Which method starts a Java program?",
        options: ["start()", "main()", "run()", "begin()"],
        answer: "main()"
    },
    {
        question: "Which symbol ends a Java statement?",
        options: [":", ".", ";", ","],
        answer: ";"
    },
    {
        question: "Which keyword creates an object in Java?",
        options: ["object", "create", "new", "class"],
        answer: "new"
    },
    {
        question: "Which data type stores whole numbers?",
        options: ["double", "int", "char", "boolean"],
        answer: "int"
    },
    {
        question: "Which company originally developed Java?",
        options: ["Microsoft", "Google", "Sun Microsystems", "Apple"],
        answer: "Sun Microsystems"
    },
    {
        question: "Which keyword is used for inheritance in Java?",
        options: ["inherits", "extends", "implements", "superclass"],
        answer: "extends"
    },
    {
        question: "Which data type stores true or false?",
        options: ["int", "String", "boolean", "char"],
        answer: "boolean"
    }
];

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;

function startQuiz() {
    quizQuestions = [...questions];

    // Randomize question order for each game
    quizQuestions.sort(() => Math.random() - 0.5);

    currentQuestion = 0;
    score = 0;

    document.getElementById("start-screen").hidden = true;
    document.getElementById("result-screen").hidden = true;
    document.getElementById("quiz-screen").hidden = false;

    showQuestion();
}

function showQuestion() {
    const q = quizQuestions[currentQuestion];

    document.getElementById("question").textContent =
        `Question ${currentQuestion + 1}: ${q.question}`;

    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").hidden = true;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    // Randomize the answer choices too
    const shuffledOptions = [...q.options]
        .sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;

        button.onclick = () => checkAnswer(option);

        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected) {
    const q = quizQuestions[currentQuestion];
    const buttons = document.querySelectorAll("#options button");

    // Prevent selecting more than one answer
    buttons.forEach(button => {
        button.disabled = true;
    });

    if (selected === q.answer) {
        score++;
        document.getElementById("feedback").textContent =
            "Correct! 🎉";
    } else {
        document.getElementById("feedback").textContent =
            `Incorrect! Correct answer: ${q.answer}`;
    }

    document.getElementById("next-btn").hidden = false;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz-screen").hidden = true;
    document.getElementById("result-screen").hidden = false;

    document.getElementById("score").textContent =
        `You scored ${score} out of ${quizQuestions.length} ` +
        `(${Math.round(score / quizQuestions.length * 100)}%)`;
}