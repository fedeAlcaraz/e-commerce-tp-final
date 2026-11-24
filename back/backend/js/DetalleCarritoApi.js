import { api } from "../../backend/js/ClienteApi.js";

export class DetalleCarritoApi {

    static obtenerTodos(idCarrito) {
        return api.request("/carritos/productos?idCarrito=" + idCarrito, "GET");
    }
    static crear(datos) {
        return api.request("/carritos/productos", "POST", datos);
    }
    static actualizar(idCarrito, idProducto, datos) {
        return api.request("/carritos/productos/" + idProducto + "?idCarrito=" + idCarrito, "PATCH", datos);
    }
    static eliminar(idCarrito, idProducto) {
        return api.request("/carritos/productos/" + idProducto + "?idCarrito=" + idCarrito, "DELETE");
    }
}