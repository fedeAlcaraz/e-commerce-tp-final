import { api } from "../../backend/js/ClienteApi.js";

export class PagoApi {

    static obtenerTodos() {
        return api.request("/pagos", "GET");
    }

    static obtenerPorId(idPago) {
        return api.request("/pagos/" + idPago, "GET");
    }

    static crear(idPedido, medioPago) {
        return api.request("/pedidos/" + idPedido + "/pago", "POST", {
            medio_pago: medioPago
        });
    }

    static actualizarEstado(idPago, estado) {
        return api.request("/pagos/" + idPago, "PATCH", {
            estado: estado
        });
    }
}