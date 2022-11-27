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


    if (hora < 10) {
        return hora = "0" + hora
    }
    if (minutos < 10) {
        return minutos = "0" + minutos
    }
    if (segundos < 10) {
        return segundos = "0" + segundos
    }
    if (dia < 10) {
        return dia = "0" + dia
    }
    if (mes < 10) {
        return mes = "0" + mes
    }
    document.getElementById("comFecha").innerHTML = anio + "-" + mes + "-" + dia + " " + hora + ":" + minutos + ":" + segundos;
}

function agregar() {
    let comentarioNuevo = {}
    let crearDiv = ""

    if (comentarios.length == 0) {
        crearDiv += `
        <div id="comFecha"></div
        `
        document.getElementById("comentarios-prod").innerHTML = crearDiv
    }

    comentarioNuevo.product = JSON.parse(localStorage.getItem("prodID"))
    comentarioNuevo.score = JSON.parse(document.getElementById("cantidad").value)
    comentarioNuevo.description = document.getElementById("textarea").value
    comentarioNuevo.user = localStorage.getItem("Usuario")
    crearHora()
    comentarioNuevo.dateTime = document.getElementById("comFecha").innerHTML
    comentarios.push(comentarioNuevo)
    crearComentarios()

    localStorage.setItem("comentarios", JSON.stringify(comentarios))
};

// Funcion para agregar un producto nuevo al carrito (Aun tiene fallos)
// function comprarProducto() {
//     let producto = {}
//     let articles = []
//     let json = {}

//     json.id = JSON.parse(localStorage.getItem("prodID"))
//     json.name = prodInfo.name
//     json.count = 1
//     json.unitCost = prodInfo.cost
//     json.currency = prodInfo.currency
//     json.image = prodInfo.images[0]
//     articles.push(json)
//     producto.user = 25801
//     producto.articles = articles

//     if (localStorage.getItem("Producto") !== null) {
//         let comprado = JSON.parse(localStorage.getItem("Producto"))
//         comprado.articles.push(json)
//         console.log(comprado)
//         localStorage.setItem("Producto", JSON.stringify(comprado))
//     }
//     else {
//         localStorage.setItem("Producto", JSON.stringify(producto))
//     }
//     location.href = "cart.html"
// }

// Imagenes

function crearImagenes() {

    let imagenes = "";
    for (let i = 0; i < prodInfo.images.length; i++) {
        let img = prodInfo.images[i];

        imagenes += `
        <div class="carousel-item">
            <img src="${img}" class="d-block w-75 m-auto">
        </div>
        `
    }
    return imagenes
}

// Comentarios

function crearComentarios() {
    let comentariosAMostrar = "";

    if (comentarios.length == 0) {
        comentariosAMostrar += `
        <div class="comentarios-prod">
            <p class="text-center">Aun no hay ningun comentario. Sé el primero en comentar.</p>
        </div>
        `
        document.getElementById("comentarios-prod").innerHTML = comentariosAMostrar;
    }
    else {
        for (let i = 0; i < comentarios.length; i++) {
            let comentario = comentarios[i];
            comentariosAMostrar += `
            <div class="comentarios-prod">
            <p class="fecha"><span id="comUser" class="comUser">${comentario.user}</span> - <span id="comFecha">${comentario.dateTime}</span> - <span id="comEstrella">` + crearEstrellas(comentario.score) + `</span> </p>
            <p id="comDescripcion" class="descripcion">${comentario.description}</p>
            </div>
            `
            document.getElementById("comentarios-prod").innerHTML = comentariosAMostrar;
        }

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
    <button class="btn btn-primary float-end" id="buy">Comprar</button>
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
        <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
        <div id="carousel" class="carousel-inner">`+ crearImagenes() + `
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
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
            document.getElementById("carousel").children[0].classList.add('active')
        }
        // agregar al carrito
        // let boton = document.getElementById("buy")
        // boton.addEventListener("click", () => {
        //     comprarProducto()
        // })
    });

    // Llamo al JSON de los comentarios, usando la ID que agarré recien. Llamo a la funcion crearComentarios()

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            crearComentarios();
        }
    });

    document.getElementById("enviar").addEventListener("click", () => {

        if (document.getElementById("textarea").value !== "" && document.getElementById("cantidad").value !== "") {
            agregar()
            document.getElementById("textarea").value = ""
            document.getElementById("cantidad").value = 1
        }

        else if (document.getElementById("textarea").value == "") {
            document.getElementById("textarea").classList.add("is-invalid")
        }
    })

    document.getElementById("textarea").addEventListener("focus", () => {
        document.getElementById("textarea").classList.remove("is-invalid")

    })


})
