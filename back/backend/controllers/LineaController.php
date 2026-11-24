<?php
    require_once __DIR__ . "/../models/Linea.php";
    class LineaController {
    private $linea;
    public function __construct() {
        $this->linea = new Linea();
    }
    public function obtenerTodos() {
        $resultado = $this->linea->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        $resultado = $this->linea->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "linea no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crear($datos) {
        $resultado = $this->linea->crear($datos);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "linea creada correctamente",
            "idlinea" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizar($id, $datos) {
        $resultado = $this->linea->actualizar($id, $datos);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron campos válidos"]);
            exit;
        }
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "linea no encontrado o sin cambios"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "linea actualizada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminar($id) {
        $resultado = $this->linea->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "linea no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "linea eliminada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>