let cards = [{
    id: 1,
    name: 'Программирование',
    dateCreated: new Date(2023, 6, 22),
    tasks: [{
        id: 1,
        name: 'Теория',
        isDone: false,
    }, {
        id: 2,
        name: 'Практика',
        isDone: true,
    }, {
        id: 3,
        name: 'Софт скилы',
        isDone: false,
    }],
    tasksFinished: 1
}, {
    id: 2,
    name: 'Английский',
    dateCreated: new Date(2023, 9, 22),
    tasks: [{
        id: 1,
        name: 'Раздел 1',
        isDone: true,
    }, {
        id: 2,
        name: 'Повторить слова',
        isDone: true,
    }, {
        id: 3,
        name: 'Написать эссе',
        isDone: false,
    }, {
        id: 4,
        name: 'Записаться к репетитору',
        isDone: false,
    }],
    tasksFinished: 3
}];

let task = {
    id: 1,
    name: 'Теория',
    isDone: false,
    date: new Date(),
    taskGroup: ''
}

function weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

function calculateProgress(tasks, tasksFinished) {
    return (tasksFinished / tasks.length * 100).toFixed(2);
}

function printModalTasks(card) {
    let content = '';
    card.tasks.forEach(task => {
        if (task.isDone) {
            content += `<input class="form-check-input" type="checkbox" value="${task.name}" id="${task.id}" saveCheckbox(this) checked>
                <label class="form-check-label" for="flexCheckDefault">
                    ${task.name}
                </label>
                <br/>`;
        } else {
            content += `<input class="form-check-input" type="checkbox" value="${task.name}" id="${task.id}">
                <label class="form-check-label" for="flexCheckDefault">
                    ${task.name}
                </label>
                <br/>`;
        }
    })
    return content;
}

function saveCheckbox() {
    if (this.checked) {
        let n = getObjectIndex(this.value);
        cards[n].isDone = true;
    }
}

function getObjectIndex(name) {
    cards.filter(obj => {
        return obj.name === name;
    })
}




let cardsDiv = document.getElementById("cards-div");

function printCards(cards) {
    cards.forEach(card => {
        cardsDiv.innerHTML += ` <div class="skill-card">
<div class="skill-card-header">
    <div>
        <h3 class="skill-card-title">${card.name}</h3>
        <p class="skill-card-subtitle">Неделя ${weeksBetween(card.dateCreated, new Date())}</p>
    </div>
    <button type="button" class="btn btn-primary" id="btn${card.id}" data-bs-toggle="modal"
        data-bs-target="#modal${card.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
            <path
                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
    </button>
</div>
<div class="progress">
    <div class="progress-bar" style="width: ${calculateProgress(card.tasks, card.tasksFinished)}%" id="progress-bar${card.id}" role="progressbar" aria-label="Basic example"
        aria-valuenow="${calculateProgress(card.tasks, card.tasksFinished)}" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="skill-card-progress-text-div">
    <p class="skill-card-progress-text">Прогресс</p>
    <p class="skill-card-progress-percenrage">${calculateProgress(card.tasks, card.tasksFinished)}%</p>
</div>
<hr>
<p>Задач выполнено: ${card.tasksFinished} </p>
</div>

<div class="modal fade" id="modal${card.id}" tabindex="-1" aria-labelledby="modal${card.id}Label" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Список задач</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="modal-body${card.id}" class="modal-body">
            ${printModalTasks(card)}
        </div>
        <div class="modal-footer">
            <button type="button" id="modal-btn1-1" class="btn btn-secondary"
                data-bs-dismiss="modal">Закрыть</button>
            <!-- <button type="button" id="modal-btn1-2" class="btn btn-primary">Добавить задачу</button> -->
        </div>
    </div>
</div>
</div>`;
    })
}

window.addEventListener("load", (event) => {
    printCards(cards);
})