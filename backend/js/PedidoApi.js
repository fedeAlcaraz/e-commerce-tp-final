import { api } from "../../backend/js/ClienteApi.js";

export class PedidoApi {
    static obtenerTodos(idUsuario) {
        return api.request("/pedidos?idUsuario=" + idUsuario, "GET");
    }
    static obtenerPorId(idPedido, idUsuario) {
        return api.request("/pedidos/" + idPedido + "?idUsuario=" + idUsuario, "GET");
    }
    static obtenerDetalles(idPedido, idUsuario) {
        return api.request("/pedidos/" + idPedido + "/detalles?idUsuario=" + idUsuario, "GET");
    }
    static crear(idUsuario) {
        return api.request("/pedidos", "POST", {idUsuario: idUsuario});
    }
    static actualizarEstado(idPedido, estado) {
        return api.request("/pedidos/" + idPedido, "PATCH", {estado: estado});
    }
}