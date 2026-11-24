<?php
    class Localidad {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM localidad WHERE idLocalidad = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc();
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM localidad";
            $resultado = $this->conn->query($sql);
            return $resultado->fetch_all(MYSQLI_ASSOC); 
        }
        public function crear($datos) {
            $sql = "INSERT INTO localidad (nombre) VALUES (?)";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("s",
            $datos['nombre']);
            $resultado->execute();
            return $resultado->insert_id;
        }
        public function actualizar($id, $datos) {
            $sql = "UPDATE localidad SET nombre = ? WHERE idLocalidad = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("si",
            $datos['nombre'], $id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function eliminar($id) {
            $sql = "DELETE FROM localidad WHERE idLocalidad = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
    }
?>