import { api } from "./ClienteApi.js";

export class LineaApi {

    static obtenerTodos() {
        return api.request("/lineas", "GET");
    }
    static obtenerPorId(id) {
        return api.request("/lineas/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/lineas", "POST", datos);
    }
    static actualizar(id, datos) {
        return api.request("/lineas/" + id, "PUT", datos);
    }
    static eliminar(id) {
        return api.request("/lineas/" + id, "DELETE");
    }
}