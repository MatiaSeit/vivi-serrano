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
