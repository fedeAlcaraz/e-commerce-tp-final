<?php
    require_once __DIR__ . "/../models/Carrito.php";
    class CarritoController {
    private $carrito;
    public function __construct() {
        $this->carrito = new Carrito();
    }
    public function obtenerPorId($id) {
        $resultado = $this->carrito->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "carrito no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function obtenerPorIdUsuario($id) {
        $resultado = $this->carrito->obtenerPorIdUsuario($id);
        if (empty($resultado)) {
            http_response_code(404);
            echo json_encode(["error" => "carrito no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crear($idUsuario) {
        $resultado = $this->carrito->crear($idUsuario);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "carrito creado correctamente",
            "idCarrito" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminar($id) {
        $resultado = $this->carrito->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "carrito no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "carrito eliminada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>