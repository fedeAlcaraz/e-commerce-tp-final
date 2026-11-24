import { DetalleCarritoApi } from "../../../back/backend/js/DetalleCarritoApi.js";

const productosPedido = document.getElementById("productos-pedido");
const totalPedido = document.getElementById("total-pedido");

async function mostrarPedido() {
    productosPedido.innerHTML = "";
    totalPedido.textContent = "$0";
    try {
        const productos = await DetalleCarritoApi.obtenerTodos();
        if (productos.length === 0) {
            productosPedido.textContent = "Tu carrito está vacío.";
            document.querySelector("#formulario-pago button[type='submit']").disabled = true;
            return;
        }
        let total = 0;
        productos.forEach(producto => {
            const precio = Number(producto.precio);
            const cantidad = Number(producto.cantidad);
            const subtotal = precio * cantidad;

            total += subtotal;

            const articulo = document.createElement("article");

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

            const precioTexto = document.createElement("p");
            precioTexto.textContent =
                `Precio unitario: $${precio.toLocaleString("es-AR")}`;

            const cantidadTexto = document.createElement("p");
            cantidadTexto.textContent = `Cantidad: ${cantidad}`;

            const subtotalTexto = document.createElement("p");
            subtotalTexto.textContent =
                `Subtotal: $${subtotal.toLocaleString("es-AR")}`;

            articulo.append(nombre, precioTexto, cantidadTexto, subtotalTexto);
            productosPedido.appendChild(articulo);
        });

        totalPedido.textContent = `$${total.toLocaleString("es-AR")}`;

    } catch (error) {
        console.error("Error al mostrar el pedido:", error);
        productosPedido.textContent = "No se pudo cargar el detalle del pedido.";
    }
}

mostrarPedido();