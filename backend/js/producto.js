async function probarEndpoints() {
    try {
        const respuestaPost = await fetch(
            "/tp_final/e-commerce-tp-final/api/productos",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: "Crema hidratante",
                    precio: 15000,
                    stock: 20
                })
            }
        );
        const textoPost = await respuestaPost.text();
        console.log("Respuesta POST:", textoPost);

        const respuestaGet = await fetch(
            "/tp_final/e-commerce-tp-final/api/productos"
        );
        const textoGet = await respuestaGet.text();
        console.log("Respuesta GET:", textoGet);
        const respuestaPut = await fetch(
            "/tp_final/e-commerce-tp-final/api/productos/3",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre: "Producto modificado",
                    precio: 18000,
                    stock: 30
                })
            }
        );
        const textoPut = await respuestaPut.text();
        console.log("Respuesta PUT:", textoPut);
        const respuestaGet2 = await fetch(
            "/tp_final/e-commerce-tp-final/api/productos"
        );
        const textoGet2 = await respuestaGet2.text();
        console.log("GET después de PUT:", textoGet2);
        const respuestaDelete = await fetch(
            "/tp_final/e-commerce-tp-final/api/productos/3",
            {
                method: "DELETE"
            }
        );
        const textoDelete = await respuestaDelete.text();
        console.log("Respuesta DELETE:", textoDelete);
        const respuestaGet3 = await fetch(
            "/tp_final/e-commerce-tp-final/api/productos"
        );

        const textoGet3 = await respuestaGet3.text();
        console.log("GET después de DELETE:", textoGet3);

    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

probarEndpoints();