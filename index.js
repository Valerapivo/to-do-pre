let tasksList = [
    "Выполнить проектную работу",
    "Полить растения",
    "Изучить руководство по React",
    "Разработать интерфейс для проекта",
    "Прогуляться в солнечную погоду",
    "Помыть посуду",
];

const listContainer = document.querySelector(".to-do__list");
const form = document.querySelector(".to-do__form");
const inputField = document.querySelector(".to-do__input");

function loadSavedTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    return storedTasks ? storedTasks : tasksList;
}

function createTaskElement(taskText) {
    const template = document.getElementById("to-do__item-template");
    const taskElement = template.content
        .querySelector(".to-do__item")
        .cloneNode(true);

    const textSpan = taskElement.querySelector(".to-do__item-text");
    textSpan.textContent = taskText;

    const deleteBtn = taskElement.querySelector(".to-do__item-button_type_delete");
    deleteBtn.addEventListener("click", () => {
        taskElement.remove();
        const currentTasks = collectTasksFromPage();
        storeTasks(currentTasks);
    });

    const copyBtn = taskElement.querySelector(".to-do__item-button_type_duplicate");
    copyBtn.addEventListener("click", () => {
        const copiedText = textSpan.textContent;
        const duplicatedTask = createTaskElement(copiedText);
        listContainer.prepend(duplicatedTask);
        const updatedTasks = collectTasksFromPage();
        storeTasks(updatedTasks);
    });

    const editBtn = taskElement.querySelector(".to-do__item-button_type_edit");
    editBtn.addEventListener("click", () => {
        textSpan.setAttribute("contenteditable", true);
        textSpan.focus();
    });

    textSpan.addEventListener("blur", () => {
        textSpan.setAttribute("contenteditable", false);
        const editedTasks = collectTasksFromPage();
        storeTasks(editedTasks);
    });

    return taskElement;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTaskText = inputField.value.trim();
    if (newTaskText) {
        const newTaskElement = createTaskElement(newTaskText);
        listContainer.prepend(newTaskElement);
        const updatedTasks = collectTasksFromPage();
        storeTasks(updatedTasks);
        inputField.value = "";
    }
});

tasksList = loadSavedTasks();

tasksList.forEach((task) => {
    const taskElement = createTaskElement(task);
    listContainer.append(taskElement);
});

function collectTasksFromPage() {
    const taskElements = document.querySelectorAll(".to-do__item-text");
    const currentTasks = Array.from(taskElements).map(task => task.textContent);
    return currentTasks;
}

function storeTasks(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}