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
  const textElement = document.querySelector(".welcome-text");
  const homeSection = document.querySelector("#home");
  let ticking = false;

  if (!textElement || !homeSection) {
    console.error("No se encontraron los elementos necesarios.");
    return;
  }

  // Divide el texto en spans
  const text = textElement.textContent.trim();
  textElement.innerHTML = "";
  text.split("").forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    if (char === " ") span.classList.add("no-hover");
    textElement.appendChild(span);
  });

  /* ---Botón--- */
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".CTA-button");

    button.addEventListener("click", () => {
      const targetSection = document.querySelector(button.dataset.target);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Maneja el evento de scroll para hacer que el texto se fije en la esquina y cambie de tamaño
  // Maneja el evento de scroll
  const handleScroll = () => {
    const sectionRect = homeSection.getBoundingClientRect();
    const isOutOfView = sectionRect.bottom < 0;

    if (isOutOfView) {
      if (!textElement.classList.contains("fixed")) {
        textElement.style.transition = "all 0.5s ease-in-out";
        textElement.classList.add("fixed");
      }
    } else {
      if (textElement.classList.contains("fixed")) {
        textElement.style.transition = "all 0.5s ease-in-out";
        textElement.classList.remove("fixed");
      }
    }

    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
});

/* --------------SECCIÓN DE CONTENIDOS ABOUT ME ---------------- */

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
  const imageFrame = document.querySelector(".image-frame");
  const images = imageFrame.querySelectorAll("img");
  const section = document.querySelector(".about-me-section");
  const fallingImages = [];
  let currentIndex = 0;

  imageFrame.addEventListener("click", () => {
    const currentImage = images[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImage = images[nextIndex];

    // Crear una copia de la imagen
    const fallingImage = currentImage.cloneNode(true);
    fallingImage.classList.remove("active");
    fallingImage.classList.add("fallen");
    section.appendChild(fallingImage);

    // Configurar posición inicial aleatoria
    const startX = Math.random() * (section.offsetWidth - 300);
    fallingImage.style.left = `${startX}px`;
    fallingImage.style.top = `0px`;

    // Añadir la imagen al array de imágenes que caen
    fallingImages.push({
      element: fallingImage,
      x: startX,
      y: 0,
      velocityX: (Math.random() - 0.5) * 4, // Velocidad inicial aleatoria en X
      velocityY: Math.random() * 5 + 5, // Velocidad inicial aleatoria en Y
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 10, // Velocidad de rotación aleatoria
      hasStopped: false, // Indica si la imagen ha dejado de moverse
    });

    // Cambiar a la siguiente imagen
    currentImage.classList.remove("active");
    nextImage.classList.add("active");
    currentIndex = nextIndex;

    // Iniciar la animación
    animate();
  });

  function animate() {
    const gravity = 0.5;
    const bounceFactor = 0.6;

    fallingImages.forEach((image) => {
      const { element } = image;

      if (image.hasStopped) return; // No mover imágenes que ya han parado

      // Aplicar gravedad
      image.velocityY += gravity;
      image.y += image.velocityY;
      image.x += image.velocityX;

      // Rotación
      image.rotation += image.rotationSpeed;

      // Rebote al tocar el suelo
      if (image.y + element.offsetHeight >= section.offsetHeight) {
        image.y = section.offsetHeight - element.offsetHeight;
        image.velocityY *= -bounceFactor;

        // Reducir velocidad de rotación y detenerla si es mínima
        image.rotationSpeed *= bounceFactor;
        if (Math.abs(image.rotationSpeed) < 0.5) {
          image.rotationSpeed = 0;
        }

        // Si la velocidad es baja, detener el movimiento
        if (Math.abs(image.velocityY) < 1) {
          image.hasStopped = true;
        }
      }

      // Rebote en los bordes
      if (
        image.x <= 0 ||
        image.x + element.offsetWidth >= section.offsetWidth
      ) {
        image.velocityX *= -1; // Invertir dirección X
        image.x = Math.max(
          0,
          Math.min(image.x, section.offsetWidth - element.offsetWidth)
        );
      }

      // Actualizar posición y rotación
      element.style.transform = `translate(${image.x}px, ${image.y}px) rotate(${image.rotation}deg)`;
    });

    // Continuar animación mientras haya imágenes en movimiento
    if (fallingImages.some((img) => !img.hasStopped)) {
      requestAnimationFrame(animate);
    }
  }
});
/* -----------------------------SKILSS DE CONTACT ME------------ */

/* -----------------------------SECCIÓN DE CONTACT ME------------ */
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

document.addEventListener("DOMContentLoaded", () => {
  const svgs = document.querySelectorAll(".moving-vector"); // Selecciona todos los elementos con la clase "moving-vector"

  if (!svgs.length) return; // Si no hay SVGs, detén la ejecución

  const section = document.querySelector(".contact-section, .index");
  const sectionWidth = section.offsetWidth;
  const sectionHeight = section.offsetHeight;

  svgs.forEach((svg) => {
    let posX = Math.random() * sectionWidth; // Posición inicial aleatoria en X
    let posY = Math.random() * sectionHeight; // Posición inicial aleatoria en Y
    let velX = 1.5; // Velocidad entre 0.5 y 1.5
    let velY = 1.5; // Velocidad entre 0.5 y 1.5

    const animate = () => {
      posX += velX;
      posY += velY;

      // Rebote en los bordes
      if (posX + svg.offsetWidth >= sectionWidth || posX <= 0) {
        velX *= -1; // Cambia la dirección en X
      }
      if (posY + svg.offsetHeight >= sectionHeight || posY <= 0) {
        velY *= -1; // Cambia la dirección en Y
      }

      // Actualiza la posición del SVG
      svg.style.transform = `translate(${posX}px, ${posY}px)`;

      requestAnimationFrame(animate); // Llama a la animación en cada frame
    };

    animate(); // Inicia la animación para cada SVG
  });
});

/*----------------CURSOR MOUSE----------------- */
document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");
  const buttons = document.querySelectorAll("button, a");

  if (!cursor || buttons.length === 0) {
    console.error("No se encontraron los elementos esperados en el DOM");
    return;
  }

  // Seguir la posición del ratón
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Cambiar el SVG al pasar por un botón
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      cursor.style.background =
        "url('https://ik.imagekit.io/garciaanita/12.svg?updatedAt=1736419441426') no-repeat center center / contain";
    });

    button.addEventListener("mouseleave", () => {
      cursor.style.background =
        "url('https://ik.imagekit.io/garciaanita/10.svg?updatedAt=1736419441620') no-repeat center center / contain";
    });
  });
});

/*-----------------------------------------Fotos PORTFOLIO---------------------------------------- */
const tooltip = document.getElementById("tooltip");

function showTooltip(element, text) {
  // Establece el texto del tooltip
  tooltip.textContent = text;

  // Obtén las coordenadas del elemento
  const rect = element.getBoundingClientRect();

  // Ajusta la posición del tooltip
  tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
  tooltip.style.top = `${
    rect.top + window.scrollY - tooltip.offsetHeight - 10
  }px`;

  // Haz visible el tooltip
  tooltip.classList.remove("hidden");
  tooltip.style.display = "block";
}

// Ocultar el tooltip cuando no sea necesario
function hideTooltip() {
  tooltip.classList.add("hidden");
  tooltip.style.display = "none";
}

// Agrega el evento para ocultar el tooltip al hacer clic en cualquier parte de la página
document.addEventListener("click", (event) => {
  if (!event.target.closest(".image-item")) {
    hideTooltip();
  }
});
