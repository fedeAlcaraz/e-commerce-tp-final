<?php
    require_once __DIR__ . "/../models/Pedido.php";
    class PedidoController {
        private $pedido;
        public function __construct() {
            $this->pedido = new Pedido();
        }
        public function obtenerTodos($idUsuario) {
            $resultado = $this->pedido->obtenerTodos($idUsuario);
            http_response_code(200);
            echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
            exit;
        }
        public function obtenerPorId($idPedido, $idUsuario) {
            $resultado = $this->pedido->obtenerPorId($idPedido, $idUsuario);
            if (!$resultado) {
                http_response_code(404);
                echo json_encode(["error" => "pedido no encontrado"]);
                exit;
            }
            http_response_code(200);
            echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
            exit;
        }
        public function obtenerDetalles($idPedido, $idUsuario) {
            $resultado = $this->pedido->obtenerDetalles($idPedido, $idUsuario);
            http_response_code(200);
            echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
            exit;
        }
        public function crear($idUsuario) {
            $resultado = $this->pedido->crear($idUsuario);
            http_response_code(201);
            echo json_encode([
                "mensaje" => "pedido creado correctamente",
                "idPedido" => $resultado
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        public function actualizarPatch($idPedido, $datos) {
            if (!isset($datos['estado'])) {
                http_response_code(400);
                echo json_encode(["error" => "falta especificar el estado"]);
                exit;
            }
            $resultado = $this->pedido->actualizarPatch($idPedido, $datos['estado']
            );
            if ($resultado === 0) {
                http_response_code(404);
                echo json_encode(["error" => "pedido no encontrado o sin cambios"]);
                exit;
            }
            http_response_code(200);
            echo json_encode(["mensaje" => "estado actualizado correctamente"], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
?>