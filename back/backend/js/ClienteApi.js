class ClienteApi {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    async request(endpoint, method, datos = null) {
        const response = await fetch(this.baseURL + endpoint, {
            method: method,
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            body: datos !== null ? JSON.stringify(datos) : null
        });
        const resultado = await response.json();
        if (!response.ok) {
            throw new Error(resultado.error || "Error HTTP: " + response.status);
        }
        return resultado;
    }
}
export const api = new ClienteApi("/backend/e-commerce-tp-final/api");