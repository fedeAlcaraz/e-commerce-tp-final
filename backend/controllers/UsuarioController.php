<?php
    require_once __DIR__ . "/../models/Usuario.php";
    class UsuarioController {
    private $usuario;
    public function __construct() {
        $this->usuario = new Usuario();
    }
    public function obtenerTodos() {
        $resultado = $this->usuario->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorId($id) {
        $resultado = $this->usuario->obtenerPorId($id);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "usuario no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function crear($datos) {
        $resultado = $this->usuario->crear($datos);
        http_response_code(201);
        echo json_encode([
            "mensaje" => "usuario creado correctamente",
            "idusuario" => $resultado], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizar($id, $datos) {
        $resultado = $this->usuario->actualizar($id, $datos);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "usuario no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "usuario actualizado correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizarPatch($id, $datos) {
        $resultado = $this->usuario->actualizarPatch($id, $datos);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "No se recibieron campos válidos"]);
        exit;
        }
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Usuario no encontrado o sin cambios"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "Usuario actualizado parcialmente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function eliminar($id) {
        $resultado = $this->usuario->eliminar($id);
        if ($resultado === 0) {
            http_response_code(404);
            echo json_encode(["error" => "Usuario no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "Usuario eliminado correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>