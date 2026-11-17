/* ==========================================================
   Viví Serrano · configuración
   Cambiá solo estas dos líneas cuando tengas los datos.
   ========================================================== */

const CONFIG = {
  // Número de WhatsApp con código de país y sin "+", espacios ni guiones.
  // Ejemplo para Argentina: "5493544123456"
  whatsapp: "",
  // Enlace al perfil de Instagram, por ejemplo "https://www.instagram.com/viviserrano"
  instagram: ""
};

/* ---------- Enlaces de WhatsApp ----------
   Cada botón con data-whatsapp="mensaje" abre WhatsApp
   con ese mensaje ya escrito. */
document.querySelectorAll("[data-whatsapp]").forEach((enlace) => {
  const mensaje = enlace.dataset.whatsapp || "Hola, quiero información sobre las escapadas de Viví Serrano.";
  enlace.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensaje)}`;
  enlace.target = "_blank";
  enlace.rel = "noopener";
});

/* ---------- Instagram ---------- */
document.querySelectorAll("[data-instagram]").forEach((enlace) => {
  if (CONFIG.instagram) {
    enlace.href = CONFIG.instagram;
    enlace.target = "_blank";
    enlace.rel = "noopener";
  } else if (enlace.classList.contains("flotante")) {
    // El botón flotante se ve igual, pero no hace nada hasta tener el perfil
    enlace.addEventListener("click", (e) => e.preventDefault());
  } else {
    // El enlace del pie se oculta hasta tener el perfil
    (enlace.closest("p") || enlace).remove();
  }
});

/* ---------- Menú en el móvil ---------- */
const boton = document.querySelector(".menu-boton");
const menu = document.querySelector(".menu");
if (boton && menu) {
  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.setAttribute("aria-expanded", abierto);
    boton.textContent = abierto ? "Cerrar" : "Menú";
  });
}

/* ---------- Año del pie ---------- */
const anio = document.querySelector("[data-anio]");
if (anio) anio.textContent = new Date().getFullYear();

/* ---------- Visor de fotos ----------
   Al hacer clic en una foto de la galería se abre en grande.
   Se navega con las flechas (pantalla o teclado) y se cierra con Esc. */
const visor = document.querySelector(".visor");
const fotos = [...document.querySelectorAll(".galeria-foto img")];
if (visor && fotos.length) {
  const imagen = visor.querySelector("img");
  let actual = 0;
  const mostrar = (i) => {
    actual = (i + fotos.length) % fotos.length;
    imagen.src = fotos[actual].src;
    imagen.alt = fotos[actual].alt;
  };
  fotos.forEach((foto, i) => {
    foto.parentElement.addEventListener("click", () => { mostrar(i); visor.showModal(); });
  });
  visor.querySelector(".visor-cerrar").addEventListener("click", () => visor.close());
  visor.querySelector(".visor-anterior").addEventListener("click", () => mostrar(actual - 1));
  visor.querySelector(".visor-siguiente").addEventListener("click", () => mostrar(actual + 1));
  visor.addEventListener("click", (e) => { if (e.target === visor) visor.close(); });
  document.addEventListener("keydown", (e) => {
    if (!visor.open) return;
    if (e.key === "ArrowLeft") mostrar(actual - 1);
    if (e.key === "ArrowRight") mostrar(actual + 1);
  });
  const sinOtras = fotos.length < 2;
  visor.querySelector(".visor-anterior").hidden = sinOtras;
  visor.querySelector(".visor-siguiente").hidden = sinOtras;
}
