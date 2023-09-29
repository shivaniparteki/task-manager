//dom
import { taskOperations } from "../models/task-operation.js";
import { showAlert } from "./dialog.js";
import Task from "../models/task.js";
import { autoGen } from "../utils/counter.js";
// import { counter} from "../utils/counter.js";
window.addEventListener("load", init);
const itr = autoGen();
function init() {
  bindEvents();
  showCounts();
  focus("name");
  showCount(); 
}

const showCount = () => 
  (document.querySelector("#id").innerText = itr.next().value);


function save() {
  let tasks = taskOperations.getAllTask();
  console.log("JSON is", JSON.stringify(tasks));
  console.log("Tasks are", tasks);
  if (window.localStorage) {
    localStorage.tasks = JSON.stringify(tasks);
    showAlert("Record Saved Successfully");
  } else {
    showAlert("Your Browswe is Out-dated");
  }
}

function load() {
  if (localStorage) {
    let generictasks = JSON.parse(localStorage.tasks); // get generic object
    let tasks = generictasks.map(
      (task) => new Task(task.id, task.name, task.desc, task.date, task.url, task.isMarked)
    );
    taskOperations.tasks = tasks;
    showCounts();
    printTasks(taskOperations.tasks);
  } else {
    showAlert("Your Browswe is Out-dated");
  }
}

function bindEvents() {
  document.querySelector("#load").addEventListener("click", load);
  document.querySelector("#save").addEventListener("click", save);
  document.querySelector("#delete").addEventListener("click", deleteTask);
  document.querySelector("#add").addEventListener("click", addTask);
}

function deleteTask() {
  let tasks = taskOperations.deleteMarked();
  showCounts();
  printTasks(tasks);
}

function toggleDelete() {
  console.log("Toggle....", this.getAttribute("task-id"));
  const icon = this;
  const id = icon.getAttribute("task-id");
  const tr = icon.parentNode.parentNode;
  tr.classList.toggle("alert-danger");
  taskOperations.mark(id);
  showCounts();
}

function edit() {
  console.log("Edit..");
}

function showCounts() {
  document.querySelector("#total").innerText = taskOperations.tasks.length;
  document.querySelector("#marked").innerText = taskOperations.countMarked();
  document.querySelector("#un_marked").innerText = taskOperations.countUnmarked();
}

function createIcon(className, fn, id) {
  //  <i class="fas fa-edit"></i>
  let icon = document.createElement("i");
  icon.className = `fas fa-${className} me-3 head`;
  icon.addEventListener("click", fn);
  icon.setAttribute("task-id", id);
  return icon;
}

function addTask() {
  // Reading the fields
  let id = document.querySelector("#id").innerText;
  let name = document.querySelector("#name").value;
  let description = document.querySelector("#desc").value;
  let date = document.querySelector("#date").value;
  let url = document.querySelector("#url").value;

  const task = taskOperations.add(id, name, description, date, url);
  printTask(task);
  showCounts();
  clearAll();
  focus("name");
  showCount();

  // Store in object and then it goes in array
}

function printTasks(tasks) {
  const tbody = document.querySelector("#tasks");
  tbody.innerHTML = "";
  // tasks.forEach((task) => printTask(task));
  tasks.forEach(printTask);
}

function printTask(task) {
  console.log("task");
  console.log(task);
  const tbody = document.querySelector("#tasks");
  const tr = tbody.insertRow();
  let id = task.id;
  // Object Traverse
  let cellIndex = 0;
  for (let key in task) {
    if (key == "isMarked" && task[key]) {
      tr.classList.toggle("alert-danger");
    }
    if (key == "isMarked" || typeof task[key] === "function") {
      continue;
    }
    let value = task[key];
    let td = tr.insertCell(cellIndex);
    td.innerText = value;
    cellIndex++;
  }
  let td = tr.insertCell(cellIndex);
  td.appendChild(createIcon("edit", edit, id));
  td.appendChild(createIcon("trash", toggleDelete, id));
}

const clearAll = () =>
  document.querySelectorAll(".form-control").forEach((txtBox) => (txtBox.value = ""));

const focus = (fieldId) => document.querySelector("#" + fieldId).focus();

// function clearAll() {
//  let txtBoxes =  document.querySelectorAll(".form-control");
//   txtBoxes.forEach((txtBox) => (txtBox.value = ""));
 