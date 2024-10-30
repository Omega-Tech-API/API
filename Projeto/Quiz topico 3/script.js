const questions = [
    {
        question: "Qual é a principal diferença entre Scrum comum e Scrum escalado?",
        answers: [
            { text: " A ausência do Product Owner no Scrum escalado.", correct: false },
            { text: "A adição de vários times de desenvolvimento no Scrum escalado.", correct: true },
            { text: " A mudança completa na estrutura de times no Scrum escalado.", correct: false },
            { text: "O Scrum Master não existe no Scrum escalado.", correct: false },
        ]
    },
    {
        question: "Qual métrica no Scrum é representada por um gráfico que mostra o trabalho restante versus o tempo?",
        answers: [
            { text: " Burn up chart.", correct: false },
            { text: " Sprint backlog.", correct: false },
            { text: "Burn down chart.", correct: true },
            { text: "Velocity.", correct: false },
        ]
    },
    {
        question: "No método Kanban, qual elemento é utilizado para visualizar o fluxo de trabalho?",
        answers: [
            { text: "Burn down chart ", correct: false },
            { text: "Quadro de tarefas.", correct: true },
            { text: "Sprints.", correct: false },
            { text: "Daily Scrum", correct: false },
        ]
    },
    {
        question: "Qual é o papel do Scrum Master na cultura organizacional?",
        answers: [
            { text: "Planejar as atividades de marketing. .", correct: false },
            { text: "Garantir que os times entreguem mais rápido que o esperado.", correct: false },
            { text: " Direcionar, gerenciar a equipe e garantir a fluidez dos processos.", correct: true },
            { text: " Definir os objetivos estratégicos da empresa.", correct: false },
        ]
    },
    {
        question: "O que o velocity mede dentro de uma sprint no Scrum? ",
        answers: [
            { text: "A quantidade de tempo que o time gasta em reuniões.", correct: false },
            { text: "A quantidade de trabalho que pode ser realizado durante uma sprint.", correct: true },
            { text: "A quantidade de impedimentos superados pela equipe.", correct: false },
            { text: "A satisfação dos clientes.", correct: false },
        ]
    },
    {
        question: "Qual é a principal característica do Scrum que o diferencia de metodologias tradicionais de gerenciamento de projetos?",
        answers: [
            { text: "O foco em documentação detalhada.", correct: false },
            { text: "A abordagem iterativa e incremental.  ", correct: true },
            { text: "A definição de um cronograma rígido desde o início.", correct: false },
            { text: "O uso exclusivo de reuniões formais.", correct: false },
        ]
    },
    {
        question: "Ao trabalhar com equipes distribuídas em Scrum, qual é o principal desafio que deve ser priorizado?",
        answers: [
            { text: "Aumentar a quantidade de reuniões diárias. ", correct: false },
            { text: "Garantir a independência das equipes.", correct: false },
            { text: "Priorizar a comunicação e a interdependência entre as equipes", correct: true },
            { text: "Reduzir o número de entregas em cada sprint.", correct: false },
        ]
    },
    {
        question: "Como o uso combinado de Kanban e Scrum, altera a hierarquia tradicional do Scrum ? ",
        answers: [
            {
                text: "Não há alteração, o Scrum Master e o Product Owner permanecem essenciais.", correct: false
            },
            { text: " O Scrum Master e o Product Owner se tornam menos necessários.", correct: true },
            { text: "Novos cargos são criados, específicos para o Kanban.", correct: false },
            { text: "As equipes se tornam independentes da gestão central.", correct: false },
        ]
    },
    {
        question: "Qual é um dos principais riscos que o Scrum Master deve estar atento ao analisar o burn down chart?",
        answers: [
            { text: "O aumento de reuniões diárias. ", correct: false },
            { text: "A quantidade de trabalho que não foi planejado.", correct: false },
            { text: "Impedimentos e riscos em potencial durante o desenvolvimento. ", correct: true },
            { text: "A substituição frequente de membros do time. ", correct: false },
        ]
    },
    {
        question: "Qual dos seguintes pontos não faz parte das responsabilidades do Scrum Master em relação à equipe?",
        answers: [
            { text: "Acompanhar as métricas do projeto.", correct: false },
            { text: "Manter a equipe organizada e fornecer suporte adequado.", correct: false },
            {
                text: " Tomar decisões estratégicas de produto sem consultar o Product Owner.", correct: true
            },
            {
                text: " Resolver conflitos e promover a colaboração entre os membros da equipe", correct: false
            },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próximo";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length} questões!`;
    nextButton.innerHTML = "Refazer o teste";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();