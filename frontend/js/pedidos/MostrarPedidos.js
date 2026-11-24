
import { PedidoApi } from "../../../back/backend/js/PedidoApi.js";

const pedidos = document.getElementById("pedidos");

async function mostrarPedidos() {
    pedidos.innerHTML = "";

    try {
        const resultado = await PedidoApi.obtenerTodos();

        if (resultado.length === 0) {
            pedidos.textContent = "Todavía no realizaste ninguna compra.";
            return;
        }

        resultado.forEach(pedido => {
            const articulo = document.createElement("article");

            const titulo = document.createElement("h3");
            titulo.textContent = `Pedido #${pedido.idPedido}`;

            const fecha = document.createElement("p");
            fecha.textContent = `Fecha: ${pedido.fecha}`;

            const total = document.createElement("p");
            total.textContent =
                `Total: $${Number(pedido.total).toLocaleString("es-AR")}`;

            const estado = document.createElement("p");
            estado.textContent = `Estado: ${pedido.estado}`;

            articulo.append(titulo, fecha, total, estado);
            pedidos.appendChild(articulo);
        });

    } catch (error) {
        console.error("Error al mostrar los pedidos:", error);
        pedidos.textContent = "No se pudieron cargar tus pedidos.";
    }
}

mostrarPedidos();