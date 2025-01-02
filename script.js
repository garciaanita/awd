/* ----------Navbar------------ */

document.querySelectorAll(".navbar-content ul li button").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.target); // Selecciona el destino
    if (target) {
      target.scrollIntoView({ behavior: "smooth" }); // Desplazamiento suave
    }
  });
});

/* ----------SECCIÓN DE HOME. WELCOME MESSAGE------------ */

document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".welcome-text"); // Selecciona el texto
  const text = textElement.textContent.trim(); // Elimina espacios en blanco iniciales y finales
  textElement.innerHTML = ""; // Limpia el contenido actual

  // Divide cada carácter en un <span>
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char; // Preserva espacios
    if (char === " ") {
      span.classList.add("no-hover"); // Agrega una clase especial para espacios
    }
    textElement.appendChild(span);
  });
});

/*-------FOTOS HOME--------*/
const images = [
  "https://via.placeholder.com/150", // Cambia este enlace
  "https://via.placeholder.com/200", // Cambia este enlace
  "https://via.placeholder.com/250", // Cambia este enlace
];

/* ----------SECCIÓN DE CONTENIDOS ABOUT ME Y CONTACT ME------------ */

document.addEventListener("DOMContentLoaded", () => {
  const paragraphs = document.querySelectorAll(".about-me-text"); // Selecciona los párrafos con la clase 'about-me-text'

  paragraphs.forEach((paragraph) => {
    const words = paragraph.textContent.split(" "); // Divide el texto en palabras
    paragraph.innerHTML = ""; // Limpia el contenido del párrafo

    // Envuelve cada palabra en un <span>
    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word; // Asigna la palabra al <span>
      paragraph.appendChild(span); // Añade el <span> al párrafo
      paragraph.appendChild(document.createTextNode(" ")); // Añade un espacio después del <span> (para separar las palabras)
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const paragraphs = document.querySelectorAll(".contact-text"); // Selecciona los párrafos con la clase 'about-me-text'

  paragraphs.forEach((paragraph) => {
    const words = paragraph.textContent.split(" "); // Divide el texto en palabras
    paragraph.innerHTML = ""; // Limpia el contenido del párrafo

    // Envuelve cada palabra en un <span>
    words.forEach((word) => {
      const span = document.createElement("span");
      span.textContent = word; // Asigna la palabra al <span>
      paragraph.appendChild(span); // Añade el <span> al párrafo
      paragraph.appendChild(document.createTextNode(" ")); // Añade un espacio después del <span> (para separar las palabras)
    });
  });
});

/*----------------CURSOR MOUSE----------------- */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");
  const buttons = document.querySelectorAll("button");

  // Seguir la posición del ratón
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Cambiar el SVG al pasar por un botón
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      cursor.style.background =
        "url('/assets/icons/svg/12.svg') no-repeat center center / contain";
    });

    button.addEventListener("mouseleave", () => {
      cursor.style.background =
        "url('/assets/icons/svg/10.svg') no-repeat center center / contain";
    });
  });
});
