import { UsuarioApi } from "../../../back/backend/js/UsuarioApi.js";

const formulario = document.getElementById("form-registro");
const mensaje = document.getElementById("mensaje-registro");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const datos = {
        nombre: formulario.nombre.value,
        apellido: formulario.apellido.value,
        dni: formulario.dni.value,
        email: formulario.email.value,
        password: formulario.password.value,
        fecha_nacimiento: formulario.fecha_nacimiento.value
    };
    try {
        const resultado = await UsuarioApi.crear(datos);

        mensaje.textContent = resultado.mensaje;
        formulario.reset();
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        mensaje.textContent = error.message;
    }
});
