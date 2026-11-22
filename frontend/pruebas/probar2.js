async function probarEndpointsCategorias() {
    const baseUrl = "/backend/e-commerce-tp-final/api/categorias";

    try {
        const respuestaPost = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: "q piola seria q ande"
            })
        });
        const dataPost = await respuestaPost.json();
        console.log("Respuesta POST:", dataPost);
        const idCreado = dataPost.idcategoria;

        const respuestaGet = await fetch(baseUrl);
        const textoGet = await respuestaGet.text();
        console.log("Respuesta GET (todas):", textoGet);
        const respuestaGetId = await fetch(`${baseUrl}/${idCreado}`);
        const textoGetId = await respuestaGetId.text();
        console.log(`Respuesta GET por ID (${idCreado}):`, textoGetId);

        // 4. PUT: Modificar el nombre de esa categoría
        const respuestaPut = await fetch(`${baseUrl}/${idCreado}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: "Cuidado Facial Modificado"
            })
        });
        const textoPut = await respuestaPut.text();
        console.log("Respuesta PUT:", textoPut);

        // 5. GET después de PUT: Verificar el cambio
        const respuestaGet2 = await fetch(baseUrl);
        const textoGet2 = await respuestaGet2.text();
        console.log("GET después de PUT:", textoGet2);
        const respuestaPatch = await fetch(`${baseUrl}/${idCreado}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: "Intento con PATCH"
            })
        });
        console.log("Status PATCH (esperado 405):", respuestaPatch.status);
        const textoPatch = await respuestaPatch.text();
        console.log("Respuesta PATCH:", textoPatch);
        const respuestaDelete = await fetch(`${baseUrl}/${idCreado}`, {
            method: "DELETE"
        });
        const textoDelete = await respuestaDelete.text();
        console.log("Respuesta DELETE:", textoDelete);

        const respuestaGet3 = await fetch(baseUrl);
        const textoGet3 = await respuestaGet3.text();
        console.log("GET después de DELETE:", textoGet3);

    } catch (error) {
        console.error("Hubo un problema:", error);
    }
}

probarEndpointsCategorias();