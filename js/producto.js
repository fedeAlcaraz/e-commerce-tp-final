async function cargarProductos() {
    try {
        const respuesta = await fetch(
            '/tp_final/e-commerce-tp-final/backend/api.php?recurso=productos'
        );

        const texto = await respuesta.text();

        console.log("Respuesta del servidor:", texto);

    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

cargarProductos();