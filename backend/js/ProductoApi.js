import { api } from "./ClienteApi.js";

export class ProductoApi {

    static obtenerTodos() {
        return api.request("/productos", "GET");
    }
    static obtenerPorId(id) {
        return api.request("/productos/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/productos", "POST", datos);
    }
    static actualizar(id, datos) {
        return api.request("/productos/" + id, "PUT", datos);
    }
    static actualizarParcial(id, datos) {
        return api.request("/productos/" + id, "PATCH", datos);
    }
    static eliminar(id) {
        return api.request("/productos/" + id, "DELETE");
    }
}