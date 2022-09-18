let prodInfo = [];
let comentarios = [];

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
        <div id="producto-imagenes">
          <img id="primeraImagen" class="primera" src="${prodInfo.images[0]}">
          <img id="segundaImagen" class="segunda" src="${prodInfo.images[1]}">
          <img id="terceraImagen" class="tercera" src="${prodInfo.images[2]}">
          <img id="cuartaImagen" class="cuarta" src="${prodInfo.images[3]}">
        </div>
    `
    document.getElementById("contenedor-info").innerHTML = infoAMostrar;
};

// function mostrarImagenes() {
//     let imagenes = "";
//     for (let i = 0; i < comentarios.images.length; i++) {
//         let img = comentarios.images[i];

//         imagenes += `
//         <img class="img-thumbnail" src=${img}>
//         `;
//     }
//     return imagenes
// }

function mostrarEstrellas(score) {
    let estrella = "";
    for(let i = 1; i<=5; i++) {
        if(i <= score) {
            estrella += `<i class="fas fa-star checked"></i>`
        }
        else {
            estrella += `<i class="far fa-star" style='color: black'></i>`
        }
    }
    return estrella;
}

function crearComentarios() {
    let comentariosAMostrar = "";
    for (let i = 0; i < comentarios.length; i++) {
        let comentario = comentarios[i];
        console.log(comentario)
        comentariosAMostrar += `
        <div class="comentarios-prod">
        <p class="fecha"><span class="user">${comentario.user}</span> - ${comentario.dateTime} - ` + mostrarEstrellas(comentario.score)+` </p>
        <p class="descripcion">${comentario.description}</p>
        </div>
        `
        document.getElementById("comentarios-prod").innerHTML = comentariosAMostrar;
    };
};

document.addEventListener("DOMContentLoaded", () => {

    let prodID = localStorage.getItem("prodID");

    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;
            crearInfo();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            crearComentarios();
        }
    });
});

