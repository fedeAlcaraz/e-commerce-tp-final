<?php
    class Producto {
        private $conn;
        public function __construct() {
            $this->conn = require __DIR__ . "/../config/Database.php";
        }
        public function obtenerPorId($id) {
            $sql = "SELECT * FROM producto WHERE idProducto = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->get_result()->fetch_assoc(); //devuelve un array
        }
        public function obtenerTodos() {
            $sql = "SELECT * FROM producto";
            $resultado = $this->conn->query($sql);
            return $resultado->fetch_all(MYSQLI_ASSOC); //devuelve un arra
        }
        public function crearProducto($datos) {
            $sql = "INSERT INTO producto (nombre, precio, stock) VALUES (?,?,?)";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("sdi",
            $datos['nombre'],
            $datos['precio'],
            $datos['stock']);
            $resultado->execute();
            return $resultado->insert_id;
        }
        public function actualizar($id, $datos) {
            $sql = "UPDATE producto SET nombre = ?, precio = ?, stock = ? WHERE idProducto = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("sdii",
            $datos['nombre'],
            $datos['precio'],
            $datos['stock'], $id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function actualizarPatch($id, $datos){
            $sql = "UPDATE producto SET ";
            $valores = [];
            $tipos = "";
            foreach ($datos as $campo => $valor) {
                $sql .= "$campo = ?, ";
                $valores[] = $valor;
                if (is_int($valor)) {
                    $tipos .= "i";
                } elseif (is_float($valor)) {
                    $tipos .= "d";
                } else {
                $tipos .= "s";
                }
            }
            $sql = rtrim($sql, ", "); //aca borramos la ultima coma y espacio q sobra
            $sql .= " WHERE idProducto = ?"; //terminamos de concatenar la consulta
            $valores[] = $id; //agregamos el id al final de los valores
            $tipos .= "i"; //agregamos el tipo de dato del id
            $resultado = $this->conn->prepare($sql); 
            $resultado->bind_param($tipos, ...$valores); //los 3 puntos es para enviar el array como parametros individuales
            $resultado->execute();
            return $resultado->affected_rows;
        }
        public function eliminar($id) {
            $sql = "DELETE FROM producto WHERE idProducto = ?";
            $resultado = $this->conn->prepare($sql);
            $resultado->bind_param("i",$id);
            $resultado->execute();
            return $resultado->affected_rows;
        }
    }
?>