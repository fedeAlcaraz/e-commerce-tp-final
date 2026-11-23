import {api} from "../../backend/js/ClienteApi.js"
const usuarioPrueba = {
    nombre: "Usuario",
    apellido: "Prueba",
    dni: "99888777",
    email: "prueba@natura.com",
    password: "Prueba123!",
    fecha_nacimiento: "2000-01-15"
};
const login = await api.request("/auth/login", "POST", {
    email: "prueba@natura.com",
    password: "Prueba123!"
});

console.log("Login:", login);