let listaCarrito = []

document.addEventListener("DOMContentLoaded", () => {

    let usuario = "25801"

    getJSONData(CART_INFO_URL + usuario + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            listaCarrito = resultObj.data;
            console.log(listaCarrito)
        };
    })
});