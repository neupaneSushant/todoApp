const inputBox = document.querySelector("#inputBox");
const listContainer = document.querySelector("#listContainer");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const task = inputBox.value.trim();
    if (task !== "") {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(task));
        let span = document.createElement("span");
        span.appendChild(document.createTextNode("\u00d7"));
        li.appendChild(span);
        listContainer.appendChild(li);
        saveTasks();
    }
    inputBox.value = "";
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTasks();
    }
}, false);

function saveTasks() {
    const tasks = [];
    listContainer.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(task.text));
            if (task.checked) {
                li.classList.add("checked");
            }
            let span = document.createElement("span");
            span.appendChild(document.createTextNode("\u00d7"));
            li.appendChild(span);
            listContainer.appendChild(li);
        });
    }
}