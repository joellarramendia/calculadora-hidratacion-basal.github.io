//como milla extra cambiar el mensaje cuando se ingrese un peso mayor a 30 kg (como se calcula por el metodo de superficiel corporal)



const CALCULAR = document.getElementById('calcular');
const ERROR = document.getElementById('error');
const FLU = document.getElementById('flujo');
const MAN = document.getElementById('mantenimiento');
const VD = document.getElementById('vd');
let radio=document.getElementById('radio-button');
let input= document.getElementById('peso');

input.addEventListener("keyup",(event)=>{
    let peso = document.getElementById('peso').value;
    let calculo1 = document.getElementById('calculo1');
    let calculo2 = document.getElementById('calculo2');
    if(peso>30){
        radio.style.display='block';
        calculo1.style.display='none';
        calculo2.style.display='block';
    }else if(peso<=30){
        radio.style.display='none';
        calculo1.style.display='block';
        calculo2.style.display='none';
       
    }else{
        radio.style.display='none';
        calculo1.style.display='none';
        calculo2.style.display='none';
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
            flujo = Math.round(calcHollidaySegar(DATO));
        } else {
            // Método de superficie corporal
            flujo = Math.round(calcSuperficieCorporal(DATO));
        }
        mantenimiento = (flujo/24) * 1.5;
        VD.innerHTML = 'Volumen diario: ' + flujo + ' cc';
        FLU.innerHTML = 'Mantenimiento: ' + flujo/24 + ' cc/hr';
        MAN.innerHTML = 'm+m/2: ' + mantenimiento + ' cc/hr';
        VD.style.display = 'block';
        FLU.style.display = 'block';
        MAN.style.display = 'block';
    } else {
        ERROR.style.display = 'block';
        VD.style.display = 'none';
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


