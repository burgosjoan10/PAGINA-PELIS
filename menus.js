
document.addEventListener('DOMContentLoaded', () => {
    const btonMenu = document.getElementById('bton-menu');
    const menuPrincipal = document.getElementById('menu-principal');
    const btonBuscador = document.getElementById('bton-buscador-mobile');
    const buscadorDesplegado = document.getElementById('buscador-desplegado');

    // Abrir/cerrar menú hamburguesa
    btonMenu.addEventListener('click', () => {
        menuPrincipal.classList.toggle('activo');
    });

    // Abrir/cerrar buscador móvil
    btonBuscador.addEventListener('click', () => {
        buscadorDesplegado.classList.toggle('activo');
    });
});
