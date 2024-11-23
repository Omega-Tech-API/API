const questions = [
    {
        question: "Qual é a principal função do Product Owner no Scrum?",
        answers: [
            { text: "Garantir que a equipe de desenvolvimento siga o plano de projeto.", correct: false },
            { text: "Gerenciar e priorizar o backlog do produto.", correct: true },
            { text: "Escrever o código do sistema.", correct: false },
            { text: "Testar a funcionalidade do produto.", correct: false },
        ]
    },
    {
        question: "O que o Scrum Master faz para ajudar a equipe de desenvolvimento?",
        answers: [
            { text: "Especifica os requisitos do projeto.", correct: false },
            { text: "Organiza a equipe em pares para codificação.", correct: false },
            { text: "Remove impedimentos e protege a equipe de distrações.", correct: true },
            { text: "Cria o plano de marketing do produto.", correct: false },
        ]
    },
    {
        question: "Qual é a principal característica da Equipe de Desenvolvimento em relação à organização do trabalho?",
        answers: [
            { text: "Seguir as instruções do Product Owner (PO).", correct: false },
            { text: "Auto-organizar-se para realizar as tarefas.", correct: true },
            { text: "Trabalhar com equipes externas para definir prazos.", correct: false },
            { text: "Garantir que o Scrum Master revise o código.", correct: false },
        ]
    },
    {
        question: "Qual é o papel do Product Owner (PO) na priorização das funcionalidades do produto?",
        answers: [
            { text: "Ele decide quais funcionalidades serão testadas primeiro.", correct: false },
            { text: "Ele desenvolve o produto enquanto a equipe cria outras funcionalidades.", correct: false },
            { text: "Ele organiza o backlog do produto com base nas necessidades do cliente.", correct: true },
            { text: "Ele revisa o trabalho do Scrum Master antes da entrega.", correct: false },
        ]
    },
    {
        question: "Como o Scrum Master pode proteger a equipe de distrações externas?",
        answers: [
            { text: "Ao supervisionar diretamente cada tarefa da equipe.", correct: false },
            { text: "Garantindo que a equipe se concentre nas prioridades definidas sem interrupções de outras áreas.", correct: true },
            { text: "Fazendo todo o planejamento do projeto sem consultar a equipe.", correct: false },
            { text: "Gerenciando os testes e a revisão de código para os desenvolvedores.", correct: false },
        ]
    },
    {
        question: "Por que é ideal que a Equipe de Desenvolvimento trabalhe no mesmo espaço físico?",
        answers: [
            { text: "Para facilitar a supervisão do Scrum Master.", correct: false },
            { text: "Para reduzir a quantidade de reuniões semanais.", correct: false },
            { text: "Para garantir que o Product Owner participe de todas as decisões técnicas.", correct: false },
            { text: "Para melhorar a comunicação e colaboração entre os membros da equipe.", correct: true },
        ]
    },
    {
        question: "Como o Scrum Master promove a auto-organização da Equipe de Desenvolvimento?",
        answers: [
            { text: "Ele dá autonomia à equipe para definir como o trabalho será feito e remove impedimentos para facilitar o progresso.", correct: true },
            { text: "Ele distribui as tarefas de forma justa entre os membros da equipe.", correct: false },
            { text: "Ele estabelece prazos rígidos para que a equipe cumpra as tarefas.", correct: false },
            { text: "Ele supervisiona todas as decisões técnicas da equipe.", correct: false },
        ]
    },
    {
        question: "Em um cenário onde o Product Owner prioriza funcionalidades que não estão alinhadas com as expectativas do cliente, o que a equipe deve fazer?",
        answers: [
            { text: "Seguir as prioridades do Product Owner sem questionar.", correct: false },
            { text: "Realizar uma reunião com o Scrum Master para discutir as prioridades.", correct: false },
            { text: "Deixar que o Scrum Master resolva o problema sozinho.", correct: false },
            { text: "Conversar com o Product Owner para alinhar as prioridades com as expectativas do cliente.", correct: true },
        ]
    },
    {
        question: "Qual a importância da retrospectiva no scrum?",
        answers: [
            { text: "Melhorar continuamente o processo de trabalho da equipe, identificando o que pode ser ajustado para sprints futuras.", correct: true },
            { text: "Revisar o backlog do produto", correct: false },
            { text: "Testar as funcionalidades do produto.", correct: false },
            { text: "Redefinir as metas do projeto com o cliente.", correct: false },
        ]
    },
    {
        question: "Como a Equipe de Desenvolvimento pode resolver um impedimento técnico durante a Sprint sem a intervenção direta do Scrum Master?",
        answers: [
            { text: "Auto-organizando-se para encontrar uma solução colaborativa entre os membros da equipe.", correct: true },
            { text: "Pedindo ao Product Owner que resolva o impedimento.", correct: false },
            { text: "Esperando que o Scrum Master resolva o problema.", correct: false },
            { text: "Ignorando o impedimento e continuando o trabalho em outra tarefa.", correct: false },
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