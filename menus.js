
document.addEventListener('DOMContentLoaded', () => {
    const btonMenu = document.getElementById('bton-menu');
    const menuPrincipal = document.getElementById('menu-principal');
    const btonBuscador = document.getElementById('bton-buscador-mobile');
    const buscadorDesplegado = document.getElementById('buscador-desplegado');
    const btnMenuH = document.getElementById('cierre-mh');


    // Abrir/cerrar menú hamburguesa
    btonMenu.addEventListener('click', () => {
        menuPrincipal.classList.add('activo');
        btonMenu.classList.add('elemento-oculto');
        btnMenuH.classList.add('activo');
    });

    btnMenuH.addEventListener('click', ()=> {
        menuPrincipal.classList.remove('activo');
        btonMenu.classList.remove('elemento-oculto');
        btnMenuH.classList.remove('activo');
    })

    // Abrir/cerrar buscador móvil
    btonBuscador.addEventListener('click', () => {
        buscadorDesplegado.classList.toggle('activo');
    });
});
