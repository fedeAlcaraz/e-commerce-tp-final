<?php
    class Usuario {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM usuario WHERE idUsuario = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc();
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM usuario";
            $resultado = $this->conn->query($sql);
            return $resultado->fetch_all(MYSQLI_ASSOC);
        }
        public function obtenerPorEmail($email) {
            $sql = "SELECT idUsuario, email, password FROM usuario WHERE email = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("s", $email);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc();
        }
        public function crear($datos) {
            $sql = "INSERT INTO usuario (nombre, apellido, dni, email, password, fecha_nacimiento) 
            VALUES (?, ?, ?, ?, ?, ?)";
            $resultado = $this->conn->prepare($sql);
            $passwordHash = password_hash($datos['password'], PASSWORD_DEFAULT);
            $resultado->bind_param("ssssss",
                $datos['nombre'],
                $datos['apellido'],
                $datos['dni'],
                $datos['email'],
                $passwordHash,
                $datos['fecha_nacimiento']);
            $resultado->execute();
            return $resultado->insert_id;
        }
        public function actualizar($id, $datos) {
            $sql = "UPDATE usuario 
            SET nombre = ?, apellido = ?, dni = ?, email = ?, fecha_nacimiento = ? 
            WHERE idUsuario = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("sssssi",
                $datos['nombre'],
                $datos['apellido'],
                $datos['dni'],
                $datos['email'],
                $datos['fecha_nacimiento'],
                $id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function actualizarPatch($id, $datos) {
            $camposPermitidos = ['nombre', 'apellido', 'dni', 'email', 'fecha_nacimiento'];
            $sql = "UPDATE usuario SET ";
            $valores = [];
            $tipos = "";
            foreach ($datos as $campo => $valor) {
                if (!in_array($campo, $camposPermitidos, true)) {
                continue;
                }
            $sql .= "$campo = ?, ";
            $valores[] = $valor;
            $tipos .= "s";
            }
            if (empty($valores)) {
            return false;
            }
            $sql = rtrim($sql, ", ");
            $sql .= " WHERE idUsuario = ?";
            $valores[] = $id;
            $tipos .= "i";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param($tipos, ...$valores);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function eliminar($id) {
            $sql = "DELETE FROM usuario WHERE idUsuario = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
    }
?>