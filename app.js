let taskInput = document.querySelector(".new-task");
let addButton = document.querySelector(".but-add");
let incompleteTaskHolder = document.querySelector(".todo");
let completedTasksHolder = document.querySelector(".compl");

let createNewTaskElement = function(taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  listItem.className = "str-task";
  label.innerText = taskString;
  label.className = "task";
  checkBox.type = "checkbox";
  checkBox.className = "checkbox";
  editInput.type = "text";
  editInput.className = "edit-task";
  editButton.innerText = "Edit";
  editButton.className = "but-edit";
  deleteButton.className = "but-delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "image-delete";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

let addTask = function() {
  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  taskInput.value = "";
  bindTaskEvents(listItem, taskCompleted);
}

let editTask = function() {
  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".edit-task");
  let label = listItem.querySelector(".task");
  let editBtn = listItem.querySelector(".but-edit");
  let containsClass = listItem.classList.contains("edit-mode");
  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("edit-mode");
}

let deleteTask = function() {
  let listItem = this.parentNode;
  let section = listItem.parentNode;
  section.removeChild(listItem);
}

let taskCompleted = function() {
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

let taskIncomplete = function() {
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  let checkBox = taskListItem.querySelector(".checkbox");
  let editButton = taskListItem.querySelector(".but-edit");
  let deleteButton = taskListItem.querySelector(".but-delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}