function cerrarSesion() {
    localStorage.removeItem("Usuario");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("Usuario") === null) {
        window.location.href = "login.html";
        }

    document.getElementById("cerrar-session").addEventListener("click", () => {
        cerrarSesion();
    });

    document.getElementById("autos").addEventListener("click", () => {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });

    document.getElementById("juguetes").addEventListener("click", () => {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });

    document.getElementById("muebles").addEventListener("click", () => {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});