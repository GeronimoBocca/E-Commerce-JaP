//array donde se cargarán los datos recibidos:

function cerrarSesion() {
    localStorage.removeItem("Usuario");
    window.location.href = "login.html";
}

let productsArray = [];

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
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

/* 
EJECUCIÓN:

-Al cargar la página se llama a getJSONData() pasándole por parámetro la dirección para obtener el listado.
-Se verifica el estado del objeto que devuelve, y, si es correcto, se cargan los datos en categoriesArray.
-Por último, se llama a showCategoriesList() pasándole por parámetro categoriesArray.

*/

document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("Usuario") === null) {
        window.location.href = "login.html";
        }

        document.getElementById("cerrar-session").addEventListener("click", () => {
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