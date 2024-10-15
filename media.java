// Seleccionar todos los videos con la clase "video-hover"
const videos = document.querySelectorAll('.video-hover');

videos.forEach((video) => {
    // Reproduce el video al hacer hover
    video.addEventListener('mouseenter', () => {
        video.play();
    });

    // Pausa el video cuando el mouse deja de estar sobre él
    video.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0; // Reinicia el video para que empiece desde el principio la próxima vez
    });
});
