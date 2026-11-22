import { api } from "./ClienteApi.js";

export class CarritoApi {
    static obtenerPorId(id) {
        return api.request("/carritos/" + id, "GET");
    }
    static crear(datos) {
        return api.request("/carritos", "POST", datos);
    }
    static eliminar(id) {
        return api.request("/carritos/" + id, "DELETE");
    }
}