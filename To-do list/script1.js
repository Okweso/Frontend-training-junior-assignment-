document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
    document.getElementById('btn_task').addEventListener("click", function() {
        let task = document.getElementById('Task').value;
        if (!task) {
            alert("Please enter a task");
        } else {
            addTaskToList(task);
            saveTasks();
            document.getElementById('Task').value = "";
        }
    });
});

function addTaskToList(task) {
    let list = document.getElementById('task_list');
    let new_entry = document.createElement("li");
    new_entry.id = "task-item";

    let entry_text = document.createElement("span");
    entry_text.innerHTML = task;

    let edit_button = document.createElement("button");
    edit_button.id="btnEdit";
    edit_button.innerHTML = "Edit";
    edit_button.addEventListener("click", function() {
        let edited_task = prompt("Edit your task:", entry_text.innerHTML);
        if (edited_task !== null && edited_task !== "") {
            entry_text.innerHTML = edited_task;
            saveTasks();  // Save tasks after editing
        }
    });

    let delete_button = document.createElement("button");
    delete_button.id="btnDelete";
    delete_button.innerHTML = "Delete";
    delete_button.addEventListener("click", function() {
        list.removeChild(new_entry);
        saveTasks();  // Save tasks after deletion
    });

    new_entry.appendChild(entry_text);
    new_entry.appendChild(edit_button);
    new_entry.appendChild(delete_button);

    list.appendChild(new_entry);
}

function saveTasks() {
    let tasks = [];
    let taskItems = document.querySelectorAll("#task_list #task-item span");
    taskItems.forEach(item => {
        tasks.push(item.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.forEach(task => {
            addTaskToList(task);
        });
    }
}

