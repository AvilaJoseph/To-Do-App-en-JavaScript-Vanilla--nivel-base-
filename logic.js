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

addButton.addEventListener('click', () => {
    const text = input.value.trim();
    const completed = document.querySelector('#completedSelect').value;

    if(!IsValidTask(text, completed)) {
        alert("Por favor, ingresa una tarea válida y selecciona el estado de completado.");
        return;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="border border-gray-200 p-2 text-center">${List.children.length + 1}</td>
        <td class="border border-gray-200 p-2 text-center">${text}</td>
        <td class="border border-gray-200 p-2 text-center">${completed === "true" ? "✔️" : "❌"}</td>
        <td class="border border-gray-200 p-2 text-center">${new Date().toLocaleString()}</td>
    `;

    List.appendChild(row);
    input.value = '';
    completedSelect.value = "false";
});

