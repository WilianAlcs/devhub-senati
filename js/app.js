// Crea la tarjeta HTML de un recurso
function crearTarjeta(recurso) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
    <span class="etiqueta">${recurso.categoria}</span>
    <h3>${recurso.nombre}</h3>
    <p>${recurso.descripcion}</p>
    <a href="${recurso.url}" target="_blank" rel="noopener">Ver recurso</a>
  `;
    return tarjeta;
}

// Muestra una lista de recursos dentro del contenedor del catálogo
function mostrarRecursos(lista) {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";
    lista.forEach((recurso) => {
        contenedor.appendChild(crearTarjeta(recurso));
    });
}

// Al cargar la página, muestra todos los recursos
document.addEventListener("DOMContentLoaded", () => {
    // Si el HTML todavía no tiene el contenedor, lo creamos
    if (!document.getElementById("catalogo")) {
        const seccion = document.createElement("section");
        seccion.id = "catalogo";
        document.body.appendChild(seccion);
    }
    mostrarRecursos(recursos);
});