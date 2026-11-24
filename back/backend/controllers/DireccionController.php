<?php
    require_once __DIR__ . "/../models/Direccion.php";
    class DireccionController {
    private $direccion;
    public function __construct() {
        $this->direccion = new Direccion();
    }
    public function obtenerTodos() {
        $resultado = $this->direccion->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        $resultado = $this->direccion->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "direccion no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function obtenerPorIdUsuario($id) {
        $resultado = $this->direccion->obtenerPorIdUsuario($id);
        if (empty($resultado)) {
            http_response_code(404);
            echo json_encode(["error" => "direcciones no encontradas"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crear($datos) {
        $resultado = $this->direccion->crear($datos);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "direccion creada correctamente",
            "idDireccion" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizar($id, $datos) {
        $resultado = $this->direccion->actualizar($id, $datos);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron campos válidos"]);
            exit;
        }
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "direccion no encontrado o sin cambios"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "direccion actualizada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizarPatch($id, $datos) {
        $resultado = $this->direccion->actualizarPatch($id, $datos);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron campos válidos"]);
        exit;
        }
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "direccion no encontrada o sin cambios"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "direccion actualizada parcialmente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminar($id) {
        $resultado = $this->direccion->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "direccion no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "direccion eliminada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>