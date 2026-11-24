import { UsuarioApi } from "../../../back/backend/js/UsuarioApi.js";

const formulario = document.getElementById("formulario-editar-cuenta");
const mensaje = document.getElementById("mensaje-resultado");

let usuarioActual = null;

// Cargar los datos actuales
async function cargarDatos() {
    try {
        usuarioActual = await UsuarioApi.obtenerMiCuenta();

        document.getElementById("nombre").value = usuarioActual.nombre ?? "";
        document.getElementById("apellido").value = usuarioActual.apellido ?? "";
        document.getElementById("dni").value = usuarioActual.dni ?? "";
        document.getElementById("email").value = usuarioActual.email ?? "";
        document.getElementById("fecha-nacimiento").value =
            usuarioActual.fecha_nacimiento ?? "";

    } catch (error) {
        mensaje.textContent = "No se pudieron cargar tus datos: " + error.message;
    }
}

// Guardar los cambios
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!usuarioActual) {
        mensaje.textContent = "No se pudieron obtener los datos de tu cuenta.";
        return;
    }

    const datos = {
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        dni: document.getElementById("dni").value,
        email: document.getElementById("email").value,
        fecha_nacimiento: document.getElementById("fecha-nacimiento").value
    };

    try {
        await UsuarioApi.actualizarMiCuenta(datos);

        mensaje.textContent = "Tus datos se actualizaron correctamente.";

    } catch (error) {
        mensaje.textContent = "No se pudieron guardar los cambios: " + error.message;
    }
});

cargarDatos();