let email = document.getElementById("emailLogin");
let password = document.getElementById("passLogin");
let submit = document.getElementById("submitLogin");

// decodificar token de google

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

// inicio de sesion con google

function handleCredentialResponse(response) {
   localStorage.setItem("Usuario", parseJwt(response.credential).email)
   window.location.href = "index.html"
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "506815704740-ormpnhvqk8u1gii58852v5tefvnqbptp.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "outline", size: "large" }
  );
  google.accounts.id.prompt();
}

// Validar campos de inicio de sesion sin google

let forms = document.querySelectorAll(".needs-validation");

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener("submit", function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (form.checkValidity()) {
      event.preventDefault();
      localStorage.setItem("Usuario", email.value)
      window.location.href = "index.html"
    }
    form.classList.add('was-validated')
  }, false);
});