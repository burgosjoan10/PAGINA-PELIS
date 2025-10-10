
const API_KEY = '65addc8e08fdb9d7a0c44ff7365a8467'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE = 'w342'; 



function construirCarrusel(peliculas, idContenedor) {
    
    const contenedorPelis10 = document.getElementById('peliculas-top-contenedor');

    contenedorPelis10.innerHTML = '';

    for(let i = 0; i < peliculas.length; i++) {

        const pelicula = peliculas[i];

        const urlPortada = `${IMAGE_BASE_URL}${POSTER_SIZE}${pelicula.poster_path}`;

        const tarjetaHTML = `
            <div class="pelicula-tarjeta">
                <img src = "${urlPortada}" alt="${pelicula.title} Poster" class="pelicula-portada">
                <p class="pelicula-titulo">"${pelicula.title}"</p>
            </div>
        `;

        contenedorPelis10.innerHTML += tarjetaHTML;
    }      
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

document.addEventListener('DOMContentLoaded', obtenerTopRated);
