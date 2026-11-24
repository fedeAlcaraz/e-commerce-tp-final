<?php
    class Categoria {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM categoria WHERE idCategoria = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc(); //devuelve un array
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM categoria";
            $resultado = $this->conn->query($sql);
            return $resultado->fetch_all(MYSQLI_ASSOC); //devuelve un arra
        }
        public function crear($datos) {
            $sql = "INSERT INTO categoria (nombre) VALUES (?)";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("s",
            $datos['nombre']);
            $resultado->execute();
            return $this->conn->insert_id;
        }
        public function actualizar($id, $datos) {
            $sql = "UPDATE categoria SET nombre = ? WHERE idCategoria = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("si",
            $datos['nombre'], $id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function eliminar($id) {
            $sql = "DELETE FROM categoria WHERE idCategoria = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
    }
?>