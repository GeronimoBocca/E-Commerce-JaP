// Array y lets

const ORDER_ASC_BY_COST = "$AS";
const ORDER_DESC_BY_COST = "$DE";
const ORDER_BY_SOLD_COUNT = "Rel";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let inputSearch = document.getElementById("inputSearch").value;

// Setear ID de producto

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info";
}

// Ordenar Productos

function sortProducts(criteria, array) {
    let result = [];

    // Ordenar por orden Ascendente en precio

    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });

    // Ordenar por orden Descendente en precio

    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });

    // Ordenar por cantidad de vendidos

    } else if (criteria === ORDER_BY_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}

// Ordeno y muestro los productos ordenados

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
    showProductsList();
}

// Mostrar lista de productos

function showProductsList() {
    let htmlContentToAppend = "";

    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action">
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
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

// Cuando el evento DOM carga: 

document.addEventListener("DOMContentLoaded", () => {

    // Agarro la ID de Categoria

    let catID = localStorage.getItem("catID");

    // Llamo al JSON de Productos

    getJSONData(PRODUCTS_URL + catID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            sortAndShowProducts(ORDER_ASC_BY_COST, productsArray.products);
            document.getElementById("categorias-nombre").innerHTML = "Verás aquí todos los productos de la categoría " + productsArray.catName;
        }
    });

    // Al hacer click se llama al a funcion de orden ascendente al precio

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    // Al hacer click se llama al a funcion de orden descendente al precio

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    // Al hacer click se llama al a funcion de orden por productos vendidos

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    // Al hacer click se se borra el rango de precios

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    // Al hacer click se filtra por rango de precios

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }

        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }

        else {
            maxCount = undefined;
        }
        showProductsList();
    });
});