

Readme · MD
# Dev HUB SENATI
 
Portal web con recursos tecnológicos de programación, hecho en equipo con **HTML, CSS y JavaScript** y trabajado con **Git y GitHub**. Es una actividad colaborativa de SENATI.
 
Página publicada: https://wilianalcs.github.io/devhub-senati/
 
## Qué hace la página
 
| Punto de la actividad | Qué se implementó | Archivo |
|---|---|---|
| 1. Inicio | Nombre del portal, descripción y menú de navegación | `index.html` |
| 2. Catálogo de recursos | 12 recursos de programación (mínimo pedido: 6) | `js/data.js`, `js/app.js` |
| 3. Filtrado por categorías | Botones por tecnología (HTML, CSS, JavaScript, Python, Git) que filtran con JavaScript | `js/app.js` |
| 4. Buscador | Búsqueda por palabras clave, funciona junto con el filtro y no distingue mayúsculas ni tildes | `js/app.js` |
| 5. Diseño adaptable | Se ve bien en PC y celular con CSS Grid, Flexbox y `@media` | `css/style.css` |
| 6. Interactividad | Favoritos, mensajes flotantes, recurso aleatorio, modo oscuro y botón para limpiar filtros | `js/app.js` |
| 7. Información del equipo | Nombres de los integrantes y sus responsabilidades | `index.html` |
 
## Estructura del proyecto
 
```
devhub-senati/
├── index.html        # Estructura de la página
├── css/
│   └── style.css     # Estilos y diseño adaptable
├── js/
│   ├── data.js       # Lista de recursos (catálogo)
│   └── app.js        # Filtro, buscador e interactividad
└── README.md         # Este documento
```
 
`index.html` carga primero `data.js` y después `app.js`, porque `app.js` usa la lista `recursos` que se define en `data.js`.
 
## Equipo y responsabilidades
 
| Integrante | Responsabilidad |
|---|---|
| **WilianAlcs** | Lógica en JavaScript: catálogo, filtro por categorías, buscador e interactividad |
| **Santos** | Diseño en HTML y CSS: página de inicio, menú, diseño adaptable y sección del equipo |
 
## Cómo probar la página en tu computadora
 
1. Clona el repositorio:
```
   git clone https://github.com/WilianAlcs/devhub-senati.git
```
2. Entra a la carpeta `devhub-senati`.
3. Abre `index.html` con doble clic. No necesita instalar nada.
## Flujo de trabajo con Git y GitHub
 
Se aplicaron estas buenas prácticas de control de versiones:
 
- **Nadie sube directo a `main`.** Cada tarea se hace en su propia rama.
- **Una rama por tarea**, con nombre claro: `feature/nombre-de-la-tarea`.
- **Commits descriptivos** con prefijo: `feat:` (nueva función), `style:` (diseño), `fix:` (corrección) y `docs:` (documentación).
- **Pull Request (PR)** para juntar cada rama con `main`, con título y descripción de los cambios.
- **Revisión entre compañeros:** el otro integrante revisa el PR y lo aprueba antes del merge.
- Las ramas **no se borran** después del merge, para que quede la evidencia del trabajo.
### Ramas del proyecto
 
| Rama | Qué contiene | Responsable | Estado |
|---|---|---|---|
| `feature/estructura-base` | Archivos base del proyecto | WilianAlcs | Mergeada |
| `feature/catalogo` | Lista de recursos en `data.js` | WilianAlcs | Mergeada |
| `feature/mostrar-catalogo` | Tarjetas de recursos en la página | WilianAlcs | Mergeada |
| `feature/filtro-categorias` | Botones y filtro por categoría | WilianAlcs | Mergeada |
| `feature/buscador` | Buscador, favoritos, mensajes y modo oscuro | WilianAlcs | Mergeada |
| `docs/readme` | Documentación del proyecto | WilianAlcs | En curso |
| `feature/inicio-menu` | Página de inicio y menú de navegación | Compañero | Pendiente |
| `feature/responsive` | Estilos y diseño adaptable | Compañero | Pendiente |
| `feature/equipo` | Sección de información del equipo | Compañero | Pendiente |
 
## Guía paso a paso para el compañero
 
### 1. Preparación (se hace una sola vez)
 
1. Crea tu cuenta en https://github.com y acepta la invitación al repositorio (te llega por correo).
2. Instala Git desde https://git-scm.com/download/win y comprueba con `git --version`.
3. Configura tu nombre y correo (el mismo correo de tu cuenta de GitHub):
```
   git config --global user.name "TuUsuarioDeGitHub"
   git config --global user.email "tucorreo@gmail.com"
```
4. Clona el repositorio y entra a la carpeta:
```
   git clone https://github.com/WilianAlcs/devhub-senati.git
   cd devhub-senati
```
5. Abre la carpeta con Visual Studio Code (**File → Open Folder**).
### 2. Cada vez que hagas una tarea
 
1. Vuelve a `main` y descarga lo último:
```
   git checkout main
   git pull origin main
```
2. Crea tu rama:
```
   git checkout -b feature/inicio-menu
```
3. Haz tus cambios en los archivos y guarda con **Ctrl + S**.
4. Prepara y guarda los cambios con un commit descriptivo:
```
   git add .
   git commit -m "feat: agrega página de inicio y menú de navegación"
```
5. Sube tu rama a GitHub:
```
   git push -u origin feature/inicio-menu
```
6. En GitHub, abre el enlace que muestra la terminal (`.../pull/new/feature/inicio-menu`), escribe un título y una descripción, y haz clic en **Create pull request**.
7. El otro integrante revisa el PR (**Files changed → Review changes → Approve**) y hace **Merge pull request**.
### 3. Tareas del compañero
 
- **`feature/inicio-menu`:** mejorar el encabezado, la descripción y el menú de `index.html`.
- **`feature/responsive`:** ajustar `css/style.css` para que se vea bien en PC y celular.
- **`feature/equipo`:** poner su nombre real y su responsabilidad en la sección Equipo.
**Importante:** `js/app.js` usa estos IDs del HTML. No los cambies ni los borres, o la página dejará de funcionar:
 
`buscador`, `filtros`, `catalogo`, `contador`, `vacio`, `vacio-texto`, `btn-limpiar`, `btn-favoritos`, `btn-azar`, `btn-tema` y `toast`.
 
## Publicación en GitHub Pages
 
1. En el repositorio, ve a **Settings → Pages**.
2. En **Source**, elige **Deploy from a branch**.
3. Selecciona la rama **main** y la carpeta **/ (root)**, y haz clic en **Save**.
4. En unos minutos la página queda disponible en https://wilianalcs.github.io/devhub-senati/.
## Evidencia para la entrega
 
- **Ramas:** pestaña *Branches* del repositorio.
- **Commits:** pestaña *Commits* (se ven los commits de los dos integrantes).
- **Pull Requests y merges:** pestaña *Pull requests*, filtro *Closed*.
- **Historial gráfico:** *Insights → Network*, o el comando `git log --oneline --graph --all`.
 
Claude terminó la respuesta
