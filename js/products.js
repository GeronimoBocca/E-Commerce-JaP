// Array y 

const ORDER_ASC_BY_COST = "$AS";
const ORDER_DESC_BY_COST = "$DE";
const ORDER_BY_SOLD_COUNT = "Rel";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info";
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
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

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

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

document.addEventListener("DOMContentLoaded", () => {

    let catID = localStorage.getItem("catID");

    getJSONData(PRODUCTS_URL + catID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            sortAndShowProducts(ORDER_ASC_BY_COST, productsArray.products);
            document.getElementById("categorias-nombre").innerHTML = "Verás aquí todos los productos de la categoría " + productsArray.catName;
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

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