const input = document.querySelector('#taskInput');
const addButton = document.querySelector('#addTaskButton');
const List = document.querySelector('#taskTableBody');
const completedSelect = document.querySelector('#completedSelect');
const clearButton = document.querySelector("#clearTasksButton");
const countTask = document.querySelector("#countTask");
const searchInput = document.querySelector("#searchTasks");
const filterSelect = document.querySelector("#filterSelect");

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
    const VisibleTasks = getVisibleTasks();

    if(VisibleTasks.length === 0){
        List.innerHTML = `
            <tr>
                <td colspan="5" class="text-center font-light p-4">
                    No hay resultados
                </td>
            </tr>
        `;
        return;
    }

    VisibleTasks.forEach((VisibleTask, index) => {

        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-200 p-2 text-center">${index + 1}</td>
            <td class="border border-gray-200 p-2 text-center">${VisibleTask.text}</td>
            <td class="border border-gray-200 p-2 text-center">${VisibleTask.completed ? "✔️" : "❌"}</td>
            <td class="border border-gray-200 p-2 text-center">${VisibleTask.createdAt}</td>

            <td class="border border-gray-200 p-2 text-center">
                <button class="px-2 editTaskButton">✏️</button>
                <button class="px-2 deleteTaskButton">❌</button>
            </td>
        `;

        const deletedBtn = row.querySelector(".deleteTaskButton");
        const editBtn = row.querySelector(".editTaskButton")

        deletedBtn.addEventListener("click", () => {
            const realIndex = tasks.indexOf(VisibleTask);
            tasks.splice(realIndex, 1)
            saveTasks();
            renderTasks();
            renderCountTasks();
        });

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit Task", VisibleTask.text);

            if (newText === null || newText.trim() === "") return;

            VisibleTask.text = newText.trim();
            saveTasks();
            renderTasks();
            renderCountTasks();
        });

        List.appendChild(row);
    })

}

function renderCountTasks() {
    const VisibleTasks = getVisibleTasks();

    if (VisibleTasks.length === 0) {
        countTask.innerHTML = `<h2 class="font-light text-xl">No hay tareas actualmente</h2>`;
        return;
    }
    countTask.innerHTML = `
        <h2 class="font-light text-xl">Mostrando ${VisibleTasks.length} de ${tasks.length}</h2>
    `;
}

function getVisibleTasks() {
    const searchTasks = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    return tasks.filter((task) => {
        if (!task.text.toLowerCase().includes(searchTasks)) {
            return false;
        }

        if (filterValue === "completed" && task.completed === false) {
            return false;
        }

        if (filterValue === "pending" && task.completed === true) {
            return false;
        }

        return true;
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

clearButton.addEventListener("click", () => {
    clearTasks()
});

searchInput.addEventListener("input", () => {
    renderTasks();
    renderCountTasks();
});

filterSelect.addEventListener("change", () => {
    renderTasks();
    renderCountTasks();
});

input.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        addButton.click();
    }
})

renderTasks();
renderCountTasks();
