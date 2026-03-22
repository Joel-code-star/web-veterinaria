const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else {
            entry.target.classList.remove("visible"); // 🔥 permite repetir animación
        }

    });
}, {
    threshold: 0.25
});

document.querySelectorAll(
    ".tienda-box, .tienda-badge, .tienda h1, .tienda p, .btn-tienda, .tienda-extra"
).forEach(el => observer.observe(el));