
import { PedidoApi } from "../../../back/backend/js/PedidoApi.js";

const pedidos = document.getElementById("pedidos");

async function mostrarPedidos() {
    pedidos.innerHTML = "";

    try {
        const resultado = await PedidoApi.obtenerTodos();

        if (resultado.length === 0) {
            const mensaje = document.createElement("div");
            mensaje.classList.add("pedidos-vacios");

            const titulo = document.createElement("h3");
            titulo.textContent = "Todavía no realizaste ninguna compra.";

            const descripcion = document.createElement("p");
            descripcion.textContent = "Cuando realices un pedido, aparecerá en esta sección.";

            const enlace = document.createElement("a");
            enlace.href = "index.html";
            enlace.textContent = "Explorar productos";
            enlace.classList.add("boton-explorar");

            mensaje.append(titulo, descripcion, enlace);
            pedidos.appendChild(mensaje);

            return;
        }

        resultado.forEach(pedido => {
            const articulo = document.createElement("article");
            articulo.classList.add("tarjeta-pedido");

            const encabezado = document.createElement("div");
            encabezado.classList.add("encabezado-pedido");

            const titulo = document.createElement("h3");
            titulo.textContent = `Pedido #${pedido.idPedido}`;

            const estado = document.createElement("span");
            estado.textContent = pedido.estado;
            estado.classList.add("estado-pedido");

            encabezado.append(titulo, estado);

            const detalles = document.createElement("div");
            detalles.classList.add("detalles-pedido");

            const fecha = document.createElement("div");
            fecha.classList.add("dato-pedido");

            const etiquetaFecha = document.createElement("span");
            etiquetaFecha.textContent = "Fecha";

            const valorFecha = document.createElement("p");
            valorFecha.textContent = pedido.fecha;

            fecha.append(etiquetaFecha, valorFecha);

            const total = document.createElement("div");
            total.classList.add("dato-pedido");

            const etiquetaTotal = document.createElement("span");
            etiquetaTotal.textContent = "Total";

            const valorTotal = document.createElement("p");
            valorTotal.textContent =
                `$${Number(pedido.total).toLocaleString("es-AR")}`;

            total.append(etiquetaTotal, valorTotal);

            detalles.append(fecha, total);
            articulo.append(encabezado, detalles);

            pedidos.appendChild(articulo);
        });
    } catch (error) {
        console.error("Error al mostrar los pedidos:", error);

        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-error");
        mensaje.textContent = "No se pudieron cargar tus pedidos.";

        pedidos.appendChild(mensaje);
    }
}
mostrarPedidos();
