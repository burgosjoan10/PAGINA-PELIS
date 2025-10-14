
import { portadas, moverCarrusel, setConfig, inicializarDOM} from './carousel.js';

const mediaQueryMobile = window.matchMedia('(max-width: 768px)');

function manejarCambioPantalla(e) {
    if (e.matches) {
        console.log('Debe mostar solo una imagen')
        setConfig({ desplazamiento: 20, estado: 'movil'}); 
    } else {
        console.log('mostarr el carrusel de escritorio')
        setConfig({ desplazamiento: 20, estado: 'escritorio'}); 
    }

    portadas();
}

document.addEventListener('DOMContentLoaded', () => {

    inicializarDOM('carrusel-principal', 'puntos-paginacion'); 
    manejarCambioPantalla(mediaQueryMobile); // primero define el modo
    portadas(); // luego genera las portadas
    setInterval(moverCarrusel, 3000);

});

mediaQueryMobile.addEventListener('change', manejarCambioPantalla);

