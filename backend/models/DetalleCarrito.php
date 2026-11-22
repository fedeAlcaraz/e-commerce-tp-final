<?php
    class DetalleCarrito {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerTodos($id) {
            $sql = "SELECT producto.*, detalle_carrito.cantidad
                    FROM detalle_carrito, producto
                    WHERE detalle_carrito.idProducto = producto.idProducto
                    AND detalle_carrito.idCarrito = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $id);
            $resultado->execute();
            return $resultado->get_result()->fetch_all(MYSQLI_ASSOC);
        }
        public function crear($datos) {
            $sql = "INSERT INTO detalle_carrito (idCarrito, idProducto, cantidad)
                    VALUES (?, ?, ?)";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param(
                "iii",
                $datos['idCarrito'],
                $datos['idProducto'],
                $datos['cantidad']
            );
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function actualizar($idCarrito, $idProducto, $cantidad) {
            $sql = "UPDATE detalle_carrito
                    SET cantidad = ?
                    WHERE idCarrito = ? AND idProducto = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("iii", $cantidad, $idCarrito, $idProducto);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function eliminar($idCarrito, $idProducto) {
            $sql = "DELETE FROM detalle_carrito
                    WHERE idCarrito = ? AND idProducto = ?";

            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("ii", $idCarrito, $idProducto);
            $resultado->execute();

            return $resultado->affected_rows;
        }
    }
?>