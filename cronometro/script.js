let contagem ;
let execução = false;
let total = 0;

function atualizarTempo() {
    const dias = Math.floor(total / (24 * 60 * 60));
    const horas = Math.floor((total % (24 * 60 * 60)) / (60 * 60));
    const minutos = Math.floor((total % (60 * 60)) / 60);
    const segundos = total % 60;
    
    atualizarCírculo("dias", dias, 30);
    atualizarCírculo("horas", horas, 24);
    atualizarCírculo("minutos", minutos, 60);
    atualizarCírculo("segundos", segundos, 60);
}

function atualizarCírculo(id, value, max) {
    const elemento = document.getElementById(id);
    const canvas = elemento.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const span = elemento.querySelector("span");
    
    canvas.width = 120;
    canvas.height = 120;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    const startAngle = -0.5 * Math.PI;
    const endAngle = ((value / max) * 2 * Math.PI) + startAngle;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, Math.PI * 1.5);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 8;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.strokeStyle = "#ff9a03";
    ctx.lineWidth = 8;
    ctx.stroke();
    
    span.textContent = value;
}

function ajustarTempo(amount) {
    const seconds = parseInt(document.getElementById("tempoa").value) || 0;
    total += amount * seconds;
    if (total < 0) total = 0;
    atualizarTempo();
}

function alternarTempo() {
    if (execução) {
        clearInterval(contagem );
    } else {
        contagem  = setInterval(() => {
            if (total > 0) {
                total--;
                atualizarTempo();
            } else {
                clearInterval(contagem );
                execução = false;
            }
        }, 1000);
    }
    execução = !execução;
}

function resetarTempo() {
    clearInterval(contagem );
    total = 0;
    execução = false;
    atualizarTempo();
}

let segundosCronômetro = 0;
let intervaloCronômetro;
let execuçãoCronômetro = false;

function alternarCronômetro() {
    if (execuçãoCronômetro) {
        clearInterval(intervaloCronômetro);
    } else {
        intervaloCronômetro = setInterval(() => {
            segundosCronômetro++;
            atualizarCírculo("tempo_minutos", Math.floor(segundosCronômetro / 60), 60);
            atualizarCírculo("tempo_segundos", segundosCronômetro % 60, 60);
        }, 1000);
    }
    execuçãoCronômetro = !execuçãoCronômetro;
}

function redefinircronometro() {
    clearInterval(intervaloCronômetro);
    segundosCronômetro = 0;
    execuçãoCronômetro = false;
    atualizarCírculo("tempo_minutos", 0, 60);
    atualizarCírculo("tempo_segundos", 0, 60);
}

atualizarTempo();