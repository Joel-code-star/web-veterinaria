// ESPERAR QUE CARGUE LA PÁGINA
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // DETECCIÓN UX ADAPTATIVA 🔥
    // =========================
    const esMovil = window.innerWidth <= 768;
    const cpu = navigator.hardwareConcurrency || 4;

    let nivelAnimacion = "alto";

    if (esMovil && cpu <= 4) {
        nivelAnimacion = "bajo";
    } else if (esMovil) {
        nivelAnimacion = "medio";
    }

    document.body.classList.add(`nivel-${nivelAnimacion}`);

    // =========================
    // ELEMENTOS
    // =========================
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");
    const overlay = document.getElementById("overlay");

    // =========================
    // MENU (CON VALIDACIÓN)
    // =========================
    if (menuBtn && navMenu && overlay) {

        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            overlay.classList.toggle("active");
        });

        overlay.addEventListener("click", () => {
            navMenu.classList.remove("active");
            overlay.classList.remove("active");
        });
    }

    // =========================
    // SCROLL SUAVE
    // =========================
    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId.startsWith("#")) {

                e.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: "smooth"
                    });
                }

                navMenu?.classList.remove("active");
                overlay?.classList.remove("active");
            }
        });

    });

    // =========================
    // FIX RESPONSIVE
    // =========================
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            navMenu?.classList.remove("active");
            overlay?.classList.remove("active");
        }
    });

    // =========================
    // ANIMACIÓN PRO (OPTIMIZADA 🔥)
    // =========================
    const elementos = document.querySelectorAll(".animar");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }

        });

    }, {
        threshold: nivelAnimacion === "bajo" ? 0.05 :
                nivelAnimacion === "medio" ? 0.1 : 0.2
    });

    elementos.forEach(el => observer.observe(el));

});