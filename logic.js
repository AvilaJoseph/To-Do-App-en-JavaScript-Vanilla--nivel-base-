const input = document.querySelector('#taskInput');
const addButton = document.querySelector('#addTaskButton');
const List = document.querySelector('#taskTableBody');
const completedSelect = document.querySelector('#completedSelect');
const clearButton = document.querySelector("#clearTasksButton");
const countTask = document.querySelector("#countTask");

function IsValidTask(text, completed) {
    if (text.trim() === "") {
        return false;
    }
    if (completed !== "true" && completed !== "false") {
        return false;
    }
    return true;
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasks() {
    const confirmClear = confirm("¿Seguro que quieres borrar todas las tareas?");
    if (!confirmClear) return;
    tasks = [];
    saveTasks();
    renderTasks();
    renderCountTasks();
}

function renderTasks() {
    List.innerHTML = "";
    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-200 p-2 text-center">${index + 1}</td>
            <td class="border border-gray-200 p-2 text-center">${task.text}</td>
            <td class="border border-gray-200 p-2 text-center">${task.completed ? "✔️" : "❌"}</td>
            <td class="border border-gray-200 p-2 text-center">${task.createdAt}</td>

            <td class="border border-gray-200 p-2 text-center">
                <button class="px-2 deleteTaskButton">❌</button>
            </td>
        `;

        const deletedBtn = row.querySelector(".deleteTaskButton");

        deletedBtn.addEventListener("click", () => {
            tasks.splice(index, 1)
            saveTasks();
            renderTasks();
            renderCountTasks();
        })
        List.appendChild(row);
    })

}

function renderCountTasks(){
    if(tasks.length === 0){
        countTask.innerHTML = `<h2 class="font-light text-xl">No hay tareas actualmente</h2>`;
        return;
    }
    countTask.innerHTML = `
        <h2 class="font-light text-xl">Hay ${tasks.length} tareas en lista</h2>
    `;
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
        completed: completed === "true",
        createdAt: new Date().toLocaleString()
    }

    tasks.push(newTasks);
    saveTasks();
    renderTasks();
    renderCountTasks();

    input.value = '';
    completedSelect.value = "false";
});

clearButton.addEventListener("click", clearTasks);

renderTasks();
renderCountTasks();
