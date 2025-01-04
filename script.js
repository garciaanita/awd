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
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".welcome-text");
  const homeSection = document.getElementById("home");

  let ticking = false; // Evita múltiples llamadas al evento scroll

  // Configuración de Intersection Observer para detectar el fondo oscuro
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          textElement.classList.add("dark-background"); // Cambio de color cuando está sobre un fondo oscuro
        } else {
          textElement.classList.remove("dark-background"); // Restaura color original
        }
      });
    },
    { threshold: 0.1 } // Detecta si el texto está sobre fondo oscuro
  );

  // Observa elementos oscuros en la página
  const darkSections = document.querySelectorAll(".section-dark");
  darkSections.forEach((section) => observer.observe(section));

  // Maneja el evento de scroll para hacer que el texto se fije en la esquina y cambie de tamaño
  const handleScroll = () => {
    const sectionRect = homeSection.getBoundingClientRect();
    const isOutOfView = sectionRect.bottom < 0; // Comprueba si la sección ha salido de la vista

    if (isOutOfView) {
      if (!textElement.classList.contains("fixed")) {
        textElement.style.transition = "all 0.5s ease-in-out"; // Transición suave
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

  // Maneja el evento de scroll usando requestAnimationFrame para suavizar
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
});

/*-------FOTOS HOME--------*/

/* ----------SECCIÓN DE CONTENIDOS ABOUT ME ------------ */

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
