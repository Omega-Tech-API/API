const questions = [
    {
        question: " O que é um framework?",
        answers: [
            { text: "Um conjunto de práticas de gestão.", correct: false },
            { text: "Um conjunto de bibliotecas para solucionar problemas relacionados ao desenvolvimento de projetos.", correct: true },
            { text: "Um método de treinamento para equipes.", correct: false },
            { text: "Um programa de gerenciamento de tarefas.", correct: false },
        ]
    },
    {
        question: "O que é uma Metodologia Ágil?",
        answers: [
            { text: "Um conjunto de ferramentas para design de software.", correct: false },
            { text: "Um conjunto de práticas de gestão focado em melhorar a produtividade dos projetos.", correct: true },
            { text: "Um tipo de tecnologia de hardware.", correct: false },
            { text: "Um modelo de gerenciamento de tempo.", correct: false },
        ]
    },
    {
        question: " A metodologia Scrum é:",
        answers: [
            { text: "Um framework ágil.", correct: true },
            { text: "Um método de programação visual.", correct: false },
            { text: "Uma técnica de controle de qualidade.", correct: false },
            { text: "Um software de gerenciamento de projetos", correct: false },
        ]
    },
    {
        question: "O Scrum trabalha em períodos chamados de:",
        answers: [
            { text: "Fases longas e complexas.", correct: false },
            { text: "Etapas únicas e definitivas.", correct: false },
            { text: "Entregas contínuas e ininterruptas.", correct: false },
            { text: "Ciclos curtos e repetidos chamados sprints.", correct: true },
        ]
    },
    {
        question: "Quanto tempo dura, geralmente, uma sprint?",
        answers: [
            { text: "Entre 1 e 2 semanas.", correct: false },
            { text: "De 3 a 6 meses.", correct: false },
            { text: "Entre 5 e 7 semanas.", correct: false },
            { text: "Entre 2 a 4 semanas.", correct: true },
        ]
    },
    {
        question: "O que é um Product Backlog e qual é o seu papel no ciclo de desenvolvimento de software com a metodologia Scrum?",
        answers: [
            { text: "É uma lista de tarefas que precisam ser realizadas durante o sprint atual.", correct: false },
            { text: "É uma lista de requisitos do cliente que precisam ser desenvolvidos ao longo de todo o projeto.", correct: true },
            { text: "É um conjunto de tarefas já finalizadas que estão aguardando liberação para o cliente.", correct: false },
            { text: "É uma lista de prioridades gerada pela equipe Scrum no final do projeto", correct: false },
        ]
    },
    {
        question: " Quais são os três níveis principais de organização no desenvolvimento de software segundo a metodologia Scrum e como eles se relacionam entre si?",
        answers: [
            { text: "Sprint, Product Backlog e Release Product.", correct: false },
            { text: "Product Backlog, Sprint Backlog e Daily Scrum.", correct: false },
            { text: "Sprint, Release e Product.", correct: true },
            { text: "Release Backlog, Product Increment e Retrospectiva.", correct: false },
        ]
    },
    {
        question: "Como o Scrum permite que as equipes ajustem rapidamente suas prioridades durante o processo de desenvolvimento de um projeto? Cite exemplos práticos de como essa flexibilidade pode ser aplicada.",
        answers: [
            {
                text: "Através de reuniões diárias, onde os objetivos do sprint são redefinidos diariamente.", correct: false
            },
            { text: "Por meio da revisão do Product Backlog entre os sprints, permitindo que itens sejam priorizados ou reordenados.", correct: true },
            { text: "Por permitir a modificação das tarefas do sprint a qualquer momento conforme necessário.", correct: false },
            { text: "As prioridades podem ser ajustadas durante o sprint através da intervenção do Product Owner.", correct: false },
        ]
    },
    {
        question: " Explique o conceito de 'sprint' no Scrum e descreva as condições em que as tarefas dentro de um sprint podem ser alteradas. Por que essa regra é importante para o funcionamento da metodologia?",
        answers: [
            { text: " O sprint pode ser alterado a qualquer momento para se adequar às novas exigências do cliente.", correct: false },
            { text: "As tarefas do sprint não podem ser alteradas uma vez iniciadas, exceto em caso de emergência.", correct: true },
            { text: " O sprint é um ciclo longo, onde mudanças são frequentes para acompanhar o desenvolvimento.", correct: false },
            { text: "O sprint pode ser alterado apenas na retrospectiva, após o encerramento do ciclo.", correct: false },
        ]
    },
    {
        question: " Quais são os benefícios de utilizar a metodologia Scrum em projetos de desenvolvimento de software e como ela pode ser aplicada fora do contexto de software?",
        answers: [
            { text: "Scrum facilita a entrega contínua de valor ao cliente, promovendo ciclos curtos e adaptabilidade, sendo também aplicável em áreas como marketing e educação.", correct: true },
            { text: "Scrum promove a automação completa do processo, eliminando a necessidade de reuniões frequentes.", correct: false },
            {
                text: "Scrum é útil apenas em equipes de desenvolvimento de software que trabalham com prazos fixos.", correct: false
            },
            {
                text: "A metodologia Scrum garante que o projeto será sempre concluído no prazo estabelecido inicialmente.", correct: false
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