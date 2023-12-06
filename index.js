const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flujo');
const MAN = document.getElementById('mantenimiento');

let radio=document.getElementById('radio-button');
let input= document.getElementById('peso');

input.addEventListener("keyup",(event)=>{
    let peso = document.getElementById('peso').value;
    if(peso>30){
        radio.style.display='block'
        
    }else{
        radio.style.display='none'
    }
});

CALCULAR.addEventListener('click', () => {
    const DATO = parseInt(document.getElementById('peso').value);

    if (!isNaN(DATO) && DATO > 0) {
        ERROR.style.display = 'none';

        let flujo = 0;
        let mantenimiento = 0;

        if (DATO <= 30) {
            // Método Holliday-Segar
            flujo = Math.round(calcHollidaySegar(DATO)/24);
        } else {
            // Método de superficie corporal
            flujo = Math.round(calcSuperficieCorporal(DATO)/24);
        }

        mantenimiento = flujo * 1.5;

        FLU.innerHTML = flujo + ' cc/hr';
        MAN.innerHTML = 'm+m/2 ' + mantenimiento + ' cc/hr';
        FLU.style.display = 'block';
        MAN.style.display = 'block';
    } else {
        ERROR.style.display = 'block';
        FLU.style.display = 'none';
        MAN.style.display = 'none';
    }
});

function calcHollidaySegar(peso) {
    let flujo = 0;

    if (peso <= 10) {
        flujo = peso * 100;
    } else if (peso <= 20) {
        flujo = 10 * 100 + (peso - 10) * 50;
    } else {
        flujo = 10 * 100 + 10 * 50 + (peso - 20) * 20;
    }

    return flujo;
}

function calcSuperficieCorporal(peso) {
    let sc = ((peso * 4) + 7) / (parseInt(peso) + 90);
    let nElegido = 0;
    let flujo = 0;
    // Multiplicar por 1500 o 2000 según la preferencia del médico
    if(document.getElementById('checkbox1').checked){
        nElegido= document.getElementById('checkbox1').value;
      }else{
        nElegido= document.getElementById('checkbox2').value;
      }
    flujo = sc * nElegido;
    return flujo;
}