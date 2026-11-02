// =====================================================
// script.js - JavaScript del sitio Xbox vs PlayStation
// Este mismo archivo se carga en todas las páginas. Por eso, antes de usar
// un elemento que solo existe en una página, reviso con un "if" que exista;
// si no existe, esa parte del código se salta.
// =====================================================

// Correo al que llegan los mensajes del formulario de contacto
const MI_CORREO = "patrickschrilsperez@gmail.com";


// ---------- 1. MODO OSCURO ----------
// Bootstrap 5.3 cambia todos sus colores cuando la etiqueta <html> tiene
// data-bs-theme="dark". Mi código solo cambia ese atributo y guarda la elección.
const html = document.documentElement;                    // la etiqueta <html>
const btnTema = document.getElementById("btn-tema");      // botón de la luna/sol
const iconoTema = document.getElementById("icono-tema");  // icono dentro del botón

// Leo el tema guardado en el navegador (localStorage). En la primera visita
// no hay nada guardado: getItem devuelve null y el || usa "light" (claro).
let tema = localStorage.getItem("tema") || "light";
aplicarTema(tema);   // lo aplico apenas carga la página

// Pone el tema en <html> y cambia el icono: sol si está oscuro, luna si está claro
function aplicarTema(t) {
  html.setAttribute("data-bs-theme", t);
  iconoTema.className = (t === "dark") ? "bi bi-sun-fill" : "bi bi-moon-fill";
}

// Cada clic en el botón alterna entre claro y oscuro y guarda la elección.
// Así el tema se mantiene al recargar o al pasar a otra página del sitio.
btnTema.addEventListener("click", function () {
  tema = (tema === "dark") ? "light" : "dark";
  localStorage.setItem("tema", tema);
  aplicarTema(tema);
});


// ---------- 2. AÑO DEL PIE DE PÁGINA ----------
// Escribe el año actual en el <span id="anio"> para no cambiarlo a mano cada año
document.getElementById("anio").textContent = new Date().getFullYear();


// ---------- 3. SALUDO SEGÚN LA HORA (solo en index.html) ----------
const saludo = document.getElementById("saludo");
if (saludo) {
  const hora = new Date().getHours();   // número de 0 a 23
  if (hora < 12) {
    saludo.textContent = "¡Buenos días!";
  } else if (hora < 18) {
    saludo.textContent = "¡Buenas tardes!";
  } else {
    saludo.textContent = "¡Buenas noches!";
  }
}


// ---------- 4. BOTÓN "SALUDAR" CON ALERTA (solo en index.html) ----------
const btnSaludar = document.getElementById("btn-saludar");
if (btnSaludar) {
  btnSaludar.addEventListener("click", function () {
    alert("¡Gracias por visitar mi página sobre Xbox y PlayStation!");
  });
}


// ---------- 5. ARTÍCULOS (solo en noticias.html) ----------
// Cada artículo es un objeto { categoria, titulo, resumen, texto } dentro de una lista (array).
// Si agrego un objeto más a la lista, aparece una tarjeta nueva sin tocar el HTML.
const noticias = [
  {
    categoria: "Suscripciones",
    titulo: "Game Pass y PlayStation Plus: jugar por suscripción",
    resumen: "Dos servicios que dan acceso a juegos a cambio de una cuota.",
    texto: "Xbox Game Pass (Microsoft) y PlayStation Plus (Sony) funcionan por suscripción: pagas una cuota y obtienes acceso a un catálogo de juegos y a otras ventajas, como el juego en línea. Ambos tienen varios niveles, y sus precios y catálogos cambian con el tiempo, así que antes de decidir conviene revisar las páginas oficiales."
  },
  {
    categoria: "Hardware",
    titulo: "El control: DualSense vs control de Xbox",
    resumen: "Dos formas distintas de sostener el juego.",
    texto: "El DualSense de PlayStation 5 es conocido por su vibración háptica y sus gatillos adaptativos, que cambian la resistencia según el juego. El control inalámbrico de Xbox tiene un diseño que a muchos jugadores les resulta muy cómodo y también se puede usar en PC. La mejor opción depende de cuál te resulte más cómodo en las manos."
  },
  {
    categoria: "Opinión",
    titulo: "¿Importa más la consola o los juegos?",
    resumen: "La respuesta depende de lo que quieres jugar.",
    texto: "Las consolas de una misma generación tienen un poder parecido, por eso muchas personas deciden según los juegos que quieren jugar, la plataforma que usan sus amigos y su presupuesto. Una buena pregunta antes de comprar es: ¿qué juegos quiero jugar y en cuál puedo jugarlos?"
  }
];

const contenedor = document.getElementById("lista-noticias");
if (contenedor) {

  // forEach recorre la lista: "n" es el artículo actual e "i" su posición (0, 1, 2...)
  noticias.forEach(function (n, i) {
    // Las comillas invertidas (`) permiten escribir HTML en varias líneas
    // y meter valores con ${...}. Con += voy agregando una tarjeta tras otra.
    // data-indice guarda la posición del artículo para saber cuál abrir después.
    contenedor.innerHTML += `
      <div class="col-md-4">
        <div class="card tarjeta h-100">
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-secondary align-self-start mb-2">${n.categoria}</span>
            <h2 class="h5 card-title">${n.titulo}</h2>
            <p class="card-text">${n.resumen}</p>
            <button type="button" class="btn btn-ps mt-auto btn-leer" data-indice="${i}">Leer artículo</button>
          </div>
        </div>
      </div>`;
  });

  // Esto va DESPUÉS del forEach porque los botones solo existen cuando ya se crearon las tarjetas.
  // querySelectorAll devuelve todos los botones "Leer artículo" y a cada uno le pongo su clic.
  document.querySelectorAll(".btn-leer").forEach(function (boton) {
    boton.addEventListener("click", function () {
      // dataset.indice lee el data-indice del botón y con eso busco el artículo en la lista
      const n = noticias[boton.dataset.indice];

      // Escribo el título y el texto dentro del modal (textContent no interpreta HTML)
      document.getElementById("modal-titulo").textContent = n.titulo;
      document.getElementById("modal-texto").textContent = n.texto;

      // Creo el modal de Bootstrap con JavaScript y lo muestro
      new bootstrap.Modal(document.getElementById("modalNoticia")).show();
    });
  });
}


// ---------- 5B. VOTACIÓN XBOX vs PLAYSTATION (solo en index.html) ----------
// Los votos se guardan en el navegador de cada visitante (localStorage),
// así que cada persona solo ve su propio conteo.
const btnVotoXbox = document.getElementById("voto-xbox");
const btnVotoPs = document.getElementById("voto-ps");

if (btnVotoXbox) {
  // localStorage solo guarda texto. JSON.parse convierte el texto guardado en un objeto
  // { xbox: 0, ps: 0 }. Si todavía no hay votos guardados, empiezo ese objeto en 0.
  let votos = JSON.parse(localStorage.getItem("votos")) || { xbox: 0, ps: 0 };

  // Escribe los números actuales en los <strong> de la página
  function mostrarVotos() {
    document.getElementById("votos-xbox").textContent = votos.xbox;
    document.getElementById("votos-ps").textContent = votos.ps;
  }

  // Suma un voto a la consola elegida. "consola" es la clave del objeto ("xbox" o "ps");
  // votos[consola] permite usar la misma función para las dos consolas.
  function votar(consola, nombre) {
    votos[consola] = votos[consola] + 1;
    // JSON.stringify hace lo contrario: convierte el objeto en texto para poder guardarlo
    localStorage.setItem("votos", JSON.stringify(votos));
    mostrarVotos();
    alert("¡Gracias! Votaste por " + nombre);
  }

  mostrarVotos();   // al cargar la página muestro los votos que ya estaban guardados
  btnVotoXbox.addEventListener("click", function () { votar("xbox", "Xbox"); });
  btnVotoPs.addEventListener("click", function () { votar("ps", "PlayStation"); });
}


// ---------- 6. FORMULARIO DE CONTACTO (solo en contacto.html) ----------
const form = document.getElementById("form-contacto");
if (form) {
  // Guardo el enlace mailto fuera del "submit" para que el botón del modal
  // (que se programa más abajo) también pueda usarlo.
  let enlaceCorreo = "";

  form.addEventListener("submit", function (e) {
    // Por defecto un formulario recarga la página al enviarse; esto lo evita
    e.preventDefault();

    // .value es lo que escribió la persona y .trim() le quita los espacios de los extremos
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Validación 1: si algún campo está vacío muestro una alerta y salgo con return
    if (nombre === "" || correo === "" || mensaje === "") {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Validación 2: un correo válido debe tener @ (revisión sencilla)
    if (!correo.includes("@")) {
      alert("El correo que escribiste no es válido.");
      return;
    }

    // Armo el enlace mailto: destinatario + ?subject=asunto + &body=mensaje.
    // encodeURIComponent convierte espacios y símbolos a un formato válido para una dirección
    // y \n es un salto de línea dentro del cuerpo del correo.
    enlaceCorreo = "mailto:" + MI_CORREO +
      "?subject=" + encodeURIComponent("Mensaje de " + nombre) +
      "&body=" + encodeURIComponent(mensaje + "\n\nMi correo: " + correo);

    // Escribo el nombre en el modal de confirmación y lo muestro
    document.getElementById("modal-nombre").textContent = nombre;
    new bootstrap.Modal(document.getElementById("modalContacto")).show();
  });

  // Botón "Abrir correo" del modal: al cambiar window.location.href a un mailto:,
  // el navegador abre la aplicación de correo con el mensaje listo
  document.getElementById("btn-abrir-correo").addEventListener("click", function () {
    window.location.href = enlaceCorreo;
  });
}
