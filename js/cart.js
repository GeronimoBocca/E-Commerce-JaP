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
	let	precio = parseInt(listaCarrito.articles[0].unitCost) * parseInt(document.getElementById("inputArticulo").value)
	let envio = precio * 0.05
	let total = precio + envio
	document.getElementById("subtotal").innerHTML = precio
	document.getElementById("subtotal-lista").innerHTML = "USD " + precio
	document.getElementById("envio-lista").innerHTML = "USD " + envio
	document.getElementById("total-lista").innerHTML = "USD " + total
}

function crearListaSubTotal() {
	let crearLista = ""
	crearLista += `
	<ul class="list-group">
	<li class="list-group-item d-flex justify-content-between lh-condensed">
	  <div>
		<h6 class="my-0">Subtotal</h6>
		<small class="text-muted">Costo unitario del producto por cantidad</small>
	  </div>
	  <span id="subtotal-lista" class="text-muted">USD ${listaCarrito.articles[0].unitCost}</span>
	</li>
	<li class="list-group-item d-flex justify-content-between lh-condensed">
	  <div>
		<h6 class="my-0">Costo de envío</h6>
		<small class="text-muted">Segun el tipo de envío</small>
	  </div>
	  <span id="envio-lista" class="text-muted">USD ${listaCarrito.articles[0].unitCost * 0.05}</span>
	</li>
	<li class="list-group-item d-flex justify-content-between lh-condensed">
	  <div>
		<h6 class="my-0">Total ($)</h6>
	  </div>
	  <span><strong id="total-lista">USD ${listaCarrito.articles[0].unitCost + listaCarrito.articles[0].unitCost * 0.05}</strong></span>
	</li>
  </ul>
	`
	document.getElementById("listaSubTotal").innerHTML += crearLista
}

document.addEventListener("DOMContentLoaded", () => {

	let usuario = "25801"

	getJSONData(CART_INFO_URL + usuario + EXT_TYPE).then(function (resultObj) {
		if (resultObj.status === "ok") {
			listaCarrito = resultObj.data;
			crearCarrito(listaCarrito.articles)
			crearListaSubTotal()
			
			document.getElementById("inputArticulo").addEventListener("change", () => {
				cambiar()
			})
		}
	})


});