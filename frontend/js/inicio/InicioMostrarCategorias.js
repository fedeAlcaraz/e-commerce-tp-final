import { CategoriaApi } from "../../../back/backend/js/CategoriaApi.js";

const catalogo = document.getElementById("catalogo-categorias");

async function mostrarCategorias() {

    try {
        const categorias = await CategoriaApi.obtenerTodos();

        categorias.forEach(categoria => {

            const elemento = document.createElement("div");

            elemento.innerHTML = `
                <h3>${categoria.nombre}</h3>
            `;

            catalogo.appendChild(elemento);
        });

    } catch (error) {
        console.error("Error al obtener categorías:", error);
    }
}

mostrarCategorias();