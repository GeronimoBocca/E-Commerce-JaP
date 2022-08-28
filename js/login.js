let oculto1 = document.getElementById("oculto-email");
let oculto2 = document.getElementById("oculto-password");
let email = document.getElementById("email");
let contraseña = document.getElementById("password");
let boton = document.getElementById("login-enviar");

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

function login() {
    if (email.value !== "" && contraseña.value !== ""){
        localStorage.setItem("Usuario", email.value);
        window.location.href = "index.html";
    }
    
    else if (email.value === "") {
        oculto1.style.display = "block";
        email.classList.add("is-invalid");
    }

    if (contraseña.value === "") {
        oculto2.style.display = "block";
        contraseña.classList.add("is-invalid");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    boton.addEventListener("click", () => {
        login();
    });

    email.addEventListener('keydown', () => {
        email.classList.remove("is-invalid");
        oculto1.style.display = "none";
    });

    contraseña.addEventListener('keydown', () => {
        contraseña.classList.remove("is-invalid");
        oculto2.style.display = "none";
    });
});