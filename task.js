const d = document;

const borrarTodas = d.getElementById("borrar-todas");
const agregar = d.getElementById("agregar");
const lista = d.getElementById("lista");
const texto = d.getElementById("texto");
const errores = d.getElementById("errores");
const noMasTarea = d.getElementById("no-mas");

let timeoutId;  

function validarTarea(tarea) {
    if (tarea === "" && !(lista.children.length == 10)) {
        errores.textContent = "Ingresa alguna tarea";
        errores.style.color = "#f87171";
        texto.value = "";
        texto.focus();
        return false;
    }
    if (tarea.length > 10) {
        errores.textContent = "La tarea no puede tener más de 10 caracteres";
        errores.style.color = "#f87171";
        texto.value = "";
        texto.focus();
        return false;
    }
    if (lista.children.length >= 10) {
        errores.textContent = "No podés tener más de 10 tareas activas";
        errores.style.color = "#f87171";
        
        if (timeoutId) clearTimeout(timeoutId);
    
        timeoutId = setTimeout(() => {
            errores.textContent = "";
        }, 2000);
        return false;
    }
    return true;
}
////// FIN DE LAS VALIDACIONES

agregar.addEventListener("click", (e) => {
    e.preventDefault();
    const tarea = texto.value.trim();

    if (!validarTarea(tarea)) return; 

    errores.textContent = "Tarea agregada";
    errores.style.color = "#90ee90";

    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
        errores.textContent = "";
    }, 2000);

    const contenedor = d.createElement("div");
    const tareaItem = d.createElement("li");
    const borrar = d.createElement("button");
    const check = d.createElement("input");
    const tareaTexto = d.createElement("span");

    check.type = "checkbox";
    check.classList.add("check");
    contenedor.classList.add("tarea-contenedor"); 
    tareaItem.classList.add("tarea-item");
    tareaTexto.textContent = tarea;
    borrar.textContent = "borrar";
    borrar.classList.add("borrar-tarea");

    tareaItem.setAttribute("draggable", "true");

    lista.appendChild(contenedor);
    contenedor.appendChild(tareaItem);
    tareaItem.appendChild(tareaTexto);
    tareaItem.appendChild(check);
    tareaItem.appendChild(borrar);

    check.addEventListener("change", () => {
        tareaItem.classList.toggle("completada"); 
    });

    borrar.addEventListener("click", e => {
        contenedor.remove();
        errores.textContent = "Se eliminó tu tarea";
        errores.style.color = "#f59e0b";

        if (timeoutId) {
            clearTimeout(timeoutId); 
        }

        timeoutId = setTimeout(() => {
            errores.textContent = "";
        }, 2000);
    });

    texto.value = "";
    texto.focus();
});

texto.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        agregar.click();
    }
});


borrarTodas.addEventListener("click", (e) => {
    if (lista.children.length >= 1) {
        while(lista.firstChild){
            lista.removeChild(lista.firstChild)
        }
    } else {
        errores.textContent = "No hay tareas por eliminar"
        errores.style.color  = "#f59e0b"
    }
})