import { ProductoApi } from "../../back/backend/js/ProductoApi.js";
const catalogo = document.getElementById("catalogo-productos");
async function mostrarProductos() {
    catalogo.innerHTML = "";
    try {
        const productos = await ProductoApi.obtenerTodos();
        console.log(productos);
        productos.forEach(producto => {
            const imagen = `<div class="imagen-placeholder">Sin imagen</div>`;
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("producto");
            tarjeta.innerHTML = `
                ${imagen}
                <div class="informacion-producto">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <p class="precio">
                        $${Number(producto.precio).toLocaleString("es-AR")}
                    </p>
                    <button type="button" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            `;
            catalogo.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        catalogo.textContent = "No se pudieron cargar los productos.";
    }
}
mostrarProductos();