<?php
    require_once __DIR__ . "/../models/Producto.php";
    class ProductoController {
    private $producto;
    public function __construct() {
        $this->producto = new Producto();
    }
    public function obtenerTodos() {
        $resultado = $this->producto->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        $resultado = $this->producto->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crearProducto($datos) {
        $resultado = $this->producto->crearProducto($datos);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "Producto creado correctamente",
            "idProducto" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizarProducto($id, $datos) {
        $resultado = $this->producto->actualizar($id, $datos);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "Producto actualizado correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminarProducto($id) {
        $resultado = $this->producto->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Producto no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "Producto eliminado correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>