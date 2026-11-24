import { api } from "../../backend/js/ClienteApi.js";

export class PedidoApi {
    static obtenerTodos() {
        return api.request("/pedidos", "GET");
    }
    static obtenerPorId(idPedido) {
        return api.request("/pedidos/" + idPedido, "GET");
    }
    static obtenerDetalles(idPedido) {
        return api.request("/pedidos/" + idPedido + "/detalles", "GET");
    }
    static crear() {
        return api.request("/pedidos", "POST");
    }
    static actualizarEstado(idPedido, estado) {
        return api.request("/pedidos/" + idPedido, "PATCH", {estado: estado});
    }
}