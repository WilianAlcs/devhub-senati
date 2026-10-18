// Categoría seleccionada actualmente
let categoriaActual = "Todos";

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

// Filtra los recursos según la categoría elegida
function filtrarPorCategoria(categoria) {
    categoriaActual = categoria;

    const filtrados =
        categoria === "Todos"
            ? recursos
            : recursos.filter((recurso) => recurso.categoria === categoria);

    mostrarRecursos(filtrados);

    // Marca como activo solo el botón elegido
    document.querySelectorAll(".btn-filtro").forEach((boton) => {
        boton.classList.toggle("activo", boton.textContent === categoria);
    });
}

// Crea un botón por cada categoría (más el botón "Todos")
function crearBotonesFiltro() {
    let contenedor = document.getElementById("filtros");

    // Si el HTML todavía no tiene el contenedor, lo creamos antes del catálogo
    if (!contenedor) {
        contenedor = document.createElement("div");
        contenedor.id = "filtros";
        document.body.insertBefore(contenedor, document.getElementById("catalogo"));
    }

    const categorias = ["Todos", ...new Set(recursos.map((r) => r.categoria))];

    categorias.forEach((categoria) => {
        const boton = document.createElement("button");
        boton.textContent = categoria;
        boton.className = "btn-filtro";
        if (categoria === categoriaActual) {
            boton.classList.add("activo");
        }
        boton.addEventListener("click", () => filtrarPorCategoria(categoria));
        contenedor.appendChild(boton);
    });
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Si el HTML todavía no tiene el contenedor, lo creamos
    if (!document.getElementById("catalogo")) {
        const seccion = document.createElement("section");
        seccion.id = "catalogo";
        document.body.appendChild(seccion);
    }
    crearBotonesFiltro();
    mostrarRecursos(recursos);
});