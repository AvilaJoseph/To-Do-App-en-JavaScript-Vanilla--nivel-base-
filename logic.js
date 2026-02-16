const input = document.querySelector('#taskInput');
const addButton = document.querySelector('#addTaskButton');
const List = document.querySelector('#taskTableBody');
const completedSelect = document.querySelector('#completedSelect');

function IsValidTask(text, completed) {
    if (text.trim() === "") {
        return false;
    }
    if (completed !== "true" && completed !== "false") {
        return false;
    }
    return true;
}

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    List.innerHTML = "";
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="border border-gray-200 p-2 text-center">${index + 1}</td>
        <td class="border border-gray-200 p-2 text-center">${task.text}</td>
        <td class="border border-gray-200 p-2 text-center">${task.completed === "true" ? "✔️" : "❌"}</td>
        <td class="border border-gray-200 p-2 text-center">${task.createdAt}</td>

        <td class="border border-gray-200 p-2 text-center">
            <button class="px-2 deleteTaskButton">❌</button>
        </td>
    `;

        const deletedBtn = row.querySelector(".deleteTaskButton");

        deletedBtn.addEventListener("click", () => {
            tasks.splice(index, 1)
            saveTasks();
            renderTasks()
        })
        List.appendChild(row);
    })

}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

addButton.addEventListener('click', () => {
    const text = input.value.trim();
    const completed = completedSelect.value;

    if (!IsValidTask(text, completed)) {
        alert("Por favor, ingresa una tarea válida y selecciona el estado de completado.");
        return;
    }

    const newTasks = {
        text: text,
        completed: completed === true,
        createdAt: new Date().toLocaleString()
    }

    tasks.push(newTasks);
    saveTasks();
    renderTasks();

    input.value = '';
    completedSelect.value = "false";
});

renderTasks();