const input = document.getElementById("tarea");
const boton = document.getElementById("agregar");
const errorSpan = document.getElementById("tarea-error");
const lista = document.getElementById("lista");

function cargarTareas() {
  const guardadas = localStorage.getItem("tareas");
  return guardadas ? JSON.parse(guardadas) : [];
}

let tareas = cargarTareas();

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderizar() {
  lista.innerHTML = "";
  tareas.forEach(function (texto, indice) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = texto;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.dataset.indice = indice;
    li.appendChild(span);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

boton.addEventListener("click", function () {
  const texto = input.value.trim();
  if (texto === "") {
    errorSpan.textContent = "Escribe una tarea antes de agregar.";
    return;
  }
  errorSpan.textContent = "";
  tareas.push(texto);
  guardarTareas();
  renderizar();
  input.value = "";
});

lista.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const indice = Number(event.target.dataset.indice);
    tareas.splice(indice, 1);
    guardarTareas();
    renderizar();
  }
});

renderizar();