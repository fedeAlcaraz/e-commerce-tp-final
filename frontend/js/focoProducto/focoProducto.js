import { ProductoApi } from "../../../back/backend/js/ProductoApi.js";
import { DetalleCarritoApi } from "../../../back/backend/js/DetalleCarritoApi.js";
const detalle = document.getElementById("detalle-producto");
async function mostrarDetalle() {

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
        detalle.textContent = "Producto no encontrado.";
        return;
    }
    try {
        const producto = await ProductoApi.obtenerPorId(id);
        detalle.innerHTML = `
            <div class="imagen-placeholder">
                Sin imagen disponible
            </div>
            <div class="informacion-producto">
                <h1>${producto.nombre}</h1>
                <p>${producto.descripcion ?? "Sin descripción disponible."}</p>
                <p>Precio: $${Number(producto.precio).toLocaleString("es-AR")}</p>
                <p>Stock disponible: ${producto.stock}</p>
                <button type="button" id="agregar-carrito">
                    Agregar al carrito
                </button>
            </div>
        `;
        const boton = detalle.querySelector("#agregar-carrito");
            boton.addEventListener("click", async () => {
            try {
                await DetalleCarritoApi.crear({
                idProducto: producto.idProducto,
                cantidad: 1
            });
            alert("Producto agregado al carrito");
            } catch (error) {
                console.error("Error al agregar al carrito:", error);
                alert(error.message);
            }
        });
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        detalle.textContent = "No se pudo cargar el producto.";
    }
}
mostrarDetalle();