// Arrays de información

let prodInfo = [];
let comentarios = [];

// Setear ID del producto

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info";
}

// Crear Imagenes

function crearImagenes() {

    let imagenes = "";
    for (let i = 0; i < prodInfo.images.length; i++) {
        let img = prodInfo.images[i];

        imagenes += `
        <img class="img-thumbnail" src=${img}>
        `;
    }
    return imagenes
}

// Comentarios

function crearComentarios() {

    let comentariosAMostrar = "";
    for (let i = 0; i < comentarios.length; i++) {
        let comentario = comentarios[i];
        comentariosAMostrar += `
        <div class="comentarios-prod">
        <p class="fecha"><span class="user">${comentario.user}</span> - ${comentario.dateTime} - ` + crearEstrellas(comentario.score) + ` </p>
        <p class="descripcion">${comentario.description}</p>
        </div>
        `
        document.getElementById("comentarios-prod").innerHTML = comentariosAMostrar;
    };
}

// Productos Relacionados

function crearRelacionados() {

    let relacionadosAMostrar = "";
    for (let i = 0; i < prodInfo.relatedProducts.length; i++) {
        const relacionados = prodInfo.relatedProducts[i];
        relacionadosAMostrar += `
        <div onclick="setProdID(${relacionados.id})" class="card" style="width: 18rem;">
        <img class="card-img-top"
          src="${relacionados.image}"
          alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${relacionados.name}</h5>
        </div>
      </div>
        `
    }
    document.getElementById("contenedor-relacionados").innerHTML = relacionadosAMostrar;
}

// Crear estrellas de comentarios

function crearEstrellas(score) {
    let estrella = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= score) {
            estrella += `<i class="fas fa-star checked"></i>`
        }
        else {
            estrella += `<i class="far fa-star" style='color: black'></i>`
        }
    }
    return estrella;
}

// Crear la Información del producto

function crearInfo() {

    let infoAMostrar = "";
    infoAMostrar += `
        <h1 id="producto-nombre">${prodInfo.name}</h1>
        <hr>
        <h5 class="elemento-titulo">Precio</h5>
        <p id="producto-precio" class="data">$ ${prodInfo.cost} - ${prodInfo.currency}</p>
        <h5 class="elemento-titulo">Descripción</h5>
        <p id="producto-descripcion" class="data">${prodInfo.description}</p>
        <h5 class="elemento-titulo">Categoría</h5>
        <p id="producto-categoria" class="data">${prodInfo.category}</p>
        <h5 class="elemento-titulo">Cantidad de vendidos</h5>
        <p id="producto-vendido" class="data">${prodInfo.soldCount}</p>
        <h5 class="elemento-titulo">Imágenes ilustrativas</h5>
        <div id="producto-imagenes"></div>
    `
    document.getElementById("contenedor-info").innerHTML = infoAMostrar;
    document.getElementById("producto-imagenes").innerHTML = crearImagenes()
}
// Cuando el evento DOM carga:

document.addEventListener("DOMContentLoaded", () => {

    // Agarro el ID del producto

    let prodID = localStorage.getItem("prodID");

    // Llamo al JSON del producto, usando la ID que agarré recien. Llamo a la funcion crearInfo()

    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;
            crearInfo();
            crearRelacionados()
        }
    });

    // Llamo al JSON de los comentarios, usando la ID que agarré recien. Llamo a la funcion crearInfo()

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            crearComentarios();
        }
    });
})
