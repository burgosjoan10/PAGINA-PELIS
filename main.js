
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


window.addEventListener('load', () => {

    inicializarDOM('carrusel-principal', 'puntos-paginacion'); 
    
    portadas(); 

    setInterval(moverCarrusel, 3000); 

    manejarCambioPantalla(mediaQueryMobile);
});

mediaQueryMobile.addEventListener('change', manejarCambioPantalla);