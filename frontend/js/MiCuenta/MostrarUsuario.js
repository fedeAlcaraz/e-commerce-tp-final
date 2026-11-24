
import { UsuarioApi } from "../../../back/backend/js/UsuarioApi.js";
import { DireccionApi } from "../../../back/backend/js/DireccionApi.js";
import { LocalidadApi } from "../../../back/backend/js/LocalidadApi.js";

const informacion = document.getElementById("informacion-usuario");

async function mostrarUsuario() {
    informacion.innerHTML = "";

    try {
        const usuario = await UsuarioApi.obtenerMiCuenta();
        const direccion = await DireccionApi.obtenerPorIdUsuario(usuario.idUsuario);
        const localidad = await LocalidadApi.obtenerPorId(direccion[0].idLocalidad);

        // Datos personales
        const datosPersonales = document.createElement("div");
        datosPersonales.classList.add("datos-personales");

        const tituloDatos = document.createElement("h3");
        tituloDatos.textContent = "Información personal";
        tituloDatos.classList.add("titulo-informacion");

        const camposPersonales = [
            ["Nombre", usuario.nombre],
            ["Apellido", usuario.apellido],
            ["DNI", usuario.dni],
            ["Correo electrónico", usuario.email],
            ["Fecha de nacimiento", usuario.fecha_nacimiento]
        ];

        camposPersonales.forEach(([etiqueta, valor]) => {
            const campo = document.createElement("div");
            campo.classList.add("campo-informacion");

            const label = document.createElement("span");
            label.textContent = etiqueta;

            const contenido = document.createElement("p");
            contenido.textContent = valor ?? "-";

            campo.append(label, contenido);
            datosPersonales.appendChild(campo);
        });

        datosPersonales.prepend(tituloDatos);

        // Dirección
        const datosDireccion = document.createElement("div");
        datosDireccion.classList.add("datos-direccion");

        const tituloDireccion = document.createElement("h3");
        tituloDireccion.textContent = "Mi dirección";
        tituloDireccion.classList.add("titulo-informacion");

        const camposDireccion = [
            ["Calle", direccion[0].calle],
            ["Altura", direccion[0].altura],
            ["Piso", direccion[0].piso || "-"],
            ["Departamento", direccion[0].dpto || "-"],
            ["Código postal", direccion[0].cp],
            ["Localidad", localidad.nombre]
        ];

        camposDireccion.forEach(([etiqueta, valor]) => {
            const campo = document.createElement("div");
            campo.classList.add("campo-informacion");

            const label = document.createElement("span");
            label.textContent = etiqueta;

            const contenido = document.createElement("p");
            contenido.textContent = valor ?? "-";

            campo.append(label, contenido);
            datosDireccion.appendChild(campo);
        });

        datosDireccion.prepend(tituloDireccion);

        informacion.append(datosPersonales, datosDireccion);

    } catch (error) {
        console.error("Error al obtener los datos:", error);
        informacion.textContent = "No se pudieron cargar tus datos.";
    }
}

mostrarUsuario();
