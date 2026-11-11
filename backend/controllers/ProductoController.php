<?php
    require_once __DIR__ . "/../models/Producto.php";
    class ProductoController {
    private $producto;
    public function __construct() {
        $this->producto = new Producto();
    }
    public function obtenerTodos() {
        $resultado = $this->producto->obtenerTodos();
        header("Content-Type: application/json; charset=utf-8");

        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        // Obtener producto por ID.
    }

    public function crearProducto() {
        // Crear producto.
    }
}
?>