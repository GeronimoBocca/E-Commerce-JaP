// Arrays de información

let prodInfo = [];
let comentarios = [];

// Setear ID del producto

function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info";
}

function crearHora() {
    let hoy = new Date();

    let dia = hoy.getDate();
    let mes = hoy.getMonth() + 1;
    let anio = hoy.getFullYear();
    let hora = hoy.getHours()
    let minutos = hoy.getMinutes()
    let segundos = hoy.getSeconds()

    document.getElementById("comFecha").innerHTML = anio + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;
  }
  

function agregar() {
    let comentarioNuevo = []
    comentarioNuevo.score = document.getElementById("cantidad").value
    console.log(comentarioNuevo.score)
    comentarioNuevo.user = localStorage.getItem("Usuario")
    console.log(comentarioNuevo.user)
    comentarioNuevo.description = document.getElementById("textarea").value
    console.log(comentarioNuevo.description)
    crearHora()
    comentarioNuevo.dateTime = document.getElementById("comFecha").innerHTML
    console.log(comentarioNuevo.dateTime)
    comentarios.push(comentarioNuevo)
    crearComentarios()
};

// Imagenes

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
        <p class="fecha"><span id="comUser" class="comUser">${comentario.user}</span> - <span id="comFecha">${comentario.dateTime}</span> - <span id="comEstrella">` + crearEstrellas(comentario.score) + `</span> </p>
        <p id="comDescripcion" class="descripcion">${comentario.description}</p>
        </div>
        `
        document.getElementById("comentarios-prod").innerHTML = comentariosAMostrar;
    };
}

// Productos Relacionados

function crearRelacionados() {

    let relacionadosAMostrar = "";
    for (let i = 0; i < prodInfo.relatedProducts.length; i++) {
        let relacionados = prodInfo.relatedProducts[i];
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

// Estrellas de comentarios

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
        <div id="producto-imagenes">`+ crearImagenes() +`</div>
    `
    document.getElementById("contenedor-info").innerHTML = infoAMostrar;
}
// Cuando el evento DOM carga:

document.addEventListener("DOMContentLoaded", () => {

    // Agarro el ID del producto

    let prodID = localStorage.getItem("prodID");

    // Llamo al JSON del producto, usando la ID que agarré recien. Llamo a la funcion crearInfo() y llamo a crearRelacionados()

    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;
            crearInfo();
            crearRelacionados()
        }
    });

    // Llamo al JSON de los comentarios, usando la ID que agarré recien. Llamo a la funcion crearComentarios()

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            crearComentarios();
        }
    });

    document.getElementById("enviar").addEventListener("click", () => {
        agregar()
    })
})
