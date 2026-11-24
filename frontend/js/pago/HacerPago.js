import { PedidoApi } from "../../../back/backend/js/PedidoApi.js";
import { PagoApi } from "../../../back/backend/js/PagoApi.js";

const formulario = document.getElementById("formulario-pago");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const medioPago = formulario.medio_pago.value;

    if (!medioPago) {
        alert("Seleccioná un medio de pago.");
        return;
    }

    const boton = formulario.querySelector("button[type='submit']");
    boton.disabled = true;

    try {
        // Crear el pedido
        const pedido = await PedidoApi.crear();

        // Obtener el ID del pedido creado
        const idPedido = pedido.idPedido;

        // Crear el pago asociado
        await PagoApi.crear(idPedido, medioPago);

        alert("Pedido registrado correctamente.");

        window.location.href = "index.html";

    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        alert(error.message);
        boton.disabled = false;
    }
});