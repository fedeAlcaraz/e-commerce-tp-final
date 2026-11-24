import { api } from "./ClienteApi.js";

export class AuthApi {
    static iniciarSesion(datos) {
        return api.request("/auth/login", "POST", datos);
    }
}