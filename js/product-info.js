let prodInfo = [];
let comentarios = [];
console.log(comentarios.length);
function createData() {
    document.getElementById("producto-nombre").innerHTML = prodInfo.name;
    document.getElementById("producto-precio").innerHTML = "$" + prodInfo.cost + " - " + prodInfo.currency;
    document.getElementById("producto-descripcion").innerHTML = prodInfo.description;
    document.getElementById("producto-categoria").innerHTML = prodInfo.category;
    document.getElementById("producto-vendido").innerHTML = prodInfo.soldCount;
    document.getElementById("primeraImagen").setAttribute("src", prodInfo.images[0]);
    document.getElementById("segundaImagen").setAttribute("src", prodInfo.images[1]);
    document.getElementById("terceraImagen").setAttribute("src", prodInfo.images[2]);
    document.getElementById("cuartaImagen").setAttribute("src", prodInfo.images[3]);
};



document.addEventListener("DOMContentLoaded", () => {

    let prodID = localStorage.getItem("prodID");

    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            prodInfo = resultObj.data;
            createData();
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
        }
    });
});

