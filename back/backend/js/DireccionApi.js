import { api } from "./ClienteApi.js";

export class DireccionApi {

    static obtenerTodos() {
        return api.request("/direcciones", "GET");
    }
    static obtenerPorId(id) {
        return api.request("/direcciones/" + id, "GET");
    }
    static obtenerPorIdUsuario(id) {
        return api.request("/direcciones/usuario/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/direcciones", "POST", datos);
    }
    static actualizar(id, datos) {
        return api.request("/direcciones/" + id, "PUT", datos);
    }
    static actualizarPatch(id, datos) {
        return api.request("/direcciones/" + id, "PATCH", datos);
    }
    static eliminar(id) {
        return api.request("/direcciones/" + id, "DELETE");
    }
}