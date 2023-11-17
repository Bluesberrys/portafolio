let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerinicial = 50;
let tiempoRegresivoId = null;

let winAudio = new Audio('./sounds/game/win.wav');
let clickAudio = new Audio('./sounds/game/click.wav');
let loseAudio = new Audio('./sounds/game/lose.wav');
let wrongAudio = new Audio('./sounds/game/wrong.wav');
let rightAudio = new Audio('./sounds/game/right.wav');

let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {return Math.random() - 0.5});

function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Time: ${timer} s`;
        if (timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            loseAudio.play();
        }
    },1000);
}

function bloquearTarjetas() {
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/game/${numeros[i]}.png">`;
        tarjetaBloqueada.disabled = true;
    }
}

function destapar(id) {
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }
    tarjetasDestapadas++;
    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./img/game/${primerResultado}.png">`;
        clickAudio.play();
        tarjeta1.disabled = true;
    }
    else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./img/game/${segundoResultado}.png">`;
        clickAudio.play();
        tarjeta2.disabled = true;
        movimientos++;
        mostrarMovimientos.innerHTML = `Moves: ${movimientos}`;
        if (primerResultado == segundoResultado){
            tarjetasDestapadas = 0;
            rightAudio.play();
            aciertos++;
            mostrarAciertos.innerHTML = `Correct guesses: ${aciertos}`;
            if (aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Correct guesses: ${aciertos}`;
                mostrarMovimientos.innerHTML = `Moves: ${movimientos}`;
                mostrarTiempo.innerHTML = `Time: ${timerinicial - timer} s`;
                winAudio.play();
            }
        }
        else {
            setTimeout(()=>{
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                wrongAudio.play();
            }, 700);
        }
    }
}