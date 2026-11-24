import { UsuarioApi } from "../../../back/backend/js/UsuarioApi.js";
import { DireccionApi } from "../../../back/backend/js/DireccionApi.js";
import { LocalidadApi } from "../../../back/backend/js/LocalidadApi.js";

const formulario = document.getElementById("form-registro");
const mensaje = document.getElementById("mensaje-registro");
const selectLocalidad = document.getElementById("idLocalidad");
try {
    const localidades = await LocalidadApi.obtenerTodos();

    localidades.forEach(localidad => {
        const opcion = document.createElement("option");
        opcion.value = localidad.idLocalidad;
        opcion.textContent = localidad.nombre;
        selectLocalidad.appendChild(opcion);
    });
    } catch (error) {
        console.error("Error al cargar localidades:", error);
    }
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
    const datosDireccion = {
        calle: formulario.calle.value,
        altura: formulario.altura.value,
        piso: formulario.piso.value,
        dpto: formulario.dpto.value,
        cp: formulario.cp.value,
        idLocalidad: formulario.idLocalidad.value
    };
    try {
        const resultado = await UsuarioApi.crear(datos);
        const idUsuario = resultado.idUsuario;
        mensaje.textContent = resultado.mensaje;
        await DireccionApi.crear({...datosDireccion, idUsuario});
        mensaje.textContent = "Usuario registrado correctamente.";
        formulario.reset();
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        mensaje.textContent = error.message;
    }
});
