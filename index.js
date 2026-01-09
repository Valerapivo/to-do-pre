let items = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    return savedTasks ? savedTasks : items;
}

function manageItem(taskText) {

    const template = document.getElementById("to-do__item-template");
    const taskElement = template.content.querySelector(".to-do__item").cloneNode(true);
    const textElement = taskElement.querySelector(".to-do__item-text");
    textElement.textContent = taskText;

    const deleteButton = taskElement.querySelector(".to-do__item-button_type_delete");
    deleteButton.addEventListener("click", function() {
        taskElement.remove();
        const currentItems = getTasksFromDOM();
        saveTasks(currentItems);
    });

    const duplicateButton = taskElement.querySelector(".to-do__item-button_type_duplicate");
    duplicateButton.addEventListener("click", function() {
        const itemName = textElement.textContent;
	if (textElement.textContent && textElement.textContent.trim().length > 0) {
        	const newItem = manageItem(itemName);
        	listElement.prepend(newItem);
        	const currentItems = getTasksFromDOM();
        	saveTasks(currentItems);
	}
    });

    let editedText = textElement.textContent;
    const editButton = taskElement.querySelector(".to-do__item-button_type_edit");
    editButton.addEventListener("click", function() {
        textElement.setAttribute("contenteditable", "true");
        textElement.focus();
	editedText = textElement.textContent;
    });

    textElement.addEventListener("blur", function() {
        textElement.setAttribute("contenteditable", "false");
	if (textElement.textContent && textElement.textContent.trim().length > 0) {
        	const currentItems = getTasksFromDOM();
		const currentElement = textElement.textContent;
		saveTasks(currentItems);
	}
	else {
		textElement.textContent = editedText;
	}
    });
    return taskElement;
}


formElement.addEventListener("submit", function(event) {
    event.preventDefault();
    const taskText = inputElement.value.trim();
    
    if (taskText && taskText.trim().length > 0) {
        const newTask = manageItem(taskText);
        listElement.prepend(newTask);
        const currentItems = getTasksFromDOM();
        saveTasks(currentItems);
        inputElement.value = "";
    }
});

function getTasksFromDOM() {
    const taskElements = document.querySelectorAll(".to-do__item-text");
    const tasks = [];
    
    taskElements.forEach(function(taskElement) {
	tasks.push(taskElement.textContent);
    });
    
    return tasks;
}

function saveTasks(tasksArray) {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}


//init
items = loadTasks();

items.forEach(function(task) {
    const taskElement = manageItem(task);
    listElement.append(taskElement);
});
