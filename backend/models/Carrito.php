<?php
    class Carrito {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM carrito WHERE idCarrito = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc();
        }
        public function obtenerPorIdUsuario($idUsuario) {
            $sql = "SELECT * FROM carrito WHERE idUsuario = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i", $idUsuario);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc();
        }
        public function crear($idUsuario) {
            $sql = "INSERT INTO carrito (idUsuario) VALUES (?)";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",
            $idUsuario);
            $resultado->execute();
            return $resultado->insert_id;
        }
        public function eliminar($id) {
            $sql = "DELETE FROM carrito WHERE idCarrito = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
    }
?>