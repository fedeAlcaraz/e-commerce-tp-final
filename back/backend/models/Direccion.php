<?php
    class Direccion {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM direccion WHERE idDireccion = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc(); //devuelve un array
        }
        public function obtenerPorIdUsuario($id) {
            $sql = "SELECT * FROM direccion WHERE idUsuario = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_all(); //devuelve un array
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM direccion";
            $resultado = $this->conn->query($sql);
            return $resultado->fetch_all(MYSQLI_ASSOC); //devuelve un arra
        }
        public function crear($datos) {
            $sql = "INSERT INTO direccion (idUsuario, calle, altura, piso, dpto, cp, idLocalidad) VALUES (?,?,?,?,?,?,?)";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("isssssi",
            $datos["idUsuario"],
            $datos['calle'],
            $datos['altura'],
            $datos['piso'],
            $datos['dpto'],
            $datos['cp'],
            $datos['idLocalidad']);
            $resultado->execute();
            return $resultado->insert_id;
        }
        public function actualizar($id, $datos) {
            $sql = "UPDATE direccion SET calle = ?, altura = ?, piso = ?, dpto = ?, cp = ?, idLocalidad = ? WHERE idDireccion = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("sssssii",
            $datos['calle'],
            $datos['altura'],
            $datos['piso'],
            $datos['dpto'],
            $datos['cp'],
            $datos['idLocalidad'], $id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function actualizarPatch($id, $datos){
            $camposPermitidos = ['calle', 'altura', 'piso', 'dpto', 'cp', 'idLocalidad'];
            $sql = "UPDATE direccion SET ";
            $valores = [];
            $tipos = "";
            foreach ($datos as $campo => $valor) {
                if (!in_array($campo, $camposPermitidos, true)) {
                    continue;
                }
                $sql .= "$campo = ?, ";
                $valores[] = $valor;
                if (is_int($valor)) {
                    $tipos .= "i";
                } else {
                $tipos .= "s";
                }
            }
            if (empty($valores)) {
                return false;
            }
            $sql = rtrim($sql, ", "); 
            $sql .= " WHERE idDireccion = ?"; 
            $valores[] = $id; 
            $tipos .= "i"; 
            $resultado = $this->conn->prepare($sql); 
            $resultado->bind_param($tipos, ...$valores);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function eliminar($id) {
            $sql = "DELETE FROM direccion WHERE idDireccion = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
    }
?>