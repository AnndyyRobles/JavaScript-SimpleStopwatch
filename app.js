const cronometro = document.getElementById('cronometro');
const botonInicioPausa = document.getElementById('boton-inicio-pausa');
const botonReiniciar = document.getElementById('boton-reiniciar');

let[hora,minutos,segundos] = [0,0,0];
let intervaloTiempo;
let estadoCronometro = 'pausado';
function actualizarCronometro(){
    segundos++;
    if(segundos / 60 == 1){
        segundos = 0;
        minutos++;

        if(minutos / 60 == 1){
            minutos = 0;
            hora++;
        }
    }
    const segundosFormato = asignFormato(segundos);
    const minutosFormato = asignFormato(minutos);
    const horaFormato = asignFormato(hora);

    cronometro.innerText = `${horaFormato}:${minutosFormato}:${segundosFormato}`;
}

function asignFormato(unidadDeTiempo){
    return unidadDeTiempo < 10 ? '0' + unidadDeTiempo : unidadDeTiempo;
}

botonInicioPausa.addEventListener('click', function(){
    if(estadoCronometro == 'pausado'){
        intervaloTiempo = window.setInterval(actualizarCronometro, 1000);
        alterarBtnInicioPausa('pause', 'iniciar', 'pausar', 'reproduciendo')
    } else{
        window.clearInterval(intervaloTiempo);
        alterarBtnInicioPausa('play', 'pausar', 'iniciar', 'pausado')
    }
});

botonReiniciar.addEventListener('click', function(){
    window.clearInterval(intervaloTiempo);
    segundos = 0;
    minutos = 0;
    hora = 0;
    cronometro.innerText = '00:00:00';
    botonInicioPausa.innerHTML = '<i class="bi bi-play-fill"></i>';
    botonInicioPausa.classList.remove('pausar');
    botonInicioPausa.classList.add('iniciar');
    estadoCronometro = 'pausado';
})
function alterarBtnInicioPausa(iconoBoton, remover, agregar, estado){
    botonInicioPausa.innerHTML = `<i class="bi bi-${iconoBoton}-fill"></i>`;
    botonInicioPausa.classList.remove(remover);
    botonInicioPausa.classList.add(agregar);
    estadoCronometro = estado;
}