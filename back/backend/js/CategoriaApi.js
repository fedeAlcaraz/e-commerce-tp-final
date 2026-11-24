import { api } from "./ClienteApi.js";

export class CategoriaApi {

    static obtenerTodos() {
        return api.request("/categorias", "GET");
    }
    static obtenerPorId(id) {
        return api.request("/categorias/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/categorias", "POST", datos);
    }
    static actualizar(id, datos) {
        return api.request("/categorias/" + id, "PUT", datos);
    }
    static eliminar(id) {
        return api.request("/categorias/" + id, "DELETE");
    }
}