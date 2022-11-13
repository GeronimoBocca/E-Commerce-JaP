let nombre = document.getElementById("nombrePerfil")
let sNombre = document.getElementById("sNombrePerfil")
let apellido = document.getElementById("apellidoPerfil")
let sApellido = document.getElementById("sApellidoPerfil")
let email = document.getElementById("emailPerfil")
let contacto = document.getElementById("contactoPerfil")
let perfilEditado = {}

function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

function editarPerfil() {

  perfilEditado.nombre = document.getElementById("nombrePerfil").value
  perfilEditado.sNombre = document.getElementById("sNombrePerfil").value
  perfilEditado.apellido = document.getElementById("apellidoPerfil").value
  perfilEditado.sApellido = document.getElementById("sApellidoPerfil").value
  perfilEditado.email = document.getElementById("emailPerfil").value
  perfilEditado.contacto = document.getElementById("contactoPerfil").value

  localStorage.setItem("perfil", JSON.stringify(perfilEditado))
  if(perfilEditado.email !== localStorage.getItem("Usuario")) {
    localStorage.setItem("Usuario", perfilEditado.email)
  }
}

(function () {
  'use strict'

  var forms = document.querySelectorAll('.needs-validation')

  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if(email.value === " ") {
          email.setCustomValidity("a")
        }
        else if (email.value !== " ") {
          email.setCustomValidity("")
        }

        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        else if (form.checkValidity()) {
          editarPerfil()
          showAlertSuccess()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

document.addEventListener("DOMContentLoaded", () => {
  localStorage.getItem("perfil")
  if (localStorage.getItem("perfil") === null) {
    email.value = localStorage.getItem("Usuario")
  }

  else if(localStorage.getItem("perfil") !== null) {
    let perfil = JSON.parse(localStorage.getItem('perfil'));

    nombre.value = perfil.nombre;
    apellido.value = perfil.apellido;
    sNombre.value = perfil.sNombre;
    sApellido.value = perfil.sApellido;
    email.value = localStorage.getItem("Usuario")
    contacto.value = perfil.contacto;
  }
})