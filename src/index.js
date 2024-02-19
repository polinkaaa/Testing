import './styles/fonts.scss';
import './styles/main.scss';
import './styles/header.scss';
import './styles/result.scss';
import './styles/footer.scss';
import './styles/test.scss';
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

const context = document.querySelector('.wrap'),
hello = document.querySelector('.hello'),
quizContainer = document.querySelector('.quiz__container'),
startBtn = document.querySelector('.btn'),
hr = document.querySelector('.under_btn'),
nextBtn = document.querySelector('.test_btn_continue'),
repeatBtn = document.querySelector('.results__btn'),
name = document.querySelector('.name'),
box_desc = document.querySelectorAll('.desc'),
box_desc_result = document.querySelector('.box_desc_result'),
result = document.querySelector('.results'),
desc_result = document.querySelector('.desc_result'),
per_cent = document.querySelector('.desc_per_cent'),
wrap_result = document.querySelector('.wrap_result'),
best_per_cent = document.querySelector('.best_per_cent');

let mainQuestion = document.querySelector('.quiz__question'),
listContainer = document.querySelector('.quiz'),
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
repeatBtn.addEventListener('click', function() {
    questionIndex=0;
    cleanPage();
    showQuestion();
})

function cleanPage() {
    context.style.display = "none";
    hr.style.display = "none";
    hello.style.display = "none";
    result.style.display = "none";
}

function showQuestion() {
    mainQuestion.innerHTML = questions[questionIndex]['question'];
    listContainer.style.display = "block";
    
    for (let i=1; i<=questions[questionIndex]['answers'].length; i++ ) {
        if (i==1) {
            quizContainer.innerHTML =
                `<label class="label">
                    <input type="radio" class="answer" name="answer" value = "${i}" checked/>
                    <span class="answer_text">${questions[questionIndex]['answers'][i - 1]}</span>
                </label>
                <hr class="hr_botton">`;
        } else {
            quizContainer.innerHTML +=
                `<label class="label">
                    <input type="radio" class="answer" name="answer" value = "${i}"/>
                    <span class="answer_text">${questions[questionIndex]['answers'][i - 1]}</span>
                </label>
                <hr class="hr_botton">`;
        }
    }
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
    console.log(score)
    console.log(numberOfTests)
    name.innerHTML = "Константин Константинопольский&#160;&#160;&#160;&#160;&#160;" + formattedDate;
    result.style.display = "block";
    desc_result.innerHTML = "Результаты " + (numberOfTests + 1) + "-й попытки";
    per_cent.innerHTML = score + "/" + questions.length + "&#160;&#160;&#160;&#160;" + score / questions.length * 100 + "%";
    listContainer.style.display = "none";

    message.style.display = "block";
    if (score / questions.length * 100 < 80) {
        message.innerHTML = "Не очень хороший результат, рекомендуем изучить курс еще раз."
    } else {
        message.innerHTML = "Поздравляем, тест пройден успешно!"
    }

    if (theBestScore < score / questions.length * 100) {
        theBestScore = score / questions.length * 100;
    }
    
    if (numberOfTests == 0) {
        box_desc_result.style.display ="none";
    } else {
        box_desc_result.style.display ="flex";
    }

    if (numberOfTests < 2) {
        numberOfTests++;
        questionIndex = -1;
        score = 0;
    } else {
        repeatBtn.disabled = 'true';
    }

    if (numberOfTests > 1) {
        wrap_result.style.display = "flex";
        box_desc.forEach(item => {
            item.style.width = "50%";
        })
        best_per_cent.innerHTML = theBestScore + "%";
    } 
}
