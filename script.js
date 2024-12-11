document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll(".about-me-content"); // Selecciona los párrafos con la clase 'about-me-text'
  
    paragraphs.forEach(paragraph => {
      const words = paragraph.textContent.split(" "); // Divide el texto en palabras
      paragraph.innerHTML = ""; // Limpia el contenido del párrafo
  
      // Envuelve cada palabra en un <span>
      words.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word; // Asigna la palabra al <span>
        paragraph.appendChild(span); // Añade el <span> al párrafo
        paragraph.appendChild(document.createTextNode(" ")); // Añade un espacio después del <span> (para separar las palabras)
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const paragraphs = document.querySelectorAll(".contact-content"); // Selecciona los párrafos con la clase 'about-me-text'
  
    paragraphs.forEach(paragraph => {
      const words = paragraph.textContent.split(" "); // Divide el texto en palabras
      paragraph.innerHTML = ""; // Limpia el contenido del párrafo
  
      // Envuelve cada palabra en un <span>
      words.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word; // Asigna la palabra al <span>
        paragraph.appendChild(span); // Añade el <span> al párrafo
        paragraph.appendChild(document.createTextNode(" ")); // Añade un espacio después del <span> (para separar las palabras)
      });
    });
  });
  