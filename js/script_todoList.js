let temporizador;
let minutos = 25;
let segundos = 0;
let temporizadorActivo = false;

const listaTareas = document.getElementById('lista-tareas');
const formularioTareas = document.getElementById('formulario-tareas');
const nuevaTareaInput = document.getElementById('nueva-tarea');
const bttnReiniciar = document.getElementById('bttn-reiniciar');

let finAudio = new Audio('./sounds/todoList/win.wav');

function actualizarTemporizador() {
    const temporizadorDisplay = document.getElementById('temporizador');
    temporizadorDisplay.innerHTML = `${minutos < 10 ? '0' : ''}${minutos}:${segundos<10?'0':''}${segundos}`;
}
function iniciarTemporizador() {
    temporizadorActivo = true;
    temporizador = setInterval(function() {
        if(minutos == 0 && segundos == 0){
            clearInterval(temporizador);
            temporizadorActivo = false;
            finAudio.play();
        }
        else if(segundos == 0) {
            minutos--;
            segundos = 59;
        }
        else {
            segundos--;
        }
        actualizarTemporizador()
    }, 1000);
}
function detenerTemporizador() {
    clearInterval(temporizador);
    temporizadorActivo = false;
}

document.getElementById('bttn-iniciar').addEventListener('click',function(){
    if(!temporizadorActivo) {
        iniciarTemporizador();
    }
});
document.getElementById('bttn-detener').addEventListener('click',function(){
    if(temporizadorActivo) {
        detenerTemporizador();
    }
});

bttnReiniciar.addEventListener('click',function(){
    detenerTemporizador();
    minutos = 25;
    segundos = 0;
    actualizarTemporizador();
});



formularioTareas.addEventListener('submit',function(e){
    e.preventDefault();
    const nuevaTareaTxt = nuevaTareaInput.value.trim();
    if(nuevaTareaTxt !== '') {
        agregarTarea(nuevaTareaTxt);
        nuevaTareaInput.value = '';
    }
});

function agregarTarea(texto) {
    const li = document.createElement('li');
    li.textContent = texto;
    li.addEventListener('click', alternarCompletadoTarea);
    listaTareas.appendChild(li);
}

function alternarCompletadoTarea(e) {
    e.target.classList.toggle('completada');
}

window.addEventListener('load', function() {
    actualizarTemporizador();
});

