<?php
    require_once __DIR__ . "/../config/Database.php";
    class Producto {
        private $conn;
        public function __construct($conexion) {
            $this->conn = $conexion;
        }
        public function obtenerPorId($id) {
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM producto";
            $resultado = $this->conn->query($sql);
            return $resultado->fetch_assoc();

        }
        public function crear($datos) {
        }
        public function actualizar($id, $datos) {
        }
    }
?>