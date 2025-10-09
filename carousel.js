let indiceActual = 0;

let contenedorPortada = document.getElementById("carrusel-principal");

let pelisCarrusel = [ 
    {
        imagenPortada: 'portada1.jpg',
        imagenPortadaMovil: 'portada1CEL.jpeg',
        titulo: 'ELITE',
        descripcion: 'Serie española de drama y misterio en Netflix',
        publico: '16+',
        lanzamiento: '2018',
        genero: 'Drama, Misterio',
        imagenPlataforma: 'url_a_la_imagen_del_logo_de_netflix',
        urlPlataforma: 'url_para_redirigir_a_netflix',
        precioSuscripcion: 'US$ 19.99' 
    },
    {
        imagenPortada: 'portada2',
        imagenPortadaMovil: 'portada1CEL.jpeg',
        titulo: 'titulo2',
        descripcion: 'descrp1',
        publico: '18+',
        lanzamiento: '2025',
        genero: 'Drama',
        imagenPlataforma: 'url_a_la_imagen_del_logo_de_netflix',
        urlPlataforma: 'url_para_redirigir_a_disney',
        precioSuscripcion: 'US$ 19.99' 
    },
    {
        imagenPortada: 'portada3.jpg',
        imagenPortadaMovil: 'portada1CEL.jpeg',
        titulo: 'titulo3',
        descripcion: 'descrp1',
        publico: '18+',
        lanzamiento: '2025',
        genero: 'Drama',
        imagenPlataforma: 'url_a_la_imagen_del_logo_de_netflix',
        urlPlataforma: 'url_para_redirigir_a_HBO',
        precioSuscripcion: 'US$ 19.99'  
    },
    {
        imagenPortada: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/9db5/live/48fd9010-c1c1-11ee-9519-97453607d43e.jpg.webp',
        imagenPortadaMovil: 'portada1CEL.jpeg',
        titulo: 'titulo4',
        descripcion: 'descrp1',
        publico: '18+',
        lanzamiento: '2025',
        genero: 'Drama',
        imagenPlataforma: 'url_a_la_imagen_del_logo_de_netflix',
        urlPlataforma: 'url_para_redirigir_a_AmazonPrime',
        precioSuscripcion: 'US$ 19.99' 
    },
    {
        imagenPortada: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/9db5/live/48fd9010-c1c1-11ee-9519-97453607d43e.jpg.webp',
        imagenPortadaMovil: 'portada1CEL.jpeg',
        titulo: 'titulo5',
        descripcion: 'descrp1',
        publico: '18+',
        lanzamiento: '2025',
        genero: 'Drama',
        imagenPlataforma: 'url_a_la_imagen_del_logo_de_netflix',
        urlPlataforma: 'url_para_redirigir_a_Paramount',
        precioSuscripcion: 'US$ 19.99'  
    }
]

function actualizarPuntos(nuevoIndice) {
    const puntos = document.querySelectorAll('.punto-paginacion');

    puntos.forEach(punto => punto.classList.remove('activo'));

    if (puntos[nuevoIndice]) {
        puntos[nuevoIndice].classList.add('activo');
    }
}

let contenedorPuntos = document.getElementById('puntos-paginacion');

export function portadas () {
    
    if (contenedorPortada) {
        contenedorPortada.innerHTML = '';
    }

    if (contenedorPuntos) {
        contenedorPuntos.innerHTML = '';
    }

    console.log("Portadas se está ejecutando. Estado:", ESTADO_PANTALLA);

    for (let i = 0; i < pelisCarrusel.length; i++) {
        const pelisCarruselObtenido = pelisCarrusel[i];
        
        let urlImagen = pelisCarruselObtenido.imagenPortada;
    
        if (ESTADO_PANTALLA === 'movil' && pelisCarruselObtenido.imagenPortadaMovil) {
            urlImagen = pelisCarruselObtenido.imagenPortadaMovil;
        }

        const tarjetasPortada = document.createElement('div');
        tarjetasPortada.classList.add("plataforma-portada");
        contenedorPortada.appendChild(tarjetasPortada);
        
        // 2. CREACIÓN E INSERCIÓN DE LA IMAGEN
        const imagenPortada = document.createElement('img');
        imagenPortada.src = urlImagen;
        imagenPortada.classList.add('portada');
        tarjetasPortada.appendChild(imagenPortada);
        
        // -------------------------------------------------------------
        // 3. CREACIÓN DEL CONTENEDOR ABSOLUTO PARA LA INFORMACIÓN
        const contenedorInfoSuperpuesta = document.createElement('div');
        contenedorInfoSuperpuesta.classList.add("info-tarjeta-superpuesta"); 
        tarjetasPortada.appendChild(contenedorInfoSuperpuesta);

        
        const titulo = document.createElement('h2');
        titulo.classList.add("titulo");
        titulo.innerHTML = pelisCarruselObtenido.titulo;
        contenedorInfoSuperpuesta.appendChild(titulo); 

        const descrp = document.createElement('p');
        descrp.classList.add("descrp");
        descrp.innerHTML = pelisCarruselObtenido.descripcion;
        contenedorInfoSuperpuesta.appendChild(descrp); 

        const infoPortada = document.createElement('div');
        infoPortada.classList.add("contenedor-info");
        contenedorInfoSuperpuesta.appendChild(infoPortada); 

        const publico = document.createElement('p');
        publico.classList.add("publico");
        publico.innerHTML = pelisCarruselObtenido.publico;
        infoPortada.appendChild(publico);

        const lanzamiento = document.createElement('p');
        lanzamiento.classList.add("lanzamiento");
        lanzamiento.innerHTML = pelisCarruselObtenido.lanzamiento;
        infoPortada.appendChild(lanzamiento);

        const genero = document.createElement('p');
        genero.classList.add("genero");
        genero.innerHTML = pelisCarruselObtenido.genero;
        infoPortada.appendChild(genero);

        const botonVerAhora = document.createElement('a');
        botonVerAhora.classList.add("boton-ver-ahora");
        botonVerAhora.href = pelisCarruselObtenido.urlPlataforma;
        botonVerAhora.innerHTML = 'Ver Ahora';
        contenedorInfoSuperpuesta.appendChild(botonVerAhora); 

        const precio = document.createElement('p');
        precio.classList.add("precio");
        precio.innerHTML = pelisCarruselObtenido.precioSuscripcion;

        if(contenedorPuntos) {
            const nuevosPuntos = document.createElement('div');
            nuevosPuntos.classList.add('punto-paginacion');
            contenedorPuntos.appendChild(nuevosPuntos);
        }
    }
    
    actualizarPuntos(indiceActual); 
}

export function setMoviesData(newPelisCarrusel) {
    pelisCarrusel = newPelisCarrusel;
    portadas(); 
}

export let DESPLAZAMIENTO_UNITARIO = 20; 

export let ESTADO_PANTALLA = 'escritorio';

export function setConfig(config) {
    if (config.desplazamiento) {
        DESPLAZAMIENTO_UNITARIO = config.desplazamiento;
    }

    if (config.estado) {
        ESTADO_PANTALLA = config.estado;
    }
}

export function moverCarrusel () {
    indiceActual++;

    if (indiceActual >= pelisCarrusel.length) {
        indiceActual = 0;
    }

    const desplazamiento = indiceActual * - DESPLAZAMIENTO_UNITARIO;

    contenedorPortada.style.transform = `translateX(${desplazamiento}%)`;
    
    actualizarPuntos(indiceActual);
}

export function inicializarDOM(idContenedor, idPuntos) {
    contenedorPortada = document.getElementById(idContenedor);
    contenedorPuntos = document.getElementById(idPuntos);
}

let carruselInterval;