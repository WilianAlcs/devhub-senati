App · JS
// Dev HUB SENATI: lógica de la página (Puntos 2, 3, 4 y 6)
const $ = (id) => document.getElementById(id);
const estado = { categoria: "Todos", texto: "", soloFavoritos: false };

// Guardado en el navegador (favoritos y tema)
function leer(clave, porDefecto) {
    try {
        return JSON.parse(localStorage.getItem(clave)) ?? porDefecto;
    } catch {
        return porDefecto;
    }
}
function guardar(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
    } catch { }
}
let favoritos = leer("devhub-favoritos", []);

// Quita tildes y mayúsculas para comparar textos
function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Mensaje flotante (Punto 6)
function mostrarMensaje(texto) {
    const toast = $("toast");
    toast.textContent = texto;
    toast.classList.add("visible");
    clearTimeout(mostrarMensaje.temporizador);
    mostrarMensaje.temporizador = setTimeout(
        () => toast.classList.remove("visible"),
        2200
    );
}

// Favoritos
function alternarFavorito(recurso) {
    if (favoritos.includes(recurso.id)) {
        favoritos = favoritos.filter((id) => id !== recurso.id);
        mostrarMensaje(`Quitaste "${recurso.nombre}" de favoritos`);
    } else {
        favoritos.push(recurso.id);
        mostrarMensaje(`Guardaste "${recurso.nombre}" en favoritos`);
    }
    guardar("devhub-favoritos", favoritos);
    render();
}

// Crea la tarjeta de un recurso
function crearTarjeta(r) {
    const esFavorito = favoritos.includes(r.id);
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
    <div class="tarjeta-top">
      <span class="icono" aria-hidden="true">${r.icono}</span>
      <button type="button" class="btn-fav ${esFavorito ? "activo" : ""}"
        aria-pressed="${esFavorito}"
        aria-label="${esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}">
        ${esFavorito ? "♥" : "♡"}
      </button>
    </div>
    <span class="etiqueta">${r.categoria}</span>
    <h3>${r.nombre}</h3>
    <p>${r.descripcion}</p>
    <div class="tarjeta-pie">
      <small>${r.nivel}</small>
      <a href="${r.url}" target="_blank" rel="noopener">Abrir recurso</a>
    </div>
  `;
    tarjeta
        .querySelector(".btn-fav")
        .addEventListener("click", () => alternarFavorito(r));
    return tarjeta;
}

// Aplica categoría + búsqueda + favoritos y dibuja el resultado (Puntos 3 y 4)
function render() {
    const busqueda = normalizar(estado.texto.trim());

    const lista = recursos.filter((r) => {
        const okCategoria =
            estado.categoria === "Todos" || r.categoria === estado.categoria;
        const okTexto = normalizar(
            `${r.nombre} ${r.descripcion} ${r.categoria}`
        ).includes(busqueda);
        const okFavorito = !estado.soloFavoritos || favoritos.includes(r.id);
        return okCategoria && okTexto && okFavorito;
    });

    const catalogo = $("catalogo");
    catalogo.innerHTML = "";
    lista.forEach((r) => catalogo.appendChild(crearTarjeta(r)));

    $("contador").textContent = `Mostrando ${lista.length} de ${recursos.length} recursos`;

    // Mensaje cuando no hay resultados
    $("vacio").hidden = lista.length > 0;
    $("vacio-texto").textContent =
        estado.soloFavoritos && favoritos.length === 0
            ? "Aún no tienes favoritos. Toca el corazón de un recurso para guardarlo."
            : "No encontramos recursos con esa búsqueda. Prueba con otra palabra o limpia los filtros.";

    // Botones activos
    document.querySelectorAll(".btn-filtro").forEach((b) => {
        const activo = b.textContent === estado.categoria;
        b.classList.toggle("activo", activo);
        b.setAttribute("aria-pressed", activo);
    });
    $("btn-favoritos").classList.toggle("activo", estado.soloFavoritos);
    $("btn-favoritos").setAttribute("aria-pressed", estado.soloFavoritos);
    $("btn-favoritos").textContent = `Solo favoritos (${favoritos.length})`;
}

// Un botón por cada categoría, generado desde los datos (Punto 3)
function crearBotonesFiltro() {
    const categorias = ["Todos", ...new Set(recursos.map((r) => r.categoria))];
    categorias.forEach((categoria) => {
        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn-filtro";
        boton.textContent = categoria;
        boton.addEventListener("click", () => {
            estado.categoria = categoria;
            render();
        });
        $("filtros").appendChild(boton);
    });
}

// Modo claro y oscuro
function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema;
    $("btn-tema").textContent = tema === "dark" ? "Modo claro" : "Modo oscuro";
    guardar("devhub-tema", tema);
}

// Eventos de la interfaz (Punto 6)
function iniciarEventos() {
    $("buscador").addEventListener("input", (e) => {
        estado.texto = e.target.value;
        render();
    });

    $("btn-favoritos").addEventListener("click", () => {
        estado.soloFavoritos = !estado.soloFavoritos;
        mostrarMensaje(
            estado.soloFavoritos ? "Mostrando solo tus favoritos" : "Mostrando todos los recursos"
        );
        render();
    });

    $("btn-limpiar").addEventListener("click", () => {
        estado.categoria = "Todos";
        estado.texto = "";
        estado.soloFavoritos = false;
        $("buscador").value = "";
        mostrarMensaje("Filtros limpiados");
        render();
    });

    $("btn-azar").addEventListener("click", () => {
        const r = recursos[Math.floor(Math.random() * recursos.length)];
        mostrarMensaje(`Te sugerimos: ${r.nombre}`);
        window.open(r.url, "_blank", "noopener");
    });

    $("btn-tema").addEventListener("click", () => {
        const nuevo = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        aplicarTema(nuevo);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const oscuroDelSistema = window.matchMedia("(prefers-color-scheme: dark)").matches;
    aplicarTema(leer("devhub-tema", oscuroDelSistema ? "dark" : "light"));
    crearBotonesFiltro();
    iniciarEventos();
    render();
});
