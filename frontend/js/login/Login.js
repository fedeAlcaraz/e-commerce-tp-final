import { AuthApi } from "../../../back/backend/js/AuthApi.js";

const formulario = document.getElementById("form-login");
formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const datos = {
        email: formulario.email.value,
        password: formulario.password.value
    };
    try {
        const resultado = await AuthApi.iniciarSesion(datos);
        console.log(resultado);
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
    }
});