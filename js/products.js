// Array de información

let listaProductos = [];
let min = document.getElementById("rangeFilterCountMin").value;
let max = document.getElementById("rangeFilterCountMax").value;

// Setear ID de producto

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info";
}

// Realiza una busqueda por nombre o descripcion

function buscar() {
    let valorBusqueda = document.getElementById("inputBuscar").value
    let filtrado = listaProductos.products.filter((a) => {
        return a.name.toLowerCase().indexOf(valorBusqueda.toLowerCase()) > -1 || a.description.toLowerCase().indexOf(valorBusqueda.toLowerCase()) > -1
    })
    showProductsList(filtrado);
}

// Mostrar lista de productos

function showProductsList(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let product = array[i];

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

// Cuando el evento DOM carga: 

document.addEventListener("DOMContentLoaded", () => {

    // Agarro la ID de Categoria

    let catID = localStorage.getItem("catID");

    // Llamo al JSON de Productos

    getJSONData(PRODUCTS_URL + catID + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaProductos = resultObj.data;
            showProductsList(listaProductos.products)
            document.getElementById("categorias-nombre").innerHTML = "Verás aquí todos los productos de la categoría " + listaProductos.catName;
        }
    });

    // Cuando el input cambia, se llama a la funcion buscar()

    document.getElementById("inputBuscar").addEventListener("change", () => {
        buscar()
    })

    // Al hacer click en el boton, se ordenan los productos por cantidad de vendidos

    document.getElementById("sortByCount").addEventListener("click", () => {
        listaProductos.products.sort((a, b) => {
            if (a.soldCount > b.soldCount) {
                return -1;
            } else if (a.soldCount < b.soldCount) {
                return 1;
            } else {
                return 0;
            }
        });
        showProductsList(listaProductos.products);
    })

    // Al hacer click en el boton, se ordenan los productos por precio descendente

    document.getElementById("sortDesc").addEventListener("click", () => {
        listaProductos.products.sort((a, b) => {
            if (a.cost < b.cost) {
                return 1;
            } else if (a.cost > b.cost) {
                return -1;
            } else {
                return 0;
            }
        });
        showProductsList(listaProductos.products);
    })

    // Al hacer click en el boton, se ordenan los productos por precio ascendente

    document.getElementById("sortAsc").addEventListener("click", () => {
        listaProductos.products.sort((a, b) => {
            if (a.cost > b.cost) {
                return 1;
            } else if (a.cost < b.cost) {
                return -1;
            } else {
                return 0;
            }
        });
        showProductsList(listaProductos.products);
    })

    // Al hacer click en el boton, se toman los valores minimos y maximos y se filtra los productos por precio

    document.getElementById("rangeFilterCount").addEventListener("click", () => {


        if (min == "" && max == "") {
            min = "0";
            max = "99999999999";
        }

        else if (min == "") {
            min = "0";
        }

        else if (max == "") {
            max = "99999999999";
        }

        let resultado = listaProductos.products.filter(p => p.cost >= min && p.cost <= max);

        resultado.sort((a, b) => a.cost - b.cost);
        showProductsList(resultado);
    })

    // Al hacer click en el boton, se limpian los filtros por precio, dejandolos en su estado original

    document.getElementById("clearRangeFilter").addEventListener("click", () => {
        document.getElementById("rangeFilterCountMin").value = null;
        document.getElementById("rangeFilterCountMax").value = null;
        showProductsList(listaProductos.products);
    })
});