import { api } from "./ClienteApi.js";

export class LocalidadApi {

    static obtenerTodos() {
        return api.request("/localidades", "GET");
    }
    static obtenerPorId(id) {
        return api.request("/localidades/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/localidades", "POST", datos);
    }
    static actualizar(id, datos) {
        return api.request("/localidades/" + id, "PUT", datos);
    }
    static eliminar(id) {
        return api.request("/localidades/" + id, "DELETE");
    }
}