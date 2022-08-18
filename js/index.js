function cerrarSesion() {
    localStorage.removeItem("email");
    localStorage.removeItem("contraseña");
    window.location.href = "login.html";
}

function nadie() {
    if (localStorage.getItem("email") === null) {
    alert("Usted debe Iniciar Sesión");
    window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    nadie();

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