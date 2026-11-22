import { api } from "./ClienteApi.js";

export class UsuarioApi {

    static obtenerTodos() {
        return api.request("/usuarios", "GET");
    }
    static obtenerPorId(id) {
        return api.request("/usuarios/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/usuarios", "POST", datos);
    }
    static actualizar(id, datos) {
        return api.request("/usuarios/" + id, "PUT", datos);
    }
    static actualizarPatch(id, datos) {
        return api.request("/usuarios/" + id, "PATCH", datos);
    }
    static eliminar(id) {
        return api.request("/usuarios/" + id, "DELETE");
    }
}