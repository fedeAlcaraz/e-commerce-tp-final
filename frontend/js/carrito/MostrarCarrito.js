import { DetalleCarritoApi } from "../../../back/backend/js/DetalleCarritoApi.js";

const productosCarrito = document.getElementById("productos-carrito");

async function mostrarCarrito() {
    productosCarrito.innerHTML = "";
    try {
        const productos = await DetalleCarritoApi.obtenerTodos();

        if (productos.length === 0) {
            productosCarrito.textContent = "Tu carrito está vacío.";
            return;
        }
        productos.forEach(producto => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("producto-carrito");
            tarjeta.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${Number(producto.precio).toLocaleString("es-AR")}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Subtotal: $${(
                    Number(producto.precio) * Number(producto.cantidad)
                ).toLocaleString("es-AR")}</p>
            `;
            productosCarrito.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        productosCarrito.textContent = "No se pudo cargar el carrito.";
    }
}
mostrarCarrito();