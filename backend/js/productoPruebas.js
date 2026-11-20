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
            "/tp_final/e-commerce-tp-final/api/productos/22",
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
            "/tp_final/e-commerce-tp-final/api/productos/22",
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
        console.log("GET despues de DELETE:", textoGet3);

        const respuesta = await fetch("/backend/e-commerce-tp-final/api/productos/23", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            stock: 42
        })
    });

    const resultado = await respuesta.json();
    console.log("Respuesta PATCH:", resultado);

    // Consultamos el producto para comprobar el cambio
    const consulta = await fetch("/backend/e-commerce-tp-final/api/productos/23");
    const producto = await consulta.json();

    console.log("Producto después de PATCH:", producto);
    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

probarEndpoints();