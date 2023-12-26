import './styles/main.scss';
import 'normalize.css';

const questions = [
    {
        question: "aaa",
        answers: ["bbb", "aaa", "ccc", "ddd", "eee"],
        correct: 2,
    },
    {
        question: "bbb",
        answers: ["bbb2", "aaa", "ccc", "ddd", "eee"],
        correct: 1,
    },
    {
        question: "ccc",
        answers: ["bbb3", "aaa", "ccc", "ddd", "eee"],
        correct: 3,
    },
    {
        question: "ddd",
        answers: ["bbb4", "aaa", "ccc", "ddd", "eee"],
        correct: 4,
    },
    {
        question: "eee",
        answers: ["bbb5", "aaa", "ccc", "ddd", "eee"],
        correct: 5,
    },
    {
        question: "aaa",
        answers: ["bbb", "aaa", "ccc", "ddd", "eee"],
        correct: 2,
    },
    {
        question: "bbb",
        answers: ["bbb2", "aaa", "ccc", "ddd", "eee"],
        correct: 1,
    },
    {
        question: "ccc",
        answers: ["bbb3", "aaa", "ccc", "ddd", "eee"],
        correct: 3,
    },
    {
        question: "ddd",
        answers: ["bbb4", "aaa", "ccc", "ddd", "eee"],
        correct: 4,
    },
    {
        question: "eee",
        answers: ["bbb5", "aaa", "ccc", "ddd", "eee"],
        correct: 5,
    },
]

const mainTitle = document.querySelector('.main__title'),
context = document.querySelector('.wrap'),
startBtn = document.querySelector('.btn'),
hr = document.querySelector('.under_btn'),
nextBtn = document.querySelector('.test_btn_continue');

let mainQuestion = document.querySelector('.main__description'),
listContainer = document.querySelector('.quiz_list'),
message = document.querySelector('.message');

let score = 0,
questionIndex = 0,
checkedRadio,
numberOfTests = 0,
theBestScore = 0;

let currentDate = new Date();
let day =currentDate.getDate(),
month = currentDate.getMonth() + 1,
year = currentDate.getFullYear();

if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}

let formattedDate = day + "." + month + "." + year;

startBtn.addEventListener('click', function () {
    cleanPage();
    showQuestion();
})

nextBtn.addEventListener('click', function() {
    if (questionIndex < questions.length - 1){
        if (questionIndex != -1) {
            checkAnswer();
        }
        if (checkedRadio) {
            questionIndex++;
            cleanPage();
            showQuestion();
        }
    } else {
        checkAnswer();
        showResults();
    }
})

function cleanPage() {
    context.style.display = "none";
    hr.style.display = "none";
    mainTitle.style.margin = "70px 0 20px";
    mainQuestion.style.marginBottom = "34px";
    listContainer.innerHTML = '<hr class="hr_top">';
    message.style.display = "none";
}

function showQuestion() {
    mainTitle.innerHTML = "Тестирование";
    mainQuestion.innerHTML = questions[questionIndex]['question'];
    mainQuestion.style.fontSize = "18px";
    listContainer.style.display = "block";
    
    for (let i=1; i<=questions[questionIndex]['answers'].length; i++ ) {
        listContainer.innerHTML +=
        `<label class="label">
            <input type="radio" class="answer" name="answer" value = "${i}"/>
            <span class="answer_text">${questions[questionIndex]['answers'][i - 1]}</span>
        </label>
        <hr class="hr_botton">`;
    }
    nextBtn.innerHTML = "Принять";
    nextBtn.style.display = "block";
    nextBtn.style.padding = "15px 45px";
}
    
function checkAnswer() {
    checkedRadio = document.querySelector('input:checked')
    if (!checkedRadio) {
        return;
    }
    if (checkedRadio.value == questions[questionIndex]['correct']) {
        score++;
    }
}

function showResults() {
    mainTitle.innerHTML = "Результаты тестирования";
    mainTitle.style.margin = "82px 0 36px";
    mainQuestion.style.fontSize = "14px";
    mainQuestion.style.color = "#373C40";
    mainQuestion.style.marginBottom = "13px";
    mainQuestion.innerHTML = "Константин Константинопольский&#160;&#160;&#160;&#160;&#160;" + formattedDate;
    context.style.display = "block";
    context.children[0].style.backgroundColor = "#F3F3F3";
    context.children[0].style.padding = "32px";
    context.children[0].style.gap = "10px";
    context.children[0].children[0].innerHTML = "Результаты " + (numberOfTests + 1) + "-й попытки";
    context.children[0].children[0].style.fontSize = "14px";
    context.children[0].children[0].style.color = "#373C40";
    context.children[0].children[0].style.textAlign = "center";
    context.children[0].children[1].innerHTML = score + "/" + questions.length + "&#160;&#160;&#160;&#160;" + score / questions.length * 100 + "%";
    context.children[0].children[1].style.fontFamily = "golos_bold";
    context.children[0].children[1].style.fontSize = "30px";
    context.children[0].children[1].style.color = "#E9262D";
    context.children[0].children[1].style.textAlign = "center";
    listContainer.style.display = "none";
    startBtn.style.display = "none";

    message.style.display = "block";
    if (score / questions.length * 100 < 80) {
        message.innerHTML = "Не очень хороший результат, рекомендуем изучить курс еще раз."
    } else {
        message.innerHTML = "Поздравляем, тест пройден успешно!"
    }

    if (theBestScore < score / questions.length * 100) {
        theBestScore = score / questions.length * 100;
    }
    
    if (numberOfTests < 2) {
        nextBtn.style.display = "flex";
        nextBtn.style.gap = "10px";
        nextBtn.style.alignItems = "center";
        nextBtn.style.padding = "13px 44px";
        nextBtn.innerHTML = "Повторить тест";
        nextBtn.innerHTML += '<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE2IDcuNTM4NDZDMTguNjU3OSA3LjUzODQ2IDIxLjAzMjkgOC43MzYxNSAyMi42MDI4IDEwLjYxNTRIMjQuNTI1MkMyMi43Mjc3IDcuODM5NzYgMTkuNTgxMiA2IDE2IDZDMTAuNTE5NiA2IDYuMDU3MTggMTAuMzA4NSA1Ljg4OTQ4IDE1LjY4NjFMNC4xMDA0MSAxMy45MTc1TDMgMTUuMDA1NEw2LjY2MjY0IDE4LjYyNjJMMTAuMzI1MyAxNS4wMDU0TDkuMjI0ODcgMTMuOTE3NUw3LjQ0NyAxNS42NzUxQzcuNjE5NzMgMTEuMTUyNSAxMS4zODI5IDcuNTM4NDYgMTYgNy41Mzg0NloiIGZpbGw9ImJsYWNrIi8+CjxwYXRoIGQ9Ik05LjM5NzQ2IDIxLjM4NDZINy40NzVDOS4yNzI1NCAyNC4xNjAyIDEyLjQxOTEgMjYgMTYuMDAwMiAyNkMyMS40ODA1IDI2IDI1Ljk0MjkgMjEuNjkxNiAyNi4xMTA4IDE2LjMxNDFMMjcuODk5NiAxOC4wODI1TDI5IDE2Ljk5NDZMMjUuMzM3NCAxMy4zNzM4TDIxLjY3NDcgMTYuOTk0NkwyMi43NzUxIDE4LjA4MjVMMjQuNTUzMiAxNi4zMjQ3QzI0LjM4MDcgMjAuODQ3NCAyMC42MTc0IDI0LjQ2MTUgMTYuMDAwMiAyNC40NjE1QzEzLjM0MjMgMjQuNDYxNSAxMC45Njc0IDIzLjI2MzkgOS4zOTc0NiAyMS4zODQ2WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==" class="btn__refresh" alt="refresh">';
        numberOfTests++;
        questionIndex = -1;
        score = 0;
    } else {
        nextBtn.style.display = "none";
    }

    if (numberOfTests > 1) {
        context.style.display = "flex";
        context.style.gap = "20px";
        context.children[0].style.width = "50%";
        context.children[1].style.display = "flex";
        context.children[1].style.backgroundColor = "#F3F3F3";
        context.children[1].style.padding = "32px";
        context.children[1].style.gap = "10px";
        context.children[1].style.width = "50%";
        context.children[1].children[0].innerHTML = "Лучший результат";
        context.children[1].children[0].style.fontSize = "14px";
        context.children[1].children[0].style.color = "#373C40";
        context.children[1].children[0].style.textAlign = "center";
        context.children[1].children[1].innerHTML = theBestScore + "%";
        context.children[1].children[1].style.fontFamily = "golos_bold";
        context.children[1].children[1].style.fontSize = "30px";
        context.children[1].children[1].style.color = "#69696C";
        context.children[1].children[1].style.textAlign = "center";
        if (document.documentElement.clientWidth < 430) {
            context.children[0].style.width = "90%";
            context.children[1].style.width = "90%";
        }
    }
}
