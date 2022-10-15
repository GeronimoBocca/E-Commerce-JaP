let listaCarrito = []

function crearCarrito(array) {
	let carritoAMostrar = ""

	for (let i = 0; i < array.length; i++) {
		let articulo = array[i];
		carritoAMostrar += `
		<tr>
			<th scope="row" id="imagenArticulo"><img src="${articulo.image}" width="50"></th>
			<td id="nombreArticulo">${articulo.name}</td>
			<td id="costoArticulo">${articulo.currency} ${articulo.unitCost}</td>
				<td id="cantidadArticulo">
				<input id="inputArticulo" class="form-control" type="number" value="${articulo.count}" min="1">
			</td>
			<td id="subtotalArticulo"><strong>${articulo.currency} <span id="subtotal">${articulo.unitCost}</span></strong></td>
		</tr>
		`
		document.getElementById("tbody").innerHTML = carritoAMostrar
	}
}

function cambiar() {
	let precio = ""
	precio += parseInt(listaCarrito.articles[0].unitCost) * parseInt(document.getElementById("inputArticulo").value)
	document.getElementById("subtotal").innerHTML = precio 
}

document.addEventListener("DOMContentLoaded", () => {

	let usuario = "25801"

	getJSONData(CART_INFO_URL + usuario + EXT_TYPE).then(function (resultObj) {
		if (resultObj.status === "ok") {
			listaCarrito = resultObj.data;
			crearCarrito(listaCarrito.articles)
			
			document.getElementById("inputArticulo").addEventListener("change", () => {
				cambiar()
			})
		}
	})


});