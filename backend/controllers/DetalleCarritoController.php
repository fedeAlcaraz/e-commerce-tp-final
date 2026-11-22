
<?php
    require_once __DIR__ . "/../models/DetalleCarrito.php";

    class DetalleCarritoController {
        private $detalleCarrito;

        public function __construct() {
            $this->detalleCarrito = new DetalleCarrito();
        }

        public function obtenerTodos($idCarrito) {
            $resultado = $this->detalleCarrito->obtenerTodos($idCarrito);

            http_response_code(200);
            echo json_encode($resultado, JSON_UNESCAPED_UNICODE);
            exit;
        }

        public function crear($datos) {
            $resultado = $this->detalleCarrito->crear($datos);

            http_response_code(201);
            echo json_encode([
                "mensaje" => "producto agregado correctamente"
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }

        public function actualizar($idCarrito, $idProducto, $datos) {
            $resultado = $this->detalleCarrito->actualizar(
                $idCarrito,
                $idProducto,
                $datos['cantidad']
            );
            if ($resultado === 0) {
                http_response_code(404);
                echo json_encode(["error" => "producto no encontrado o sin cambios"]);
                exit;
            }
            http_response_code(200);
            echo json_encode([
                "mensaje" => "cantidad actualizada correctamente"
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
        public function eliminar($idCarrito, $idProducto) {
            $resultado = $this->detalleCarrito->eliminar($idCarrito, $idProducto);
            if ($resultado === 0) {
                http_response_code(404);
                echo json_encode(["error" => "producto no encontrado"]);
                exit;
            }
            http_response_code(200);
            echo json_encode([
                "mensaje" => "producto eliminado correctamente"
            ], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }
?>
