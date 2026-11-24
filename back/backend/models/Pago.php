<?php
    class Pago {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM pago";
            $resultado = $this->conn->prepare($sql);
            $resultado->execute();
            return $resultado->get_result()->fetch_all(MYSQLI_ASSOC);
        }
        public function obtenerPorId($idPago) {
            $sql = "SELECT * FROM pago WHERE idPago = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idPago); 
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc();
        }
        public function obtenerPorIdPedido($idPedido) {
            $sql = "SELECT * FROM pago WHERE idPedido = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idPedido);
            $resultado->execute();
            return $resultado->get_result()->fetch_all(MYSQLI_ASSOC);
        }
        public function crear($idPedido, $medioPago) {
            $sql = "SELECT total FROM pedido WHERE idPedido = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idPedido);
            $resultado->execute();
            $pedido = $resultado->get_result()->fetch_assoc();
            $monto = $pedido['total'];
            $sql = "INSERT INTO pago (idPedido, monto, medio_pago, estado) VALUES (?, ?, ?, 'pendiente')";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("ids", $idPedido, $monto, $medioPago);
            $resultado->execute();
            return $this->conn->insert_id;
        }
        public function actualizarPatch($idPago, $estado) {
            $this->conn->begin_transaction();
            try {
                $sql = "SELECT idPedido, estado FROM pago WHERE idPago = ?";
                $resultado = $this->conn->prepare($sql);
                $resultado->bind_param("i", $idPago);
                $resultado->execute();
                $pago = $resultado->get_result()->fetch_assoc();
                if (!$pago) {
                    $this->conn->rollback();
                    return null;
                }
                if ($pago['estado'] !== 'pendiente') {
                    $this->conn->rollback();
                    return false;
                }
                $sql = "UPDATE pago SET estado = ? WHERE idPago = ?";
                $resultado = $this->conn->prepare($sql);
                $resultado->bind_param("si", $estado, $idPago);
                $resultado->execute();
                if ($estado === 'aprobado') {
                    $idPedido = $pago['idPedido'];
                    $sql = "UPDATE pedido SET estado = 'pagado' WHERE idPedido = ?";
                    $resultado = $this->conn->prepare($sql);
                    $resultado->bind_param("i", $idPedido);
                    $resultado->execute();
                }
                $this->conn->commit();
                return true;
            } catch (Throwable $error) {
                $this->conn->rollback();
                throw $error;
            }
        }
    }
?>