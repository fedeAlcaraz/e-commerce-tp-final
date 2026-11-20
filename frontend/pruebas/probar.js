import { ProductoApi } from "../../backend/js/ProductoApi.js";

async function probarProductos() {
    try {
        const respuestaPost = await ProductoApi.crear({ //post
            nombre: "Crema hidratante",
            precio: 15000,
            stock: 20
        });
        console.log("POST:", respuestaPost);
        const id = respuestaPost.idProducto;


        const productos = await ProductoApi.obtenerTodos(); //get todos
        console.log("GET:", productos);


        const respuestaPut = await ProductoApi.actualizar(id, { //put
            nombre: "Crema hidratante modificada",
            precio: 18000,
            stock: 30
        });
        console.log("PUT:", respuestaPut);


        const respuestaPatch = await ProductoApi.actualizarParcial(id, { //patch
            stock: 42
        });
        console.log("PATCH:", respuestaPatch);


        const producto = await ProductoApi.obtenerPorId(id); //get por id
        console.log("GET por ID:", producto);


        const respuestaDelete = await ProductoApi.eliminar(id); //delete
        console.log("DELETE:", respuestaDelete);
    } catch (error) {
        console.error("Error en las pruebas:", error.message);
    }
    
}

probarProductos();