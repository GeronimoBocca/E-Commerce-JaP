let oculto1 = document.getElementById("oculto-email");
let oculto2 = document.getElementById("oculto-password");
let email = document.getElementById("email");
let contraseña = document.getElementById("password");
let boton = document.getElementById("login-enviar");

function login() {
    if (email.value !== "" && contraseña.value !== ""){
        window.location.href = "index.html"
        sessionStorage.setItem("email", email);
    }
    else if (email.value === "") {
        oculto1.style.display = "block";
        oculto1.style.color = "red";
        email.classList.add("is-invalid");
    }
    if (contraseña.value === "") {
        oculto2.style.display = "block";
        oculto2.style.color = "red";
        contraseña.classList.add("is-invalid");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    boton.addEventListener("click", () => {
        login();
    });
});


