<?php

require_once __DIR__ . "/../models/Pago.php";

class PagoController {
    private $pago;
    public function __construct() {
        $this->pago = new Pago();
    }
    public function obtenerTodos() {
        $resultado = $this->pago->obtenerTodos();
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function obtenerPorId($idPago) {
        $resultado = $this->pago->obtenerPorId($idPago);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "pago no encontrado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function obtenerPorIdPedido($idPedido) {
        $resultado = $this->pago->obtenerPorIdPedido($idPedido);
        if (!$resultado) {
            http_response_code(404);
            echo json_encode(["error" => "pago no encontrado para este pedido"]);
            exit;
        }
        http_response_code(200);
        echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
        exit;
    }

    public function crear($idPedido, $datos) {
        $resultado = $this->pago->crear($idPedido, $datos['medio_pago']);
        if (!$resultado) {
            http_response_code(400);
            echo json_encode(["error" => "no se pudo registrar el pago"]);
            exit;
        }
        http_response_code(201);
        echo json_encode([
            "mensaje" => "pago registrado correctamente",
            "idPago" => $resultado
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
    public function actualizarPatch($idPago, $datos) {
        $estado = $datos['estado'];
        $resultado = $this->pago->actualizarPatch($idPago, $estado);
        if ($resultado === null) {
            http_response_code(404);
            echo json_encode(["error" => "pago no encontrado"]);
            exit;
        }
        if ($resultado === false) {
            http_response_code(409);
            echo json_encode(["error" => "el pago ya fue procesado"]);
            exit;
        }
        http_response_code(200);
        echo json_encode(["mensaje" => "estado del pago actualizado correctamente"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}
?>