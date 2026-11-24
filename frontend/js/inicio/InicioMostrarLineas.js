import { LineaApi } from "../../../back/backend/js/LineaApi.js";

const catalogo = document.getElementById("catalogo-lineas");

async function mostrarLineas() {

    try {
        const lineas = await LineaApi.obtenerTodos();
        lineas.forEach(linea => {
            const elemento = document.createElement("div");
            elemento.innerHTML = `
                <h3>${linea.nombre}</h3>
            `;
            catalogo.appendChild(elemento);
        });
    } catch (error) {
        console.error("Error al obtener lineas:", error);
    }
}
mostrarLineas();