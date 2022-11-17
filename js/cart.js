let listaCarrito = []

let calle = document.getElementById("calle")
let numero = document.getElementById("numero")
let esquina = document.getElementById("esquina")
let boton1 = document.getElementById("boton1")
let boton2 = document.getElementById("boton2")
let texto = document.getElementById("feedback")

// funcion para crear el carrito, toma un array como parametro

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

// funcion que 

function cambiar() {
	let precio = parseInt(listaCarrito.articles[0].unitCost) * parseInt(document.getElementById("inputArticulo").value)
	let envio = 0

	if (document.getElementById("opcionStandard").checked) {
		envio = precio * 0.05
	}
	else if (document.getElementById("opcionExpress").checked) {
		envio = precio * 0.07
	}
	else {
		envio = precio * 0.15
	}

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
  <hr>
	`
	document.getElementById("listaSubTotal").innerHTML += crearLista
}

function showAlertSuccess() {
	document.getElementById("alert-success").classList.add("show");
}

function enviar() {

	if (calle.value == "") {
		calle.classList.add('is-invalid');
	}
	if (numero.value == "") {
		numero.classList.add('is-invalid')
	}
	if (esquina.value == "") {
		esquina.classList.add('is-invalid')
	}
	if (!boton1.checked && !boton2.checked) {
		texto.style.display = "block"
	}
	if (calle.value !== "" && numero.value !== "" && esquina.value !== "" && boton1.checked) {
		showAlertSuccess()
	}
	if (calle.value !== "" && numero.value !== "" && esquina.value !== "" && boton2.checked) {
		showAlertSuccess()
	}

	document.getElementById("calle").addEventListener("change", () => {
		calle.classList.remove("is-invalid")
	})

	document.getElementById("numero").addEventListener("change", () => {
		numero.classList.remove("is-invalid")
	})

	document.getElementById("esquina").addEventListener("change", () => {
		esquina.classList.remove("is-invalid")
	})
}

function cambiarPago() {
	if (boton1.checked) {
		document.getElementById("numTarjeta").removeAttribute("disabled", "")
		document.getElementById("codSeguridad").removeAttribute("disabled", "")
		document.getElementById("vencimiento").removeAttribute("disabled", "")
		document.getElementById("numCuenta").setAttribute("disabled", "")
		document.getElementById("modalOpcion").innerHTML = boton1.value
		texto.style.display = "none"
	}
	else if (boton2.checked) {
		document.getElementById("numTarjeta").setAttribute("disabled", "")
		document.getElementById("codSeguridad").setAttribute("disabled", "")
		document.getElementById("vencimiento").setAttribute("disabled", "")
		document.getElementById("numCuenta").removeAttribute("disabled", "")
		document.getElementById("modalOpcion").innerHTML = boton2.value
		texto.style.display = "none"
	}
	else {
		document.getElementById("modalOpcion").innerHTML = "No ha seleccionado"
	}
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

			document.getElementById("opcionStandard").addEventListener("change", () => {
				cambiar()
			})
			document.getElementById("opcionExpress").addEventListener("change", () => {
				cambiar()
			})
			document.getElementById("opcionPremium").addEventListener("change", () => {
				cambiar()
			})
		}
	})

	boton1.addEventListener("change", () => {
		cambiarPago()
	})

	boton2.addEventListener("change", () => {
		cambiarPago()
	})


	document.getElementById("enviarCompra").addEventListener("click", (e) => {
		if(calle.value == "" || numero.value == "" || esquina.value == "" || !boton1.checked){
			e.preventDefault()
			e.stopPropagation()
		}
		if(calle.value == "" || numero.value == "" || esquina.value == "" || !boton2.checked){
			e.preventDefault()
			e.stopPropagation()
		}

		enviar()
	})
});