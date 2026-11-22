<?php
    require_once __DIR__ . "/../models/Localidad.php";
    class LocalidadController {
    private $localidad;
    public function __construct() {
        $this->localidad = new Localidad();
    }
    public function obtenerTodos() {
        $resultado = $this->localidad->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        $resultado = $this->localidad->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "localidad no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crear($datos) {
        $resultado = $this->localidad->crear($datos);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "localidad creada correctamente",
            "idLocalidad" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizar($id, $datos) {
        $resultado = $this->localidad->actualizar($id, $datos);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron campos válidos"]);
            exit;
        }
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "localidad no encontrado o sin cambios"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "localidad actualizada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminar($id) {
        $resultado = $this->localidad->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "localidad no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "localidad eliminada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>