<?php
class Pedido {
    private $conn;
    public function __construct() {
        $this->conn = require __DIR__ . "/../config/Database.php";
    }
    public function obtenerTodos($idUsuario) {
        $sql = "SELECT * FROM pedido WHERE idUsuario = ?";
        $resultado = $this->conn->prepare($sql);
        $resultado->bind_param("i", $idUsuario);
        $resultado->execute();

        return $resultado->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    public function obtenerPorId($idPedido, $idUsuario) {
        $sql = "SELECT * FROM pedido WHERE idPedido = ? AND idUsuario = ?";
        $resultado = $this->conn->prepare($sql);
        $resultado->bind_param("ii", $idPedido, $idUsuario);
        $resultado->execute();
        return $resultado->get_result()->fetch_assoc();
    }
    public function obtenerDetalles($idPedido, $idUsuario) {
    $sql = "SELECT detalle_pedido.*, producto.nombre
            FROM detalle_pedido, producto, pedido
            WHERE detalle_pedido.idProducto = producto.idProducto
            AND detalle_pedido.idPedido = pedido.idPedido
            AND pedido.idPedido = ?
            AND pedido.idUsuario = ?";
        $resultado = $this->conn->prepare($sql);
        $resultado->bind_param("ii", $idPedido, $idUsuario);
        $resultado->execute();
        return $resultado->get_result()->fetch_all(MYSQLI_ASSOC);
    }
    public function crear($idUsuario) {
        $this->conn->begin_transaction();
        try {
            $idPedido = null;
            $total = 0;
            $sql = "SELECT idCarrito FROM carrito WHERE idUsuario = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idUsuario);
            $resultado->execute();
            $carrito = $resultado->get_result()->fetch_assoc();
            $idCarrito = $carrito['idCarrito'];
            $sql = "SELECT detalle_carrito.cantidad, detalle_carrito.idProducto, producto.precio
                    FROM detalle_carrito, producto
                    WHERE detalle_carrito.idProducto = producto.idProducto
                    AND detalle_carrito.idCarrito = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idCarrito);
            $resultado->execute();
            $productos = $resultado->get_result()->fetch_all(MYSQLI_ASSOC);
            foreach ($productos as $producto) {
                $total += $producto['precio'] * $producto['cantidad'];
            }
            $sql = "INSERT INTO pedido (idUsuario, estado, total, fecha) VALUES (?, 'pendiente', ?, NOW())";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("id", $idUsuario, $total);
            $resultado->execute();
            $idPedido = $this->conn->insert_id;
            $sql = "INSERT INTO detalle_pedido (idPedido, idProducto, cantidad, precio_unitario) VALUES (?,?,?,?)";
            $resultado = $this->conn->prepare($sql);
            foreach ($productos as $producto) {
                $idProducto = $producto['idProducto'];
                $cantidad = $producto['cantidad'];
                $precio = $producto['precio'];
                $resultado->bind_param("iiid",
                    $idPedido,
                    $idProducto,
                    $cantidad,
                    $precio
                );
                $resultado->execute();
            }
            $sql = "DELETE FROM detalle_carrito WHERE idCarrito = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idCarrito);
            $resultado->execute();
            $this->conn->commit();
            return $idPedido;
        } catch (Exception $e) {
            $this->conn->rollback();
            throw $e;
        }
    }
    public function actualizarPatch($idPedido, $estado) {
        $sql = "UPDATE pedido SET estado = ? WHERE idPedido = ?";
        $resultado = $this->conn->prepare($sql);
        $resultado->bind_param("si", $estado, $idPedido);
        $resultado->execute();
        return $resultado->affected_rows;
    }
}