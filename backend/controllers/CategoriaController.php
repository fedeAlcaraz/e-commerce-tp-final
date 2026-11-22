<?php
    require_once __DIR__ . "/../models/Categoria.php";
    class CategoriaController {
    private $categoria;
    public function __construct() {
        $this->categoria = new Categoria();
    }
    public function obtenerTodos() {
        $resultado = $this->categoria->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        $resultado = $this->categoria->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "categoria no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crear($datos) {
        $resultado = $this->categoria->crear($datos);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "categoria creada correctamente",
            "idcategoria" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizar($id, $datos) {
        $resultado = $this->categoria->actualizar($id, $datos);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron campos válidos"]);
            exit;
        }
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "categoria no encontrado o sin cambios"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "categoria actualizada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminar($id) {
        $resultado = $this->categoria->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "categoria no encontrada"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "categoria eliminada correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>