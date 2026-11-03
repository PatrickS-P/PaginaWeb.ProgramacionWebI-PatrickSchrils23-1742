// =====================================================
// script.js - JavaScript del sitio Xbox vs PlayStation
// Este mismo archivo se carga en todas las páginas. Por eso, antes de usar
// un elemento que solo existe en una página, reviso con un "if" que exista;
// si no existe, esa parte del código se salta.
// =====================================================

// Correo al que llegan los mensajes del formulario de contacto
const MI_CORREO = "correo@ejemplo.com";


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


// ---------- 5. NOTICIAS (solo en noticias.html) ----------
// Las noticias salen de Xbox Wire (news.xbox.com) y del blog oficial de PlayStation (blog.playstation.com).
// Cada una es un objeto { categoria, titulo, resumen, texto, fuente, fecha, enlace } dentro de una lista (array).
// El resumen y el texto los escribí con mis propias palabras; "enlace" lleva a la noticia original.
// Si agrego un objeto más a la lista, aparece una tarjeta nueva sin tocar el HTML.
const noticias = [
  {
    categoria: "Suscripciones",
    titulo: "Game Pass llega a los planes de T-Mobile en Estados Unidos",
    resumen: "Por primera vez, Game Pass se podrá elegir dentro de un plan de telefonía en ese país.",
    texto: "T-Mobile anunció T-Mix, un sistema que permite a sus clientes de Estados Unidos elegir los beneficios de su plan. A partir de noviembre, los clientes elegibles podrán escoger Game Pass Ultimate o Premium, con una biblioteca de juegos para consolas Xbox, televisores inteligentes, PC y otros dispositivos. Según Xbox Wire, es la primera vez que Game Pass se ofrece dentro de un plan de telefonía móvil en ese país.",
    fuente: "Xbox Wire",
    fecha: "26 de octubre de 2026",
    enlace: "https://news.xbox.com/en-us/2026/10/26/xbox-game-pass-t-mobile/"
  },
  {
    categoria: "Suscripciones",
    titulo: "PlayStation Plus: los juegos mensuales de noviembre",
    resumen: "Dead Island 2, Tomb Raider IV-VI Remastered y Monster Train 2 para los miembros.",
    texto: "PlayStation anunció los tres juegos mensuales de PlayStation Plus para noviembre: Dead Island 2, Tomb Raider IV-VI Remastered y Monster Train 2. Los miembros podrán jugarlos desde el 3 hasta el 30 de noviembre. Dead Island 2 y Tomb Raider IV-VI Remastered están disponibles para PS5 y PS4, y Monster Train 2 para PS5.",
    fuente: "PlayStation Blog",
    fecha: "28 de octubre de 2026",
    enlace: "https://blog.playstation.com/2026/10/28/playstation-plus-monthly-games-for-november-dead-island-2-tomb-raider-iv-vi-remastered-monster-train-2/"
  },
  {
    categoria: "Accesorios",
    titulo: "Xbox presenta el Nano Controller, su control más pequeño",
    resumen: "Un control de bolsillo con las 18 entradas habituales y un precio de 49,99 dólares.",
    texto: "Xbox presentó el Nano Controller, que mide un poco más de 5 pulgadas y pesa 3,5 onzas, por lo que es el control más pequeño de la marca. Conserva las 18 entradas habituales de un control, tiene batería recargable, un botón de acción programable y conexión Xbox Wireless y Bluetooth. Cuesta 49,99 dólares en Estados Unidos y estará disponible desde noviembre en varios países, entre ellos República Dominicana. Los precios varían según el país.",
    fuente: "Xbox Wire",
    fecha: "14 de octubre de 2026",
    enlace: "https://news.xbox.com/en-us/2026/10/14/xbox-nano-controller/"
  },
  {
    categoria: "Accesorios",
    titulo: "PlayStation presenta la Prism Collection para el PS5",
    resumen: "Controles DualSense y cubiertas de la consola con diseños transparentes en tres colores.",
    texto: "PlayStation presentó la Prism Collection: controles DualSense y cubiertas para la consola PS5 con diseños transparentes en tres colores, naranja (Flare Orange), verde (Emerald Green) y gris (Graphite Gray). El DualSense tendrá un precio recomendado de 84,99 dólares y las cubiertas de 74,99 dólares. Las reservas empiezan el 10 de noviembre de 2026 y el lanzamiento comienza el 4 de febrero de 2027; la disponibilidad puede variar según el país.",
    fuente: "PlayStation Blog",
    fecha: "28 de octubre de 2026",
    enlace: "https://blog.playstation.com/2026/10/28/first-look-inside-the-prism-collection-with-three-new-transparent-designs-for-ps5-accessories/"
  }
];

const contenedor = document.getElementById("lista-noticias");
if (contenedor) {

  // forEach recorre la lista: "n" es la noticia actual e "i" su posición (0, 1, 2...)
  noticias.forEach(function (n, i) {
    // Las comillas invertidas (`) permiten escribir HTML en varias líneas
    // y meter valores con ${...}. Con += voy agregando una tarjeta tras otra.
    // col-md-6 hace que en pantallas medianas y grandes haya dos tarjetas por fila.
    // data-indice guarda la posición de la noticia para saber cuál abrir después.
    contenedor.innerHTML += `
      <div class="col-md-6">
        <div class="card tarjeta h-100">
          <div class="card-body d-flex flex-column">
            <span class="badge text-bg-secondary align-self-start mb-2">${n.categoria}</span>
            <h2 class="h5 card-title">${n.titulo}</h2>
            <p class="small mb-2">${n.fuente}, ${n.fecha}</p>
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
      // dataset.indice lee el data-indice del botón y con eso busco la noticia en la lista
      const n = noticias[boton.dataset.indice];

      // Escribo el título en el modal (textContent solo escribe texto, no interpreta HTML)
      document.getElementById("modal-titulo").textContent = n.titulo;

      // Aquí uso innerHTML porque además del texto agrego la fuente y un enlace a la noticia original.
      // target="_blank" abre el enlace en otra pestaña. Es seguro usar innerHTML porque
      // todo el contenido sale de mi propia lista y no de lo que escriba un visitante.
      document.getElementById("modal-texto").innerHTML =
        n.texto +
        `<br><br><small>Fuente: ${n.fuente}, ${n.fecha}</small><br>` +
        `<a href="${n.enlace}" target="_blank" rel="noopener">Ver noticia original</a>`;

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
