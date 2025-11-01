
const API_KEY = '65addc8e08fdb9d7a0c44ff7365a8467'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w342'; 

const modalBackdrop = document.getElementById('modal-backdrop');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalInfoContainer = document.getElementById('modal-info-container');

function renderizarContenidoModal(detalles, trailerKey) {
    // Mapea los géneros para que se vean como una lista separada por comas
    const sinopsis = detalles.overview || "No hay sinopsis disponible para esta película.";
    
    // Si el rating no existe, usa 'N/A'. El '?.toFixed(1)' evita errores si vote_average es null.
    const rating = detalles.vote_average?.toFixed(1) || 'N/A';
    
    // Manejo de géneros: Si el arreglo 'genres' no existe o está vacío, usa 'Desconocido'.
    const generosTexto = (detalles.genres && detalles.genres.length > 0) 
        ? detalles.genres.map(g => g.name).join(', ') 
        : 'Desconocido';

    let elementoPrincipalHTML = '';

    if (trailerKey) {
        // Si hay clave, crea el iframe para el video de YouTube
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`;
        elementoPrincipalHTML = `
            <iframe 
                width="50%" 
                height="415" 
                src="${youtubeEmbedUrl}" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
        `;
    } else {
        // Si no hay clave, muestra el póster
        const urlPoster = `${IMAGE_BASE_URL}w500${detalles.poster_path}`;
        elementoPrincipalHTML = `<img src="${urlPoster}" alt="${detalles.title}" class="modal-poster">`;
    }

    
    // Aquí es donde harás la inyección: modalInfoContainer.innerHTML = '...';
    const contenidoHTML = `
        <div class="modal-detalle-grid">
            <div class="modal-video-container">
                ${elementoPrincipalHTML}
            </div>
            
            <div class="modal-info">
                <h2>${detalles.title}</h2>
                
                <p class="modal-rating">⭐ ${rating} / 10</p>
                
                <p class="modal-generos">Géneros: ${generosTexto}</p>

                <hr style="border-color: #333;">

                <h3>Sinopsis</h3>
                
                <p class="sinopsis">${sinopsis}</p> 
            </div>
        </div>
    `;

    modalInfoContainer.innerHTML = contenidoHTML;
}

function construirCarrusel(peliculas, idContenedor) {
    
    const contenedorPelis10 = document.getElementById('peliculas-top-contenedor');

    contenedorPelis10.innerHTML = '';

    for(let i = 0; i < peliculas.length; i++) {

        const pelicula = peliculas[i];

        const urlPortada = `${IMAGE_BASE_URL}${POSTER_SIZE}${pelicula.poster_path}`;

        const tarjetaHTML = `
            <div class="pelicula-tarjeta" data-movie-id="${pelicula.id}">
                <img src = "${urlPortada}" alt="${pelicula.title} Poster" class="pelicula-portada">
            </div>
        `;

        contenedorPelis10.innerHTML += tarjetaHTML;
    }

    const peliculasTarjetas = document.querySelectorAll('.pelicula-tarjeta'); 

    function adjuntarListenersAClick() {
            
        peliculasTarjetas.forEach(tarjeta => {
            tarjeta.addEventListener('click', () => {
                    
            const movieId = tarjeta.dataset.movieId;
                abrirModal(movieId); 
                console.log('¡Clic detectado en tarjeta!' + movieId);
            });
        });
    }

    async function abrirModal(movieId) {
        // 🛑 Aquí irá la lógica de try...catch y fetch
        modalBackdrop.classList.add('activo');
        // 1. Mostrar el modal (usando .classList.add('activo') o display: 'block')
        // Muestra un spinner de carga dentro del modal (simulado con console.log)
        console.log("3. Mostrando modal y buscando detalles...");
    
        try {
            // 2. Llama a tu función que trae los datos de la API
            const detalles = await obtenerDetallesPeliculas(movieId); 

            const trailerKey = await obtenerTrailers(movieId);
        
            // 3. Renderiza los datos (sustituye el contenido de carga por los detalles)
            renderizarContenidoModal(detalles, trailerKey); // Esta es una función que crearás después

        } catch (error) {
            // 4. Si falla, muestra un mensaje de error dentro del modal
            //mostrarErrorEnModal("No pudimos cargar los detalles de la película. Intenta de nuevo."); 
        }
    }

    function cerrarModal() {
        modalBackdrop.classList.remove('activo');
    }

    modalCloseBtn.addEventListener('click', ()=> {
        cerrarModal();
    })
    
    adjuntarListenersAClick();
}

async function obtenerTopRated() {

    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES`;

    try {
        
        const respuesta = await fetch(url);

        if(!respuesta.ok) {
            throw new Error(`Error al obtener Top 10: ${respuesta.status} - ${respuesta.statusText}`);
        }

        const datos = await respuesta.json();

        const peliculasTop10 = datos.results.slice(0, 10);

        console.log("Datos del top 10 recibidos", peliculasTop10);

        construirCarrusel(peliculasTop10, 'carrusel-top-10');

    } catch (error) {
        console.error("Hubo un problema al cargar los datos", error);
    }
}

async function obtenerDetallesPeliculas(movieId) {

    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

    try {
        const respuesta = await fetch(url);

        if(!respuesta.ok) {
            throw new Error(`Error al obtener los detalles: ${respuesta.status} - ${respuesta.statusText}`);
        }

        const detalles = await respuesta.json();

        return detalles;

    } catch (error) {
        console.error('Hubo un error', error);
    }
}

async function obtenerTrailers(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;

    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(`Error al obtener videos: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        const trailer = datos.results.find(video => video.type === "Trailer" && video.site === "YouTube" && video.official === true);

        return trailer ? trailer.key : null;
    } catch (error) {
        
        console.error('Hubo un error al buscar videos:', error);
        return null; // Devuelve null si falla o no encuentra tráiler
    }
}

document.addEventListener('DOMContentLoaded', obtenerTopRated);
