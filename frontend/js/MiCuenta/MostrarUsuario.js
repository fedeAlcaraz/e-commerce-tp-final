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

        const nombre = document.createElement("p");
        nombre.textContent = `Nombre: ${usuario.nombre}`;

        const apellido = document.createElement("p");
        apellido.textContent = `Apellido: ${usuario.apellido}`;

        const dni = document.createElement("p");
        dni.textContent = `DNI: ${usuario.dni}`;

        const email = document.createElement("p");
        email.textContent = `Email: ${usuario.email}`;

        const fechaNacimiento = document.createElement("p");
        fechaNacimiento.textContent =
            `Fecha de nacimiento: ${usuario.fecha_nacimiento}`;

        informacion.append(
            nombre,
            apellido,
            dni,
            email,
            fechaNacimiento
        );

        const tituloDireccion = document.createElement("h3");
        tituloDireccion.textContent = "Mi dirección";

        const calle = document.createElement("p");
        calle.textContent = `Calle: ${direccion[0].calle}`;

        const altura = document.createElement("p");
        altura.textContent = `Altura: ${direccion[0].altura}`;

        const piso = document.createElement("p");
        piso.textContent = `Piso: ${direccion[0].piso || "-"}`;

        const dpto = document.createElement("p");
        dpto.textContent = `Departamento: ${direccion[0].dpto || "-"}`;

        const cp = document.createElement("p");
        cp.textContent = `Código postal: ${direccion[0].cp}`;

        const nombreLocalidad = document.createElement("p");
        nombreLocalidad.textContent = `Localidad: ${localidad.nombre}`;

        informacion.append(
            tituloDireccion,
            calle,
            altura,
            piso,
            dpto,
            cp,
            nombreLocalidad
        );
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        informacion.textContent = "No se pudieron cargar tus datos.";
    }
}
mostrarUsuario();
