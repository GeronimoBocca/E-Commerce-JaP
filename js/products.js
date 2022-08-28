let User = document.getElementById("user");
let desplegable = document.getElementById("desplegable");

function cerrarSesion() {
    localStorage.removeItem("Usuario");
    window.location.href = "login.html";
}

let productsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.products.length; i++){ 
        let product = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${product.name} - ${product.currency} ${product.cost}</h4> 
                        <p> ${product.description}</p> 
                        </div>
                        <small class="text-muted">${product.soldCount} Vendidos</small> 
                    </div>
                </div>
            </div>
        </div>
       `
       document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
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

    let catID = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL+ catID +EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
            document.getElementById("categorias-nombre").innerHTML = "Verás aquí todos los productos de la categoría " + productsArray.catName;
        }
    });
});