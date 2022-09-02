const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let User = document.getElementById("user");
let desplegable = document.getElementById("desplegable");

function cerrarSesion() {
  localStorage.removeItem("Usuario");
  window.location.href = "login.html";
}

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
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