let User = document.getElementById("user");
let desplegable = document.getElementById("desplegable");

function cerrarSesion() {
    localStorage.removeItem("Usuario");
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("Usuario") === null) {
        window.location.href = "login.html";
        }

    User.innerHTML = localStorage.getItem("Usuario");

    User.addEventListener("click", () => {
        if (desplegable.style.display = "none") {
            desplegable.style.display = "block";
            window.addEventListener("click", (e) => {
                if (!desplegable.contains(e.target) && !User.contains(e.target)) {
                    desplegable.style.display = "none";
                };
            });
        };
    });

    document.getElementById("cerrar-sesion").addEventListener("click", () => {
        cerrarSesion();
    });
});